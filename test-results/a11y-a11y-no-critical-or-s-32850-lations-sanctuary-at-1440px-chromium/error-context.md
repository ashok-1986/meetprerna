# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> a11y >> no critical or serious violations: /sanctuary at 1440px
- Location: tests\a11y.spec.ts:9:11

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 86

- Array []
+ Array [
+   Object {
+     "description": "Ensure each HTML document contains a non-empty <title> element",
+     "help": "Documents must have <title> element to aid in navigation",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/document-title?application=playwright",
+     "id": "document-title",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "doc-has-title",
+             "impact": "serious",
+             "message": "Document does not have a non-empty <title> element",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Document does not have a non-empty <title> element",
+         "html": "<html><head><meta name=\"color-scheme\" content=\"light dark\"></head><body><pre style=\"word-wrap: break-word; white-space: pre-wrap;\">Internal Server Error</pre></body></html>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "html",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.text-alternatives",
+       "wcag2a",
+       "wcag242",
+       "TTv5",
+       "TT12.a",
+       "EN-301-549",
+       "EN-9.2.4.2",
+       "ACT",
+       "RGAAv4",
+       "RGAA-8.5.1",
+     ],
+   },
+   Object {
+     "description": "Ensure every HTML document has a lang attribute",
+     "help": "<html> element must have a lang attribute",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/html-has-lang?application=playwright",
+     "id": "html-has-lang",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "messageKey": "noLang",
+             },
+             "id": "has-lang",
+             "impact": "serious",
+             "message": "The <html> element does not have a lang attribute",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   The <html> element does not have a lang attribute",
+         "html": "<html><head><meta name=\"color-scheme\" content=\"light dark\"></head><body><pre style=\"word-wrap: break-word; white-space: pre-wrap;\">Internal Server Error</pre></body></html>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "html",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.language",
+       "wcag2a",
+       "wcag311",
+       "TTv5",
+       "TT11.a",
+       "EN-301-549",
+       "EN-9.3.1.1",
+       "ACT",
+       "RGAAv4",
+       "RGAA-8.3.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]: Internal Server Error
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | import AxeBuilder from '@axe-core/playwright'
  3   | 
  4   | const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
  5   | 
  6   | test.describe('a11y', () => {
  7   |   for (const route of ['/', '/about', '/consulting', '/sanctuary', '/contact', '/privacy', '/terms', '/portfolio', '/portfolio/brushstroke-butterfly', '/portfolio/knight', '/portfolio/orchid-watercolour']) {
  8   |     for (const width of [1440, 360]) {
  9   |       test(`no critical or serious violations: ${route} at ${width}px`, async ({ page }) => {
  10  |         await page.setViewportSize({ width, height: 900 })
  11  |         await page.goto(route, { waitUntil: 'load' })
  12  |         await page.locator('body').waitFor({ state: 'visible' })
  13  |         await page.waitForTimeout(1000)
  14  | 
  15  |         const results = await new AxeBuilder({ page })
  16  |           .withTags(tags)
  17  |           .analyze()
  18  | 
  19  |         const violations = results.violations.filter(
  20  |           (v) => v.impact === 'critical' || v.impact === 'serious',
  21  |         )
  22  | 
  23  |         // Ignore iframe violations on /consulting (Fillout owns its own a11y)
  24  |         const filtered = violations.filter(v => {
  25  |           if (route === '/consulting' && v.nodes?.some(n => n.target?.includes('iframe'))) return false
  26  |           return true
  27  |         })
  28  | 
> 29  |         expect(filtered).toEqual([])
      |                          ^ Error: expect(received).toEqual(expected) // deep equality
  30  |       })
  31  |     }
  32  |   }
  33  | 
  34  |   test('no critical or serious violations with mobile menu open', async ({ page }) => {
  35  |     await page.setViewportSize({ width: 360, height: 900 })
  36  |     await page.goto('/', { waitUntil: 'load' })
  37  |     await page.locator('body').waitFor({ state: 'visible' })
  38  |     await page.waitForTimeout(1000)
  39  | 
  40  |     const menuButton = page.getByRole('button', { name: 'Menu' })
  41  |     await menuButton.waitFor({ state: 'visible' })
  42  |     await menuButton.click()
  43  |     await page.waitForTimeout(500)
  44  | 
  45  |     const results = await new AxeBuilder({ page })
  46  |       .withTags(tags)
  47  |       .analyze()
  48  | 
  49  |     const violations = results.violations.filter(
  50  |       (v) => v.impact === 'critical' || v.impact === 'serious',
  51  |     )
  52  | 
  53  |     expect(violations).toEqual([])
  54  |   })
  55  | 
  56  |   test.describe('FAQ accordion keyboard behavior on /sanctuary', () => {
  57  |     test('Tab to trigger, Enter opens panel, aria-expanded flips', async ({ page }) => {
  58  |       await page.goto('/sanctuary', { waitUntil: 'load' })
  59  |       await page.locator('body').waitFor({ state: 'visible' })
  60  |       await page.waitForTimeout(1000)
  61  | 
  62  |       // Focus first FAQ trigger directly
  63  |       const firstTrigger = page.locator('[aria-controls^="faq-panel-"]').first()
  64  |       await firstTrigger.focus()
  65  |       await expect(firstTrigger).toBeFocused()
  66  | 
  67  |       const initialExpanded = await firstTrigger.getAttribute('aria-expanded')
  68  |       expect(initialExpanded).toBe('false')
  69  | 
  70  |       // Press Enter to open
  71  |       await page.keyboard.press('Enter')
  72  |       await page.waitForTimeout(800)
  73  | 
  74  |       const expandedAfterEnter = await firstTrigger.getAttribute('aria-expanded')
  75  |       expect(expandedAfterEnter).toBe('true')
  76  | 
  77  |       // Panel should be open (check data-open attribute)
  78  |       const panelId = await firstTrigger.getAttribute('aria-controls')
  79  |       const panel = page.locator(`#${panelId}`)
  80  |       await expect(panel).toHaveAttribute('data-open', 'true')
  81  |     })
  82  | 
  83  |     test('Space also opens panel', async ({ page }) => {
  84  |       await page.goto('/sanctuary', { waitUntil: 'load' })
  85  |       await page.locator('body').waitFor({ state: 'visible' })
  86  |       await page.waitForTimeout(1000)
  87  | 
  88  |       const secondTrigger = page.locator('[aria-controls^="faq-panel-"]').nth(1)
  89  |       await secondTrigger.focus()
  90  |       await expect(secondTrigger).toBeFocused()
  91  | 
  92  |       await page.keyboard.press('Space')
  93  |       await page.waitForTimeout(300)
  94  | 
  95  |       const expanded = await secondTrigger.getAttribute('aria-expanded')
  96  |       expect(expanded).toBe('true')
  97  |     })
  98  | 
  99  |     test('Escape closes open panel and returns focus to trigger', async ({ page }) => {
  100 |       await page.goto('/sanctuary', { waitUntil: 'load' })
  101 |       await page.locator('body').waitFor({ state: 'visible' })
  102 |       await page.waitForTimeout(1000)
  103 | 
  104 |       const firstTrigger = page.locator('[aria-controls^="faq-panel-"]').first()
  105 |       await firstTrigger.focus()
  106 |       await page.keyboard.press('Enter')
  107 |       await page.waitForTimeout(300)
  108 | 
  109 |       const expanded = await firstTrigger.getAttribute('aria-expanded')
  110 |       expect(expanded).toBe('true')
  111 | 
  112 |       // Press Escape to close
  113 |       await page.keyboard.press('Escape')
  114 |       await page.waitForTimeout(300)
  115 | 
  116 |       const collapsed = await firstTrigger.getAttribute('aria-expanded')
  117 |       expect(collapsed).toBe('false')
  118 | 
  119 |       // Focus should remain on trigger
  120 |       await expect(firstTrigger).toBeFocused()
  121 |     })
  122 | 
  123 |     test('Tab moves focus forward from open panel wrapper', async ({ page }) => {
  124 |       await page.goto('/sanctuary', { waitUntil: 'load' })
  125 |       await page.locator('body').waitFor({ state: 'visible' })
  126 |       await page.waitForTimeout(1000)
  127 | 
  128 |       const firstTrigger = page.locator('[aria-controls^="faq-panel-"]').first()
  129 |       await firstTrigger.focus()
```