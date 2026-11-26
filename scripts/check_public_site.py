"""Offline checks for public RegenExcalibur business site pages.

Ensures local links, landmarks, and visitor-facing vocabulary meet the
current public content contract. Development docs and repository internals
remain outside the public-copy scan.
"""
from __future__ import annotations

import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGES = (
    "index.html",
    "conscience.html",
    "contact.html",
    "privacy.html",
    "whitepaper.html",
    "launch-gate.html",
)
PROHIBITED_PUBLIC_COPY = re.compile(
    r"\b(?:"
    r"ai|a[.]i[.]|"
    r"artificial[\s-]+intelligence|"
    r"agents?|"
    r"generative|"
    r"machine[\s-]+learning|"
    r"neural(?:[\s-]+network)?|"
    r"llms?|"
    r"chatgpt|"
    r"algorithms?|"
    r"automation|automated|autonomous|"
    r"prompt(?:s|ing)?|"
    r"intelligence"
    r")\b",
    re.IGNORECASE,
)


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[str] = []
        self.ids: set[str] = set()
        self.has_main = False
        self.has_title = False
        self.public_copy: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(str(values["id"]))
        if tag == "main" and values.get("id") == "main":
            self.has_main = True
        if tag == "title":
            self.has_title = True
        for key in ("href", "src"):
            if values.get(key):
                self.references.append(str(values[key]))
        for key in ("alt", "aria-label", "placeholder", "title", "content", "value"):
            if values.get(key):
                self.public_copy.append(str(values[key]))

    def handle_data(self, data: str) -> None:
        if data.strip():
            self.public_copy.append(data.strip())


def load_page(path: Path) -> PageParser:
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    parser.close()
    return parser


def main() -> None:
    failures: list[str] = []
    parsed = {page: load_page(ROOT / page) for page in PAGES}
    for page, info in parsed.items():
        if not info.has_main:
            failures.append(f"{page}: missing <main id='main'> landmark")
        if not info.has_title:
            failures.append(f"{page}: missing page title")
        for snippet in info.public_copy:
            match = PROHIBITED_PUBLIC_COPY.search(snippet)
            if match:
                failures.append(
                    f"{page}: prohibited public-facing vocabulary "
                    f"{match.group()!r} in {snippet[:125]!r}"
                )
        for ref in info.references:
            url = urlsplit(ref)
            if url.path.lower().endswith(".pdf"):
                failures.append(
                    f"{page}: historic PDFs require separate content review before public linking: {ref}"
                )
            if url.scheme or url.netloc or ref.startswith("//") or ref.startswith("mailto:"):
                continue
            target_name = unquote(url.path)
            target = ((ROOT / page).parent / target_name).resolve() if target_name else ROOT / page
            if not target.is_relative_to(ROOT):
                failures.append(f"{page}: path escapes repository: {ref}")
                continue
            if not target.exists():
                failures.append(f"{page}: missing target for {ref}")
                continue
            if url.fragment and target.suffix == ".html":
                relative = target.relative_to(ROOT).as_posix()
                other = parsed.get(relative) or load_page(target)
                if url.fragment not in other.ids:
                    failures.append(f"{page}: missing fragment for {ref}")

    contact = (ROOT / "contact.html").read_text(encoding="utf-8")
    issue_form = ROOT / ".github/ISSUE_TEMPLATE/project-inquiry.yml"
    if not issue_form.exists():
        failures.append("Missing GitHub public inquiry issue form")
    else:
        issue_text = issue_form.read_text(encoding="utf-8")
        if "public" not in issue_text.lower() or "required: true" not in issue_text:
            failures.append("Public inquiry issue form is missing a required disclosure")
    if "id=\"open-public-inquiry\"" not in contact or "id=\"public-consent\"" not in contact:
        failures.append("Public inquiry page must expose disclosure and explicit navigation")
    if "mailto:" in contact.lower() or "@gmail.com" in contact.lower():
        failures.append("Personal mailbox disclosure is prohibited on public inquiry page")
    if failures:
        raise SystemExit("PUBLIC SITE CHECK FAILED:\n" + "\n".join(failures))
    print(
        "PUBLIC SITE CHECK PASSED: "
        f"{len(PAGES)} visitor-facing pages, local links, public-copy exclusions, "
        "and issue-form notice validated."
    )


if __name__ == "__main__":
    main()
