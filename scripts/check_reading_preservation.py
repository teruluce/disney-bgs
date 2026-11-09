"""Compare a reader-UI change with an explicit git base; no files are written."""
import argparse
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]


class Snapshot(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.text = []
        self.images = []
        self.links = []
        self.ids = []
        self.seo = []
        self.scripts = []
        self.script = None
        self.nav_labels = 0
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = attrs.get('class', '').split()
        if attrs.get('id'):
            self.ids.append(attrs['id'])
        if tag == 'meta' or tag == 'link' and attrs.get('rel') in ('canonical', 'alternate'):
            self.seo.append((tag, attrs))
        if tag == 'img':
            self.images.append(attrs)
        if tag == 'a' and 'skip-link' not in classes:
            self.links.append(attrs.get('href'))
        if tag == 'script':
            self.script = {'attrs': attrs, 'text': ''}
            self.scripts.append(self.script)
        if tag not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}:
            self.stack.append((tag, classes))

    def handle_startendtag(self, tag, attrs):
        # Preserve IDs and attributes on self-closing SVG elements too.
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if tag == 'script':
            self.script = None
        for i in range(len(self.stack)-1, -1, -1):
            if self.stack[i][0] == tag:
                self.stack = self.stack[:i]
                break

    def handle_data(self, text):
        if self.script is not None:
            self.script['text'] += text
        if any(tag in ('script', 'style') or 'skip-link' in classes for tag, classes in self.stack):
            return
        if any('pagination-title' in classes for _, classes in self.stack) and text.strip() == '記事目次へ':
            text = text.replace('記事目次へ', '記事一覧へ')
            self.nav_labels += 1
        text = re.sub(r'\s+', ' ', text).strip()
        if text:
            self.text.append(text)


def run(base):
    files = subprocess.check_output(['git','ls-tree','-r','--name-only',base], cwd=ROOT, text=True).splitlines()
    changed_html, labels = [], 0
    for name in files:
        before = subprocess.check_output(['git','show',f'{base}:{name}'], cwd=ROOT)
        after = (ROOT/name).read_bytes()
        if not name.endswith('.html'):
            # Images, fonts, URLs in sitemap, shared scripts, and the R3 CSS are protected.
            if Path(name).suffix.lower() in ('.jpg','.jpeg','.png','.svg','.woff2','.js','.xml','.txt') or name == 'home.css':
                assert before == after, f'{name}: protected asset changed'
            continue
        if before != after:
            changed_html.append(name)
        a, b = Snapshot(before.decode()), Snapshot(after.decode())
        assert a.text == b.text, f'{name}: article, credit, or other existing text changed'
        assert a.images == b.images, f'{name}: photo references/alt/attributes changed'
        assert a.links == b.links, f'{name}: existing link destinations changed'
        assert a.seo == b.seo, f'{name}: SEO metadata changed'
        assert a.scripts == b.scripts, f'{name}: JSON-LD or existing JavaScript changed'
        assert Counter(a.ids) == Counter(i for i in b.ids if i != 'reading-start'), f'{name}: existing IDs changed'
        if name == 'index.html' or name.startswith(('World ', 'google', 'scripts/')):
            assert before == after, f'{name}: out-of-scope HTML changed'
        labels += b.nav_labels
    assert len(changed_html) == 24, f'Unexpected HTML scope: {changed_html}'
    assert labels == 22, f'Unexpected navigation-label count: {labels}'
    print(f'Preserved text, photos, credits, URLs, SEO, scripts and old IDs in all HTML; {len(changed_html)} reader pages, {labels} navigation labels. R3 and protected assets unchanged.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base', required=True, help='Explicit pre-change commit for this UI-only comparison')
    run(parser.parse_args().base)
