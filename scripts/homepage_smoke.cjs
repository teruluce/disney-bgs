/* R3 behavior and focus regression checks. Uses the same Playwright setup as browser_smoke.cjs. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.BGS_TEST_URL || 'http://127.0.0.1:8765/';

// Compare rendered pixels, rather than trusting a computed outline that may be clipped.
async function focusPixels(page) {
  const card = page.locator('.card').first();
  await page.mouse.move(0, 0);
  await card.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  assert.equal(await card.evaluate(el => el === document.activeElement && el.matches(':focus-visible')), true);
  const focused = (await card.screenshot({ animations: 'disabled' })).toString('base64');
  await card.evaluate(el => el.blur());
  const blurred = (await card.screenshot({ animations: 'disabled' })).toString('base64');
  return page.evaluate(async ([a, b]) => {
    async function pixels(src) {
      const image = new Image();
      image.src = 'data:image/png;base64,' + src;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.width; canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    }
    const x = await pixels(a), y = await pixels(b);
    let changed = 0;
    for (let i = 0; i < x.length; i += 4) {
      if (Math.max(Math.abs(x[i] - y[i]), Math.abs(x[i + 1] - y[i + 1]), Math.abs(x[i + 2] - y[i + 2])) > 10) changed++;
    }
    return changed;
  }, [focused, blurred]);
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.BGS_CHROMIUM || '/usr/bin/chromium', args: ['--no-sandbox'] });
  const errors = [], measured = new Map();
  try {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    await context.route('https://fonts.**/*', route => route.abort());
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) errors.push(response.url()); });
    const sizes = [[320,844],[390,844],[640,844],[641,844],[767,1024],[768,1024],[1024,1366],[1279,900],[1280,900],[1366,700],[1366,768],[1366,900],[1366,901],[1366,1080],[1440,900],[1920,1080]];
    for (const [width, height] of sizes) {
      await page.setViewportSize({ width, height });
      await page.goto(base);
      await page.evaluate(async () => {
        document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; i.decoding = 'sync'; });
        await document.fonts.ready;
        await Promise.all([...document.images].map(i => i.decode()));
      });
      assert.equal(await page.locator('.card').count(), 22);
      const layout = await page.evaluate(() => {
        const box = s => { const r = document.querySelector(s).getBoundingClientRect(); return { x:r.x, y:r.y, w:r.width, h:r.height, bottom:r.bottom }; };
        const profile = box('.profile-link');
        const links = [...document.querySelectorAll('.home-jumps a')].map(el => {
          const r = el.getBoundingClientRect();
          return { h:r.height, overlap:Math.max(0, Math.min(r.right, profile.x + profile.w) - Math.max(r.left, profile.x)) * Math.max(0, Math.min(r.bottom, profile.bottom) - Math.max(r.top, profile.y)) };
        });
        const date = document.querySelector('.masthead-dateline');
        return { photo:box('.hero-photo-frame'), toc:box('.toc-wrap'), links, overflow:document.documentElement.scrollWidth > innerWidth, dateClipped:date.scrollWidth > date.clientWidth + 1, limit:getComputedStyle(document.querySelector('.card-desc')).webkitLineClamp };
      });
      assert.equal(layout.overflow, false, `horizontal overflow at ${width}×${height}`);
      assert.equal(layout.dateClipped, false, `dateline clipping at ${width}×${height}`);
      assert.ok(layout.links.every(l => l.h >= 44 && l.overlap === 0));
      assert.equal(layout.limit, width >= 768 ? '4' : '3');
      if (width === 390) assert.ok(layout.photo.bottom <= height, 'mobile photograph must fit the first view');
      measured.set(`${width}x${height}`, layout);
      if ([390,768,1366].includes(width) && [844,1024,768].includes(height)) {
        const changed = await focusPixels(page);
        assert.ok(changed >= 200, `card keyboard focus invisible at ${width}: ${changed} changed pixels`);
        console.log(`Focus: ${width}px, ${changed} visible changed pixels`);
        await page.locator('.home-jumps a[href="#archive-query"]').focus();
        await page.keyboard.press('Enter');
        await page.waitForFunction(() => document.activeElement === document.getElementById('archive-query'));
        await page.locator('#archive-query').fill('セドナ');
        assert.equal(await page.locator('.card:visible').count(), 1);
        await page.locator('[data-filter="tds"]').click();
        assert.equal(await page.locator('.card:visible').count(), 0);
        await page.locator('[data-filter="all"]').click();
        await page.locator('#archive-query').fill('');
        assert.equal(await page.locator('.card:visible').count(), 22);
      }
    }
    const a = measured.get('1366x900'), b = measured.get('1366x901');
    for (const key of ['x','y','w','h']) assert.ok(Math.abs(a.photo[key] - b.photo[key]) <= 1, `photo discontinuity in ${key} at 900/901px`);
    assert.ok(Math.abs(a.toc.bottom - b.toc.bottom) <= 1, 'contents discontinuity at 900/901px');
    await page.emulateMedia({ forcedColors:'active' });
    assert.ok(await focusPixels(page) >= 200, 'keyboard focus invisible in forced colors');
    assert.deepEqual(errors, []);
    console.log(`R3 homepage passed: ${sizes.length} layouts, rendered keyboard focus, forced colors, navigation and search.`);
    await context.close();
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
