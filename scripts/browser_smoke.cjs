/* Run against a local static server. Requires Playwright and a Chromium installation. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const shareCopy = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'share-captions.json'), 'utf8'));
const base = process.env.BGS_TEST_URL || 'http://127.0.0.1:8765/';

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.BGS_CHROMIUM || '/usr/bin/chromium',
    args: ['--no-sandbox'],
  });
  const errors = [];
  let pageChecks = 0;
  try {
    for (const width of [390, 768, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      // Deterministic layout checks use installed fallback fonts. Real Google Fonts are a separate check.
      await page.route('https://fonts.**/*', route => route.abort());
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => {
        if (response.url().startsWith(base) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
      });
      const files = fs.readdirSync(path.resolve(__dirname, '..')).filter(file =>
        file.endsWith('.html') && !file.startsWith('World ') && !file.startsWith('google'));
      for (const file of files) {
        await page.goto(base + file);
        await page.evaluate(async () => {
          document.querySelectorAll('.reveal,.fade').forEach(element => element.classList.add('on', 'active'));
          await Promise.all([...document.images].map(image => {
            image.loading = 'eager';
            return image.decode();
          }));
        });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${file} overflow at ${width}`);
        assert.equal(await page.locator('.site-share-link').count(), file === 'sites.html' ? 0 : 1, `${file} share count`);
        if (shareCopy[file]) {
          const share = new URL(await page.locator('.site-share-link').getAttribute('href'));
          const entry = shareCopy[file];
          assert.equal(share.origin + share.pathname, 'https://x.com/intent/tweet');
          assert.equal(share.searchParams.get('text'), entry.caption + '\n\n' + entry.hashtags.map(tag => '#' + tag).join(' '));
          assert.equal(share.searchParams.get('url'), await page.locator('link[rel="canonical"]').getAttribute('href'));
        }
        const navigation = page.locator('.article-pagination');
        if (await navigation.count()) {
          for (const href of await navigation.locator('a').evaluateAll(links => links.map(link => link.getAttribute('href')))) {
            assert.ok(fs.existsSync(path.resolve(__dirname, '..', href.split('#')[0])), `${file} navigation ${href}`);
          }
        }
        pageChecks++;
      }

      await page.goto(base + 'index.html');
      const worldLink = page.locator('.toc-group-worldwide a[href="#genesis-card"]');
      assert.equal(await worldLink.count(), 1, 'worldwide article has its own table-of-contents group');
      await page.locator('[data-filter="history"]').click();
      assert.equal(await page.locator('.card:visible').count(), 1, 'worldwide filter count');
      assert.equal(await page.locator('#genesis-card').isVisible(), true);
      await page.locator('[data-filter="tds"]').click();
      assert.equal(await page.locator('#genesis-card').isVisible(), false, 'worldwide article is not DisneySea');
      await worldLink.click();
      assert.equal(await page.locator('#genesis-card').isVisible(), true, 'toc reveals worldwide article');
      assert.equal(await page.locator('[data-filter="history"]').getAttribute('aria-pressed'), 'true');
      await page.locator('[data-filter="all"]').click();
      await page.locator('#archive-query').fill('タワー・オブ・テラー');
      assert.equal(await page.locator('.card:visible').count(), 1, 'Japanese article search');
      assert.equal(await page.locator('#tot-card').isVisible(), true);
      await page.locator('[data-filter="tdl"]').click();
      assert.equal(await page.locator('.card:visible').count(), 0, 'search combines with park filter');
      assert.equal(await page.locator('#archive-search-empty').isVisible(), true);
      await page.locator('#archive-query').fill('');
      assert.equal(await page.locator('#archive-search-empty').isVisible(), false);
      assert.equal(await page.locator('.card:visible').count(), 10);
      await page.locator('[data-filter="all"]').click();
      await page.locator('#archive-query').fill('SEA');
      assert.equal(await page.locator('#sea-card').isVisible(), true, 'punctuation-insensitive English search');
      await page.locator('#toc a[href="#sm-card"]').click();
      assert.equal(await page.locator('#archive-query').inputValue(), '', 'table of contents clears a conflicting search');
      assert.equal(await page.locator('#sm-card').isVisible(), true);
      await page.locator('[data-filter="tdl"]').click();
      assert.equal(await page.locator('#tot-card').isVisible(), false);
      await page.locator('#toc a[href="#tot-card"]').click();
      await page.waitForFunction(() => location.hash === '#tot-card');
      assert.equal(await page.locator('#tot-card').isVisible(), true);
      assert.equal(await page.locator('[data-filter="tds"]').getAttribute('aria-pressed'), 'true');
      assert.equal(await page.locator('[data-filter="tdl"]').getAttribute('aria-pressed'), 'false');
      // A different hash changes before browser back restores the hidden category's target.
      await page.locator('[data-filter="tdl"]').click();
      await page.evaluate(() => { location.hash = 'toc'; });
      await page.goBack();
      await page.waitForFunction(() => document.querySelector('#tot-card').style.display !== 'none');
      await page.locator('[data-filter="all"]').click();
      assert.equal(await page.locator('.card:visible').count(), 22);

      for (const [source, target] of [['bgs-origins.html', 'bgs-spatial-epic.html'], ['bgs-tdlhistory.html', 'bgs-worldbazaar.html'], ['bgs-portdiscovery.html', 'bgs-tl.html']]) {
        await page.goto(base + source);
        assert.equal(await page.locator('.related-records a').getAttribute('href'), target);
      }

      for (const file of ['index.html', 'bgs-electricalparade.html', 'bgs-sea.html', 'bgs-tdlhistory.html', 'bgs-smallworld.html']) {
        await page.goto(base + file);
        await page.evaluate(() => document.querySelectorAll('.reveal').forEach(element => element.classList.add('on', 'active')));
        const trigger = page.locator(file === 'index.html' ? '#notice-trigger' : '.creator-card').first();
        await trigger.scrollIntoViewIfNeeded();
        await trigger.focus();
        await page.keyboard.press('Enter');
        const dialog = page.locator('[role="dialog"]');
        await dialog.waitFor({ state: 'visible' });
        assert.equal(await dialog.getAttribute('aria-hidden'), 'false');
        await page.waitForFunction(() => !!document.activeElement.closest('[role="dialog"]'));
        assert.equal(await page.evaluate(() => !!document.activeElement.closest('[role="dialog"]')), true, `${file}: initial focus`);
        for (const key of ['Tab', 'Shift+Tab', 'Tab']) {
          await page.keyboard.press(key);
          assert.equal(await page.evaluate(() => !!document.activeElement.closest('[role="dialog"]')), true, `${file}: ${key}`);
        }
        await page.keyboard.press('Escape');
        assert.equal(await trigger.evaluate(element => document.activeElement === element), true, `${file}: restore focus`);
        assert.equal(await dialog.getAttribute('aria-hidden'), 'true');
        assert.equal(await page.evaluate(() => document.body.style.overflow), '');
        await trigger.press('Space');
        await dialog.waitFor({ state: 'visible' });
        await dialog.locator('button').first().click();
        assert.equal(await trigger.evaluate(element => document.activeElement === element), true);
        // No background nodes should remain inert after closing.
        assert.equal(await page.locator('body > [inert]:not([role="dialog"])').count(), 0);
      }
      await page.goto(base + 'bgs-smallworld.html');
      assert.equal(await page.locator('.toc a').first().getAttribute('aria-labelledby'), 'toc-label-philosophy');
      assert.equal(await page.locator('.sun-wrapper').first().evaluate(element => getComputedStyle(element).animationName), 'none');
      assert.equal(await page.locator('.reveal').first().evaluate(element => getComputedStyle(element).opacity), '1');
      await page.close();
    }
    // Also exercise the animated state and cancel pending focus work on an immediate close.
    const animated = await browser.newPage({ viewport: { width: 390, height: 900 } });
    await animated.route('https://fonts.**/*', route => route.abort());
    animated.on('pageerror', error => errors.push(error.message));
    for (const file of ['index.html', 'bgs-electricalparade.html', 'bgs-sea.html', 'bgs-tdlhistory.html', 'bgs-smallworld.html']) {
      await animated.goto(base + file);
      const selector = file === 'index.html' ? '#notice-trigger' : '.creator-card';
      await animated.locator(selector).first().evaluate(element => element.click());
      await animated.waitForFunction(() => !!document.activeElement.closest('[role="dialog"]'));
      await animated.keyboard.press('Escape');
      await animated.locator(selector).first().evaluate(element => {
        element.click();
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      });
      await animated.waitForTimeout(350);
      assert.equal(await animated.locator('[role="dialog"]').getAttribute('aria-hidden'), 'true');
      assert.equal(await animated.locator(selector).first().evaluate(element => document.activeElement === element), true);
    }
    await animated.close();
    const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
    const page = await nojs.newPage();
    await page.route('https://fonts.**/*', route => route.abort());
    for (const file of ['index.html', 'bgs-smallworld.html', 'bgs-tl.html', 'bgs-bb.html']) {
      await page.goto(base + file);
      assert.equal(await page.locator('.reveal,.fade').first().evaluate(element => getComputedStyle(element).opacity), '1', `${file}: no-JS fallback`);
      if (file === 'index.html') {
        assert.equal(await page.locator('#archive-query').isVisible(), false, 'no-JS search is hidden');
        assert.equal(await page.locator('.card:visible').count(), 22, 'no-JS archive remains readable');
      }
    }
    await nojs.close();
    assert.deepEqual(errors, []);
    console.log(`PASS: ${pageChecks} page/viewport checks; filters, history, 5 dialogs, reduced motion and no-JS fallbacks.`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

