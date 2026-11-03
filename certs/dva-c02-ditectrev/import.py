import json
import re
import sys
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
README = HERE / "data" / "README.md"
OUT_JSON = HERE / "data" / "questions.json"
OUT_JS = HERE / "bank.js"
EXPLANATIONS = HERE / "data" / "explanations.json"
ASSET_DIR = HERE / "assets"
CERT_ID = HERE.name
ASSET_URL = "https://raw.githubusercontent.com/Ditectrev/Amazon-Web-Services-AWS-Developer-Associate-DVA-C02-Practice-Tests-Exams-Questions-Answers/main/images/"
IMG_RE = re.compile(r"^!\[([^\]]*)\]\(images/([^)\s]+)\)\s*$")
OPT_RE = re.compile(r"^- \[([ x])\] (.*)$")


def clean(text):
    return re.sub(r"\s+\n", "\n", text.replace("`", "")).strip()


def parse(text):
    body = text[text.index("\n### "):].strip()
    questions = []
    for number, block in enumerate(re.split(r"\n(?=### )", body), 1):
        lines = block.split("\n")
        stem = [lines[0][4:]]
        images, options, correct, option_images = [], [], [], []
        for line in lines[1:]:
            if "Back to Top" in line:
                continue
            img = IMG_RE.match(line.strip())
            opt = OPT_RE.match(line)
            if opt:
                options.append(clean(opt.group(2)))
                option_images.append([])
                if opt.group(1) == "x":
                    correct.append(len(options) - 1)
            elif img:
                target = option_images[-1] if options else images
                target.append({"path": f"assets/{img.group(2)}", "alt": img.group(1)})
            elif not options:
                stem.append(line)
        if not options or not correct:
            raise ValueError(f"question {number} has no options or no marked answer")
        questions.append({
            "d": 0,
            "q": clean("\n".join(stem)),
            "o": options,
            "ma": correct,
            "e": "Answer as marked in the Ditectrev repository. Not independently verified. No explanation was provided.",
            "images": images,
            "optionImages": option_images,
            "sourceNumber": number,
        })
    return questions


def download_images(questions):
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    paths = {i["path"] for q in questions for i in q["images"] + [x for o in q["optionImages"] for x in o]}
    for path in sorted(paths):
        name = path.rsplit("/", 1)[1]
        target = ASSET_DIR / name
        if not target.exists():
            with urllib.request.urlopen(ASSET_URL + name, timeout=30) as r:
                target.write_bytes(r.read())
    return len(paths)


def main():
    questions = parse(README.read_text(encoding="utf-8"))
    explanations = json.loads(EXPLANATIONS.read_text(encoding="utf-8"))
    for q in questions:
        q["e"] = explanations[str(q["sourceNumber"])] + " (Answer as marked in the Ditectrev repository; not independently verified.)"
    images = download_images(questions)
    bank = {
        "code": "DVA-C02 · Ditectrev",
        "title": "Developer Associate — Ditectrev",
        "level": "Imported bank",
        "blurb": f"{len(questions)} community practice questions. Unverified answers.",
        "notice": f"Imported {len(questions)} questions from the Ditectrev GitHub repository. Answers are as marked there and not independently verified. Topics are not classified into official exam domains. 72% is a local practice target, not a conversion to AWS scaled scoring.",
        "exam": {"count": 65, "minutes": 130, "pass": 72},
        "domains": [{"name": "Imported questions (unclassified)", "weight": 100}],
        "questions": questions,
    }
    OUT_JSON.write_text(json.dumps(bank, indent=2, ensure_ascii=False), encoding="utf-8")
    OUT_JS.write_text(
        'window.CERTS = window.CERTS || {};\nwindow.CERTS["' + CERT_ID + '"] = '
        + json.dumps(bank, indent=2, ensure_ascii=True) + ";\n",
        encoding="utf-8",
    )
    print(f"{len(questions)} questions, {images} images")


if __name__ == "__main__":
    sys.exit(main())
