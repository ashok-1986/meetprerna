# MeetPrerna — Design System (`designs.md`)

> The full visual + motion language. The single source of truth for every component, animation, and shader.

---

## 1. Design philosophy

The site is an **editorial portfolio for a creative studio**. Not a corporate brochure. Not an artist page. It's a *slow magazine that happens to have a booking form at the end*.

The five principles:

1. **Type leads.** The first thing the eye lands on is a headline, not an image. We do not start with hero videos.
2. **The studio is one practice with three surfaces.** Tattooing, painting, sketching share a typographic system, a motion grammar, a color palette, and a webgl aesthetic. They differ in the *photo treatment* and the *texture overlay*.
3. **Motion is argument, not decoration.** Every animation either (a) sets a tone, (b) directs attention, or (c) reveals structure. No motion for motion's sake.
4. **The four pillars are felt, not labelled.** Psychology, Meditation, Therapy, Calmness live in the *pacing* of the scroll, the *quiet* of the colors, the *editorial* of the copy, and the *breath* of the idle animations. We don't say "calmness" — the page *is* calmness.
5. **Dark, but not black.** `--color-ink` is the surface, not the story. The story is the warm inchworm against the ink.

---

## 2. Color system

### 2.1 Brand palette

| Token | Value | RGB (space-separated for `rgb()`) | Role |
|---|---|---|---|
| `--color-inchworm` | `#C4FF61` | `196 255 97` | Primary accent. CTAs, focus, hover, accent type. |
| `--color-inchworm-deep` | `#9FCC4A` | `159 204 74` | Pressed state. Deeper tone for buttons in `:active`. |
| `--color-marigold` | `#EAFF27` | `234 255 39` | Secondary accent. Editorial highlights, pull-quotes. |
| `--color-ink` | `#1A1A1A` | `26 26 26` | Background. Default surface. |
| `--color-ink-90` | `#222222` | `34 34 34` | Raised surface (cards, dialogs). |
| `--color-ink-70` | `#363636` | `54 54 54` | Hover surface. |
| `--color-ink-50` | `#545454` | `84 84 84` | Muted. Disabled controls. |
| `--color-ink-20` | `#3a3a3a` | `58 58 58` | Hairlines, dividers (low contrast on purpose). |
| `--color-ivory` | `#FDFFE9` | `253 255 233` | Default text. Light surface alternative. |
| `--color-ivory-dim` | `#C9CBB6` | `201 203 182` | Muted text, captions, eyebrows. |

### 2.2 Functional colors

| Token | Value | Use |
|---|---|---|
| `--color-focus` | `#C4FF61` | Focus ring (matches inchworm for brand consistency). |
| `--color-danger` | `#FF6B6B` | Form errors. |
| `--color-success` | `#9FCC4A` | Form success. |
| `--color-warning` | `#EAFF27` | Form warning (matches marigold). |

### 2.3 Color usage rules

- **Background is always `--color-ink`.** No gray, no off-black. The page is a single dark canvas.
- **Body text is always `--color-ivory`.** Never `white`. The slight warm tint (R 253, G 255, B 233) reads as paper, not screen.
- **`--color-inchworm` is the only CTA color.** Booking, contact, primary navigation action, the "begin" link. One color. No exceptions.
- **`--color-marigold` is editorial only.** Pull-quote underlines, the eyebrow of a special section, the dot of a process step. Never on a button.
- **Photographs carry the chromatic variety.** The site is a black-and-green-and-ivory system; the photographs inject color.
- **No accent gradients.** A solid green button. A solid marigold underline. The gradients live only inside the WebGL ink-field shader.

### 2.4 Contrast compliance

| Pair | Ratio | AA pass? | Use |
|---|---|---|---|
| `--color-ivory` on `--color-ink` | 16.4:1 | AAA | Body |
| `--color-ivory-dim` on `--color-ink` | 9.0:1 | AAA | Captions |
| `--color-inchworm` on `--color-ink` | 14.2:1 | AAA | CTAs, accents |
| `--color-marigold` on `--color-ink` | 15.6:1 | AAA | Editorial highlights |
| `--color-ink-50` on `--color-ink` | 3.2:1 | AA large only | Disabled controls |

