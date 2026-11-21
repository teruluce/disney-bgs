"""Guard the single-source static archive against drift and duplicate records."""
import copy
import json
from pathlib import Path
import re
import tempfile
import unittest

from build_archive import ROOT, CARD, load_order, render


class StaticArchiveTests(unittest.TestCase):
    def setUp(self):
        self.source = (ROOT / 'index.html').read_text()
        self.groups = load_order(ROOT / 'archive-order.json')

    def test_generated_html_is_stable(self):
        self.assertEqual(render(self.source, self.groups), self.source)

    def test_one_order_change_updates_all_three_views(self):
        groups = copy.deepcopy(self.groups)
        groups[0]['articles'][0:2] = reversed(groups[0]['articles'][0:2])
        result = render(self.source, groups)
        first = groups[0]['articles'][0]
        self.assertEqual(CARD.search(result)[1], first['url'])
        self.assertIn(f'href="#{first["id"]}"><span class="toc-record-no">L01</span>', result)
        self.assertRegex(CARD.search(result)[0], r'card-cat">L01 ·')
        self.assertIn(f'"position": 1, "url": "https://teruluce.github.io/disney-bgs/{first["url"]}"', result)
        self.assertEqual(render(result, groups), result)

    def test_missing_duplicate_or_reordered_contents_detected(self):
        links = re.findall(r'        <a href="#[^"]+"><span class="toc-record-no">.*?</a>', self.source)
        for replacement in ['', links[0] + links[0], links[1]]:
            changed = self.source.replace(links[0], replacement, 1)
            self.assertNotEqual(render(changed, self.groups), changed)

    def test_number_gap_and_wrong_park_detected(self):
        for before, after in [('card-cat">L01', 'card-cat">L99'),
                              ('toc-record-no">S03', 'toc-record-no">S04'),
                              ('data-cat="tdl"', 'data-cat="tds"'),
                              ('"position": 1,', '"position": 99,')]:
            changed = self.source.replace(before, after, 1)
            self.assertNotEqual(render(changed, self.groups), changed)

    def test_card_and_schema_duplicates_rejected(self):
        first = CARD.search(self.source)
        with self.assertRaises(ValueError):
            render(self.source.replace(first[0], first[0] + first[0], 1), self.groups)
        schema = re.search(r'"itemListElement": \[\n(.*?)\n\s*\]', self.source, re.S)
        entries = json.loads('[' + schema[1] + ']')
        entries[1] = entries[0]
        changed = self.source[:schema.start(1)] + ','.join(json.dumps(e) for e in entries) + self.source[schema.end(1):]
        with self.assertRaises(ValueError):
            render(changed, self.groups)

    def test_missing_card_and_duplicate_toc_not_silently_accepted(self):
        first = CARD.search(self.source)
        with self.assertRaises(ValueError):
            render(self.source.replace(first[0], '', 1), self.groups)
        changed = self.source.replace('href="#miracosta-card"', 'href="#soarin-card"', 1)
        self.assertNotEqual(render(changed, self.groups), changed)

    def test_display_number_cannot_become_url_or_id(self):
        for field, value in [('id', 's03-card'), ('url', 's03.html')]:
            groups = copy.deepcopy(self.groups)
            groups[1]['articles'][2][field] = value
            with tempfile.TemporaryDirectory() as directory:
                path = Path(directory) / 'archive-order.json'
                path.write_text(json.dumps({'groups': groups}))
                with self.assertRaisesRegex(ValueError, 'Display numbers'):
                    load_order(path)

    def test_manifest_duplicate_url_or_id_rejected(self):
        for field in ['id', 'url']:
            groups = copy.deepcopy(self.groups)
            groups[0]['articles'][1][field] = groups[0]['articles'][0][field]
            with tempfile.TemporaryDirectory() as directory:
                path = Path(directory) / 'archive-order.json'
                path.write_text(json.dumps({'groups': groups}))
                with self.assertRaisesRegex(ValueError, 'duplicate'):
                    load_order(path)


if __name__ == '__main__':
    unittest.main()
