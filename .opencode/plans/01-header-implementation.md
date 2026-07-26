# Implementation Plan — Site Header (Component 1)

**Persona:** Interface Engineer
**Date:** 2026-07-25
**Depends on:** Phase 1 (Architect) complete — `tokens.css`, `next/font`, Tailwind config, root layout, routing scaffold.

---

## 0. Scope

Build the fixed site header. Nothing else. No other section, no page content, no `/book` page, no Fillout embed.

The Interface Engineer produces **working, unanimated, fully accessible components with real copy**. Motion (the underline draw, scroll hide/show, mobile menu open/close) is plumbed structurally — CSS transition properties set, data attributes ready — but the actual GSAP wiring and timeline logic belong to the Motion Engineer in Phase 3. See §8 for the exact boundary.

---

## 1. Files to create

| # | File | Purpose |
|---|---|---|
| 1 | `src/components/header/Header.tsx` | Server component shell. Fetches Sanity `siteSettings` for the city line. Renders the bar structure. |
| 2 | `src/components/header/Header.client.tsx` | Client component. Handles scroll behaviour, mobile menu toggle, active route detection. |
| 3 | `src/components/header/header.module.css` | All header styles. CSS Modules, not Tailwind. |
| 4 | `src/components/header/NavPill.tsx` | Desktop nav pill — the four items with the active underline SVG. |
| 5 | `src/components/header/MobileMenu.tsx` | Fullscreen type-led menu panel (BLUEPRINT.md §3). Client component. |
| 6 | `src/components/header/mobile-menu.module.css` | Mobile menu styles. |
| 7 | `src/components/header/CityLine.tsx` | The mono "Currently {city} · Next {city}, {date}" line. Server component. |
| 8 | `src/components/header/Logo.tsx` | SVG logo, inline, max-height 28px. |
| 9 | `src/components/header/SkipLink.tsx` | Skip-to-content link, first focusable element. |
| 10 | `src/lib/analytics.ts` | Thin `track()` wrapper. Fires `enquiry_started` with `source: "header"` on CTA click. |

**Total: 10 files, ~450–600 lines estimated.**

---

## 2. Component architecture

```
SkipLink                          — first focusable, visible on :focus
<header>
  div.scrim                       — 96px gradient behind the bar
  <nav aria-label="Main">
    Logo                           — SVG, links to /
    CityLine                       — desktop only, >=1024px
    NavPill                        — glass pill, four items
    CTA                            — "Start a conversation", links to /book
    MenuButton                     — mobile only, <768px
  </nav>
</header>
MobileMenu                        — portal, fullscreen overlay
```

**Server vs Client split:**
- `Header.tsx` — Server. Fetches `siteSettings` from Sanity. Passes `cityLine` prop down.
- `Header.client.tsx` — Client. Wraps the interactive bits: scroll listener, route detection, menu toggle state. Receives `cityLine` as a prop.
- `Logo.tsx`, `CityLine.tsx`, `SkipLink.tsx` — Server (no interactivity).
- `NavPill.tsx`, `MobileMenu.tsx` — Client (need `usePathname`, event handlers).

---

## 3. Detailed spec per file

### 3.1 SkipLink.tsx

- `<a href="#main-content" className={styles.skipLink}>Skip to main content</a>`
- Copy: `Skip to main content` (content.md §3)
- Styled: visually hidden until `:focus`, then positioned above the header.
- `position: fixed; top: 0; z-index: 200;` — above the header's z-index 100.
- `:focus` style: `opacity: 1; transform: translateY(0);`
- Default: `opacity: 0; transform: translateY(-100%);`
- Focus ring: `--color-focus` (inchworm), 2px solid, 2px offset.

### 3.2 Logo.tsx

- Inline SVG, not `<img>`, not PNG.
- `max-height: 28px; width: auto;`
- `<Link href="/" aria-label="MeetPrerna, home">` (content.md §3)
- SVG content: the Prerna mark. For v1, use a text-based SVG placeholder (`<text>` element reading "MeetPrerna" in the display font) until the actual mark asset is provided. Mark with `TODO(prerna): replace with final SVG mark`.
- `fill: var(--color-ivory)` for contrast on dark canvas.

### 3.3 CityLine.tsx