Every text/background pair above has been pre-validated. New combinations must be tested with the WCAG contrast checker before commit.

### 2.5 Dark mode considerations

The site is **single-theme** (dark by design). However, two **ambient light shifts** are supported:

1. **Studio vignette** — on the `/studio` page, the global surface desaturates by 6% as the user scrolls into the "the space" section, suggesting natural light entering the studio. Implemented as a CSS variable swap on a ScrollTrigger.
2. **Reading mode on long essays** — on `/process` and `/about`, the prose container shifts to `--color-ink-90` for a subtle "you are reading" effect. Triggered by IntersectionObserver, not scroll position.

No automatic light-mode toggle. No `prefers-color-scheme: light` overrides. The brand is the brand.

---

## 3. Typography

### 3.1 Font families

| Token | Family | Weights | Use |
|---|---|---|---|
| `--font-display` | Cormorant Garamond (variable) | 300–700, italic | All h1–h6, hero, section titles, large display |
| `--font-editorial` | Times New Roman | 400, italic | Reserved for pull-quotes in testimonials, journal, and the "About" page closing line. Never for UI. |
| `--font-body` | MG12 (if licensed) or Inter (fallback) | 400, 500, 600 | Body, UI, forms, captions |
| `--font-mono` | JetBrains Mono or system mono | 400 | Reserved for code (404 page easter egg, dev tools). |

### 3.2 Type scale (fluid)

Computed via `clamp(min, preferred, max)`. All values are computed against a 16px base and a 1440px preferred viewport.

| Token | Min (360w) | Preferred | Max (1920w) | Use |
|---|---|---|---|---|
| `--text-display-xl` | 4.5rem (72px) | 14vw | 18rem (288px) | Hero headline only |
| `--text-display-lg` | 3.5rem (56px) | 9vw | 10rem (160px) | Section openers |
| `--text-display-md` | 2.75rem (44px) | 6vw | 6rem (96px) | Page h1 |
| `--text-display-sm` | 2rem (32px) | 4vw | 4rem (64px) | Section h2 |
| `--text-h1` | 2.25rem (36px) | 4vw | 4rem (64px) | h1 |
| `--text-h2` | 1.75rem (28px) | 3vw | 3rem (48px) | h2 |
| `--text-h3` | 1.375rem (22px) | 2.2vw | 2rem (32px) | h3 |
| `--text-body-lg` | 1.125rem (18px) | 1.4vw | 1.25rem (20px) | Lead paragraph, large body |
| `--text-body` | 1rem (16px) | 1.1vw | 1.0625rem (17px) | Body |
| `--text-body-sm` | 0.875rem (14px) | 0.95vw | 0.9375rem (15px) | Secondary body |
| `--text-caption` | 0.75rem (12px) | 0.8vw | 0.8125rem (13px) | Captions, helper |
| `--text-eyebrow` | 0.6875rem (11px) | 0.7vw | 0.75rem (12px) | Eyebrow labels |

**Fluid calc recipe** (in CSS):

```css
/* clamp(MIN, PREFERRED-as-vw, MAX) */
--text-h1: clamp(2.25rem, 1.5rem + 2.5vw, 4rem);
```

Each value is hand-tuned so the curve is linear between 360px and 1920px, with the min and max being the natural snap points at the extremes.

### 3.3 Line height

| Use | Line height | Reasoning |
|---|---|---|
| Display (xl–md) | 0.95 | Editorial tight. Type breathes *with* the page. |
| h1–h2 | 1.05 | |
| h3 | 1.2 | |
| Body | 1.6 | Long-form readability. |
| Caption / eyebrow | 1.4 | |

### 3.4 Letter spacing

