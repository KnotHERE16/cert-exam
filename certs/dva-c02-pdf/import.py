import argparse
import html
import json
import re
import sys
from pathlib import Path

import pymupdf

HERE = Path(__file__).resolve().parent
ASSET_DIR = HERE / "assets"
OUT_JS = HERE / "bank.js"
CERT_ID = HERE.name

HEADER = re.compile(r"^Question #(\d+)$")
OPTION = re.compile(r"^([A-F])\.\s*(.*)$")
VOTE = re.compile(r"\(\d+%\)")
TOPIC = re.compile(r"^Topic \d+$")
OPTION_X = (66, 76)
STEM_X = 62
WRAP_RIGHT = 490


OVERRIDES = {
    119: "CE", 128: "A", 140: "C", 269: "A", 303: "A",
    385: "C", 409: "BC", 490: "B", 493: "B",
}


def clean(text):
    return html.unescape(text).replace(" ", " ").strip()


def page_events(page):
    events = []
    for block in page.get_text("dict")["blocks"]:
        if block["type"] != 0:
            continue
        for line in block["lines"]:
            if abs(line["dir"][0] - 1) > 0.01:
                continue
            spans = [s for s in line["spans"] if s["text"].strip() != "Most Voted"]
            text = clean("".join(s["text"] for s in spans))
            if not text:
                continue
            x0, y0, x1, y1 = line["bbox"]
            events.append({"kind": "text", "text": text, "x0": x0, "x1": x1, "y0": y0, "y1": y1,
                           "size": spans[0]["size"]})
    for info in page.get_image_info(xrefs=True):
        if info["xref"] == 0:
            continue
        x0, y0, x1, y1 = info["bbox"]
        events.append({"kind": "image", "xref": info["xref"], "x0": x0, "x1": x1, "y0": y0, "y1": y1})
    events.sort(key=lambda e: (e["y0"], e["x0"]))
    return events


def join_stem(lines):
    out = ""
    prev = None
    for line in lines:
        if prev is None:
            out = line["text"]
        else:
            indented = line["x0"] > STEM_X or prev["x0"] > STEM_X
            ends_paragraph = prev["x1"] < WRAP_RIGHT and prev["text"][-1] in ".?:!)"
            out += ("\n" if indented or ends_paragraph else " ") + line["text"]
        prev = line
    return out


def save_image(doc, xref, stem):
    info = doc.extract_image(xref)
    ext = "jpg" if info["ext"] in ("jpeg", "jpg") else info["ext"]
    if info.get("smask"):
        pix = pymupdf.Pixmap(pymupdf.Pixmap(doc, xref), pymupdf.Pixmap(doc, info["smask"]))
        ext = "png"
        data = pix.tobytes("png")
    else:
        data = info["image"]
    name = f"{stem}.{ext}"
    (ASSET_DIR / name).write_bytes(data)
    return f"assets/{name}"


