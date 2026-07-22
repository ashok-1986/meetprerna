# MeetPrerna — Product Requirements Document (PRD)

**Version:** 1.0 · **Status:** For sign-off · **Owner:** Mavis (Tech Lead) · **Last updated:** 2026-07-22

---

## 1. Executive summary

MeetPrerna is a creative studio in Mumbai and Navi Mumbai, run by **Prerna** — a tattoo artist, painter, and sketch artist. The current site at `meetprerna.com` is functional but flat. This PRD defines a full reimagining as an immersive, motion-driven portfolio that:

- Treats tattooing, painting, and sketching as one creative practice with three surfaces.
- Wears its four emotional pillars — **Psychology, Meditation, Therapy, Calmness** — on every interaction.
- Reads as a *kinetic editorial* — closer to floema.com's typographic confidence and torchsystems.com's restrained boldness than to a typical agency portfolio.
- Converts the right visitors into booked consultations.

The build is **phase-gated**, **animation-first**, and **content-led**. Every motion decision is justified in [`docs/animations.md`](./animations.md) and every shader is documented in [`docs/shaders.md`](./shaders.md).

---

## 2. Goals & success metrics

### 2.1 Business goals (12 months post-launch)

| # | Goal | KPI | Target |
|---|---|---|---|
| G1 | More qualified consultation bookings | Booked calls per 1,000 sessions | ≥ 18 |
| G2 | Higher-value tattoo inquiries (full-sleeve, custom projects) | Average project value on first session | +25% vs. current site |
| G3 | International collector reach | Sessions from outside India | ≥ 8% of total |
| G4 | Sell paintings and sketches online | Direct inquiries leading to art sale | ≥ 6 per quarter |
| G5 | Reduce repetitive DMs | DMs asking "what's your style / pricing / process" | -50% |

### 2.2 Product goals

| # | Goal | KPI |
|---|---|---|
| P1 | Performance parity with editorial Awwwards sites | Lighthouse Performance ≥ 90 mobile, ≥ 95 desktop |
| P2 | SEO that competes for "tattoo artist Mumbai", "custom tattoo Navi Mumbai", "abstract paintings Mumbai" | Top 3 SERP for primary terms within 6 months |
| P3 | Accessibility AA across all interactive experiences | axe-core 0 critical, Lighthouse A11y ≥ 95 |
| P4 | Resilient to feature phones and low-bandwidth contexts | Functional core (no shader, no autoplay) usable on 3G + 4-year-old Android |
| P5 | A CMS that Prerna can run without an engineer | Zero engineer hours for content updates after handover |

### 2.3 North-star metric

> **A booking-confirmed consultation per 1,000 unique visitors, with at least 1 in 4 being a custom (full-day or multi-session) project.**

---

## 3. Target audience & personas

The site serves **four distinct personas**. Every section and every page must be defensible against this list — if a section doesn't serve at least one of them clearly, it doesn't ship.

### 3.1 Persona A — *Local Mumbai first-timer* (highest volume)

- **Demographics:** 22–34, lives in Mumbai / Navi Mumbai, discovered Prerna on Instagram.
- **Mindset:** Curious but nervous. Has been thinking about a first tattoo for months. Worried about pain, regret, and "is this artist any good?".
- **What they need:** Trust signals — Prerna's face, the studio, the process demystified, real client words, the deposit policy explained, a clear "how do I start?" path.
- **What scares them away:** Pushy sales, dark/heavy imagery without context, jargon, "DM me" with no other route.
- **Sections that serve them:** Hero (face + invitation), About, Studio, Process, Testimonials, FAQ, Contact/Book.

### 3.2 Persona B — *International art collector*

- **Demographics:** 30–55, lives outside India, buys work from Mumbai-based artists.
- **Mindset:** Wants the paintings and sketches. Cares about provenance, artist statement, the studio's intellectual lineage, and the way the work is photographed.
- **What they need:** A gallery-first experience, large high-fidelity imagery, prices-on-request, shippable framing, contact for private viewings.
- **What scares them away:** A site that hides the work behind scroll theatrics; a checkout that asks for an Indian address first.
- **Sections that serve them:** Portfolio (paintings + sketches), Studio (provenance), About (statement), Contact (international CTA).

