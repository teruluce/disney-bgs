#!/usr/bin/env python3
"""Check generated archive views and the uniqueness of internal accessions."""
from pathlib import Path

from build_archive import article_strip, load_order, render, render_archive_article

ROOT = Path(__file__).resolve().parents[1]


def main():
    errors = []
    try:
        groups = load_order(ROOT / "archive-order.json")
        index = (ROOT / "index.html").read_text(encoding="utf-8")
        if render(index, groups) != index:
            errors.append("index.html: stale archive HTML; run python scripts/build_archive.py")
    except (ValueError, KeyError, IndexError, TypeError) as error:
        print("ERROR:", error)
        return 1

    files = set()
    accessions = {}
    for group in groups:
        for position, article in enumerate(group["articles"]):
            url = article["url"]
            files.add(url)
            page = ROOT / url
            if not page.is_file():
                errors.append(f"index.html: missing article {url}")
                continue
            source = page.read_text(encoding="utf-8")
            try:
                _, accession = article_strip(source, url)
                if accession in accessions:
                    errors.append(f"{url}: duplicate accession {accession} also used by {accessions[accession]}")
                accessions[accession] = url
                if source != render_archive_article(source, group, position):
                    errors.append(f"{url}: stale display number or navigation; run python scripts/build_archive.py")
            except ValueError as error:
                errors.append(str(error))

    article_files = {path.name for path in ROOT.glob("*.html")
                     if 'class="file-no"' in path.read_text(encoding="utf-8")}
    for missing in sorted(article_files - files):
        errors.append(f"index.html: missing article card for {missing}")
    print(f"Archive check: {len(files)} articles, generated archive views, navigation and internal accessions checked.")
    for error in errors:
        print("ERROR:", error)
    return bool(errors)


if __name__ == "__main__":
    raise SystemExit(main())
