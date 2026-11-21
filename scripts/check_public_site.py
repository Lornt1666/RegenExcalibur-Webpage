"""Minimal offline integrity check for new public business-site pages."""
from __future__ import annotations
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGES = ("index.html", "conscience.html", "privacy.html")


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.references: list[str] = []
        self.ids: set[str] = set()
        self.has_main = False
        self.has_title = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        d = dict(attrs)
        if d.get("id"):
            self.ids.add(str(d["id"]))
        if tag == "main" and d.get("id") == "main":
            self.has_main = True
        if tag == "title":
            self.has_title = True
        for key in ("href", "src"):
            if d.get(key):
                self.references.append(str(d[key]))


def load_page(path: Path) -> PageParser:
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    parser.close()
    return parser


def main() -> None:
    failures: list[str] = []
    parsed = {p: load_page(ROOT / p) for p in PAGES}
    for page, info in parsed.items():
        if not info.has_main:
            failures.append(f"{page}: missing <main id='main'> landmark")
        if not info.has_title:
            failures.append(f"{page}: missing page title")
        for ref in info.references:
            u = urlsplit(ref)
            if u.scheme or u.netloc or ref.startswith("//") or ref.startswith("mailto:"):
                continue
            target_name = unquote(u.path)
            target = ((ROOT / page).parent / target_name).resolve() if target_name else ROOT / page
            if not target.is_relative_to(ROOT):
                failures.append(f"{page}: path escapes repository: {ref}")
                continue
            if not target.exists():
                failures.append(f"{page}: missing target for {ref}")
                continue
            if u.fragment and target.suffix == ".html":
                relative = target.relative_to(ROOT).as_posix()
                other = parsed.get(relative) or load_page(target)
                if u.fragment not in other.ids:
                    failures.append(f"{page}: missing fragment for {ref}")
    if failures:
        raise SystemExit("PUBLIC SITE CHECK FAILED:\n" + "\n".join(failures))
    print("PUBLIC SITE CHECK PASSED: new pages, local links and target fragments exist.")


if __name__ == "__main__":
    main()
