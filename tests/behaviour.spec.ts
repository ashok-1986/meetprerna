import { test, expect } from '@playwright/test'

test('sends nothing to /api/analytics when navigator.doNotTrack is 1', async ({ page }) => {
  let analyticsCalls = 0
  await page.route('**/api/analytics', () => {
    analyticsCalls++
  })

  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, 'doNotTrack', {
      get: () => '1',
      configurable: true,
    })
  })

  await page.goto('/', { waitUntil: 'load' })
  await page.locator('body').waitFor({ state: 'visible' })
  await page.waitForTimeout(500)

  const cta = page.getByRole('link', { name: 'Start a conversation' })
  await cta.click()
  await page.waitForTimeout(500)

  expect(analyticsCalls).toBe(0)
})
