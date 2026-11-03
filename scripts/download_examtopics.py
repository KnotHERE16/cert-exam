"""Download an authorized ExamTopics bank using only the Python standard library."""

import argparse
import hashlib
import http.cookiejar
import json
import mimetypes
import re
import sys
import time
from dataclasses import dataclass, field
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlsplit
from urllib.request import HTTPCookieProcessor, Request, build_opener


ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://www.examtopics.com/exams/amazon/aws-certified-developer-associate-dva-c02/view/"
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


class DownloadError(Exception):
    pass


class AccessBlocked(DownloadError):
    pass


@dataclass
class Element:
    tag: str
    attrs: dict = field(default_factory=dict)
    children: list = field(default_factory=list)

    def has_class(self, name):
        return name in self.attrs.get("class", "").split()

    def find(self, predicate):
        return next((node for node in self.walk() if predicate(node)), None)

    def walk(self):
        yield self
        for child in self.children:
            if isinstance(child, Element):
                yield from child.walk()

    def text(self):
        if self.tag in {"script", "style"} or self.has_class("most-voted-answer-badge"):
            return ""
        if self.tag == "img":
            return f" [Image: {self.attrs.get('alt') or 'see diagram below'}] "
        if self.tag == "br":
            return "\n"
        content = "".join(c.text() if isinstance(c, Element) else c for c in self.children)
        return content + ("\n" if self.tag in {"p", "div", "li", "pre", "tr"} else "")


class Document(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Element("document")
        self.stack = [self.root]
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        node = Element(tag, dict(attrs))
        self.stack[-1].children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def clean(text):
    return re.sub(r"\n{3,}", "\n\n", "\n".join(re.sub(r"[^\S\n]+", " ", line).strip()
                   for line in text.splitlines())).strip()


def answer_letters(value):
    value = re.sub(r"[\s,;/&]+", "", value.upper())
    if not re.fullmatch(r"[A-H]+", value) or len(set(value)) != len(value):
        raise DownloadError(f"Unrecognized answer key: {value!r}")
    return list(value)


def check_page_url(url):
    parts = urlsplit(url)
    base = urlsplit(BASE_URL)
    suffix = parts.path[len(base.path):] if parts.path.startswith(base.path) else None
    if (parts.scheme != "https" or parts.netloc != base.netloc or parts.query or parts.fragment
            or suffix is None or (suffix and not re.fullmatch(r"[1-9]\d*/", suffix))):
        raise DownloadError(f"Refusing unexpected pagination URL: {url}")
    return url


def image_refs(node, page_url):
    images = []
    for image in node.walk():
        if image.tag != "img":
            continue
        src = image.attrs.get("data-src") or image.attrs.get("src")
        if not src:
            raise DownloadError("Question image has no source URL")
        images.append({"url": urljoin(page_url, src), "alt": image.attrs.get("alt", "")})
    return images


def parse_page(html, page_url):
    root = Document(html).root
    cards = [n for n in root.walk() if n.has_class("exam-question-card")]
    if not cards:
        text = clean(root.text()).lower()
        if any(s in text for s in ("log in to continue", "create your free account", "captcha",
                                  "verify you are human", "just a moment", "contributor access",
                                  "access denied", "sign in", "login required")):
            raise AccessBlocked("Login, subscription, or anti-bot access is required")
        raise DownloadError("No question cards found; the page format may have changed")

    questions = []
    for card in cards:
        body = card.find(lambda n: n.has_class("question-body"))
        prompt = body.find(lambda n: n.tag == "p" and n.has_class("card-text")) if body else None
        header = card.find(lambda n: n.has_class("card-header"))
        number = re.search(r"Question\s*#(\d+)", header.text() if header else "")
        if not prompt or not number or not body.attrs.get("data-id"):
            raise DownloadError("Question has no prompt, number, or source ID")
        choices = [n for n in body.walk() if n.has_class("multi-choice-item")]
        labels, options, option_images, marked = [], [], [], []
        for choice in choices:
            label = choice.find(lambda n: n.has_class("multi-choice-letter"))
            letter = label.attrs.get("data-choice-letter", "").strip() if label else ""
            if not re.fullmatch(r"[A-H]", letter) or letter in labels:
                raise DownloadError(f"Invalid option label in question {number[1]}")
            labels.append(letter)
            options.append(re.sub(rf"^{letter}\s*[.)]\s*", "", clean(choice.text())))
            option_images.append(image_refs(choice, page_url))
            if any(key.startswith("data-correct") for key in choice.attrs):
                marked.append(letter)
        answer = body.find(lambda n: n.has_class("question-answer"))
        stated = answer.find(lambda n: n.tag == "strong" and n.has_class("ml-1")) if answer else None
        correct = answer_letters(clean(stated.text())) if stated else marked
        if len(options) < 2 or not correct or not set(correct).issubset(labels) or any(not o for o in options):
            raise DownloadError(f"Missing or invalid options/answer in question {number[1]}")
        chart = answer.find(lambda n: "data-chart" in n.attrs) if answer else None
        votes = json.loads(chart.attrs["data-chart"]) if chart else []
        support = re.search(r"Community vote currently supports\s+Answer[ \t]+([A-H]+(?:[ \t]*,[ \t]*[A-H]+)*)\b",
                            clean(answer.text())) if answer else None
        community = answer_letters(support[1].strip()) if support else []
        explanation_node = body.find(lambda n: n.has_class("answer-description") or n.has_class("answer-explanation"))
        explanation = clean(explanation_node.text()) if explanation_node else ""
        questions.append({
            "id": body.attrs["data-id"], "number": int(number[1]),
            "question": clean(prompt.text()), "options": options, "labels": labels,
            "correctAnswer": correct, "communityAnswer": community, "communityVotes": votes,
            "explanation": explanation, "images": image_refs(prompt, page_url),
            "optionImages": option_images, "sourceUrl": f"{page_url}#{card.attrs.get('id', '')}",
        })
    full_text = clean(root.text())
    page_info = re.search(r"Viewing page\s+(\d+)\s+out of\s+(\d+)\s+pages", full_text, re.I)
    count_info = re.search(r"out of\s+([\d,]+)\s+questions", full_text, re.I)
    next_link = root.find(lambda n: n.tag == "a" and "Next Questions" in clean(n.text()))
    next_url = check_page_url(urljoin(page_url, next_link.attrs["href"])) if next_link else None
    if page_info and int(page_info[1]) < int(page_info[2]) and not next_url:
        raise DownloadError("Pagination says more pages exist, but no next link was found")
    return {"questions": questions, "nextUrl": next_url,
            "totalPages": int(page_info[2]) if page_info else None,
            "expectedQuestions": int(count_info[1].replace(",", "")) if count_info else None}


class Client:
    def __init__(self, delay=3, cookies_file=None):
        self.delay = delay
        self.last_request = 0
        jar = http.cookiejar.MozillaCookieJar()
        if cookies_file:
            jar.load(str(cookies_file), ignore_discard=True)
        self.opener = build_opener(HTTPCookieProcessor(jar))

    def get(self, url):
        time.sleep(max(0, self.delay - (time.monotonic() - self.last_request)))
        self.last_request = time.monotonic()
        try:
            request = Request(url, headers={"User-Agent": "AuthorizedOfflineStudy/1.0", "Accept": "text/html,image/*"})
            with self.opener.open(request, timeout=45) as response:
                return response.read(), response.headers.get_content_type(), response.geturl()
        except HTTPError as error:
            if error.code in {401, 402, 403, 429}:
                raise AccessBlocked(f"HTTP {error.code} at {url}; stopped without retrying") from error
            raise DownloadError(f"HTTP {error.code} at {url}") from error
        except (URLError, TimeoutError, OSError) as error:
            raise DownloadError(f"Request failed at {url}: {error}") from error


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)