| Use | Tracking | Why |
|---|---|---|
| Display | -0.04em to -0.02em | Tight. Editorial. |
| Body | 0 | Neutral. |
| Eyebrow | 0.2em (uppercase) | Reads as a label, not a word. |
| Button | 0.04em (uppercase) | Same effect at button size. |

### 3.5 Type rules

- **All h1–h3 are Cormorant Garamond.** No exceptions.
- **All body is MG12 / Inter fallback.** No exceptions.
- **Times New Roman italic** is reserved for three places only:
  1. Testimonial pull-quotes.
  2. The closing line of the About page.
  3. The 404 page.
  Using it elsewhere dilutes the effect.
- **Eyebrow text** is body font, uppercase, 0.2em tracking, `--color-ivory-dim`.
- **No font-size below 11px** (the eyebrow). This is a craft and a11y choice.
- **No more than 2 type families per screen.** Display + body, or display + editorial (in the testimonial case).

### 3.6 Variable font interactions

Cormorant Garamond is a variable font with `wght` and `opsz` axes.

- **Default:** `wght 400, opsz 36`.
- **Section openers:** `wght 500, opsz 60` (the optical-size bump reads as "this is important").
- **Hover on a display link:** transition `wght 400 → 500` over 240ms, easing `studio`. The change is felt more than seen.
- **Cursor approach (≤ 100px from a display heading):** `wght` shifts by `+100` proportional to distance, then back. Driven by the custom cursor's GSAP timeline.

---

## 4. Spacing & grid

### 4.1 Spacing scale

8-pt base, with a few editorial extremes.

| Token | Value | Use |
|---|---|---|
| `--space-0` | 0 | Reset |
| `--space-1` | 0.25rem (4px) | Hairline gaps |
| `--space-2` | 0.5rem (8px) | Tight |
| `--space-3` | 0.75rem (12px) | |
| `--space-4` | 1rem (16px) | Default inline |
| `--space-5` | 1.5rem (24px) | |
| `--space-6` | 2rem (32px) | Default block |
| `--space-7` | 3rem (48px) | |
| `--space-8` | 4rem (64px) | Section inner |
| `--space-9` | 6rem (96px) | Section between |
| `--space-10` | 8rem (128px) | Page-level gap |
| `--space-section` | `clamp(6rem, 12vw, 12rem)` | Between major sections |
| `--space-gutter` | `clamp(1.25rem, 4vw, 3rem)` | Side gutter (page) |
| `--space-rail` | `clamp(5rem, 14vw, 11rem)` | The named "rail" — left-rail width on asymmetric layouts |

### 4.2 Grid

A 12-column grid with a single named rail.

- **Columns:** 12.
- **Gutter:** `var(--space-4)`.
- **Max content width:** 1680px.
- **Outer padding:** `var(--space-gutter)`.
- **The Rail:** On asymmetric editorial layouts (Hero, Manifesto, Process), the leftmost 5 columns form a "rail" — a narrow column for an eyebrow + a number + a one-line label, with content flowing in the remaining 7 columns. The rail is sticky for the duration of the section.

```
┌─── gutter ───┬────────── rail (5) ──────────┬────────── content (7) ──────────┐
│              │                              │                                  │
│              │   01 — Hero                  │   The thesis in                 │
│              │                              │   eight seconds.                │
│              │                              │                                  │
└──────────────┴──────────────────────────────┴──────────────────────────────────┘
```

### 4.3 Breakpoints

| Name | Min width | Use |
|---|---|---|
| `xs` | 0 | Default. Mobile-first. |
| `sm` | 640px | Large phone. |
| `md` | 768px | Tablet portrait. |
| `lg` | 1024px | Tablet landscape / small laptop. |
| `xl` | 1280px | Laptop. |
| `2xl` | 1536px | Desktop. |
| `3xl` | 1920px | Wide desktop. |

Tailwind defaults are used. Custom breakpoints are not introduced.

---

## 5. Layout primitives