### 3.3 Persona C — *Returning enthusiast seeking a custom project*

- **Demographics:** 28–45, has 1–5 tattoos, follows Prerna's work for a year or more.
- **Mindset:** Knows what they want, wants to *collaborate*. Wants to see the depth of Prerna's visual vocabulary so they can pitch ideas in a shared language.
- **What they need:** A deep, browsable portfolio (filter by motif — line, flora, geometry, abstract). A consultation flow that lets them upload references and write a brief.
- **Sections that serve them:** Portfolio with filters, Process (consultation step), Contact (consultation form), Manifesto (signals artistic seriousness).

### 3.4 Persona D — *Corporate / brand buyer*

- **Demographics:** Marketing lead, gallery curator, or interior designer.
- **Mindset:** Time-poor. Wants to confirm "this is a real, professional studio that can deliver for a client / event / wall" in under 60 seconds.
- **What they need:** Press kit, high-res downloads, a clear commercial-enquiry path, social proof, an answer to "have you done this for a brand before?".
- **Sections that serve them:** Studio (facilities), Press / Journal (reserved), Testimonials, Contact (commercial enquiry route).

---

## 4. Information architecture

```
/                        Home
├── /studio              Studio story & manifesto
├── /tattoos             Tattoo portfolio
│   ├── ?style=line
│   ├── ?style=blackwork
│   ├── ?style=abstract
│   ├── ?style=flora
│   └── ?style=geometric
├── /paintings           Paintings portfolio
├── /sketches            Sketches portfolio
├── /process             The five-step process
├── /about               About Prerna
├── /contact             Contact form + studio info
└── /book                Booking flow entry (consultation request)
```

URLs in **kebab-case**. Query params are used for portfolio filters so deep links work (`/tattoos?style=line`).

> **Decision (locked):** A single `/journal` route is reserved at the architecture level but is **not built in v1**. The decision to build it is gated on at least 3 months of content backlog.

---

## 5. Page-by-page specifications

For each route: purpose, primary persona, sections, key components, key interactions, and a11y notes. Animation specifics are in [`docs/animations.md`](./animations.md); the design language is in [`docs/designs.md`](./designs.md).

### 5.1 Home (`/`)

**Purpose:** Introduce the studio's thesis in 8 seconds. Convert the right visitors.

| Section | Purpose | Components used |
|---|---|---|
| **Hero** | Set thesis. Big editorial type. Quiet ink-field shader. | `HeroSection`, `InkFieldShader`, `CustomCursor` |
| **Manifesto** | One paragraph. Four pillars. | `ManifestoSection`, `PillarGrid` |
| **Selected Work** | 6 best pieces. Pulls from all three practices. | `PortfolioSection`, `PortfolioCard` |
| **Process Teaser** | Five steps. Click → `/process`. | `ProcessSection` (teaser mode) |
| **Studio Vignette** | Two or three photos. The space. | `StudioSection` (vignette mode) |
| **Testimonials** | 3 editorial pull-quotes. | `TestimonialsSection` |
| **Footer / CTA** | Final "Begin a conversation" + nav. | `FooterSection` |

**Success metric:** ≥ 35% of visitors scroll past the hero. ≥ 8% click "Begin a conversation".

### 5.2 Studio (`/studio`)

**Purpose:** Long-form essay on the studio, the practice, and the four pillars.

| Section | Purpose |
|---|---|
| **Hero** | Studio name, founding year, location. |
| **The Space** | Photo essay — wide editorial, scroll-pinned, single-column text overlay. |
| **Four Pillars** | Psychology · Meditation · Therapy · Calmness — one per section, each with a portrait of Prerna at work and a 200-word essay. |
| **Press & Recognition** | Logos, quotes from publications (placeholder until confirmed). |
| **CTA** | "Visit the studio" + map embed. |

### 5.3 Tattoos (`/tattoos`)

**Purpose:** Browsable gallery with filters. The deepest portfolio route.

| Section | Purpose |
|---|---|
| **Hero** | Page title. Eyebrow. One-line description. |
| **Filter Bar** | Style · Body area · Year. Sticky on scroll. |
| **Gallery** | Asymmetric editorial grid. Each card opens a `PortfolioItem` dialog with detail view, related pieces, and a CTA. |
| **CTA Strip** | "Have a piece in mind? Begin a consultation." |

