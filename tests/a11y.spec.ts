import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']

test.describe('a11y', () => {
  for (const route of ['/', '/about', '/consulting', '/sanctuary', '/contact', '/privacy', '/terms', '/portfolio', '/portfolio/brushstroke-butterfly', '/portfolio/knight', '/portfolio/orchid-watercolour']) {
    for (const width of [1440, 360]) {
      test(`no critical or serious violations: ${route} at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(route, { waitUntil: 'load' })
        await page.locator('body').waitFor({ state: 'visible' })
        await page.waitForTimeout(1000)

        const results = await new AxeBuilder({ page })
          .withTags(tags)
          .analyze()

        const violations = results.violations.filter(
          (v) => v.impact === 'critical' || v.impact === 'serious',
        )

        // Ignore iframe violations on /consulting (Fillout owns its own a11y)
        const filtered = violations.filter(v => {
          if (route === '/consulting' && v.nodes?.some(n => n.target?.includes('iframe'))) return false
          return true
        })

        expect(filtered).toEqual([])
      })
    }
  }

  test('no critical or serious violations with mobile menu open', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 900 })
    await page.goto('/', { waitUntil: 'load' })
    await page.locator('body').waitFor({ state: 'visible' })
    await page.waitForTimeout(1000)

    const menuButton = page.getByRole('button', { name: 'Menu' })
    await menuButton.waitFor({ state: 'visible' })
    await menuButton.click()
    await page.waitForTimeout(500)

    const results = await new AxeBuilder({ page })
      .withTags(tags)
      .analyze()

    const violations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    )

    expect(violations).toEqual([])
  })

  test.describe('FAQ accordion keyboard behavior on /sanctuary', () => {
    test('Tab to trigger, Enter opens panel, aria-expanded flips', async ({ page }) => {
      await page.goto('/sanctuary', { waitUntil: 'load' })
      await page.locator('body').waitFor({ state: 'visible' })
      await page.waitForTimeout(1000)

      // Focus first FAQ trigger directly
      const firstTrigger = page.locator('[aria-controls^="faq-panel-"]').first()
      await firstTrigger.focus()
      await expect(firstTrigger).toBeFocused()

      const initialExpanded = await firstTrigger.getAttribute('aria-expanded')
      expect(initialExpanded).toBe('false')

      // Press Enter to open
      await page.keyboard.press('Enter')
      await page.waitForTimeout(800)

      const expandedAfterEnter = await firstTrigger.getAttribute('aria-expanded')
      expect(expandedAfterEnter).toBe('true')

      // Panel should be open (check data-open attribute)
      const panelId = await firstTrigger.getAttribute('aria-controls')
      const panel = page.locator(`#${panelId}`)
      await expect(panel).toHaveAttribute('data-open', 'true')
    })

    test('Space also opens panel', async ({ page }) => {
      await page.goto('/sanctuary', { waitUntil: 'load' })
      await page.locator('body').waitFor({ state: 'visible' })
      await page.waitForTimeout(1000)

      const secondTrigger = page.locator('[aria-controls^="faq-panel-"]').nth(1)
      await secondTrigger.focus()
      await expect(secondTrigger).toBeFocused()

      await page.keyboard.press('Space')
      await page.waitForTimeout(300)

      const expanded = await secondTrigger.getAttribute('aria-expanded')
      expect(expanded).toBe('true')
    })

    test('Escape closes open panel and returns focus to trigger', async ({ page }) => {
      await page.goto('/sanctuary', { waitUntil: 'load' })
      await page.locator('body').waitFor({ state: 'visible' })
      await page.waitForTimeout(1000)

      const firstTrigger = page.locator('[aria-controls^="faq-panel-"]').first()
      await firstTrigger.focus()
      await page.keyboard.press('Enter')
      await page.waitForTimeout(300)

      const expanded = await firstTrigger.getAttribute('aria-expanded')
      expect(expanded).toBe('true')

      // Press Escape to close
      await page.keyboard.press('Escape')
      await page.waitForTimeout(300)

      const collapsed = await firstTrigger.getAttribute('aria-expanded')
      expect(collapsed).toBe('false')

      // Focus should remain on trigger
      await expect(firstTrigger).toBeFocused()
    })

    test('Tab moves focus forward from open panel wrapper', async ({ page }) => {
      await page.goto('/sanctuary', { waitUntil: 'load' })
      await page.locator('body').waitFor({ state: 'visible' })
      await page.waitForTimeout(1000)

      const firstTrigger = page.locator('[aria-controls^="faq-panel-"]').first()
      await firstTrigger.focus()
      await page.keyboard.press('Enter')
      await page.waitForTimeout(300)

      // Tab should move into panel wrapper (which has tabIndex={0})
      await page.keyboard.press('Tab')
      await page.waitForTimeout(100)

      const panelId = await firstTrigger.getAttribute('aria-controls')
      const panelWrapper = page.locator(`#${panelId}`)
      
      // Panel wrapper should be focused (it has tabIndex={0})
      await expect(panelWrapper).toBeFocused()

      // Continue tabbing should move focus forward from panel
      await page.keyboard.press('Tab')
      await page.waitForTimeout(100)

      // Focus should have moved from panel wrapper
      await expect(panelWrapper).not.toBeFocused()
    })
  })
})