### 5.1 Container

```tsx
<Container size="wide"> // narrow | wide | edge (full-bleed)
```

- `narrow`: 768px max. Reading width.
- `wide`: 1280px max. Default marketing.
- `edge`: 100vw. Used only for full-bleed images and the shader canvas.

### 5.2 Section

```tsx
<Section
  id="hero"
  spacing="hero"      // hero | section | tight | none
  tone="default"      // default | quiet | warm | vignette
  as="section"        // tag
>
```

- `hero` spacing: 12–16rem top, 8rem bottom.
- `section` spacing: 8rem top, 8rem bottom.
- `tight` spacing: 4rem top, 4rem bottom.
- Tones: `default` (ink), `quiet` (ink-90 surface), `warm` (ink with a slight marigold gradient overlay), `vignette` (radial gradient of ink-70 to ink).

### 5.3 Stack

```tsx
<Stack gap="6" align="start" justify="between" wrap>
```

Vertical or horizontal flex with semantic gap tokens.

### 5.4 Cluster

```tsx
<Cluster gap="2" align="center">
```

For tags, chips, button groups.

### 5.5 The Rail (named grid template)

```tsx
<Rail
  eyebrow="01 — Hero"
  label="Meet Prerna"
>
  {/* children flow in the 7-col content area */}
</Rail>
```

Sticky rail on the left, scrollable content on the right. Collapses to a stacked layout below `lg`.

---

## 6. Component inventory

> Full API in [`docs/components.md`](./components.md). Visual grammar here.

### 6.1 Primitives (atomic)

| Component | States | Variants | Notes |
|---|---|---|---|
| `Button` | default, hover, focus, active, disabled, loading | `primary` (green), `secondary` (ghost), `editorial` (underline), `icon` | Primary only one button per section max. |
| `Tag` | default, hover, active, removable | `default`, `marigold`, `ink-50` | Used for portfolio filters. |
| `Input` | default, focus, error, disabled | `text`, `email`, `tel`, `textarea`, `select` | Floating label, bottom-underline style on dark. |
| `Dialog` | open, closed | `centered`, `full` | Radix-backed. |
| `Tabs` | default, active | `underline`, `pill` | |
| `Tooltip` | open, closed | `top`, `bottom`, `left`, `right` | Radix-backed. |
| `Tooltip` | open, closed | — | For tag hints on portfolio filters. |

### 6.2 UI components

| Component | Purpose |
|---|---|
| `Eyebrow` | The all-caps label that introduces a section. |
| `SectionTitle` | `<h1/2/3>` with optional eyebrow + Rail. |
| `Kicker` | A small word or phrase that introduces a paragraph. |
| `PullQuote` | Block-level quote in Times New Roman italic, with optional marigold underline. |
| `Marquee` | Horizontal infinite scroll for keyword rows. |
| `Counter` | A numeric counter that animates on scroll. |
| `Tag` | See 6.1. |
| `ChipGroup` | Wraps a set of `Tag`s. |
| `DefinitionList` | For service details (price, duration, aftercare). |
| `Breadcrumb` | Editorial breadcrumb (no chevron, just `/` separators). |
| `Pill` | A small rounded badge for years, status. |
| `StatusDot` | Animated pulsing dot for "available for booking" indicator. |
| `SocialLink` | Instagram, Behance, Are.na. |

### 6.3 Visual primitives (motion-aware)

| Component | Purpose |
|---|---|
| `MaskReveal` | Wraps content; reveals via a clip-path mask on enter. |
| `Parallax` | Wraps a child; applies scroll-driven Y transform within a clamp. |
| `Magnetic` | A child that subtly follows the cursor (≤ 8px) on hover. |
| `SplitText` | Wraps a string; animates per-character, per-word, or per-line. |
| `Marquee` | Infinite horizontal scroll. Direction, speed, pause-on-hover. |
| `CountUp` | Animates a number from 0 to a target on enter. |
| `ScrubImage` | A tall image revealed as the user scrolls (parallax + mask). |
| `InView` | Triggers a child animation only when the child enters the viewport. |
| `Sticky` | Pins an element within a parent, with a release point. |
| `ScrollProgress` | A horizontal bar at the top of the page tracking scroll position. |

