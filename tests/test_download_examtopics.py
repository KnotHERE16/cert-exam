import importlib.util
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import Mock, patch
from urllib.error import HTTPError


SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "download_examtopics.py"
SPEC = importlib.util.spec_from_file_location("download_examtopics", SCRIPT)
downloader = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = downloader
SPEC.loader.exec_module(downloader)


def page(number=1, answer="B", next_page=False, image=False):
    """Synthetic markup only; no copied exam content in test fixtures."""
    return f'''<html><body><div class="card exam-question-card" id="qqq{number}">
    <div class="card-header"><strong>Question #{number}</strong> Topic 1</div>
    <div class="card-body question-body" data-id="{100 + number}">
    <p class="card-text">Synthetic prompt &amp; details<br>Choose the matching options.
    {'<img src="/media/diagram.png" alt="Test diagram">' if image else ''}</p>
    <ul><li class="multi-choice-item"><span class="multi-choice-letter" data-choice-letter="A"> A. </span>First option</li>
    <li class="multi-choice-item" data-correct{100 + number}><span class="multi-choice-letter" data-choice-letter="B"> B. </span>
    Second option <span class="most-voted-answer-badge">Most Voted</span></li></ul>
    <div class="question-answer"><span><strong>Correct Answer:</strong><strong class="ml-1">{answer}</strong></span>
    <p>Community vote currently supports <span>Answer B</span></p>
    <strong>Community vote distribution</strong>
    <div class="answer-chart" data-chart="[{{&quot;answer&quot;:&quot;B&quot;,&quot;percent&quot;:90}}]"></div></div>
    </div></div><p>Viewing page {number} out of 2 pages. Viewing questions {number} out of 2 questions</p>
    {'<a href="/exams/amazon/aws-certified-developer-associate-dva-c02/view/2/">Next Questions</a>' if next_page else ''}
    </body></html>'''


class FakeClient:
    def __init__(self, pages):
        self.pages = pages
        self.requests = []

    def get(self, url):
        self.requests.append(url)
        response = self.pages[url]
        return response.encode(), "text/html", url


class ParserTests(unittest.TestCase):
    def test_parse_single_answer_entities_labels_and_votes(self):
        result = downloader.parse_page(page(next_page=True), downloader.BASE_URL)
        question = result["questions"][0]
        self.assertIn("Synthetic prompt & details\n", question["question"])
        self.assertEqual(question["options"], ["First option", "Second option"])
        self.assertEqual(question["correctAnswer"], ["B"])
        self.assertEqual(question["communityAnswer"], ["B"])
        self.assertEqual(question["communityVotes"][0]["percent"], 90)
        self.assertEqual(result["nextUrl"], downloader.BASE_URL + "2/")
        self.assertEqual(result["expectedQuestions"], 2)

    def test_multiple_answers_and_question_images(self):
        question = downloader.parse_page(page(answer="A, B", next_page=True, image=True),
                                         downloader.BASE_URL)["questions"][0]
        self.assertEqual(question["correctAnswer"], ["A", "B"])
        self.assertEqual(question["images"][0]["url"], "https://www.examtopics.com/media/diagram.png")
        metadata = {"downloadedQuestions": 1, "expectedQuestions": 2, "complete": False}
        self.assertEqual(downloader.make_bank([question], metadata)["questions"][0]["ma"], [0, 1])

    def test_missing_answer_uses_marked_option(self):
        html = page(next_page=True).replace('<strong class="ml-1">B</strong>', '')
        self.assertEqual(downloader.parse_page(html, downloader.BASE_URL)["questions"][0]["correctAnswer"], ["B"])

    def test_invalid_answer_rejected(self):
        with self.assertRaises(downloader.DownloadError):
            downloader.parse_page(page(answer="Z", next_page=True), downloader.BASE_URL)

    def test_login_gate_and_changed_markup(self):
        with self.assertRaises(downloader.AccessBlocked):
            downloader.parse_page("<p>Create your free account. Log in to continue.</p>", downloader.BASE_URL)
        with self.assertRaises(downloader.DownloadError):
            downloader.parse_page("<p>Unexpected page layout</p>", downloader.BASE_URL)

    def test_unexpected_pagination_rejected(self):
        for url in ["https://example.com/view/2/", downloader.BASE_URL + "../../login/",
                    downloader.BASE_URL + "2/?secret=123", "http://www.examtopics.com/"]:
            with self.subTest(url=url), self.assertRaises(downloader.DownloadError):
                downloader.check_page_url(url)

    def test_missing_next_link_rejected(self):
        with self.assertRaises(downloader.DownloadError):
            downloader.parse_page(page(), downloader.BASE_URL)

    def test_local_export_retains_original_option_positions(self):
        question = downloader.parse_page(page(next_page=True), downloader.BASE_URL)["questions"][0]
        bank = downloader.make_bank([question], {"downloadedQuestions": 1, "expectedQuestions": 2, "complete": False})
        self.assertEqual(bank["questions"][0]["ma"], [1])
        self.assertIn("Partial", bank["notice"])
        self.assertIn("not a conversion", bank["notice"])


