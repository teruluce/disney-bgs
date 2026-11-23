"""Guard the single-source static archive against drift and duplicate records."""
import copy
import json
from pathlib import Path
import re
import tempfile
import unittest

from build_archive import ROOT, CARD, load_order, render, render_archive_article, render_article
from check_archive import check_article_title


class StaticArchiveTests(unittest.TestCase):
    def setUp(self):
        self.source = (ROOT / 'index.html').read_text()
        self.groups = load_order(ROOT / 'archive-order.json')

    def test_generated_html_is_stable(self):
        self.assertEqual(render(self.source, self.groups), self.source)

    def test_title_change_updates_card_contents_and_neighbor_but_preserves_seo(self):
        groups = copy.deepcopy(self.groups)
        first = groups[0]['articles'][0]
        first['tocTitle'] = 'Dream & Magic'
        result = render(self.source, groups)
        self.assertIn('<h3 class="card-title">Dream &amp; Magic</h3>', CARD.search(result)[0])
        self.assertIn('L01</span> <span>Dream &amp; Magic</span>', result)
        self.assertEqual(result.split('</head>')[0], self.source.split('</head>')[0])
        neighbor = (ROOT / groups[0]['articles'][1]['url']).read_text()
        self.assertIn('L01 · Dream &amp; Magic</span>', render_archive_article(neighbor, groups[0], 1))
        self.assertEqual(render(result, groups), result)

    def test_h1_text_allows_authored_layout_and_rejects_title_drift(self):
        article = {'url': 'story.html', 'tocTitle': 'Dream & Magic'}
        h1 = '<h1 class="page-title"><em>Dream</em><br>&amp; Magic</h1>'
        check_article_title(h1, article)
        for source in ['', h1 + h1, h1.replace('Dream', 'dream')]:
            with self.subTest(source=source), self.assertRaisesRegex(ValueError, 'story.html'):
                check_article_title(source, article)

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

    def test_park_file_number_follows_card_and_keeps_accession(self):
        original = '<span class="file-no">File No. 023</span>'
        park = render_article(original, 'hotel.html', 'S03')
        self.assertIn('data-accession="023">FILE NO. S03', park)
        hud = '<div class="hud-id" data-file-label>FILE NO. S03</div>'
        self.assertIn(hud.replace('S03', 'L05'), render_article(park + hud, 'hotel.html', 'L05'))
        moved = render_article(park, 'hotel.html', 'L05')
        self.assertIn('data-accession="023">FILE NO. L05', moved)
        worldwide = render_article(moved, 'hotel.html', 'W02')
        self.assertIn('data-accession="023">FILE NO. W02', worldwide)
        self.assertEqual(render_article(worldwide, 'hotel.html', 'W02'), worldwide)

    def test_pagination_follows_group_order_after_reordering(self):
        group = copy.deepcopy(self.groups[1])
        source = (ROOT / 'bgs-miracosta.html').read_text()
        initial = render_archive_article(source, group, 2)
        self.assertIn('class="pagination-next" href="bgs-soarin.html"', initial)
        self.assertIn('S04 · Soaring: Fantastic Flight', initial)
        group['articles'].insert(0, group['articles'].pop(2))
        moved = render_archive_article(initial, group, 0)
        self.assertIn('data-accession="023">FILE NO. S01', moved)
        self.assertIn('class="pagination-prev is-empty"', moved)
        self.assertIn('class="pagination-next" href="bgs-origins.html"', moved)
        self.assertIn('S02 · TDS History', moved)
        self.assertEqual(render_archive_article(moved, group, 0), moved)

    def test_single_article_group_has_only_an_archive_link(self):
        source = (ROOT / 'bgs-genesis.html').read_text()
        result = render_archive_article(source, self.groups[2], 0)
        self.assertIn('data-accession="021">FILE NO. W01', result)
        self.assertIn('class="pagination-prev is-empty"', result)
        self.assertIn('class="pagination-next is-empty"', result)
        self.assertIn('class="pagination-home" href="./#toc"', result)

    def test_group_move_updates_card_classification_too(self):
        groups = copy.deepcopy(self.groups)
        moved = groups[0]['articles'].pop()
        groups[2]['articles'].append(moved)
        result = render(self.source, groups)
        card = next(m[0] for m in CARD.finditer(result) if m[1] == moved['url'])
        self.assertIn('data-cat="history"', card)
        self.assertIn('card-cat">W02 · Story · Worldwide</span>', card)
        self.assertIn(f'href="#{moved["id"]}"><span class="toc-record-no">W02</span>', result)
        self.assertEqual(render(result, groups), result)

    def test_worldwide_cover_follows_display_number(self):
        groups = copy.deepcopy(self.groups)
        groups[2]['articles'].insert(0, groups[0]['articles'].pop())
        self.assertIn('class="stories-number">File No. W02 · Chronicle', render(self.source, groups))

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