### 6.4 Media components

| Component | Purpose |
|---|---|
| `RevealImage` | Image with mask-reveal + blur-up placeholder. |
| `Gallery` | The portfolio masonry grid. |
| `GalleryItem` | A single card in the gallery. |
| `GalleryDialog` | The detail dialog. |
| `VideoFrame` | Lazy-loaded, autoplay-on-hover video. |
| `Portrait` | A tall, editorial image of Prerna with caption. |
| `StudioPhoto` | A wide photo with optional caption. |
| `OG` | The Open Graph card renderer (server component). |

### 6.5 Cursor

| Component | Purpose |
|---|---|
| `CustomCursor` | The full ink-blot cursor. |
| `CursorLabel` | A small label that appears inside the cursor on hover (e.g., "View", "Open"). |
| `CursorBlend` | The mix-blend-mode wrapper. |

### 6.6 Section components (per-page)

| Component | Used on |
|---|---|
| `HeroSection` | `/` |
| `ManifestoSection` | `/`, `/studio` |
| `SelectedWorkSection` | `/` |
| `ProcessTeaserSection` | `/` |
| `StudioVignetteSection` | `/` |
| `TestimonialsSection` | `/` |
| `PillarsSection` | `/studio` |
| `StudioEssaySection` | `/studio` |
| `PressSection` | `/studio`, `/about` |
| `PortfolioSection` | `/tattoos`, `/paintings`, `/sketches` |
| `FilterBar` | All portfolio routes |
| `SeriesIndexSection` | `/paintings`, `/sketches` |
| `CollectorCTASection` | `/paintings`, `/sketches` |
| `ProcessSection` | `/process` |
| `ProcessStep` | one per `/process` step |
| `AboutSection` | `/about` |
| `TimelineSection` | `/about` |
| `ContactSection` | `/contact` |
| `ContactForm` | `/contact` |
| `BookingFlow` | `/book` |
| `CTASection` | `/book` |
| `FooterSection` | all |
| `HeaderSection` | all |

### 6.7 State catalog (universal)

Every component must handle these states even if it means declaring "n/a" in Storybook:

- `default` — resting.
- `hover` — pointer over.
- `focus-visible` — keyboard focus.
- `active` — pressed.
- `disabled` — non-interactive.
- `loading` — async in progress (forms, gallery).
- `empty` — no data (gallery, testimonials).
- `error` — broken image, failed submission.
- `reduced-motion` — the static counterpart.

---

## 7. Motion grammar

The full choreography is in [`docs/animations.md`](./animations.md). The *grammar* — the rules of the language — is here.

### 7.1 Easing library

All easings live in `src/animations/easing.ts` and are imported by name. **No inline easings.**

| Name | Curve | Use |
|---|---|---|
| `studio` | `cubic-bezier(0.65, 0, 0.35, 1)` | Default. Symmetric. Calm. |
| `editorial` | `cubic-bezier(0.16, 1, 0.3, 1)` | Long-tail entrance. Hero h1, mask reveals. |
| `soft` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | UI transitions. Buttons, tags. |
| `glide` | `cubic-bezier(0.22, 1, 0.36, 1)` | Cursor follow. |
| `breath` | `sine.inOut` (cubic-bezier(0.45, 0, 0.55, 1)) | Idle ambient motion. |
| `sharp.out` | `power4.out` | Quick exits. |
| `sharp.in` | `power4.in` | Quick entrances on dismiss. |

### 7.2 Duration scale

