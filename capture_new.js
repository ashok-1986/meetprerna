const { chromium, devices } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  
  // c) 1440 and 360 full page
  const context1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page1440 = await context1440.newPage();
  await page1440.goto('http://localhost:3000');
  await page1440.waitForTimeout(2000); // wait for animations
  await page1440.screenshot({ path: 'C:/Users/Alchemetryx/.gemini/antigravity-ide/brain/90b9826a-8557-4bda-b09d-b34a7910a875/home_1440_full.png', fullPage: true });

  const context360 = await browser.newContext(devices['Pixel 5']);
  const page360 = await context360.newPage();
  await page360.goto('http://localhost:3000');
  await page360.waitForTimeout(2000);
  await page360.screenshot({ path: 'C:/Users/Alchemetryx/.gemini/antigravity-ide/brain/90b9826a-8557-4bda-b09d-b34a7910a875/home_360_full.png', fullPage: true });
  await context360.close();

  // d) 1024 full page
  const context1024 = await browser.newContext({ viewport: { width: 1024, height: 900 } });
  const page1024 = await context1024.newPage();
  await page1024.goto('http://localhost:3000');
  await page1024.waitForTimeout(2000);
  await page1024.screenshot({ path: 'C:/Users/Alchemetryx/.gemini/antigravity-ide/brain/90b9826a-8557-4bda-b09d-b34a7910a875/home_1024_full.png', fullPage: true });
  await context1024.close();

  // e) No JS full page
  const contextNoJS = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const pageNoJS = await contextNoJS.newPage();
  await pageNoJS.goto('http://localhost:3000');
  await pageNoJS.waitForTimeout(2000);
  await pageNoJS.screenshot({ path: 'C:/Users/Alchemetryx/.gemini/antigravity-ide/brain/90b9826a-8557-4bda-b09d-b34a7910a875/home_nojs_full.png', fullPage: true });
  await contextNoJS.close();

  // f) Reduced Motion full page
  await page1440.emulateMedia({ reducedMotion: 'reduce' });
  await page1440.reload();
  await page1440.waitForTimeout(2000);
  await page1440.screenshot({ path: 'C:/Users/Alchemetryx/.gemini/antigravity-ide/brain/90b9826a-8557-4bda-b09d-b34a7910a875/home_reduced_motion_full.png', fullPage: true });
  await context1440.close();
  
  await browser.close();
})();
