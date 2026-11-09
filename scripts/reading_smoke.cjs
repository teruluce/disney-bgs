/* Reader-page regression checks. Development dependencies: Playwright and axe-core. */
const pw = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const base = process.env.BGS_TEST_URL || 'http://127.0.0.1:8765/';
const engine = process.env.BGS_BROWSER || 'chromium';
const screenshots = process.env.BGS_SCREENSHOTS;
const results = [];

async function changedPixels(page, before, after, rect) {
  return page.evaluate(async ({before, after, rect}) => {
    async function pixels(src) {
      const img = new Image(); img.src = 'data:image/png;base64,' + src; await img.decode();
      const canvas = document.createElement('canvas'); canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0);
      const x = Math.max(0, Math.floor(rect.x) - 8), y = Math.max(0, Math.floor(rect.y) - 8);
      return ctx.getImageData(x, y, Math.min(img.width - x, Math.ceil(rect.w) + 16), Math.min(img.height - y, Math.ceil(rect.h) + 16)).data;
    }
    const a = await pixels(before), b = await pixels(after); let changed = 0;
    for (let i=0; i<a.length; i+=4) if (Math.max(Math.abs(a[i]-b[i]),Math.abs(a[i+1]-b[i+1]),Math.abs(a[i+2]-b[i+2])) > 10) changed++;
    return changed;
  }, {before, after, rect});
}

