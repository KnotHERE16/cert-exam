# AWS certification practice (offline)

Open `index.html` in a browser. No server or internet connection is needed.

## Layout

Each certification lives in its own folder under `certs/`:

```
certs/
  dva-c02-pdf/
    bank.js        question bank the site loads
    assets/        its diagrams
    import.py      rebuilds bank.js from source.pdf
    source.pdf     original PDF (Git-ignored)
  dva-c02-ditectrev/
    bank.js
    assets/
    data/          upstream README and explanations
    import.py
  manifest.js      generated list of cert folders
  loader.js        loads every bank listed in the manifest
```

### Add a cert

1. Create `certs/<id>/` with a `bank.js` that sets `window.CERTS["<id>"] = {code, title, level, blurb, notice, exam, domains, questions}`. The `<id>` must match the folder name.
2. Put its images in `certs/<id>/assets/` and reference them as `assets/<file>` in the questions.
3. Run `python scripts/build_manifest.py`.

### Remove a cert

Delete its folder and run `python scripts/build_manifest.py`.

## Importers

**DVA-C02 · PDF** holds all 557 questions from the source PDF. Discussion comments are dropped; the stated answer and community vote split are kept. Nine answers (#119, 128, 140, 269, 303, 385, 409, 490, 493) were overridden after manual review; see `OVERRIDES` in the script. Needs `pip install pymupdf`, and the PDF saved as `certs/dva-c02-pdf/source.pdf`:

```powershell
python -I certs/dva-c02-pdf/import.py
```

**DVA-C02 · Ditectrev** is built from `certs/dva-c02-ditectrev/data/`:

```powershell
python -I certs/dva-c02-ditectrev/import.py
```

After running an importer, run `python scripts/build_manifest.py` if you added a new cert folder.

**Accuracy:** imported answers are not independently verified and may disagree with community votes. Imported topics are not classified into official exam domains. A 72% practice target is not equivalent to AWS's scaled passing score.

## Validation

```powershell
node --check app.js
```

Open `tests/browser_smoke.html` in a browser to run the app smoke tests. The test needs same-origin access to the app iframe; Chromium can run it locally with `--allow-file-access-from-files`, or serve the project on localhost with Python's HTTP server.