- Server component. Receives `{ cityLine: string }` prop from `Header.tsx`.
- Renders: `<span className={styles.cityLine}>{cityLine}</span>`
- Typography: `--text-mono`, `--color-ivory-dim`, uppercase, `0.08em` tracking.
- Desktop only: `display: none` below 1024px.
- Position: left of centre, after the logo.
- Content source: Sanity `siteSettings` field. Format: `"Currently {city} · Next {city}, {date}"`.
- If Sanity data is unavailable, render nothing (graceful degradation, not an error).

### 3.4 NavPill.tsx

**Structure:**
```tsx
<nav aria-label="Main" className={styles.navPill}>
  {items.map(item => (
    <Link
      key={item.href}
      href={item.href}
      className={styles.navItem}
      aria-current={pathname === item.href ? "page" : undefined}
    >
      {item.label}
      {pathname === item.href && <ActiveUnderline />}
    </Link>
  ))}
</nav>
```

**Items** (content.md §3, DECISIONS.md §5):
- Work → `/work`
- Art → `/art`
- Sanctuary → `/sanctuary`
- About → `/about`

**Pill styling** (from prompt):
- `border-radius: 999px`
- `background: rgb(26 26 26 / 0.10)`
- `backdrop-filter: blur(12px)`
- `border: 1px solid var(--color-ink-300)`
- `padding: 6px`
- Each item: `padding: 10px 18px`
- Text: `--text-body`, `--color-ivory-dim`
- Hover text: `--color-ivory`
- Solid fallback: `background: rgb(26 26 26 / 0.85)` inside `@supports not (backdrop-filter: blur(1px))`

**Active underline (critical detail):**
- The active item gets `--color-ivory` text (not dim).
- Below the text, an inline SVG path with organic wobble (not a straight line):
  ```svg
  <svg width="100%" height="3" viewBox="0 0 100 3" preserveAspectRatio="none">
    <path
      d="M0,1.5 C10,0.8 20,2.2 30,1.2 C40,0.5 50,2.5 60,1.8 C70,0.9 80,2.0 90,1.3 L100,1.5"
      stroke="var(--color-inchworm)"
      stroke-width="1.5"
      stroke-linecap="round"
      fill="none"
      class={styles.underlinePath}
    />
  </svg>
  ```
- The path's `stroke-dasharray` and `stroke-dashoffset` are set via CSS:
  ```css
  .underlinePath {
    stroke-dasharray: var(--path-length, 100);
    stroke-dashoffset: var(--path-length, 100);
  }
  .underlinePath[data-drawn="true"] {
    stroke-dashoffset: 0;
    transition: stroke-dashoffset 320ms var(--ease-out);
  }
  ```
- Under `prefers-reduced-motion: reduce`: set `data-drawn="true"` immediately, no transition.

### 3.5 CTA (inside Header.client.tsx)

- `<Link href="/book" className={styles.cta}>Start a conversation</Link>`
- Copy: `Start a conversation` (content.md §3, DECISIONS.md §8 — locked vocabulary)
- Styling: **outline capsule, NOT filled.**
  - `border: 1px solid var(--color-inchworm)`
  - `color: var(--color-inchworm)`
  - `background: transparent`
  - `border-radius: 999px`
  - `padding: 10px 24px`
  - `--text-body`
- Hover: `background: var(--color-inchworm-tint)` (12% tint), 220ms `var(--ease-out)`.
- This is dilution-ladder **step 2** (outline), per DESIGN.md §4. Stays at step 2 always.
- Fires analytics: `track('enquiry_started', { source: 'header' })` on click.

### 3.6 Header.client.tsx (scroll behaviour + layout)

**Scroll hide/show:**
- Hide on scroll down, show on scroll up.
- Threshold: 80px before engagement (prevents flicker).
- Technique: `transform: translateY(-100%)` only. Never animate height or padding.
- Duration: 240ms `var(--ease-out)`.
- Always visible at `scrollY === 0`.
- Implementation: `useEffect` with a `scroll` listener (passive), comparing `scrollY` deltas. Store `lastScrollY` in a ref.

**Route detection:**
- Use `usePathname()` from `next/navigation`.
- Set `aria-current="page"` on the matching nav item.
- Toggle the active underline's `data-drawn` attribute.