class CrawlTests(unittest.TestCase):
    def test_http_access_blocks_are_not_retried(self):
        for status in [401, 402, 403, 429]:
            client = downloader.Client(delay=1)
            client.opener = Mock()
            client.opener.open.side_effect = HTTPError(downloader.BASE_URL, status, "Blocked", {}, None)
            with self.subTest(status=status), patch.object(downloader.time, "sleep"), self.assertRaises(downloader.AccessBlocked):
                client.get(downloader.BASE_URL)
            self.assertEqual(client.opener.open.call_count, 1)

    def test_stop_at_login_then_resume_from_cache(self):
        second = downloader.BASE_URL + "2/"
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            client = FakeClient({downloader.BASE_URL: page(next_page=True), second: "<p>Log in to continue</p>"})
            self.assertEqual(downloader.crawl(root, client), 2)
            progress = json.loads((root / "data/examtopics-dva-c02/progress.json").read_text())
            self.assertEqual(progress["downloadedQuestions"], 1)
            self.assertEqual(progress["missingQuestionNumbers"], [2])
            self.assertIn("AccessBlocked", progress["stopReason"])
            self.assertFalse((root / "data/examtopics-dva-c02/pages/002.html").exists())
            resumed = FakeClient({second: page(number=2)})
            self.assertEqual(downloader.crawl(root, resumed), 0)
            self.assertEqual(resumed.requests, [second])
            data = json.loads((root / "data/examtopics-dva-c02/questions.json").read_text())
            self.assertTrue(data["metadata"]["complete"])
            self.assertEqual(len(data["questions"]), 2)
            self.assertTrue((root / "certs/dva-c02-examtopics.js").exists())

    def test_duplicate_questions_stop_without_claiming_completion(self):
        second = downloader.BASE_URL + "2/"
        duplicate = page(number=2).replace('data-id="102"', 'data-id="101"')
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            client = FakeClient({downloader.BASE_URL: page(next_page=True), second: duplicate})
            self.assertEqual(downloader.crawl(root, client), 2)
            progress = json.loads((root / "data/examtopics-dva-c02/progress.json").read_text())
            self.assertFalse(progress["complete"])
            self.assertIn("Duplicate", progress["stopReason"])

    def test_images_saved_and_reused_without_network(self):
        class ImageClient:
            calls = 0

            def get(self, url):
                self.calls += 1
                return b"synthetic image bytes", "image/png", url

        with tempfile.TemporaryDirectory() as directory:
            root, client = Path(directory), ImageClient()
            image = {"url": "https://www.examtopics.com/media/test.png", "alt": "Test"}
            downloader.download_image(image, client, root)
            self.assertTrue((root / image["path"]).exists())
            downloader.download_image(image, client, root)
            self.assertEqual(client.calls, 1)


if __name__ == "__main__":
    unittest.main()