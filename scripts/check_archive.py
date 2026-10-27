#!/usr/bin/env python3
"""Check that archive cards, permanent File Nos and article pagination agree."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def main():
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    cards = re.findall(r'<a href="([^"]+)" class="card\b[^>]*>(.*?)</a>', index, re.S)
    errors = []
    files = []
    numbers = []
    for target, markup in cards:
        page = ROOT / target
        match = re.search(r'No\.\s*(\d{3})', markup)
        if not page.is_file() or not match:
            errors.append(f"index.html: incomplete card for {target}")
            continue
        files.append(target)
        numbers.append(match.group(1))
        strip = re.search(r'class="file-no"[^>]*>\s*File No\.\s*(\d{3})', page.read_text(encoding="utf-8"))
        if not strip or strip.group(1) != match.group(1):
            errors.append(f"{target}: File No. differs from its home card")
    if len(files) != len(set(files)):
        errors.append("index.html: duplicate article card")
    if len(numbers) != len(set(numbers)):
        errors.append("index.html: duplicate File No.")

    article_files = {path.name for path in ROOT.glob("*.html")
                     if 'class="file-no"' in path.read_text(encoding="utf-8")}
    for missing in sorted(article_files - set(files)):
        errors.append(f"index.html: missing article card for {missing}")
    for position, filename in enumerate(files):
        markup = (ROOT / filename).read_text(encoding="utf-8")
        nav = re.search(r'<nav class="article-pagination".*?</nav>', markup, re.S)
        if not nav:
            errors.append(f"{filename}: missing article pagination")
            continue
        for direction, expected in (("prev", files[position-1] if position else None),
                                    ("next", files[position+1] if position+1 < len(files) else None)):
            match = re.search(r'class="pagination-' + direction + r'\b[^>]*href="([^"]+)"', nav.group())
            # Pagination links put href before class in the current markup.
            match = match or re.search(r'<a[^>]*href="([^"]+)"[^>]*class="pagination-' + direction + r'\b', nav.group())
            actual = match.group(1) if match else None
            if actual != expected:
                errors.append(f"{filename}: {direction} link is {actual!r}, expected {expected!r}")
    print(f"Archive check: {len(files)} cards and File Nos checked.")
    for error in errors:
        print("ERROR:", error)
    return bool(errors)


if __name__ == "__main__":
    raise SystemExit(main())