### 5.4 Paintings (`/paintings`)

**Purpose:** Studio-forward, gallery-style presentation.

| Section | Purpose |
|---|---|
| **Hero** | Title. |
| **Series Index** | One row per series (year, name, count). Click → filtered grid. |
| **Featured Works** | Editorial masonry. |
| **Collector CTA** | "Available works" + "Commission a painting". |

### 5.5 Sketches (`/sketches`)

Same shape as Paintings but visually more intimate — paper texture overlay, more white space, hover reveals a "process note" from Prerna.

### 5.6 Process (`/process`)

**Purpose:** Demystify the journey from idea to permanent art. The page that converts Persona A.

| Section | Purpose |
|---|---|
| **Hero** | "The five steps." |
| **Step 1 — Conversation** | The brief, the consult, references. |
| **Step 2 — Sketch** | Prerna's pencil-to-paper process. Photos + video. |
| **Step 3 — Design** | Digital refinement, iterations, sign-off. |
| **Step 4 — Session** | The day-of. What to bring. What to expect. |
| **Step 5 — Aftercare** | Healing, touch-ups, the long arc. |
| **CTA** | "Start your brief." |

### 5.7 About (`/about`)

**Purpose:** Prerna's story. The single most human page.

- Hero: name + portrait.
- Long-form bio (200–300 words, third-person *and* first-person excerpts).
- Press logos.
- Timeline of work.
- CTA: "See the work" / "Get in touch".

### 5.8 Contact (`/contact`)

- Hero.
- Two-column layout: form (left), studio info (right).
- Form: name, email, project type (tattoo/painting/sketch/other), brief (markdown allowed), reference upload (up to 5 images, 10MB each).
- Studio info: address, hours, phone, email, embedded map (lazy-loaded), parking notes, "by appointment only" disclaimer.
- Direct line for international collectors (mailto with subject prefill).
- Press kit download.

### 5.9 Book (`/book`)

- A *single screen* flow. No multi-step wizard at v1 — over-engineering.
- Fields: project type, ideal body area (if tattoo), preferred month, references, brief.
- On submit: confirmation state with calendar link + a contact within 48 hours promise.
- "Already have a Calendly link?" fallback if the studio's own booking system is later preferred.

---

## 6. Technical architecture

### 6.1 Stack — long version

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 14 (App Router, RSC, streaming)** | Best tooling for marketing-heavy sites that also need strong SEO + fast iteration. RSC means animations live in client components without inflating the JS bundle for the marketing surface. |
| Language | **TypeScript 5.6 strict** | GSAP timeline factories, CMS types, and form schemas all benefit. |
| Package mgr | **pnpm** | Fast, deterministic, plays nicely with Vercel. |
| Styling | **Tailwind 3.4** (layout) + **CSS Modules** (component-level) + **CSS variables** (design tokens) | Tailwind is great for layout primitives; CSS Modules for component-internal styles; CSS variables so GSAP, R3F, and raw CSS all read the same tokens. |
| Motion | **GSAP 3.12** (core + ScrollTrigger + SplitText + Observer + MotionPath + Inertia) | Industry standard for editorial scroll. Inertia for cursor follow. MotionPath for stroke-draw effects. |
| Smooth scroll | **Lenis 1.1** | Most reliable inertia feel, GSAP-ticker integration. |
| 3D | **three.js 0.169** + **@react-three/fiber 8** + **@react-three/drei 9** | Used only for: (1) ink-field full-bleed shader, (2) occasional portfolio card parallax depth, (3) `process` step hover micro-shader. Async-loaded. |
| Forms | **react-hook-form 7** + **zod 3** + `@hookform/resolvers` | Progressive enhancement; server validation in route handlers. |
| UI primitives | **Radix UI** (Dialog, Tabs, Tooltip, DropdownMenu, Slot) | Unstyled, accessible, headless. |
| i18n | **next-intl 3** | Even at English-only, the seams are there. |
| CMS | **Sanity** | Structured content for portfolio, services, journal, testimonials. Portable text for bio & essays. GROQ queries, RSC-friendly. |
| Email | **Resend** | Booking & contact forms. |
| Hosting | **Vercel** | Edge middleware for country detection, ISR for portfolio, image optimization. |
| Analytics | **Plausible** (primary, privacy-respecting) + **PostHog** (funnels + replays for the booking flow) | Two layers: privacy-safe page analytics, behavioral on the booking flow. |
| Error tracking | **Sentry** (browser) | Source-mapped, performance trace. |
| Testing | **Vitest** (unit), **Playwright** (e2e + visual), **axe-core** (a11y), **Lighthouse CI** (perf budgets) | |
| Storybook | **8.x** (Next.js framework) | Component-level visual review, a11y addon, a11y tests. |
| Quality gates | **Husky** + **lint-staged** + **GitHub Actions** | |

