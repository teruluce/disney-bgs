#!/usr/bin/env python3
"""Check generated archive views and the uniqueness of internal accessions."""
from pathlib import Path
import re

from build_archive import CARD, article_strip, load_order, render, render_archive_article
from seo_audit import PageParser

ROOT = Path(__file__).resolve().parents[1]
CARD_MINUTES = re.compile(r'<span class="card-time">\s*([1-9]\d*)\s+min\s*</span>', re.I)
FILE_STRIP = re.compile(r'<div\b[^>]*\sclass="file-strip"[^>]*>(.*?)</div>', re.S)
ARTICLE_MINUTES = re.compile(r'<span>\s*Reading\s*·\s*([1-9]\d*)\s+min\s*</span>', re.I)


def check_article_title(source, article):
    parser = PageParser()
    parser.feed(source)
    title = " ".join("".join(parser.h1_text).split())
    if parser.h1_count != 1 or title != article["tocTitle"]:
        raise ValueError(f'{article["url"]}: expected one H1 reading {article["tocTitle"]!r}, found {title!r}')


def check_reading_minutes(card, source, url):
    card_minutes = CARD_MINUTES.findall(card)
    strips = FILE_STRIP.findall(source)
    article_minutes = ARTICLE_MINUTES.findall(strips[0]) if len(strips) == 1 else []
    if len(card_minutes) != 1 or len(article_minutes) != 1:
        raise ValueError(f"{url}: expected one reading estimate on the card and in the article file strip")
    if card_minutes != article_minutes:
        raise ValueError(
            f"{url}: card reading estimate ({card_minutes[0]} min) differs from article ({article_minutes[0]} min)"
        )


def main():
    errors = []
    try:
        groups = load_order(ROOT / "archive-order.json")
        index = (ROOT / "index.html").read_text(encoding="utf-8")
        if render(index, groups) != index:
            errors.append("index.html: stale archive HTML; run python scripts/build_archive.py")
        cards = {match[1]: match[0] for match in CARD.finditer(index)}
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
                check_article_title(source, article)
                check_reading_minutes(cards[url], source, url)
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
    print(f"Archive check: {len(files)} articles, generated archive views, reading estimates, navigation and internal accessions checked.")
    for error in errors:
        print("ERROR:", error)
    return bool(errors)


if __name__ == "__main__":
    raise SystemExit(main())