def parse(doc):
    questions = []
    cur = None
    state = None

    def finish():
        if cur is not None:
            questions.append(cur)

    for page in doc:
        events = page_events(page)
        markers = [(e["y0"], e["y1"]) for e in events
                   if e["kind"] == "text" and OPTION_X[0] < e["x0"] < OPTION_X[1] and OPTION.match(e["text"])]
        marker_letters = [OPTION.match(e["text"]).group(1) for e in events
                          if e["kind"] == "text" and OPTION_X[0] < e["x0"] < OPTION_X[1] and OPTION.match(e["text"])]
        for e in events:
            if e["kind"] == "text":
                text = e["text"]
                m = HEADER.match(text)
                if m:
                    finish()
                    cur = {"number": int(m.group(1)), "stem": [], "options": {}, "answer": None,
                           "votes": [], "stem_images": [], "option_images": {}}
                    state = "body"
                    continue
                if state != "body":
                    continue
                if text == "Comments":
                    state = "comments"
                elif TOPIC.match(text):
                    pass
                elif text.startswith("Correct Answer:"):
                    cur["answer"] = re.sub(r"[^A-F]", "", text[len("Correct Answer:"):])
                elif cur["answer"] is not None:
                    if e["size"] < 7 and VOTE.search(text):
                        cur["votes"].append(text)
                else:
                    om = OPTION.match(text) if OPTION_X[0] < e["x0"] < OPTION_X[1] else None
                    if om:
                        cur["options"][om.group(1)] = om.group(2)
                        cur["last"] = om.group(1)
                    elif cur["options"]:
                        letter = cur["last"]
                        cur["options"][letter] = (cur["options"][letter] + " " + text).strip()
                    else:
                        cur["stem"].append(e)
            elif state == "body":
                overlap = [i for i, (y0, y1) in enumerate(markers) if y0 < e["y1"] + 3 and y1 > e["y0"] - 3]
                above = [i for i, (y0, y1) in enumerate(markers) if y1 <= e["y0"]]
                if overlap:
                    target = marker_letters[overlap[0]]
                elif above:
                    target = marker_letters[above[-1]]
                elif cur["options"]:
                    target = cur["last"]
                else:
                    target = None
                bucket = cur["stem_images"] if target is None else cur["option_images"].setdefault(target, [])
                bucket.append(e["xref"])
    finish()
    return questions


def build(doc, parsed):
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    out, problems = [], []
    for p in parsed:
        n = p["number"]
        letters = sorted(p["options"])
        answer = p["answer"]
        if len(letters) < 2 or not answer or not set(answer) <= set(letters):
            problems.append(f"#{n}: options={letters} answer={p['answer']!r}")
            continue
        images = [{"path": save_image(doc, x, f"q{n}-s{k}"), "alt": f"Question {n} diagram"}
                  for k, x in enumerate(p["stem_images"], 1)]
        option_images = [[{"path": save_image(doc, x, f"q{n}-{l}{k}"), "alt": f"Question {n} option {l}"}
                          for k, x in enumerate(p["option_images"].get(l, []), 1)] for l in letters]
        votes = ", ".join(p["votes"])
        if n in OVERRIDES:
            note = (f"Answer corrected from the PDF's stated {answer} to {OVERRIDES[n]} after manual review; "
                    "not independently verified.")
            answer = OVERRIDES[n]
        else:
            note = "Answer as stated in the source PDF; not independently verified."
        out.append({
            "d": 0,
            "q": join_stem(p["stem"]),
            "o": [p["options"][l] for l in letters],
            "ma": [letters.index(c) for c in answer],
            "e": note + (f" Community vote: {votes}." if votes else ""),
            "images": images,
            "optionImages": option_images,
            "sourceNumber": n,
        })
    return out, problems


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf", type=Path, nargs="?", default=HERE / "source.pdf")
    args = ap.parse_args()
    doc = pymupdf.open(args.pdf)
    questions, problems = build(doc, parse(doc))
    bank = {
        "code": "DVA-C02 · PDF",
        "title": "Developer Associate — PDF export",
        "level": "Imported bank",
        "blurb": f"{len(questions)} questions from the downloaded PDF. Unverified answers.",
        "notice": f"Imported {len(questions)} questions from a PDF export. Answers are as stated in the PDF and not independently verified; community votes may disagree. Topics are not classified into official exam domains. 72% is a local practice target, not a conversion to AWS scaled scoring.",
        "exam": {"count": 65, "minutes": 130, "pass": 72},
        "domains": [{"name": "Imported questions (unclassified)", "weight": 100}],
        "questions": questions,
    }
    OUT_JS.write_text(
        'window.CERTS = window.CERTS || {};\nwindow.CERTS["' + CERT_ID + '"] = '
        + json.dumps(bank, indent=2, ensure_ascii=True) + ";\n",
        encoding="utf-8",
    )
    images = sum(len(q["images"]) + sum(len(o) for o in q["optionImages"]) for q in questions)
    print(f"{len(questions)} questions, {images} images")
    for line in problems:
        print("SKIPPED", line)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
