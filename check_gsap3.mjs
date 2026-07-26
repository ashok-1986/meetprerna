import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  
  const lineRect = await page.evaluate(() => {
    const el = document.querySelector('svg[viewBox="0 0 100 5000"]');
    if (!el) return null;
    const parent = el.parentElement;
    const rect = el.getBoundingClientRect();
    const prect = parent.getBoundingClientRect();
    return { 
      svgHeight: rect.height, 
      parentHeight: prect.height,
      parentTag: parent.tagName,
      parentPosition: window.getComputedStyle(parent).position
    };
  });
  
  const stData = await page.evaluate(() => {
    if (!window.ScrollTrigger) return null;
    const triggers = window.ScrollTrigger.getAll();
    return triggers.map(t => ({ start: t.start, end: t.end, triggerType: t.trigger.tagName }));
  });
  
  console.log('LINE_RECT:', JSON.stringify(lineRect));
  console.log('SCROLL_TRIGGER:', JSON.stringify(stData));

  // Verify the animation
  fs.mkdirSync('diagnostics', { recursive: true });
  for (let i = 0; i <= 4; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 1000);
    await page.waitForTimeout(500); // let scrolltrigger scrub
    
    const dashoffset = await page.evaluate(() => {
      const el = document.querySelector('svg[viewBox="0 0 100 5000"] path');
      if (!el) return null;
      return window.getComputedStyle(el).strokeDashoffset;
    });
    console.log(`SCROLL ${i * 1000}px -> stroke-dashoffset: ${dashoffset}`);
    await page.screenshot({ path: `diagnostics/sessionline-scroll-${i}.png`, fullPage: false });
  }

  await browser.close();
})();
