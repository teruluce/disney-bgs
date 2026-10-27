"""Regression tests: prove the audit rejects broken site fixtures."""
import contextlib
import io
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import seo_audit as audit

META = ''.join(f'<meta {key}="{name}" content="{audit.BASE_URL}photo.jpg">'
               for key, name in audit.REQUIRED_META if name != 'og:url')
PAGE = ('<title>Archive</title><h1>Archive</h1>'
        '<meta name="description" content="Story">' + META +
        f'<meta property="og:url" content="{audit.BASE_URL}">'
        f'<link rel="canonical" href="{audit.BASE_URL}">'
        '<script type="application/ld+json">{"@type":"Article",'
        '"datePublished":"2026-05-28","dateModified":"2026-10-21"}</script>'
        '<p class="last-edited"><time datetime="2026-10-21">2026年10月21日</time></p>'
        '<a href="#story">Story</a><section id="story">Text</section>'
        '<img src="photo.jpg" srcset="photo.jpg 1x, photo-2x.jpg 2x">')

class AuditTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        (self.root / 'index.html').write_text(PAGE)
        for name in ['photo.jpg', 'photo-2x.jpg']:
            (self.root / name).write_bytes(b'fixture')
        (self.root / 'sitemap.xml').write_text(
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
            f'<url><loc>{audit.BASE_URL}</loc></url></urlset>')
        (self.root / 'robots.txt').write_text('Sitemap: ' + audit.BASE_URL + 'sitemap.xml')

    def run_audit(self):
        output = io.StringIO()
        with patch.object(audit, 'ROOT', self.root), contextlib.redirect_stdout(output):
            code = audit.main()
        return code, output.getvalue()

    def change(self, old, new):
        path = self.root / 'index.html'
        path.write_text(path.read_text().replace(old, new))

    def test_valid_site(self):
        self.assertEqual(self.run_audit()[0], 0)

    def test_missing_image_variant(self):
        (self.root / 'photo-2x.jpg').unlink()
        code, output = self.run_audit()
        self.assertEqual(code, 1)
        self.assertIn('photo-2x.jpg', output)

    def test_encoded_path_and_query(self):
        (self.root / 'photo space.jpg').write_bytes(b'fixture')
        self.change('src="photo.jpg"', 'src="photo%20space.jpg?v=1"')
        self.assertEqual(self.run_audit()[0], 0)

    def test_missing_anchor_and_duplicate_id(self):
        self.change('id="story"', 'id="wrong"><span id="wrong"></span')
        code, output = self.run_audit()
        self.assertEqual(code, 1)
        self.assertIn('missing anchor', output)
        self.assertIn('duplicate id', output)

    def test_broken_jsonld(self):
        self.change('"@type":"Article"', '"@type":Article')
        self.assertEqual(self.run_audit()[0], 1)

    def test_date_mismatch(self):
        self.change('datetime="2026-10-21"', 'datetime="2026-10-09"')
        self.assertIn('dateModified does not match', self.run_audit()[1])

    def test_modified_before_published(self):
        self.change('"dateModified":"2026-10-21"', '"dateModified":"2025-01-01"')
        self.assertIn('precedes datePublished', self.run_audit()[1])

    def test_historical_dates_in_article_are_not_edit_dates(self):
        self.change('Text</section>', 'Text<time datetime="1899-12-31">1899</time></section>')
        self.assertEqual(self.run_audit()[0], 0)

    def test_sitemap_omission(self):
        (self.root / 'sitemap.xml').write_text('<urlset/>')
        self.assertIn('missing editorial page', self.run_audit()[1])

    def test_duplicate_sitemap_url(self):
        path = self.root / 'sitemap.xml'
        path.write_text(path.read_text().replace('</urlset>', f'<url><loc>{audit.BASE_URL}</loc></url></urlset>'))
        self.assertIn('duplicate URL', self.run_audit()[1])

    def test_redirect_is_checked_but_not_required_in_sitemap(self):
        (self.root / 'old.html').write_text('<meta http-equiv="refresh" content="0;url=index.html"><a href="index.html">Move</a>')
        self.assertEqual(self.run_audit()[0], 0)

    def test_other_project_and_external_links_are_not_local_files(self):
        self.change('href="#story"', 'href="https://teruluce.github.io/disney-discovery/"')
        self.assertEqual(self.run_audit()[0], 0)

if __name__ == '__main__':
    unittest.main()
