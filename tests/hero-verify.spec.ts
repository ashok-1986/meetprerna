import { test, expect } from '@playwright/test'
import PNG from 'pngjs'
import { relativeLuminance, contrastRatio } from './contrast-utils'

const TEXT_COLOR = '#FDFFE9'

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

function samplePixelAt(screenshotBuffer: Buffer, x: number, y: number): Promise<{ r: number; g: number; b: number }> {
  return new Promise((resolve, reject) => {
    const png = new PNG.PNG()
    png.parse(screenshotBuffer, (err: Error | null, data: any) => {
      if (err) return reject(err)
      const idx = (y * data.width + x) * 4
      resolve({
        r: data.data[idx],
        g: data.data[idx + 1],
        b: data.data[idx + 2],
      })
    })
  })
}

async function measureSamples(page: any, path: string) {
  const h1Bounds = await page.locator('#hero h1').boundingBox()
  if (!h1Bounds) return

  const screenshotBuf = await page.screenshot({ fullPage: true })

  const textRgb = hexToRgb(TEXT_COLOR)
  const textLum = relativeLuminance(textRgb.r, textRgb.g, textRgb.b)

  const samplePoints = [
    { label: 'Top-left (raw image)', xPct: 0.05, yPct: 0.05 },
    { label: 'Center (image + gradient)', xPct: 0.3, yPct: 0.35 },
    { label: 'Bottom (gradient area)', xPct: 0.3, yPct: 0.7 },
  ]

  console.log(`  ${path}:`)
  for (const sp of samplePoints) {
    const sx = Math.round(h1Bounds.x + 40 + sp.xPct * 200)
    const sy = Math.round(h1Bounds.y + 4 + sp.yPct * h1Bounds.height)
    const pix = await samplePixelAt(screenshotBuf, sx, sy)
    const lum = relativeLuminance(pix.r, pix.g, pix.b)
    const cr = contrastRatio(textLum, lum)
    console.log(`    ${sp.label}: rgb(${pix.r},${pix.g},${pix.b})  → ${cr.toFixed(2)}:1`)
  }
}

test('screenshot and contrast — 1440 JS enabled', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/', { waitUntil: 'load' })
  await page.locator('body').waitFor({ state: 'visible' })
  await page.waitForTimeout(1500)

  await page.locator('#hero').screenshot({ path: 'screenshots/hero/hero-1440.png' })
  await measureSamples(page, '1440')

  // Verify headline is visible
  await expect(page.locator('#hero h1')).toBeVisible()
  const lineCount = await page.locator('#hero h1 span').count()
  console.log(`  Headline lines (spans in h1): ${lineCount}`)
  expect(lineCount).toBe(3)
})

test('screenshot and contrast — 360 JS enabled', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 })
  await page.goto('/', { waitUntil: 'load' })
  await page.locator('body').waitFor({ state: 'visible' })
  await page.waitForTimeout(1500)

  await page.locator('#hero').screenshot({ path: 'screenshots/hero/hero-360.png' })
  await measureSamples(page, '360')

  // Verify headline is visible
  await expect(page.locator('#hero h1')).toBeVisible()
})

test('screenshot — 1440 JS disabled', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    javaScriptEnabled: false,
  })
  const page = await context.newPage()
  await page.goto('/', { waitUntil: 'load' })
  await page.waitForTimeout(500)

  await page.locator('#hero').screenshot({ path: 'screenshots/hero/hero-1440-nojs.png' })

  // Verify headline is visible without JS
  await expect(page.locator('#hero h1')).toBeVisible()
  const lineCount = await page.locator('#hero h1 span').count()
  expect(lineCount).toBe(3)
  await context.close()
})

test('screenshot — 360 JS disabled', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 360, height: 740 },
    javaScriptEnabled: false,
  })
  const page = await context.newPage()
  await page.goto('/', { waitUntil: 'load' })
  await page.waitForTimeout(500)

  await page.locator('#hero').screenshot({ path: 'screenshots/hero/hero-360-nojs.png' })

  await expect(page.locator('#hero h1')).toBeVisible()
  await context.close()
})

test('header not clipped at 768', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto('/', { waitUntil: 'load' })
  await page.waitForTimeout(1000)

  // Check the nav pill is NOT shown (should be mobile menu below 1024)
  const menuButton = page.getByRole('button', { name: 'Menu' })
  await expect(menuButton).toBeVisible()
  await expect(menuButton).toBeEnabled()

  await page.screenshot({ path: 'screenshots/header/header-768.png' })
})

test('header not clipped at 1024', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto('/', { waitUntil: 'load' })
  await page.waitForTimeout(1000)

  // Pill nav should be visible (desktop nav, not mobile menu nav)
  const pill = page.locator('nav[aria-label="Main"]').first()
  await expect(pill).toBeVisible()

  await page.screenshot({ path: 'screenshots/header/header-1024.png' })
})

test('header not clipped at 1280 and 1440', async ({ page }) => {
  // 1280
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/', { waitUntil: 'load' })
  await page.waitForTimeout(1000)
  await page.screenshot({ path: 'screenshots/header/header-1280.png' })

  // 1440
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.screenshot({ path: 'screenshots/header/header-1440.png' })
})

test('resolved font-family on H1', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/', { waitUntil: 'load' })
  await page.waitForTimeout(1000)

  const fontFamily = await page.locator('#hero h1').evaluate(el =>
    getComputedStyle(el).fontFamily
  )
  const fontWeight = await page.locator('#hero h1').evaluate(el =>
    getComputedStyle(el).fontWeight
  )

  console.log(`\nH1 resolved font-family: ${fontFamily}`)
  console.log(`H1 resolved font-weight: ${fontWeight}`)

  // Verify Cormorant Garamond is loaded, not Fraunces
  expect(fontFamily.toLowerCase()).toContain('cormorant')
  expect(fontFamily.toLowerCase()).not.toContain('fraunces')
  expect(Number(fontWeight)).toBeGreaterThanOrEqual(500)
})