### 6.2 Rendering strategy

| Route | Strategy | Why |
|---|---|---|
| `/`, `/studio`, `/process`, `/about` | **Static (SSG/ISR)** with client islands for motion | Pure marketing; content rarely changes. |
| `/tattoos`, `/paintings`, `/sketches` | **ISR** (revalidate on demand from Sanity webhook) | Content updates from the CMS without rebuild. |
| `/contact` | **Static** | Form posts to a server action / route handler. |
| `/book` | **Static shell + client flow** | The form is a client component; the page is statically generated. |
| `/api/*` | **Edge** where possible (contact form, OG) | Latency. |

### 6.3 Image pipeline

- **Source:** Original JPEGs / ProRAW from studio shoots, exported to `.avif` (primary), `.webp` (fallback), JPEG (last-resort).
- **Storage:** Sanity asset CDN (auto-resize on demand) for portfolio; `/public/images/` for static hero stills and OG.
- **Delivery:** `next/image` everywhere. `sizes` is mandatory; `priority` only for the hero LCP image. AVIF first, WebP fallback, JPEG last.
- **Responsive set:** `360 / 640 / 828 / 1080 / 1440 / 1920 / 2048 / 3840`.
- **Lazy:** All non-LCP images lazy; below-the-fold images `loading="lazy"` + `decoding="async"`.

### 6.4 Font pipeline

- **Cormorant Garamond VF** self-hosted (`/public/fonts/`) with `font-display: swap` and a preloaded Latin subset.
- **MG12** — confirm license with the foundry; if unavailable, fall back to a high-quality geometric sans (e.g., *Söhne* trial or *Inter* for v1, with a swap to MG12 the moment the license clears).
- **Times New Roman** is the system font — no asset needed.
- Variable font axes (`wght`, `opsz`) exposed via `font-variation-settings` on hover states (e.g., the cursor turning a heading from 400 → 600 italic as it approaches).

### 6.5 Animation pipeline

- **GSAP + ScrollTrigger** owns all scroll-driven motion.
- **Lenis** owns smooth scroll; GSAP ticker is synced to Lenis's RAF via `gsap.ticker.lagSmoothing(0)`.
- **One timeline factory per section** in `src/animations/timelines/`. Each returns a `gsap.core.Timeline` plus a `kill()` function.
- **Client-side only.** GSAP code lives in client components; tree-shaking is enforced (`gsap/ScrollTrigger`, not the all-in-one `gsap` package, in hot paths).
- **Reduced motion:** `usePrefersReducedMotion` swaps every timeline for an instant, non-animated reveal. No shader. No smooth scroll.
- See [`docs/animations.md`](./animations.md) for the full choreography.

### 6.6 WebGL pipeline

- **One full-bleed canvas** in the root layout, sitting *behind* all DOM (`z-index: 0`, `pointer-events: none`).
- **Shader sources** in `src/shaders/*.frag`/`.vert`, loaded via `?raw` import or Webpack `asset/source` rule.
- **Three custom shaders:**
  1. **InkField** — animated low-frequency Simplex noise + slow FBM drift. The constant ambient layer.
  2. **Grain** — film-grain overlay applied as a final pass.
  3. **Distortion** — selective UV displacement around the cursor and on portfolio card hover.
- **One R3F component per shader** in `src/components/shaders/`, lazy-loaded (`next/dynamic` with `ssr: false`).
- **WebGL fallback:** If `WebGLRenderingContext` is unavailable, the canvas is removed and a static radial-gradient CSS background takes its place.
- See [`docs/shaders.md`](./shaders.md) for the GLSL.

### 6.7 Performance budgets

