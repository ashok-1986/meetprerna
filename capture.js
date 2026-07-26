const { chromium, devices } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  
  // 1. / at 360
  const context360 = await browser.newContext(devices['Pixel 5']);
  const page360 = await context360.newPage();
  await page360.goto('http://localhost:3000');
  await page360.screenshot({ path: 'C:/Users/Alchemetryx/.gemini/antigravity-ide/brain/90b9826a-8557-4bda-b09d-b34a7910a875/home_360.png', fullPage: false });
  await context360.close();

  // 2. / at 1440
  const context1440 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page1440 = await context1440.newPage();
  await page1440.goto('http://localhost:3000');
  await page1440.screenshot({ path: 'C:/Users/Alchemetryx/.gemini/antigravity-ide/brain/90b9826a-8557-4bda-b09d-b34a7910a875/home_1440.png', fullPage: false });

  // 3. / at 1440 with prefers-reduced-motion forced on
  await page1440.emulateMedia({ reducedMotion: 'reduce' });
  await page1440.reload();
  await page1440.screenshot({ path: 'C:/Users/Alchemetryx/.gemini/antigravity-ide/brain/90b9826a-8557-4bda-b09d-b34a7910a875/home_1440_reduced_motion.png', fullPage: false });
  await context1440.close();

  // 4. /portfolio at 1440
  const contextPortfolio = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pagePortfolio = await contextPortfolio.newPage();
  await pagePortfolio.goto('http://localhost:3000/portfolio');
  await pagePortfolio.screenshot({ path: 'C:/Users/Alchemetryx/.gemini/antigravity-ide/brain/90b9826a-8557-4bda-b09d-b34a7910a875/portfolio_1440.png', fullPage: false });
  await contextPortfolio.close();

  // 5. / at 1440 with JS disabled
  const contextNoJS = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const pageNoJS = await contextNoJS.newPage();
  await pageNoJS.goto('http://localhost:3000');
  await pageNoJS.screenshot({ path: 'C:/Users/Alchemetryx/.gemini/antigravity-ide/brain/90b9826a-8557-4bda-b09d-b34a7910a875/home_1440_nojs.png', fullPage: false });
  await contextNoJS.close();
  
  await browser.close();
})();
