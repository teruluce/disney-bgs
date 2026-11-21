#!/usr/bin/env python3
"""Generate static homepage order and article display numbers from archive-order.json; --check detects drift.

Card prose/media remain authored in index.html. Edit park/order only in the JSON,
then run python scripts/build_archive.py and commit the JSON and changed HTML.
"""
import argparse
from html import escape
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = 'https://teruluce.github.io/disney-bgs/'
CARD = re.compile(r'    <a href="([^"]+)" class="card\b[^>]*>.*?</a>', re.S)


def load_order(path):
    groups = json.loads(path.read_text(encoding='utf-8'))['groups']
    if [(g['category'], g['prefix']) for g in groups] != [('tdl', 'L'), ('tds', 'S'), ('history', 'W')]:
        raise ValueError('archive-order.json: expected TDL/L, TDS/S, Worldwide/W groups')
    articles = [a for g in groups for a in g['articles']]
    for field in ('url', 'id'):
        values = [a[field] for a in articles]
        if len(values) != len(set(values)):
            raise ValueError(f'archive-order.json: duplicate {field}')
    for a in articles:
        if not re.fullmatch(r'[a-z0-9-]+\.html', a['url']) or not re.fullmatch(r'[a-z][a-z0-9-]*-card', a['id']):
            raise ValueError('Use stable article URLs and card IDs, without display numbers')
        if any(re.match(r'[LSW]\d{2}(?:-|\.|$)', a[field], re.I) for field in ('url', 'id')):
            raise ValueError('Display numbers must not be used in URLs/card IDs')
        if not a['tocTitle'].strip():
            raise ValueError('Empty quick-contents title')
    return groups


def render(source, groups):
    articles = [a for g in groups for a in g['articles']]
    matches = list(CARD.finditer(source))
    urls = [m[1] for m in matches]
    expected = [a['url'] for a in articles]
    if len(urls) != len(set(urls)) or set(urls) != set(expected):
        raise ValueError('Archive cards must occur once each and match archive-order.json')
    cards = {m[1]: m[0] for m in matches}
    toc, ordered = [], []
    for group in groups:
        cls = 'toc-group toc-group-worldwide' if group['category'] == 'history' else 'toc-group'
        toc.append(f'    <div class="{cls}">\n      <span class="toc-group-label">— {escape(group["label"])}</span>\n      <div class="toc-links">')
        for i, article in enumerate(group['articles'], 1):
            number = f'{group["prefix"]}{i:02d}'
            card = cards[article['url']]
            if re.search(r'\bid="([^"]+)"', card)[1] != article['id']:
                raise ValueError(f'{article["url"]}: card ID differs from stable manifest ID')
            card = re.sub(r'\bdata-cat="[^"]+"', f'data-cat="{group["category"]}"', card, count=1)
            park = {'tdl': 'TDL', 'tds': 'TDS', 'history': 'Worldwide'}[group['category']]
            card, count = re.subn(
                r'(<span class="card-cat">)(?:No\. \d{3}|[LSW]\d+)( · [^<]+ · )(?:TDL|TDS|Worldwide)(</span>)',
                rf'\g<1>{number}\g<2>{park}\g<3>', card)
            if count != 1:
                raise ValueError(f'{article["url"]}: missing/invalid card display number')
            ordered.append(card)
            toc.append(f'        <a href="#{article["id"]}"><span class="toc-record-no">{number}</span> <span>{escape(article["tocTitle"])}</span></a>')
        toc.append('      </div>\n    </div>')
    source = source[:matches[0].start()] + '\n\n'.join(ordered) + source[matches[-1].end():]
    start = source.index('    <div class="toc-group')
    end = source.index('  </nav>', start)
    source = source[:start] + '\n'.join(toc) + '\n' + source[end:]
    schema = re.search(r'("itemListElement": \[\n)(.*?)(\n\s*\])', source, re.S)
    entries = json.loads('[' + schema[2] + ']')
    entry_urls = [e['url'] for e in entries]
    if len(entry_urls) != len(set(entry_urls)) or set(entry_urls) != {BASE_URL + u for u in expected}:
        raise ValueError('ItemList must contain each archive URL exactly once')
    by_url = {e['url']: e for e in entries}
    items = []
    for position, article in enumerate(articles, 1):
        item = dict(by_url[BASE_URL + article['url']], position=position)
        items.append('          ' + json.dumps(item, ensure_ascii=False))
    return source[:schema.start(2)] + ',\n'.join(items) + source[schema.end(2):]


# New articles may start with their permanent three-digit accession in the strip.
FILE_STRIP = re.compile(
    r'<span class="file-no"(?: data-accession="(?P<accession>[0-9]{3})")?>'
    r'File No\. (?P<label>[LSW][0-9]+|[0-9]{3})</span>', re.I)


def article_strip(source, url):
    matches = list(FILE_STRIP.finditer(source))
    if len(matches) != 1:
        raise ValueError(f'{url}: expected exactly one File No. in the article')
    match = matches[0]
    accession = match['accession'] or match['label']
    if not re.fullmatch(r'[0-9]{3}', accession):
        raise ValueError(f'{url}: missing permanent accession')
    return match, accession


def render_article(source, url, number):
    match, accession = article_strip(source, url)
    if number.startswith('W'):
        strip = f'<span class="file-no">File No. {accession}</span>'
    else:
        strip = f'<span class="file-no" data-accession="{accession}">FILE NO. {number}</span>'
    source = source[:match.start()] + strip + source[match.end():]
    label = accession if number.startswith('W') else number
    return re.sub(r'(<div [^>]*\bdata-file-label>)[^<]*(</div>)',
                  rf'\g<1>FILE NO. {label}\g<2>', source)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    page = ROOT / 'index.html'
    source = page.read_text(encoding='utf-8')
    groups = load_order(ROOT / 'archive-order.json')
    outputs = [(page, source, render(source, groups))]
    for group in groups:
        for position, article in enumerate(group['articles'], 1):
            page = ROOT / article['url']
            source = page.read_text(encoding='utf-8')
            number = f'{group["prefix"]}{position:02d}'
            outputs.append((page, source, render_article(source, page.name, number)))

    for page, source, generated in outputs:
        if source != generated:
            if args.check:
                raise SystemExit(f'{page.name}: stale archive HTML; run python scripts/build_archive.py')
            page.write_text(generated, encoding='utf-8')
    print('Static archive order and display numbers verified.' if args.check else 'Static archive HTML generated.')


if __name__ == '__main__':
    main()