| Metric | Target | Hard cap |
|---|---|---|
| **LCP** (home, mobile) | ≤ 1.8s | ≤ 2.5s |
| **INP** (home, mid-tier mobile) | ≤ 180ms | ≤ 250ms |
| **CLS** | ≤ 0.05 | ≤ 0.1 |
| **TTFB** (Vercel edge) | ≤ 200ms | ≤ 400ms |
| **JS bundle (initial route)** | ≤ 130 KB gzipped | ≤ 180 KB |
| **Three.js chunk** | lazy only, never in initial bundle | n/a |
| **Frame rate (mid-scroll, mid-tier mobile)** | ≥ 55fps | ≥ 50fps |
| **Lighthouse Performance (mobile)** | ≥ 90 | ≥ 85 |
| **Lighthouse A11y** | ≥ 95 | ≥ 90 |
| **Total transferred (home)** | ≤ 1.8 MB | ≤ 2.5 MB |
| **Total requests (home)** | ≤ 55 | ≤ 75 |

These are enforced by Lighthouse CI on every PR. Failing CI = blocking.

### 6.8 Browser & device support

| Browser | Version | Notes |
|---|---|---|
| Chrome / Edge | last 2 | Full support, including all shaders. |
| Safari (desktop + iOS) | last 2 | All shaders; verify on iOS 16 + 17. |
| Firefox | last 2 | All shaders (with fallbacks for older). |
| Samsung Internet | last 2 | Mid-tier target. |
| Opera | last 2 | Best effort. |
| IE 11 / legacy Edge | not supported | Polite unsupported-browser message if detected. |

| Device | Notes |
|---|---|
| iPhone 12+ | Reference. |
| Mid-tier Android (Pixel 6a / Samsung A54) | Performance target. |
| Older Android (≤ 2019) | Reduced motion auto; no WebGL; no autoplay video. |

### 6.9 Accessibility commitments

- **WCAG 2.1 AA** minimum.
- All animations **respect `prefers-reduced-motion`**. The site is fully usable with motion disabled.
- **Focus management** is explicit:
  - Visible focus ring (`--color-focus` 2px solid + offset).
  - Skip-to-content link.
  - Tab order matches reading order.
  - When a `ScrollTrigger` animation moves focus-worthy content off-screen, that content is still reachable via keyboard (hidden in the visual layer, present in the a11y tree).
- **Cursor effects** never *replace* the system cursor on touch devices. On hover-capable devices, the custom cursor supplements (never replaces) the system cursor, which is always available via the OS setting.
- **Color contrast:** minimum 4.5:1 for body, 3:1 for large text and UI. Brand colors are adjusted for accent on dark; never for body text.
- **Captions** for all video; **transcripts** for all audio (we may add none, but the seam is there).
- **Form a11y:** every field has a label, an error, and a hint. Errors are announced via `aria-live="polite"`.
- **Dialogs** trap focus and restore it on close.
- **Tested with:** NVDA + Firefox, VoiceOver + Safari, axe-core in CI.

### 6.10 Security