def download_image(image, client, root):
    url = image["url"]
    parts = urlsplit(url)
    if parts.scheme != "https" or not (parts.hostname == "examtopics.com" or
                                       (parts.hostname or "").endswith(".examtopics.com")):
        raise DownloadError(f"Image host needs manual review: {url}")
    digest = hashlib.sha256(url.encode()).hexdigest()[:24]
    asset_dir = root / "assets" / "examtopics-dva-c02"
    existing = list(asset_dir.glob(digest + ".*")) if asset_dir.exists() else []
    if existing:
        image["path"] = existing[0].relative_to(root).as_posix()
        return
    content, content_type, final_url = client.get(url)
    if urlsplit(final_url).hostname != parts.hostname or not content_type.startswith("image/"):
        raise DownloadError(f"Expected an image, received {content_type}: {url}")
    extension = {"image/jpeg": ".jpg", "image/svg+xml": ".svg"}.get(content_type)
    extension = extension or mimetypes.guess_extension(content_type)
    if not extension:
        raise DownloadError(f"Unknown image format: {content_type}")
    path = asset_dir / (digest + extension)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(content)
    image["path"] = path.relative_to(root).as_posix()


def make_bank(records, metadata):
    questions = []
    for record in records:
        stated = "".join(record["correctAnswer"])
        community = "".join(record["communityAnswer"])
        explanation = f"ExamTopics stated answer (original option labels): {stated}. Not independently verified."
        if community:
            explanation += f" Community-supported answer: {community}."
        explanation += " " + (record["explanation"] or "No editorial explanation was provided on the source page.")
        explanation += f" Source question #{record['number']}."
        questions.append({"d": 0, "q": record["question"], "o": record["options"],
                          "ma": [record["labels"].index(label) for label in record["correctAnswer"]],
                          "e": explanation, "sourceUrl": record["sourceUrl"],
                          "images": record["images"], "optionImages": record["optionImages"],
                          "sourceNumber": record["number"]})
    count = metadata["downloadedQuestions"]
    expected = metadata.get("expectedQuestions") or "unknown"
    status = "Complete" if metadata["complete"] else "Partial"
    return {"code": "DVA-C02 · ExamTopics", "title": "Developer Associate — ExamTopics",
            "level": "Imported bank", "blurb": f"{status} download: {count}/{expected} questions. Unverified answers.",
            "notice": f"{status} import: {count}/{expected} questions. Uses ExamTopics stated answers, not independently verified. "
                      "Community votes may disagree. Source topics are not official exam domains. "
                      "72% is a local practice target, not a conversion to AWS scaled scoring.",
            "exam": {"count": 65, "minutes": 130, "pass": 72},
            "domains": [{"name": "Imported questions (unclassified)", "weight": 100}],
            "questions": questions}


