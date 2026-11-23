/* R3 behavior and focus regression checks. Uses the same Playwright setup as browser_smoke.cjs. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.BGS_TEST_URL || 'http://127.0.0.1:8765/';
const fs = require('node:fs');
const path = require('node:path');
const archiveGroups = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'archive-order.json'), 'utf8')).groups;
const expectedArchive = archiveGroups.flatMap(group => group.articles.map((article, i) => ({
  ...article, category: group.category, number: group.prefix + String(i + 1).padStart(2, '0'),
})));
async function checkArchiveOrder(page) {
  const actual = await page.evaluate(() => ({
    toc: [...document.querySelectorAll('#toc .toc-links a')].map(a => ({id:a.hash.slice(1), number:a.querySelector('.toc-record-no')?.textContent, tocTitle:a.lastElementChild.textContent})),
    cards: [...document.querySelectorAll('.article-grid > .card')].map(a => ({id:a.id, url:a.getAttribute('href'), category:a.dataset.cat, number:a.querySelector('.card-cat').textContent.split(' · ')[0]})),
    items: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)['@graph'].find(x=>x['@type']==='ItemList').itemListElement,
  }));
  assert.deepEqual(actual.toc, expectedArchive.map(({id,number,tocTitle})=>({id,number,tocTitle})));
  assert.deepEqual(actual.cards, expectedArchive.map(({id,url,category,number})=>({id,url,category,number})));
  assert.deepEqual(actual.items.map(x=>({url:x.url,position:x.position})), expectedArchive.map((x,i)=>({url:'https://teruluce.github.io/disney-bgs/'+x.url,position:i+1})));
  const unreadable = await page.locator('#toc .toc-links a').evaluateAll(links => links.filter(a => {
    const box = a.getBoundingClientRect();
    const number = a.querySelector('.toc-record-no').getBoundingClientRect();
    const title = document.createRange();
    title.selectNodeContents(a.lastElementChild);
    const lines = [...title.getClientRects()];
    return box.left < 0 || box.right > innerWidth || a.scrollWidth > a.clientWidth + 1
      || number.width === 0 || number.left < box.left || number.right > box.right
      || lines.length !== 1 || lines[0].left < box.left || lines[0].right > box.right;
  }).map(a => a.textContent));
  assert.deepEqual(unreadable, [], 'contents numbers and titles must fit on one line');
}
async function checkFilteredOrder(page, category) {
  const visible = await page.locator('.card:visible').evaluateAll(cards => cards.map(a => ({id:a.id,number:a.querySelector('.card-cat').textContent.split(' · ')[0]})));
  assert.deepEqual(visible, expectedArchive.filter(x=>category==='all'||x.category===category).map(({id,number})=>({id,number})));
}


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
      await checkArchiveOrder(page);
      assert.equal(await page.locator('.card').count(), expectedArchive.length);
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
        assert.equal(await page.locator('.card:visible').count(), expectedArchive.length);
        for (const category of ['tdl','tds','history','all']) {
          await page.locator(`[data-filter="${category}"]`).click();
          await checkFilteredOrder(page, category);
        }
        for (const query of ['American Waterfront', 'アメリカンウォーターフロント']) {
          await page.locator('#archive-query').fill(query);
          assert.equal(await page.locator('#american-waterfront-card').isVisible(), true, query);
        }
        for (const query of ["Soarin'", 'Soaring: Fantastic Flight']) {
          await page.locator('#archive-query').fill(query);
          assert.equal(await page.locator('#soarin-card').isVisible(), true, query);
        }
        await page.locator('#archive-query').fill('港');
        const selected = await page.locator('.card:visible').evaluateAll(cards=>cards.map(a=>({id:a.id,number:a.querySelector('.card-cat').textContent.split(' · ')[0]})));
        assert.ok(selected.length>1,'search must exercise multiple results');
        assert.deepEqual(selected, expectedArchive.filter(x=>selected.some(y=>y.id===x.id)).map(({id,number})=>({id,number})));
        await page.locator('[data-filter="tds"]').click();
        const seaSelected = await page.locator('.card:visible').evaluateAll(cards=>cards.map(a=>a.id));
        assert.deepEqual(seaSelected, expectedArchive.filter(x=>x.category==='tds'&&selected.some(y=>y.id===x.id)).map(x=>x.id));
        // The S03 quick link must recover a target hidden by category and query.
        await page.locator('[data-filter="tdl"]').click();
        await page.locator('#archive-query').fill('セドナ');
        await page.locator('#toc a[href="#miracosta-card"]').click();
        await page.waitForFunction(()=>location.hash==='#miracosta-card');
        assert.equal(await page.locator('#miracosta-card').isVisible(),true);
        assert.equal(await page.locator('#archive-query').inputValue(),'');
        assert.match(await page.locator('#miracosta-card .card-cat').textContent(),/^S03 ·/);
        const target = await page.locator('#miracosta-card').boundingBox();
        assert.ok(target.y>=-1 && target.y<height,'S03 anchor must land in viewport');
        await checkArchiveOrder(page);

      }
    }
    const a = measured.get('1366x900'), b = measured.get('1366x901');
    for (const key of ['x','y','w','h']) assert.ok(Math.abs(a.photo[key] - b.photo[key]) <= 1, `photo discontinuity in ${key} at 900/901px`);
    assert.ok(Math.abs(a.toc.bottom - b.toc.bottom) <= 1, 'contents discontinuity at 900/901px');
    await page.emulateMedia({ forcedColors:'active' });
    assert.ok(await focusPixels(page) >= 200, 'keyboard focus invisible in forced colors');
    assert.deepEqual(errors, []);
    console.log(`R3 homepage passed: ${sizes.length} layouts, rendered keyboard focus, forced colors, navigation and search.`);
    const nojs = await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
    await nojs.route('https://fonts.**/*',route=>route.abort());
    await nojs.goto(base);
    await checkArchiveOrder(nojs);
    await nojs.locator('#toc a[href="#miracosta-card"]').click();
    assert.equal(new URL(nojs.url()).hash,'#miracosta-card');
    assert.equal(await nojs.locator('.card:visible').count(),expectedArchive.length);
    await nojs.close();
    await context.close();
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
