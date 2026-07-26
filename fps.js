const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 412, height: 915 },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 6a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
    isMobile: true,
    hasTouch: true
  });
  
  const page = await context.newPage();
  
  // Emulate Pixel 6a CPU (approx 4x slowdown compared to a fast desktop CPU)
  const client = await page.context().newCDPSession(page);
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  
  await page.goto('http://localhost:3000');
  
  const minFps = await page.evaluate(async () => {
    return new Promise(resolve => {
      let frames = 0;
      let start = performance.now();
      let lastTime = start;
      let minFps = 1000;
      
      function tick(now) {
        frames++;
        const delta = now - lastTime;
        // Don't count the very first few frames as they might be slow due to startup
        if (frames > 10 && delta > 0) {
           const currentFps = 1000 / delta;
           if (currentFps < minFps) minFps = currentFps;
        }
        lastTime = now;
        
        // Scroll to stress
        window.scrollBy(0, 50);
        
        if (now - start < 5000) {
          requestAnimationFrame(tick);
        } else {
          resolve(minFps);
        }
      }
      requestAnimationFrame(tick);
    });
  });
  
  console.log(`Measured Min FPS: ${minFps.toFixed(2)}`);
  
  await browser.close();
})();