def crawl(root, client, max_pages=None):
    output = root / "data" / "examtopics-dva-c02"
    cache = output / "pages"
    cache.mkdir(parents=True, exist_ok=True)
    records, seen_ids, seen_numbers, visited = [], set(), set(), set()
    expected, total_pages, next_url = None, None, BASE_URL
    stop_reason, image_errors = None, []
    while next_url:
        if max_pages is not None and len(visited) >= max_pages:
            stop_reason = f"Stopped at configured limit of {max_pages} pages"
            break
        if next_url in visited:
            stop_reason = "Repeated pagination URL; stopped to avoid a loop"
            break
        url = check_page_url(next_url)
        page_number = len(visited) + 1
        cached = cache / f"{page_number:03d}.html"
        try:
            if cached.exists():
                html = cached.read_text(encoding="utf-8")
            else:
                content, content_type, final_url = client.get(url)
                if final_url != url:
                    raise AccessBlocked(f"Redirected to {final_url}; authorized login may be required")
                if content_type != "text/html":
                    raise DownloadError(f"Expected HTML, received {content_type}")
                html = content.decode("utf-8-sig")
            page = parse_page(html, url)
            for question in page["questions"]:
                if question["id"] in seen_ids or question["number"] in seen_numbers:
                    raise DownloadError(f"Duplicate question #{question['number']}; refusing ambiguous pagination")
            if not cached.exists():
                cached.write_text(html, encoding="utf-8")
            for question in page["questions"]:
                for image in question["images"] + [img for images in question["optionImages"] for img in images]:
                    try:
                        download_image(image, client, root)
                    except AccessBlocked:
                        raise
                    except DownloadError as error:
                        image["error"] = str(error)
                        image_errors.append({"question": question["number"], "url": image["url"], "error": str(error)})
                records.append(question)
                seen_ids.add(question["id"])
                seen_numbers.add(question["number"])
            expected = page["expectedQuestions"] or expected
            total_pages = page["totalPages"] or total_pages
            visited.add(url)
            next_url = page["nextUrl"]
            save_export(root, records, expected, total_pages, visited, next_url, None, image_errors)
            print(f"Page {page_number}: {len(records)}/{expected or '?'} questions saved", flush=True)
        except (DownloadError, ValueError) as error:
            stop_reason = f"{type(error).__name__}: {error}"
            break
    metadata = save_export(root, records, expected, total_pages, visited, next_url, stop_reason, image_errors)
    summary = {key: value for key, value in metadata.items() if key != "missingQuestionNumbers"}
    summary["missingQuestionCount"] = len(metadata["missingQuestionNumbers"])
    print(json.dumps(summary, ensure_ascii=True, indent=2), flush=True)
    return 0 if metadata["complete"] else 2


def save_export(root, records, expected, total_pages, visited, next_url, stop_reason, image_errors):
    records = sorted(records, key=lambda r: r["number"])
    numbers = {record["number"] for record in records}
    missing = sorted(set(range(1, expected + 1)) - numbers) if expected else []
    complete = bool(expected and not missing and len(records) == expected and not next_url
                    and not stop_reason and not image_errors)
    metadata = {"source": BASE_URL, "updatedAt": datetime.now(timezone.utc).isoformat(),
                "expectedQuestions": expected, "downloadedQuestions": len(records),
                "downloadedPages": len(visited), "expectedPages": total_pages,
                "complete": complete, "nextUrl": next_url, "stopReason": stop_reason,
                "missingQuestionNumbers": missing, "imageErrors": image_errors}
    output = root / "data" / "examtopics-dva-c02"
    write_json(output / "questions.json", {"metadata": metadata, "questions": records})
    write_json(output / "progress.json", metadata)
    bank_path = root / "certs" / "dva-c02-examtopics.js"
    bank_path.parent.mkdir(parents=True, exist_ok=True)
    bank = make_bank(records, metadata)
    bank_path.write_text('window.CERTS = window.CERTS || {};\nwindow.CERTS["dva-c02-examtopics"] = '
                         + json.dumps(bank, ensure_ascii=True, indent=2) + ";\n", encoding="utf-8")
    return metadata


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--delay", type=float, default=3, help="Seconds between requests (minimum 1)")
    parser.add_argument("--cookies-file", type=Path, help="Local Netscape-format cookie file for your authorized session")
    parser.add_argument("--max-pages", type=int, help="Limit pages processed, including cached pages")
    args = parser.parse_args()
    if args.delay < 1 or (args.max_pages is not None and args.max_pages < 1):
        parser.error("--delay must be >= 1 and --max-pages must be >= 1")
    try:
        return crawl(ROOT, Client(args.delay, args.cookies_file), args.max_pages)
    except (OSError, http.cookiejar.LoadError, DownloadError) as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())