**Mobile menu button** (below 768px):
- Two buttons replace the pill: menu toggle + "Start a conversation" CTA.
- Menu button: `<button aria-expanded={isOpen} aria-controls="mobile-menu" aria-label="Menu">`
- Icon: hamburger (3 lines SVG) when closed, X when open. Both 44px min touch target.
- The CTA stays as a separate icon link to `/book`.

### 3.7 MobileMenu.tsx

**Trigger:** Opens when menu button is clicked. Closes on Escape, on link click, on overlay click.

**Using `<dialog>`** because:
- Native focus trapping (when opened with `showModal()`).
- Native Escape handling.
- Native `aria-modal` semantics.
- Backdrop via `::backdrop` pseudo-element.

**Styling:**
- Fullscreen: `position: fixed; inset: 0;`
- Background: `var(--color-ink)` (opaque, solid).
- z-index: 101 (above the header).
- Nav items: Fraunces at `--text-display-l`, stacked, left-aligned, `--color-ivory`.
- Hover/focus on an item: WONK axis 0 → 1 (M19). CSS `:hover` state, not GSAP — discrete state change.
  ```css
  .menuItem {
    font-variation-settings: 'WONK' 0;
    transition: font-variation-settings 240ms var(--ease-out);
  }
  @media (hover: hover) and (pointer: fine) {
    .menuItem:hover {
      font-variation-settings: 'WONK' 1;
    }
  }
  ```
- The work image mask-in on hover (M16) is **not** built by the Interface Engineer. Mark with `TODO(motion): M16 ink bleed mask reveal on item hover`.

**Timing plumbing (for Motion Engineer):**
- Open: `280ms var(--ease-drawer)`. CSS class `data-state="open"` triggers transition.
- Close: `180ms var(--ease-drawer)`. CSS class `data-state="closed"`.

**Focus management:**
- On open: focus moves to the first link in the menu.
- On close: focus returns to the menu button.
- `requestAnimationFrame` then `dialogRef.current?.focus()` on mount for the first link.

**Body scroll lock:**
- When open: `document.body.style.overflow = 'hidden'`.
- On close/unmount: restore `document.body.style.overflow = ''`.

### 3.8 header.module.css

All styles for the header bar, pill, nav items, CTA, skip link, and scrim. Key tokens:

| Token | Use |
|---|---|
| `--color-ink` | base canvas |
| `--color-ink-300` | decorative hairline border on pill |
| `--color-ivory` | active nav text |
| `--color-ivory-dim` | inactive nav text, city line |
| `--color-inchworm` | CTA border/text, active underline |
| `--color-inchworm-tint` | CTA hover fill |
| `--color-focus` | focus ring |
| `--text-body` | nav items, CTA |
| `--text-mono` | city line |

**Focus ring (all interactive elements):**
```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

### 3.9 src/lib/analytics.ts

```ts
export function track(event: string, props?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'development') {
    console.log('[analytics]', event, props);
  }
  // TODO(analytics): wire to real provider
}
```

---

## 4. Accessibility checklist (all mandatory)

| Requirement | Implementation |
|---|---|
| `<header>` wrapping `<nav aria-label="Main">` | `Header.tsx` structure |
| Skip-to-content link is FIRST focusable element | `SkipLink.tsx`, `z-index: 200`, above header |
| `aria-current="page"` on active item | `NavPill.tsx`, driven by `usePathname()` |
| Menu button: `aria-expanded`, `aria-controls` | `Header.client.tsx` |
| Focus ring `--color-inchworm`, 2px solid, 2px offset | `:focus-visible` in CSS |
| All touch targets 44px minimum, 8px apart | CSS `min-height: 44px; min-width: 44px; gap: 8px` |
| Tab order: skip link, logo, nav items, CTA | DOM order matches |
| Focus trap in mobile menu | `<dialog>` with `showModal()` |
| Escape closes mobile menu | Native `<dialog>` behavior |
| Focus returns to menu button on close | `onClose` handler |
| Body scroll locked while menu open | `document.body.style.overflow = 'hidden'` |
| Icon-only buttons have `aria-label` | Menu button: `aria-label="Menu"` |
| Hover-only interactions gated | `@media (hover: hover) and (pointer: fine)` |

---

## 5. Token usage rules

- No raw hex, rgb or hsl anywhere. All colour through `var(--color-*)`.
- `--color-ink-300` only for pill border (decorative hairline). Never between interactive regions.
- Focus ring uses `--color-focus`, not a hardcoded value.
- CTA is dilution-ladder step 2 (outline). Never promoted to step 1 in the header.

---

## 6. Motion boundary

| Element | Interface Engineer builds | Motion Engineer adds (Phase 3) |
|---|---|---|
| Active underline SVG | SVG markup, CSS transition, `data-drawn` attr | Toggle `data-drawn` on route change |
| Scroll hide/show | CSS class with transform and transition | Scroll listener, 80px threshold |
| Mobile menu open/close | `<dialog>`, CSS transition classes | GSAP timeline if CSS insufficient |
| Menu item WONK axis | CSS `:hover` with transition | Verify timing, add M19 register row |
| Menu image mask (M16) | `TODO(motion)` placeholder | Full GSAP implementation |
| CTA hover fill | CSS `:hover` with transition | None needed |

---

## 7. Data flow

```
Sanity siteSettings
  └─ cityLine: "Currently Mumbai · Next Pune, August 2026"
       └─ Header.tsx (server fetch)
            └─ Header.client.tsx (prop)
                 ├─ CityLine.tsx
                 └─ MobileMenu.tsx
