#!/usr/bin/env python3
"""Generate static X share links from editorial copy; --check detects stale links."""
import argparse
from html import escape
from pathlib import Path
import json
import re
from urllib.parse import urlencode

ROOT = Path(__file__).resolve().parents[1]
ANCHOR = re.compile(r'<a\b[^>]*\bclass="[^"]*\bsite-share-link\b[^"]*"[^>]*>')

def share_text(entry):
    caption = entry['caption'].strip()
    tags = entry['hashtags']
    if not caption or len(tags) != len(set(tags)) or not 4 <= len(tags) <= 6:
        raise ValueError('Provide a caption and 4–6 unique, relevant hashtags')
    if any(not re.fullmatch(r'[\w]+', tag) for tag in tags):
        raise ValueError('Hashtags must contain only letters, digits or underscores, without #')
    text = caption + '\n\n' + ' '.join('#' + tag for tag in tags)
    # Conservative for this Japanese/ASCII copy: every non-ASCII character costs two.
    # Reserve one newline and 23 characters for X's shortened URL; no emoji or inline URLs.
    length = sum(1 if ord(char) < 128 else 2 for char in text) + 24
    if length > 280:
        raise ValueError(f'Share copy exceeds the 280-character budget ({length})')
    return text, length

def render(source, entry):
    canonical = re.search(r'<link rel="canonical" href="([^"]+)"', source)
    if not canonical:
        raise ValueError('Missing canonical URL')
    text, length = share_text(entry)
    href = 'https://x.com/intent/tweet?' + urlencode({'text': text, 'url': canonical[1]})
    matches = list(ANCHOR.finditer(source))
    if len(matches) != 1:
        raise ValueError('Expected exactly one share link')
    anchor = matches[0][0]
    anchor = re.sub(r'\sdata-x-share(?=\s|>)', '', anchor)
    updated = re.sub(r'href="[^"]*"', 'href="' + escape(href, quote=True) + '"', anchor)
    return source[:matches[0].start()] + updated + source[matches[0].end():], length

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    config = json.loads((ROOT / 'share-captions.json').read_text())
    pages = {p.name for p in ROOT.glob('*.html') if ANCHOR.search(p.read_text())}
    if pages != set(config):
        raise ValueError(f'Share page/config mismatch: {pages ^ set(config)}')
    stale = []
    for name, entry in config.items():
        path = ROOT / name
        source = path.read_text()
        updated, length = render(source, entry)
        if updated != source:
            stale.append(name)
            if not args.check:
                path.write_text(updated)
        print(f'{name}: {length}/280')
    if args.check and stale:
        print('Stale share links: ' + ', '.join(stale))
        return 1
    print(f'{len(config)} static share links verified.' if args.check else f'{len(stale)} share links updated.')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
