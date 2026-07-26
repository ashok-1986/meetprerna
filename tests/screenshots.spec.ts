import { test } from '@playwright/test'

test.describe('screenshots', () => {
  test('/ at 360', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 900 })
    await page.goto('/', { waitUntil: 'load' })
    await page.locator('body').waitFor({ state: 'visible' })
    await page.waitForTimeout(1500)
    await page.screenshot({ path: 'screenshots/home-360.png', fullPage: true })
  })

  test('/ at 1440', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/', { waitUntil: 'load' })
    await page.locator('body').waitFor({ state: 'visible' })
    await page.waitForTimeout(1500)
    await page.screenshot({ path: 'screenshots/home-1440.png', fullPage: true })
  })

  test('/portfolio at 360', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 900 })
    await page.goto('/portfolio', { waitUntil: 'load' })
    await page.locator('body').waitFor({ state: 'visible' })
    await page.waitForTimeout(1500)
    await page.screenshot({ path: 'screenshots/portfolio-360.png', fullPage: true })
  })

  test('/portfolio at 1440', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/portfolio', { waitUntil: 'load' })
    await page.locator('body').waitFor({ state: 'visible' })
    await page.waitForTimeout(1500)
    await page.screenshot({ path: 'screenshots/portfolio-1440.png', fullPage: true })
  })

  test('/about at 1440', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/about', { waitUntil: 'load' })
    await page.locator('body').waitFor({ state: 'visible' })
    await page.waitForTimeout(1500)
    await page.screenshot({ path: 'screenshots/about-1440.png', fullPage: true })
  })

  test('/ at 1440 with prefers-reduced-motion', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/', { waitUntil: 'load' })
    await page.locator('body').waitFor({ state: 'visible' })
    await page.waitForTimeout(1500)
    await page.screenshot({ path: 'screenshots/home-1440-reduced-motion.png', fullPage: true })
  })
})