| Token | Value | Use |
|---|---|---|
| `--dur-120` | 120ms | Micro UI changes (color, opacity). |
| `--dur-180` | 180ms | Tag, chip, button. |
| `--dur-260` | 260ms | Card hover, image crossfade. |
| `--dur-420` | 420ms | Section enter, mask reveal. |
| `--dur-620` | 620ms | Hero h1, large mask. |
| `--dur-900` | 900ms | Editorial motion, manifesto paragraph. |
| `--dur-1400` | 1400ms | Page transition, ambient breath. |

### 7.3 The five motion verbs

Every motion in the site is one of these. If it's not, justify it in the PR.

1. **Enter** — element appears. *How:* mask reveal, slide, fade. *When:* on first paint, on scroll into view.
2. **Reveal** — content is uncovered. *How:* clip-path, mask, opacity. *When:* on scroll, on hover.
3. **Lead** — element directs the eye. *How:* parallax, scroll-driven translation, scale. *When:* on scroll.
4. **Respond** — element reacts to the user. *How:* hover, cursor follow, click feedback. *When:* pointer events.
5. **Breathe** — idle ambient motion. *How:* low-amplitude translate/scale/opacity, infinite. *When:* always, with a 30s grace period after user interaction.

### 7.4 Stagger patterns

| Pattern | Use |
|---|---|
| `stagger.lines` | Lines of a paragraph reveal top-to-bottom. 60ms between lines. |
| `stagger.words` | Words of a headline. 40ms between words. |
| `stagger.chars` | Characters of a logo or a special headline only. 18ms between chars. |
| `stagger.cards` | Gallery cards. 80ms between cards, capped at the first 6 visible. |
| `stagger.tags` | Filter chips. 30ms. |

### 7.5 Reduced-motion rule (binding)

For every motion:

- If `prefers-reduced-motion: reduce` is set:
  - **Reveal becomes instant** — `opacity: 1` immediately.
  - **Mask reveal becomes a no-op** — content is shown unmasked.
  - **Parallax becomes 0** — element stays in place.
  - **Smooth scroll is disabled** — native scroll.
  - **Cursor is disabled** — system cursor only.
  - **Shaders are disabled** — canvas removed.
  - **Idle breath is disabled** — no infinite animations.
- The transition is tested in CI. A PR that breaks it cannot merge.

### 7.6 Scroll trigger configurations

All ScrollTriggers use these defaults unless explicitly overridden:

| Setting | Default | Why |
|---|---|---|
| `start` | `top 80%` | Element triggers when its top hits 80% of viewport. |
| `end` | `bottom 20%` | Element ends when its bottom hits 20% of viewport. |
| `scrub` | `true` for hero/manifesto/portfolio, `false` for one-shot reveals | Scrub feels editorial for marquee moments; one-shot for copy. |
| `pin` | `false` unless the section is *designed* to be pinned (e.g., process step 2) | Pinning is a heavy tool; default off. |
| `markers` | `false` in prod, dev-only via `?debug=timeline` | |
| `toggleActions` | `'play none none reverse'` | Default one-shot behavior. |
| `invalidateOnRefresh` | `true` | Recompute on resize. |
| `fastScrollEnd` | `true` | Prevents stutter on fast scroll. |

### 7.7 Breakpoint behavior

The choreography is **simplified below `md`** (768px). Concretely:

- **Parallax amounts halved** (or removed entirely).
- **Pin sections** converted to regular scroll.
- **Horizontal scrolls** converted to vertical.
- **Mask reveals** kept (they're cheap and they read well on mobile).
- **Page transitions** kept (they don't depend on viewport).
- **Shader** is loaded but at lower pixel ratio (1.0 instead of 2.0).

---

## 8. Micro-interactions

The catalogue of small animations that make the site feel cared-for. Each is implemented as a small reusable function in `src/animations/`.

### 8.1 Hover states

| Element | Effect |
|---|---|
| **Body link** | Color: ivory → marigold. Underline draws from left, 180ms. |
| **Image card** | Slight scale (1 → 1.02, 420ms `studio`). Cursor label fades in (180ms `soft`). |
| **Button (primary)** | Background: inchworm → inchworm-deep. Inner text shifts `x: 4px` for "go" feel. |
| **Button (editorial)** | Underline draws across. |
| **Tag** | Background: transparent → ink-50. Border: ivory-dim → inchworm. |
| **Input** | Bottom border: ivory-dim (1px) → inchworm (2px) on focus. Label floats up 4px. |
| **Process step** | A vertical marigold line connects to the next step on hover. |

### 8.2 Cursor effects

The custom cursor is a 24px ink-blot circle with a `mix-blend-mode: difference` against the page. It has three states:

1. **Default** — 24px circle, `bg: ivory`, opacity 0.4.
2. **Hover (link)** — 8px solid circle, `bg: inchworm`, opacity 1. A small label appears 24px below: "View", "Open", "Begin", etc.
3. **Drag** (gallery drag-to-pan) — opens to 56px ring with a vertical double-chevron.

It is **disabled** on:

- Touch devices (no `hover` semantic).
- `prefers-reduced-motion: reduce`.

It **supplements** (never replaces) the system cursor. The system cursor is always reachable via OS settings.

### 8.3 Page transitions

A two-stage transition on route change:

1. **Outgoing (260ms):** Content fades and translates `y: -16`. The cursor circle expands to 100vw and turns to inchworm.
2. **Incoming (420ms `editorial`):** New content slides in from `y: 24`, opacity 0 → 1. The cursor circle contracts back to 24px.

The transition is implemented with View Transitions API where supported, with a GSAP fallback for Safari ≤ 17. A reduced-motion variant: instant crossfade, 120ms.

### 8.4 Form micro-interactions

- **Field focus:** label floats, bottom-line thickens.
- **Field error:** shake (8px, 4 cycles, 240ms total) + danger color on the bottom line + error text below.
- **Submit success:** button morphs to a check icon, then to "Sent ✓". A toast appears top-right.
- **Submit error:** button shakes, error toast with retry.

### 8.5 Status indicators

- **"Available for booking"** dot in the footer pulses (`breath` keyframe, 6s cycle). On hover, it expands to a label: "Bookings open — Sept 2026 onward".

---

## 9. Shader specifications (overview)

Full GLSL is in [`docs/shaders.md`](./shaders.md). The visual role of each:

| Shader | Role | Where visible |
|---|---|---|
| **InkField** | The full-bleed ambient ink that lives behind the entire site. | `app/layout.tsx` |
| **Grain** | A film-grain overlay applied as a final pass. | `app/layout.tsx` |
| **Distortion** | Localized UV displacement around the cursor and on portfolio card hover. | Hero, portfolio |
| **Ink Drop** | A rare, occasional ink-drop particle. | Cursor click (subtle) |
| **Process** | A subtle ink-mix transition between process steps. | `/process` |

All shaders are **off** under `prefers-reduced-motion: reduce`. All shaders are **off** when WebGL is unavailable. A static radial-gradient CSS background replaces the InkField in both cases.

---

## 10. Imagery

### 10.1 Treatment by section

| Section | Treatment |
|---|---|
| **Tattoos portfolio** | High-fidelity. Minimal retouch. Skin texture is part of the work. Background: desaturated to push subject forward. |
| **Paintings portfolio** | Editorial framing. A subtle paper texture overlay on hover. Slight shadow under each piece. |
| **Sketches portfolio** | The paper is part of the artwork. Visible edges, slight off-white overlay. |
| **Studio** | Warm light. Slow shutter. The studio as it actually is. |
| **About** | Prerna at work. Not posed. |

### 10.2 Image ratios

| Use | Ratio | Reasoning |
|---|---|---|
| Portfolio card | 4:5 | Portrait of a body part or a painting. |
| Hero | 16:9 | Cinema. |
| About portrait | 3:4 | Editorial. |
| Studio wide | 21:9 | Architectural. |
| Testimonial | 1:1 | Avatar. |
| OG | 1.91:1 | Standard. |

### 10.3 Image states

- `loading` — a paper-texture blur-up placeholder (LQIP generated at build time).
- `loaded` — full opacity.
- `error` — a typographic fallback (e.g., "Untitled, 2024" in Times italic).
- `zoomed` — in the dialog, the image scales to fit; pinch-zoom on touch.

---

## 11. Iconography

- **Library:** Hand-tuned `lucide-react` (selected subset) + a small set of custom-drawn SVG marks.
- **Stroke width:** 1.5 (to match the line weights of the variable font's lighter cuts).
- **Color:** `--color-ivory-dim` default, `--color-inchworm` on hover.

---

## 12. Empty, loading, error states

| State | Treatment |
|---|---|
| **Empty portfolio filter** | "Nothing in this style — yet. Reset filter, or get in touch about a custom piece." |
| **Loading portfolio** | Skeleton cards with paper-texture placeholder. |
| **Form 404** | A hand-drawn "page not found, but Prerna probably is — get in touch." |
| **Image error** | Typographic fallback (see §10.3). |
| **API error** | Inline toast + a "retry" link. Never a full-page error. |

---

## 13. Tone of voice (visual, not just textual)

- The site should feel like a **quiet book**, not a billboard.
- A page is allowed to have one **loud** moment (a big type, a striking image, a bold motion). Everything else is muted.
- The cursor's pace is the page's pace. Fast cursor = confident. Slow cursor = considerate.
- Whitespace is content.
- The ink-field shader is the *room tone*. Never loud. Never off.

---

## 14. Don'ts (binding)

These are forbidden in the design language. If a PR introduces one, the Designer rejects without debate.

- **No drop shadows on text.** Type carries itself.
- **No carousels on the home page.** A carousel implies a choice to be deferred.
- **No stock illustrations.** The illustrations are the work, the photographs, and the WebGL ink.
- **No pop-up modals** triggered by time-on-page. The book / contact CTA is a choice the user makes.
- **No sound at all.** Zero audio. None.
- **No autoplay video with sound.** (No audio, period.)
- **No "click here".** Buttons name their destination.
- **No emoji in copy or design.** The cursor and the inchworm carry the warmth.

---

## 15. Design tokens — final inventory

The complete set, mirrored in `src/styles/tokens.css`:

```
/* Color */
--color-inchworm, --color-inchworm-deep
--color-marigold
--color-ink, --color-ink-90, --color-ink-70, --color-ink-50, --color-ink-20
--color-ivory, --color-ivory-dim
--color-focus, --color-danger, --color-success, --color-warning

/* Type */
--font-display, --font-editorial, --font-body, --font-mono
--text-display-xl, --text-display-lg, --text-display-md, --text-display-sm
--text-h1, --text-h2, --text-h3
--text-body-lg, --text-body, --text-body-sm
--text-caption, --text-eyebrow

/* Spacing */
--space-0 ... --space-10
--space-section, --space-gutter, --space-rail

/* Motion */
--dur-120, --dur-180, --dur-260, --dur-420, --dur-620, --dur-900, --dur-1400
--ease-studio, --ease-editorial, --ease-soft, --ease-glide, --ease-breath

/* Layout */
--content-narrow, --content-wide, --rail-width
--header-height, --footer-height

/* Misc */
--radius-none, --radius-sm, --radius-md, --radius-lg, --radius-pill
--shadow-1, --shadow-2 (used very sparingly; the site is shadowless)
--z-base, --z-canvas, --z-content, --z-header, --z-dialog, --z-toast
```

---

## 16. Storybook organization

Each component has a story that demonstrates *all* of its states (per §6.7), and one of the a11y addon is enabled. The a11y test fails CI on critical issues.

```
src/components/
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   ├── Button.stories.tsx
│   │   └── Button.test.tsx
```

`*.stories.tsx` is the contract. PRs that change component behavior without a corresponding story change are rejected.