(async () => {
  const options = { headless:true };
  if (process.env.HTTPS_PROXY) options.proxy = {server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'};
  if (engine === 'chromium') Object.assign(options, {executablePath:process.env.BGS_CHROMIUM || '/usr/bin/chromium',args:['--no-sandbox']});
  let browser, context;
  if (engine === 'firefox' && process.env.BGS_FIREFOX_PROFILE) {
    context = await pw.firefox.launchPersistentContext(process.env.BGS_FIREFOX_PROFILE, {...options,reducedMotion:'reduce'});
    browser = context.browser();
  } else {
    browser = await pw[engine].launch(options);
    context = await browser.newContext({reducedMotion:'reduce'});
  }
  try {
    if (process.env.BGS_TEST_FONTS !== 'normal') await context.route('https://fonts.**/*', route => route.abort());
    const page = await context.newPage(), errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.url().startsWith(base) && r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    const files = fs.readdirSync(root).filter(f => f.endsWith('.html') && !['index.html'].includes(f) && !f.startsWith('World ') && !f.startsWith('google'));
    if (screenshots) fs.mkdirSync(screenshots,{recursive:true});
    for (const [width,height] of [[320,844],[390,844],[640,900],[641,900],[767,1024],[768,1024],[1366,900]]) {
      await page.setViewportSize({width,height});
      for (const file of files) {
        await page.goto(base + file);
        await page.evaluate(async () => {
          document.querySelectorAll('img').forEach(i => {i.loading='eager';i.decoding='sync'});
          await document.fonts.ready;
          await Promise.all([...document.images].map(i => i.decode()));
        });
        assert.equal(await page.locator('main').count(),1,`${file}: one main landmark`);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),false,`${file}: overflow at ${width}`);
        assert.equal(await page.locator('.reading-start').count(),1);
        assert.ok(await page.locator('.last-edited').count() === 0 || await page.locator('.last-edited').evaluate(e => parseFloat(getComputedStyle(e).fontSize) >= 11),`${file}: metadata font at ${width}`);
        if (file === 'bgs-smallworld.html') assert.equal(await page.locator('.section p').first().evaluate(e => parseFloat(getComputedStyle(e).fontSize)),width <= 640 ? 16 : 17);
        // A pointer click changes the browser's sequential focus starting point.
        await page.keyboard.press('Tab');
        assert.equal(await page.locator('.skip-link').evaluate(e => document.activeElement === e),true,`${file}: first Tab`);
        assert.ok(await page.locator('.skip-link').evaluate(e => {let r=e.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight&&r.height>=44}));
        await page.keyboard.press('Enter');
        await page.waitForFunction(() => document.activeElement.id === 'reading-start');
        assert.ok(await page.locator('.reading-start').evaluate(e => {let r=e.getBoundingClientRect();return r.top>=-1&&r.bottom<=innerHeight+1}),`${file}: skip landing`);
        const record={file,width,height,engine};
        if (engine === 'chromium' && width === 390) {
          for (const summary of await page.locator('details > summary').all()) {
            const before = await summary.evaluate(e => e.parentElement.open);
            await summary.focus(); await page.keyboard.press('Enter');
            assert.notEqual(await summary.evaluate(e => e.parentElement.open),before);
            if (before) await summary.press('Enter');
          }
          await page.evaluate(() => document.querySelectorAll('.reveal,.fade').forEach(e => e.classList.add('on','active')));
          await page.addScriptTag({path:process.env.BGS_AXE_PATH || require.resolve('axe-core/axe.min.js')});
          const audit=await page.evaluate(async () => {
            const r=await axe.run(document,{runOnly:{type:'rule',values:['color-contrast','heading-order','landmark-one-main','scrollable-region-focusable']}});
            return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:r.incomplete.map(v=>({id:v.id,count:v.nodes.length}))};
          });
          record.axe=audit;
          assert.deepEqual(audit.violations,[],`${file}: targeted accessibility rules`);
        }
        if (file === 'bgs-sindbad.html' && [320,390].includes(width)) {
          await page.locator('.toc-link').last().focus();
          const region=page.locator('.compare-table-wrap'); let reached=false;
          for (let i=0;i<40;i++) {await page.keyboard.press('Tab');if(await region.evaluate(e=>e===document.activeElement)){reached=true;break}}
          assert.ok(reached,`${engine}: table Tab reachability`);
          assert.ok(await region.getAttribute('aria-label'));
          await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(200);
          const right=await region.evaluate(e=>e.scrollLeft);assert.ok(right>0,`${engine}: keyboard scroll right`);
          await page.keyboard.press('ArrowLeft');await page.keyboard.press('ArrowLeft');await page.waitForTimeout(200);
          assert.ok(await region.evaluate(e=>e.scrollLeft)<right);
          record.tableKeyboard=true;
          const rect=await region.evaluate(e=>{let r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}});
          const focused=(await page.screenshot()).toString('base64');await region.evaluate(e=>e.blur());const blurred=(await page.screenshot()).toString('base64');
          record.focusPixels=await changedPixels(page,focused,blurred,rect);assert.ok(record.focusPixels>100,`${engine}: table focus visible`);
        }
        if (screenshots && [390,768,1366].includes(width)) {
          await page.evaluate(()=>document.activeElement.blur());
          await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(150);
          const prefix=path.join(screenshots,`${engine}-${file.replace('.html','')}-${width}x${height}`);
          await page.screenshot({path:prefix+'-first.png'});
          await page.locator('.reading-start').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));await page.waitForTimeout(180);
          await page.screenshot({path:prefix+'-body.png'});
        }
        results.push(record);
      }
      console.log(`${engine}: ${files.length} reader pages passed at ${width}px`);
    }
    const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const plain=await nojs.newPage();await plain.route('https://fonts.**/*',r=>r.abort());
    for(const file of files){await plain.goto(base+file);assert.equal(await plain.locator('.reading-start').count(),1);await plain.keyboard.press('Tab');await plain.keyboard.press('Enter');assert.equal(await plain.evaluate(()=>document.activeElement.id),'reading-start',`${file}: native no-JS skip link`)}
    await nojs.close();assert.deepEqual(errors,[]);
    if(process.env.BGS_RESULTS) fs.writeFileSync(process.env.BGS_RESULTS,JSON.stringify({engine,version:browser.version(),pages:files.length,cases:results.length,results,errors,noJS:true},null,2));
    console.log(`PASS ${engine}: ${results.length} reader layouts, native skip links, table keyboard/focus, no-JS, images and targeted accessibility checks.`);
  } finally { await context.close(); await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1});