- `Content-Security-Policy` with a tight default-src; `'unsafe-eval'` is **not** allowed (GSAP is fine without it).
- All form submissions server-validated with zod; CSRF protection via Next's built-in form actions.
- Rate-limit `/api/contact` and `/api/book` at the edge.
- Sanity read-only token in the browser is fine (it's scoped read-only); write token is server-only.
- No third-party scripts loaded in the global `<head>`. Analytics via `next/script` with `strategy="afterInteractive"`.

---

## 7. Content strategy

### 7.1 Voice & tone

- **Editorial, not corporate.** Sentences breathe. No exclamation marks. No "Welcome to our website!".
- **First-person in essays and process copy. Third-person in metadata and listings.**
- **Specifics over superlatives.** "She works from a sunlit studio in Vashi" beats "world-class facilities".
- **Bilingual instincts:** write English that a thoughtful Marathi or Hindi speaker would find elegant. Avoid slang that doesn't travel.
- **Never** say "best tattoo artist in Mumbai". Let the work and the testimonials argue it.

### 7.2 SEO surface

| Route | Title | Meta description |
|---|---|---|
| `/` | `MeetPrerna — Custom Tattoos & Abstract Art in Mumbai` | "A Navi Mumbai-based creative studio by Prerna — custom tattoos, abstract paintings, and sketches. Each piece is a slow, personal conversation." |
| `/studio` | `The Studio — MeetPrerna` | "A sunlit studio in Vashi, a four-pillar practice, and the way the work is made." |
| `/tattoos` | `Tattoos — MeetPrerna` | "Custom tattoos by Prerna: line, blackwork, flora, geometry, abstract. Browse the archive." |
| `/paintings` | `Paintings — MeetPrerna` | "Abstract paintings and original art for collectors and interiors. Studio enquiries welcome." |
| `/sketches` | `Sketches — MeetPrerna` | "Original pencil and ink sketches, the thinking-before-the-thinking." |
| `/process` | `The Process — MeetPrerna` | "From first conversation to healed tattoo: how a piece at MeetPrerna actually gets made." |
| `/about` | `About Prerna — MeetPrerna` | "Prerna is a tattoo artist, painter, and sketch artist based in Navi Mumbai. Bio, statement, and selected recognition." |
| `/contact` | `Contact — MeetPrerna` | "Start a project, ask a question, or visit the studio in Vashi by appointment." |
| `/book` | `Book a Consultation — MeetPrerna` | "Send a brief. Get a response within 48 hours. Begin a custom tattoo, painting, or sketch." |

**Structured data (JSON-LD):**

- `Person` (Prerna) on every page.
- `LocalBusiness` / `ProfessionalService` on `/contact` and `/book`.
- `VisualArtwork` on portfolio item detail views.
- `BreadcrumbList` on all subpages.
- `FAQPage` on `/process` and `/about`.
- `ImageObject` with `license` and `creator` on portfolio images.

**OG image generation:** `app/api/og/route.tsx` using `@vercel/og`. Renders a typographic card per route.

### 7.3 Asset inventory

The full inventory lives in [`docs/content.md`](./content.md). At minimum, the launch build needs:

- 24–36 portfolio pieces with titles, year, medium, dimensions/placement, and 1–3 images each.
- 3 portraits of Prerna (1 square, 1 wide, 1 editorial).
- 6–10 studio photos.
- 3 short videos (one per practice: tattooing, painting, sketching), under 30s, vertical-first for Reels.
- 6 testimonials with first name + last initial + city (e.g., "Aanya R., Mumbai").
- Process copy (~1,200 words across five steps).
- Studio essay (~600 words).
- About copy (~400 words).
- 8 FAQs.
- 1 press kit (PDF, ≤ 4MB).

---

## 8. Phase gates (the actual work plan)

Each phase ends in a **demo + sign-off**. A phase is "done" only when its gate is passed. The gate is a checklist; not vibes.

### Phase 1 — Foundation

**Goal:** A buildable, type-safe, lint-clean, design-token-driven foundation with CI.

**Scope:**

- Repo scaffold, monorepo decision (single app for v1).
- Tooling: Next 14, TS strict, Tailwind, ESLint, Prettier, Husky, lint-staged.
- `tsconfig.json` paths locked. `package.json` scripts defined.
- `src/styles/tokens.css` — all design tokens (colors, type, space, motion).
- `src/styles/fonts.css` — font-face declarations.
- Fonts self-hosted; `next/font` integration.
- `tailwind.config.ts` consuming tokens.
- Storybook 8.x scaffolding with a11y addon.
- Vitest, Playwright, Lighthouse CI all wired.
- `app/layout.tsx` with root metadata, OG defaults, `viewport` for theme color.
- One canonical "Hello, MeetPrerna" page rendering all four brand colors + one type style per family.
- `README.md` with developer onboarding.

**Phase 1 gate:**

- [ ] `pnpm install` clean from a fresh clone.
- [ ] `pnpm dev` serves a working page.
- [ ] `pnpm typecheck && pnpm lint && pnpm test && pnpm build` all green.
- [ ] Storybook boots, the canonical page story renders.
- [ ] Lighthouse CI on the canonical page: Performance ≥ 95 desktop, A11y = 100.
- [ ] One PR merged, with at least one review from each role in [`docs/agents.md`](./agents.md).

### Phase 2 — Structure

**Goal:** The full site is navigable with no animation, no shaders. Content is editable from the CMS. Lighthouse Performance ≥ 90 mobile.

**Scope:**

- Routes for `/`, `/studio`, `/tattoos`, `/paintings`, `/sketches`, `/process`, `/about`, `/contact`, `/book`.
- Layout, header, footer, mobile nav.
- Section components rendered with real (or placeholder) content — no animation yet.
- Sanity schemas: `portfolioItem`, `service`, `testimonial`, `faq`, `page` (for studio/process/about copy).
- Image pipeline: Sanity image URLs + `next/image` integration, responsive `<Image>` component, blur placeholders.
- Forms: contact + book wired to `/api/contact` + `/api/book` (zod validated, Resend delivery).
- SEO: per-route metadata, OG generation, sitemap.ts, robots.ts, JSON-LD.
- 404, error, loading states.

**Phase 2 gate:**

- [ ] All routes navigable; all forms submittable; all images rendering with blur placeholders.
- [ ] Lighthouse mobile: Performance ≥ 85, A11y ≥ 95, SEO = 100.
- [ ] axe-core: 0 critical issues.
- [ ] CMS round-trip: a content change in Sanity is reflected in the build within 60s.
- [ ] Smoke test suite green.

### Phase 3 — Motion

**Goal:** The site *moves* — the full choreography, but shaders are still off. Frame rate target met on mid-tier mobile.

**Scope:**

- Lenis smooth scroll, GSAP ticker integration.
- Custom cursor (ink-blot, text-aware, touch-disabled).
- Page transitions.
- Per-section timelines in `src/animations/timelines/`.
- `usePrefersReducedMotion` honored everywhere.
- A11y: focus order, skip link, focus rings, motion-off fallback.
- Reduced-motion mode functional end-to-end.

**Phase 3 gate:**

- [ ] Home, studio, process, tattoos, paintings, sketches, about, contact, book all animated.
- [ ] Frame rate ≥ 55fps in scroll-stress test on Pixel 6a.
- [ ] All reduced-motion fallbacks verified manually with VoiceOver + keyboard.
- [ ] No layout shift triggered by any animation.
- [ ] Lighthouse mobile: Performance ≥ 90, A11y ≥ 95.

### Phase 4 — Polish

**Goal:** Shaders, advanced effects, performance optimization to budget.

**Scope:**

- WebGL ink-field shader, grain pass, cursor distortion.
- Portfolio card depth tilt.
- Hero video (if any) and autoplay rules.
- Image fade-in with mask reveal.
- Cursor blend modes.
- Final performance pass: bundle audit, font subsetting, image format tuning, prefetch strategy.
- Storybook visual snapshots for components with motion.
- Sentry wired.

**Phase 4 gate:**

- [ ] All three shaders deployed and visible on a mid-tier device.
- [ ] Lighthouse mobile: Performance ≥ 90, A11y ≥ 95, Best Practices = 100.
- [ ] Bundle: gsap chunk separate, three chunk async-only.
- [ ] Sentry receiving and grouping errors correctly.
- [ ] Visual regression: 0 unintended diffs.

### Phase 5 — Launch

**Goal:** Live, monitored, content-loaded, owner-trained.

**Scope:**

- Full content population: all portfolio items, all FAQs, all testimonials, all essays, press kit.
- CMS training session with Prerna (recorded).
- Pre-launch a11y audit (third-party).
- Pre-launch performance audit on production URLs.
- Soft launch (close friends / portfolio reviewers), gather feedback, fix.
- Public launch.
- Monitoring dashboards live.
- Runbook for common content tasks.

**Phase 5 gate:**

- [ ] All copy proofread.
- [ ] All imagery captioned and alt-tagged.
- [ ] All forms tested end-to-end with real email delivery.
- [ ] Sitemap submitted to Google Search Console.
- [ ] Plausible + PostHog live and reporting.
- [ ] Domain DNS, SSL, HSTS, redirects all verified.
- [ ] Rollback plan documented.
- [ ] 7-day post-launch stability window with no P0/P1 incidents.

---

## 9. Timeline & milestones

> Indicative; final dates are set at Phase 1 sign-off based on team capacity.

| Phase | Indicative duration | Milestone |
|---|---|---|
| **Phase 1 — Foundation** | 1 week | Build pipeline + tokens + CI green |
| **Phase 2 — Structure** | 2–3 weeks | All routes + CMS + forms live (no motion) |
| **Phase 3 — Motion** | 2–3 weeks | Full scroll choreography + cursor + transitions |
| **Phase 4 — Polish** | 1–2 weeks | Shaders + perf to budget |
| **Phase 5 — Launch** | 1 week | Content, audit, deploy, monitor |
| **Total** | **7–10 weeks** | Public launch |

Critical path: Phase 3 (Motion). Animation timeline fabrication is the slowest work; the timeline factories and the GSAP contract need to be locked before sections can be styled.

---

## 10. Open questions & decisions

These need an answer before Phase 1 starts.

| # | Question | Default if no answer | Owner |
|---|---|---|---|
| 1 | Confirm Sanity as CMS | Yes — Sanity is in the plan. | Studio |
| 2 | Booking flow — own or link to Calendly/Cal.com? | Own (server form + email), with a Calendly fallback in `/book`. | Studio |
| 3 | Hindi/English at launch? | English only; i18n seams in place. | Studio |
| 4 | Original imagery available? | 24–36 portfolio pieces + 3 portraits + 6–10 studio photos needed. | Studio |
| 5 | Domain + email set up? | `meetprerna.com` + `studio@meetprerna.com` via Resend / Google Workspace. | Studio |
| 6 | MG12 font license confirmed? | Fall back to Inter (open source) for v1; swap to MG12 if license clears. | Studio |
| 7 | Will Prerna shoot studio video, or do we commission? | Recommend 3 short vertical videos (≤30s, 9:16) per practice. | Studio |
| 8 | Press logos / recognition to feature? | Empty state allowed; reserve a "Press" section for Phase 5+ content. | Studio |
| 9 | Are there any pieces that should *not* appear online? | Yes — out-of-respect default is opt-in for the public portfolio. | Studio |
| 10 | Photography style — studio selects photographer or do we shoot in-house? | Recommend commissioning a single half-day shoot to lock the visual language. | Studio |

---

## 11. Risk assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Animation performance on low-end Android** | High | High | Lazy-load shaders, frame-rate monitor, reduced-motion mode, aggressive asset budget. |
| **Content not ready by Phase 5** | Medium | High | Use the same placeholders from Phase 2; do a dedicated content phase with Prerna in week 6. |
| **Scope creep — adding more routes (journal, shop, podcast)** | High | Medium | Locked non-goals (ARCHITECTURE §8). "Journal" reserved, not built. |
| **GSAP licensing** | Low | Low | The free bundle is sufficient for v1. If MotionPath/Inertia/SplitText become essential, the GreenSock Business license is ~$1k/yr. |
| **WebGL support edge cases** | Medium | Medium | Static gradient fallback. Test on a matrix of devices during Phase 4. |
| **CMS field modeling mistakes** | Medium | Medium | Lock the Sanity schema in Phase 1 (even if empty) so the structure doesn't have to migrate. |
| **Subject rights on published tattoo photos** | Medium | High | Default opt-in; clear "permission to publish" step in the consultation flow. |
| **Hindi / Marathi copy pressure after launch** | Medium | Low | Architecture supports it; we can ship locale support as a Phase 5+ delta. |
| **Hot, un-air-conditioned studio shooting photos in summer** | Low | Low | Plan the shoot for October–February. |
| **GDPR / DPDP Act (India) compliance for forms** | Low | Medium | Minimal data, clear consent, link to privacy policy, retention policy. |

---

## 12. Out of scope (v1)

- E-commerce / cart.
- Multi-language.
- User accounts.
- Comment / community features.
- A separate "studio management" back-office (the CMS is the only back-office).
- Native mobile app.

---

## 13. Approvals

| Role | Name | Date | Signature |
|---|---|---|---|
| Founder / Studio | Prerna | _pending_ | _pending_ |
| Tech Lead | _assigned at Phase 1_ | _pending_ | _pending_ |
| Design Lead | _assigned at Phase 1_ | _pending_ | _pending_ |
| Animation Lead | _assigned at Phase 1_ | _pending_ | _pending_ |
| WebGL Lead | _assigned at Phase 1_ | _pending_ | _pending_ |
| Content Lead | _assigned at Phase 1_ | _pending_ | _pending_ |
