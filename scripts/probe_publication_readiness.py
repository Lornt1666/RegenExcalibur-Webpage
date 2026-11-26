"""Read-only GitHub Pages and public inquiry readiness probe.

This script NEVER edits settings, creates an issue, merges, or deploys.
Use the GitHub Actions GITHUB_TOKEN (read scope) and save a truthful receipt.
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen

REPO = os.environ.get("GITHUB_REPOSITORY", "Lornt1666/RegenExcalibur-Webpage")
API = "https://api.github.com/repos/" + REPO
PAGES = "https://lornt1666.github.io/RegenExcalibur-Webpage/"
TOKEN = os.environ.get("GITHUB_TOKEN", "")


def fetch(url: str, *, authenticated: bool = True, limit: int = 102400):
    headers = {"User-Agent": "RegenExcalibur-release-readiness/1.0"}
    if authenticated:
        headers["Accept"] = "application/vnd.github+json"
        headers["X-GitHub-Api-Version"] = "2022-11-28"
        if TOKEN:
            headers["Authorization"] = "Bearer " + TOKEN
    try:
        request = Request(url, headers=headers)
        with urlopen(request, timeout=15) as response:
            body = response.read(limit)
            return {"status": response.status, "data": body.decode("utf-8", "replace")}
    except HTTPError as error:
        return {"status": error.code, "error": str(error.reason)}
    except (TimeoutError, URLError, OSError) as error:
        return {"status": None, "error": type(error).__name__ + ": " + str(error)[:180]}


def decode(response):
    try:
        return json.loads(response.get("data", "{}"))
    except (ValueError, TypeError):
        return {}


def main():
    repo_response = fetch(API)
    repository = decode(repo_response)
    if repo_response["status"] != 200:
        print("READINESS PROBE INCONCLUSIVE: repository API not reachable.")
        print(json.dumps(repo_response))
        return 2

    default_branch = repository.get("default_branch")
    has_issues = repository.get("has_issues")
    has_pages = repository.get("has_pages")
    template = fetch(
        API + "/contents/.github/ISSUE_TEMPLATE/project-inquiry.yml?ref="
        + quote(default_branch or "", safe="")
    )
    pages_api = fetch(API + "/pages")
    pages_details = decode(pages_api) if pages_api["status"] == 200 else {}
    homepage = fetch(PAGES, authenticated=False, limit=30720)
    response_title = ""
    if homepage.get("data"):
        from html.parser import HTMLParser

        class TitleParser(HTMLParser):
            inside = False
            title = ""

            def handle_starttag(self, tag, attrs):
                if tag == "title":
                    self.inside = True

            def handle_endtag(self, tag):
                if tag == "title":
                    self.inside = False

            def handle_data(self, data):
                if self.inside:
                    self.title += data

        p = TitleParser()
        p.feed(homepage["data"])
        response_title = p.title.strip()[:160]

    blockers = []
    if has_issues is not True:
        blockers.append("GitHub Issues not confirmed enabled")
    if template["status"] != 200:
        blockers.append("Public inquiry template is not on current publication/default branch")
    if has_pages is not True or pages_api["status"] != 200:
        blockers.append("GitHub Pages configuration is not confirmed active")
    if homepage["status"] != 200:
        blockers.append("Intended public homepage did not return HTTP 200")
    blockers.append("Candidate PR not yet released; live-version smoke test remains pending")
    blockers.append("Independent review and manual accessibility/claims approval remain pending")

    receipt = {
        "probe": "REX-WEB-PUBLICATION-READINESS-001",
        "mode": "read-only",
        "repo": REPO,
        "default_branch": default_branch,
        "has_issues": has_issues,
        "has_pages": has_pages,
        "issue_form_on_default_branch_http_status": template["status"],
        "pages_api_http_status": pages_api["status"],
        "pages_url": pages_details.get("html_url"),
        "pages_source": pages_details.get("source"),
        "public_homepage": PAGES,
        "homepage_http_status": homepage["status"],
        "homepage_title": response_title,
        "publication_decision": "HOLD",
        "pending_or_blocking": blockers,
    }
    output = Path(os.environ.get("RUNNER_TEMP", ".")) / "regen-release-readiness.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(receipt, indent=2) + "\n", encoding="utf-8")
    summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary:
        with open(summary, "a", encoding="utf-8") as target:
            target.write("### RegenExcalibur publication probe — read-only\n")
            target.write(f"- **Decision:** HOLD (not a publish authorization)\n")
            target.write(f"- GitHub Issues enabled: **{has_issues}**\n")
            target.write(f"- Project issue form on default branch: **HTTP {template['status']}**\n")
            target.write(f"- GitHub Pages enabled: **{has_pages}**; API status **{pages_api['status']}**\n")
            target.write(f"- Existing public homepage HTTP status: **{homepage['status']}**\n")
            for reason in blockers:
                target.write(f"- Gate: {reason}\n")
    print(json.dumps(receipt, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
