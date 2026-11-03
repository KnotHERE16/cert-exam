# AWS certification practice (offline)

Open `C:\Users\AUNGMYINTKELVIN\Documents\dev\cert-exam\index.html` in a browser. No server or internet connection is needed for downloaded questions and images. Source links open the original website online.

The original CLF-C02 and DVA-C02 practice banks remain separate from **DVA-C02 · ExamTopics**. Imported questions retain the source's stated answer, original option order, community-supported answer, and vote distribution. The app shuffles options while preserving the correct-answer mapping, including multiple-response questions.

## PDF import

**DVA-C02 · PDF** holds all 557 questions from `AWS Certified Developer - Associate DVA-C02.pdf`. Discussion comments are dropped; the stated answer and community vote split are kept. Regenerate it (needs `pip install pymupdf`) with:

```powershell
python -I "C:\Users\AUNGMYINTKELVIN\Documents\dev\cert-exam\scripts\import_pdf.py" "C:\Users\AUNGMYINTKELVIN\Documents\dev\cert-exam\AWS Certified Developer - Associate DVA-C02.pdf"
```

Outputs: `certs/dva-c02-pdf.js` and `assets/pdf-dva-c02/`.

## ExamTopics download

Use this only for material you have permission to download. The downloader does not bypass login, subscription checks, CAPTCHA, or rate limits. It uses Python's standard library (no package installation required).

```powershell
python "C:\Users\AUNGMYINTKELVIN\Documents\dev\cert-exam\scripts\download_examtopics.py" --delay 3
```

The current unauthenticated session can access only questions 1–10. Page 2 requires an account. **This is a partial download, not the full advertised 557-question bank.** The generated bank and progress file show the actual totals and stop reason. Exit code `2` means incomplete; `0` means all advertised questions and referenced images were downloaded; `1` means a setup error.

### Resume with your authorized account

1. Sign in normally through your browser and confirm your account can access the next page.
2. If your permission includes automated access, export **only the ExamTopics cookies** from your own session to a Netscape-format cookie file using a method you trust. This script does not extract browser credentials or create an account for you.
3. Keep that file locally, preferably **outside the repository**. Cookies are credentials: do not paste them into chat, upload them, or commit them. Common cookie filenames and raw cached pages are ignored by Git as a precaution.
4. Run:

```powershell
python "C:\Users\AUNGMYINTKELVIN\Documents\dev\cert-exam\scripts\download_examtopics.py" --delay 3 --cookies-file "C:\private\examtopics.cookies.txt"
```

Replace the example cookie path with the absolute path to your local file. The downloader reuses successfully parsed cached pages and continues from the first unavailable page. It stops on HTTP 401/402/403/429, an authentication redirect, CAPTCHA, unexpected markup, or invalid answers. It does not retry access blocks. Delete the cookie file when no longer needed.

### Outputs

- `C:\Users\AUNGMYINTKELVIN\Documents\dev\cert-exam\data\examtopics-dva-c02\questions.json`: portable question/answer export, community votes, source URLs, and metadata.
- `C:\Users\AUNGMYINTKELVIN\Documents\dev\cert-exam\data\examtopics-dva-c02\progress.json`: counts, missing question numbers, next page, stop reason, and missing images.
- `C:\Users\AUNGMYINTKELVIN\Documents\dev\cert-exam\certs\dva-c02-examtopics.js`: bank loaded directly by the offline app.
- `C:\Users\AUNGMYINTKELVIN\Documents\dev\cert-exam\assets\examtopics-dva-c02\`: downloaded question/option images, when present.
- `C:\Users\AUNGMYINTKELVIN\Documents\dev\cert-exam\data\examtopics-dva-c02\pages\`: private raw page cache (Git-ignored). Remove this cache to force a fresh crawl.

**Accuracy:** imported answers are not independently verified and may disagree with community votes. Discussion comments are not downloaded; the source page's editorial explanation is preserved if present, otherwise the app explicitly says none was provided. Imported topics are not classified into official exam domains. A 72% practice target is not equivalent to AWS's scaled passing score. A partial bank produces a shorter exam, which the setup screen explicitly labels.

## Validation

```powershell
python -m unittest discover -s "C:\Users\AUNGMYINTKELVIN\Documents\dev\cert-exam\tests" -p "test_*.py" -v
node --check "C:\Users\AUNGMYINTKELVIN\Documents\dev\cert-exam\app.js"
node --check "C:\Users\AUNGMYINTKELVIN\Documents\dev\cert-exam\certs\dva-c02-examtopics.js"
```

Open `C:\Users\AUNGMYINTKELVIN\Documents\dev\cert-exam\tests\browser_smoke.html` in a browser to run the app smoke tests. The test needs same-origin access to the app iframe; Chromium can run it locally with `--allow-file-access-from-files`, or serve the project on localhost with Python's HTTP server.