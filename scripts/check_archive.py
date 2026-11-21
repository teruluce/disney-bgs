#!/usr/bin/env python3
"""Check generated homepage order separately from permanent File Nos/pagination."""
from pathlib import Path
import re

from build_archive import article_strip, load_order, render

ROOT = Path(__file__).resolve().parents[1]


def main():
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    cards = re.findall(r'<a href="([^"]+)" class="card\b[^>]*>(.*?)</a>', index, re.S)
    errors = []
    try:
        generated = render(index, load_order(ROOT / "archive-order.json"))
        if generated != index:
            errors.append("index.html: contents/cards/ItemList order or numbers differ from archive-order.json; run scripts/build_archive.py")
    except (ValueError, KeyError, IndexError, TypeError) as error:
        errors.append(str(error))
    files = []
    numbers = []
    for target, markup in cards:
        page = ROOT / target
        if not page.is_file():
            errors.append(f"index.html: missing article {target}")
            continue
        try:
            strip, accession = article_strip(page.read_text(encoding="utf-8"), target)
        except ValueError as error:
            errors.append(str(error))
            continue
        card_number = re.search(r'<span class="card-cat">([LSW][0-9]+) ·', markup)
        if not card_number:
            errors.append(f"{target}: missing card number")
        elif card_number[1].startswith(("L", "S")) and strip["label"] != card_number[1]:
            errors.append(f"{target}: File No. {strip['label']} differs from card {card_number[1]}")
        files.append(target)
        numbers.append(accession)
    if len(files) != len(set(files)):
        errors.append("index.html: duplicate article card")
    if len(numbers) != len(set(numbers)):
        errors.append("index.html: duplicate File No.")

    article_files = {path.name for path in ROOT.glob("*.html")
                     if 'class="file-no"' in path.read_text(encoding="utf-8")}
    for missing in sorted(article_files - set(files)):
        errors.append(f"index.html: missing article card for {missing}")
    # Article pagination follows permanent accession order, independent of home order.
    permanent_order = [filename for _, filename in sorted(zip(numbers, files))]
    for position, filename in enumerate(permanent_order):
        markup = (ROOT / filename).read_text(encoding="utf-8")
        nav = re.search(r'<nav class="article-pagination".*?</nav>', markup, re.S)
        if not nav:
            errors.append(f"{filename}: missing article pagination")
            continue
        for direction, expected in (("prev", permanent_order[position-1] if position else None),
                                    ("next", permanent_order[position+1] if position+1 < len(permanent_order) else None)):
            match = re.search(r'class="pagination-' + direction + r'\b[^>]*href="([^"]+)"', nav.group())
            # Pagination links put href before class in the current markup.
            match = match or re.search(r'<a[^>]*href="([^"]+)"[^>]*class="pagination-' + direction + r'\b', nav.group())
            actual = match.group(1) if match else None
            if actual != expected:
                errors.append(f"{filename}: {direction} link is {actual!r}, expected {expected!r}")
    print(f"Archive check: {len(files)} cards, generated contents/ItemList/display numbers and permanent File Nos checked.")
    for error in errors:
        print("ERROR:", error)
    return bool(errors)


if __name__ == "__main__":
    raise SystemExit(main())