```

GROQ: `*[_type == "siteSettings"][0] { cityLine }`

If Sanity client not yet configured, use placeholder with `TODO(prerna)`.

---

## 8. Responsive breakpoints

| Breakpoint | Behaviour |
|---|---|
| < 768px | Pill hidden. Two icon buttons: menu + CTA. City line hidden. |
| 768px – 1023px | Pill visible. City line hidden. CTA visible. |
| >= 1024px | Pill visible. City line visible. CTA visible. |
| >= 1440px | Same as 1024px, max-content width. |

---

## 9. What the Interface Engineer deliberately does NOT build

1. `/book` page or Fillout embed. The header links to it.
2. WhatsApp button or icon. DECISIONS.md §9: never in the header.
3. Entrance animation on the header. Most-seen element = least animated.
4. Sliding solid capsule active indicator. Explicitly banned.
5. M16 ink bleed mask on mobile menu items. Motion Engineer work.
6. The actual SVG logo mark. Text placeholder until asset provided.
7. Any other section of the site.

---

## 10. Verification steps

1. `pnpm typecheck && pnpm lint && pnpm test && pnpm build` — all green.
2. Screenshot at 360px, 768px, 1024px, 1440px.
3. Screenshot header over light photo AND dark photo. Confirm legibility.
4. Tab through with no mouse. Confirm skip link fires first, all focus rings visible.
5. Toggle `prefers-reduced-motion`. Confirm underline appears instantly, no draw.
6. `pnpm a11y` — zero critical, zero serious.
7. Open mobile menu. Confirm: Escape closes, focus returns to button, body scroll locked.
8. Verify CTA link goes to `/book` (not wa.me).
9. Verify no WhatsApp icon or button in header.
10. Verify no raw hex/rgb/hsl outside tokens.css.

---

## 11. Dependencies on Phase 1 (Architect)

Before execution, the Architect must have delivered:

- `src/styles/tokens.css` with full palette and type scale
- `next/font` configuration for Fraunces, Inter, JetBrains Mono
- `tailwind.config.ts` reading tokens (if Tailwind used for layout)
- Root `app/layout.tsx` with metadata and viewport
- Sanity client configured (or project structure ready for it)

---

## 12. Commit strategy

```
feat(header): site header with nav pill, CTA, mobile menu, skip link

- Fixed header with transparent bar and 96px gradient scrim
- Glass pill nav: Work, Art, Sanctuary, About
- Organic SVG underline active indicator (motion plumbing ready)
- Outline CTA linking to /book, fires enquiry_started
- Fullscreen type-led mobile menu with Fraunces display type
- Skip-to-content link, focus trap, aria-current, 44px touch targets
- Responsive: 360, 768, 1024, 1440 verified
```

---

## 13. Open questions

1. **SVG logo mark.** Existing SVG or text placeholder? If existing, where?
2. **Sanity siteSettings schema.** Has the Architect created `cityLine` field?
3. **Analytics provider.** Confirmed (Vercel Analytics, PostHog)? Stub stays if not.
4. **Wonk axis on touch.** Focus triggers it too? (Plan includes this.)
