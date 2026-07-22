# MeetPrerna — Technical Architecture & Development Blueprint

> A single document map. Read this first to orient, then dive into the linked specs.

---

## 1. Mission

Build a portfolio website for **MeetPrerna** that:

1. **Expresses the studio's emotional thesis** — that tattooing, painting, and sketching are acts of *psychology, meditation, therapy, and calmness* for both the artist and the client.
2. **Sets a new visual bar for a Mumbai-based creative studio** — drawing craft from reference sites like floema.com and torchsystems.com without imitating them.
3. **Converts** — turns the right visitors into booked consultations.

This is not a brochure. It's a *kinetic editorial* — built so the typography, the scroll, the cursor, the cursor's tail of ink, and the brand's inchworm-green accents all argue the same thesis at the same time.

---

## 2. System map

```
┌──────────────────────────────────────────────────────────────────────┐
│                          MEETPRERNA  (Next.js 14)                    │
│                                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ ┌─────────┐  │
│  │   App    │  │Sections  │  │Animation │  │ Shaders  │ │  CMS    │  │
│  │ Router   │→ │(per page)│→ │ (GSAP)   │←→│ (three)  │←│(Sanity) │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘ └────┬────┘  │
│       │             │             │             │            │        │
│       ↓             ↓             ↓             ↓            ↓        │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │                Design Tokens (CSS variables)                  │    │
│  │                tokens.css + tailwind.config.ts                │    │
│  └──────────────────────────────────────────────────────────────┘    │
│       │             │             │             │            │        │
│       ↓             ↓             ↓             ↓            ↓        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ ┌─────────┐  │
│  │  Render  │  │ Lenis    │  │  Scroll  │  │  WebGL   │ │  ISR +  │  │
│  │  (RSC +  │←→│ Smooth   │←→│ Trigger  │←→│  Pass    │←│  Edge   │  │
│  │  Client) │  │ Scroll   │  │          │  │          │ │ Cache   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ └─────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3. Reading order (recommended)

| # | Doc | Audience | What it answers |
|---|---|---|---|
| 1 | **PRD** | PM, founder, lead eng | Scope, personas, phase gates, risks |
| 2 | **agents** | All engineers & AI assistants | Who's who, who decides what, who reviews |
| 3 | **designs** | Designers, animators, FE | Tokens, components, motion grammar |
| 4 | **animations** | Animation engineer | Per-section timeline choreography |
| 5 | **shaders** | WebGL engineer | GLSL code, uniforms, perf budgets |
| 6 | **components** | FE | API contracts for every reusable |
| 7 | **content** | Copywriter, strategist | Copy, taxonomy, SEO surface |

---

## 4. Tech stack — short version

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14** (App Router, RSC) | Best-in-class routing + streaming + image opt; first-class TS; mature CI/CD with Vercel. |
| Language | **TypeScript strict** | One source of truth; animation timelines are typed. |
| Styling | **Tailwind** (layout) + **CSS Modules** (component) + **CSS variables** (tokens) | Tailwind alone is too utility-flat for an editorial site. CSS variables let GSAP and R3F read the same palette. |
| Motion | **GSAP 3.12** + ScrollTrigger + SplitText + Observer | Industry standard for scroll-driven editorial. Inertial smooth scroll via Lenis. |
| Smooth scroll | **Lenis** | Lightweight, RAF-driven, plays well with GSAP ticker. |
| 3D / WebGL | **three.js** + **@react-three/fiber** | Selective — only hero background distortion, portfolio card depth, occasional ink-drop particles. Lazy-loaded. |
| Forms | **react-hook-form** + **zod** | Type-safe validation; progressive enhancement. |
| CMS | **Sanity** | Structured content for portfolio, services, journal. GROQ queries. |
| Hosting | **Vercel** | Edge middleware for country detection; ISR for portfolio. |
| Analytics | **Plausible** (primary) + PostHog (funnels) | Privacy-respecting. |
| Testing | **Vitest**, **Playwright**, **axe-core**, **Lighthouse CI** | Unit, e2e, a11y, perf. |

See [PRD §6 — Technical Architecture](./PRD.md#6-technical-architecture) for the long version and rationale.

---

## 5. Folder architecture (codebase)

```
meetprerna/
├── app/                              # Next.js App Router (RSC by default)
│   ├── (marketing)/                  # Route group for top-level marketing pages
│   │   ├── layout.tsx                #   Shared layout (header, footer, cursor, smooth scroll)
│   │   ├── page.tsx                  #   Home
│   │   ├── studio/page.tsx           #   Studio story
│   │   ├── tattoos/page.tsx          #   Tattoo portfolio
│   │   ├── paintings/page.tsx        #   Paintings
│   │   ├── sketches/page.tsx         #   Sketches
│   │   ├── process/page.tsx          #   The five-step process
│   │   ├── about/page.tsx            #   About Prerna
│   │   ├── contact/page.tsx          #   Contact
│   │   └── book/page.tsx             #   Booking flow entry
│   ├── api/                          # Route handlers
│   │   ├── contact/route.ts
│   │   ├── book/route.ts
│   │   ├── revalidate/route.ts
│   │   └── og/route.tsx              # Dynamic OG image generation
│   ├── layout.tsx                    # Root layout: html, body, fonts, theme, providers
│   ├── error.tsx                     # 500 boundary
│   ├── not-found.tsx                 # 404
│   ├── sitemap.ts
│   ├── robots.ts
│   └── manifest.ts
│
├── src/
│   ├── components/
│   │   ├── layout/                   # Header, Footer, Navigation, CookieBar
│   │   ├── sections/                 # Page-level sections (one folder per section)
│   │   │   ├── hero/                 #   Hero choreography + canvas
│   │   │   ├── manifesto/            #   Brand-thesis section
│   │   │   ├── portfolio/            #   Filterable portfolio grid
│   │   │   ├── services/             #   Tattoo / Painting / Sketch service tiles
│   │   │   ├── process/              #   Five-step process (with shader)
│   │   │   ├── about/                #   About Prerna
│   │   │   ├── studio/               #   The space (photos + map)
│   │   │   ├── testimonials/         #   Editorial testimonials
│   │   │   ├── faq/                  #   Accordion FAQ
│   │   │   ├── contact/              #   Contact section + form
│   │   │   └── footer/               #   Site footer
│   │   ├── ui/                       # Atomic UI (Button, Tag, Dialog, Tabs, etc.)
│   │   ├── primitives/               # Visual primitives (Marquee, MaskReveal, Magnetic, etc.)
│   │   ├── media/                    # Media components (RevealImage, VideoFrame, Gallery)
│   │   ├── shaders/                  # R3F shader components (InkField, etc.)
│   │   └── cursor/                   # Custom cursor (ink-blot, text-aware)
│   │
│   ├── hooks/                        # Reusable React hooks
│   │   ├── useLenis.ts
│   │   ├── useGsapContext.ts
│   │   ├── useScrollProgress.ts
│   │   ├── useMatchMedia.ts
│   │   ├── usePrefersReducedMotion.ts
│   │   ├── usePointer.ts
│   │   ├── useInView.ts
│   │   └── useIsCoarsePointer.ts
│   │
│   ├── animations/                   # Timeline factories & orchestration
│   │   ├── timelines/                # One file per orchestrated section
│   │   │   ├── hero.timeline.ts
│   │   │   ├── manifesto.timeline.ts
│   │   │   ├── portfolio.timeline.ts
│   │   │   ├── process.timeline.ts
│   │   │   ├── marquee.timeline.ts
│   │   │   └── pageTransition.ts
│   │   ├── reveal.ts                 # Generic reveal helper (text, image, mask)
│   │   ├── parallax.ts              # Parallax factory
│   │   ├── cursor.ts                 # Cursor timeline factory
│   │   ├── easing.ts                 # Custom eases (studio, editorial, soft)
│   │   └── index.ts                  # Barrel
│   │
│   ├── shaders/                      # GLSL source files
│   │   ├── inkField.frag
│   │   ├── inkField.vert
│   │   ├── grain.frag
│   │   ├── distortion.frag
│   │   ├── particles.frag
│   │   ├── common/                   # noise, sdf, color helpers
│   │   └── index.ts
│   │
│   ├── lib/                          # Pure libs (no React)
│   │   ├── lenis.ts                  # Singleton smooth scroll
│   │   ├── gsap.ts                   # GSAP + plugin registration
│   │   ├── sanity/                   # CMS client + queries
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── types.ts
│   │   ├── seo/                      # Metadata helpers
│   │   ├── analytics.ts              # Event dispatcher
│   │   ├── forms/                    # Server-side handlers
│   │   ├── env.ts                    # Typed env via @t3-oss/env-nextjs
│   │   └── utils/
│   │
│   ├── content/                      # Static structured content (non-CMS)
│   │   ├── nav.ts
│   │   ├── manifesto.ts
│   │   ├── faqs.ts
│   │   ├── testimonials.ts
│   │   ├── services.ts
│   │   ├── process.ts
│   │   └── seo.ts
│   │
│   ├── styles/
│   │   ├── globals.css               # Resets, base typography, layer order
│   │   ├── tokens.css                # All design tokens (CSS variables)
│   │   ├── fonts.css                 # @font-face declarations
│   │   ├── shaders.css               # Canvas host styles
│   │   └── prose.css                 # Long-form prose
│   │
│   ├── types/                        # Ambient types
│   │   ├── content.d.ts
│   │   ├── sanity.d.ts
│   │   ├── three.d.ts
│   │   └── env.d.ts
│   │
│   ├── utils/                        # Small pure utilities
│   │   ├── cn.ts                     # Tailwind class merge
│   │   ├── clamp.ts
│   │   ├── format.ts
│   │   ├── image.ts                  # next/image helpers
│   │   └── seo.ts
│   │
│   └── config/
│       ├── site.ts                   # Site-wide constants
│       ├── nav.ts
│       └── features.ts               # Feature flags
│
├── public/
│   ├── fonts/                        # Self-hosted variable fonts
│   │   ├── CormorantGaramond-VF.woff2
│   │   ├── MG12VF.woff2              # or fallback stack
│   │   └── LICENSE.md
│   ├── images/
│   │   ├── hero/                     # Hero stills & responsive sets
│   │   ├── portfolio/                # Portfolio art (organized by year/series)
│   │   │   ├── 2024/
│   │   │   ├── 2025/
│   │   │   └── 2026/
│   │   ├── about/                    # Prerna's portraits
│   │   ├── studio/                   # Studio interior
│   │   └── og/                       # Static OG fallbacks
│   ├── icons/                        # SVG icons (sprite)
│   ├── videos/
│   │   ├── process/                  # Process reels (MP4 + WebM)
│   │   └── reels/                    # Behind-the-scenes
│   ├── textures/
│   │   ├── noise-256.png
│   │   ├── paper-1024.png
│   │   └── grain-512.png
│   └── models/                       # Optional .glb (3D)
│
├── tests/
│   ├── unit/                         # Vitest
│   ├── e2e/                          # Playwright
│   └── visual/                       # Screenshot diffs
│
├── scripts/
│   ├── lighthouse.sh
│   ├── prepare-fonts.mjs
│   └── seed-cms.mjs
│
├── .github/
│   └── workflows/                    # CI: lint, typecheck, test, e2e, lighthouse, deploy
│
├── .vscode/
│   ├── settings.json                 # Formatter on save, ESLint
│   ├── extensions.json
│   └── launch.json
│
├── docs/                             # ← this directory
│   ├── ARCHITECTURE.md
│   ├── PRD.md
│   ├── agents.md
│   ├── designs.md
│   ├── content.md
│   ├── animations.md
│   ├── shaders.md
│   └── components.md
│
└── [config files at root]
    ├── package.json
    ├── tsconfig.json
    ├── next.config.js
    ├── tailwind.config.ts
    ├── postcss.config.js
    ├── .eslintrc.json
    ├── .prettierrc.json
    ├── .gitignore
    ├── .env.example
    ├── README.md
    └── lighthouserc.json
```

**Why this shape?**

- **`src/` for source, `app/` for routes.** Next.js requires `app/` at the root. Keeping all *non-route* code under `src/` lets us alias cleanly, makes the route tree scannable, and lets future monorepo splits move `src/` wholesale.
- **One folder per section.** Each `src/components/sections/<name>/` is a small sub-package with its own components, hooks, and styles. This prevents the *giant `components/` dump* problem.
- **`animations/` separate from `components/`.** Timelines are orchestration, not view code. They live in pure functions called by the components, and can be unit-tested without rendering.
- **`shaders/` separate from `components/shaders/`.** GLSL source files (`.frag`/`.vert`) live flat; the R3F components that mount them are React.
- **`content/` for static structured data.** Copy, FAQs, and nav that don't belong in the CMS live here, fully typed.

---

## 6. Naming conventions (lock these in early)

| Concept | Convention | Example |
|---|---|---|
| Components | `PascalCase.tsx` | `RevealImage.tsx` |
| Section components | `PascalCase` ending in subject | `HeroSection.tsx`, `ProcessSection.tsx` |
| Hooks | `camelCase` with `use` prefix | `useScrollProgress.ts` |
| Utility functions | `camelCase` | `formatCurrency.ts` |
| Constants | `UPPER_SNAKE_CASE` for top-level | `BREAKPOINTS`, `LENIS_DEFAULTS` |
| Types | `PascalCase` | `PortfolioItem`, `ServiceOffering` |
| CSS Modules | `kebab-case.module.css` | `hero.module.css` |
| Animation timelines | `camelCase.timeline.ts` | `hero.timeline.ts` |
| Shader sources | `camelCase.frag`/`.vert` | `inkField.frag` |
| Routes | lowercase kebab | `/process`, `/book` |
| Branch names | `phase/<n>/<scope>` | `phase/3/animation-portfolio` |
| Commit prefix | Conventional Commits | `feat(hero): add ink cursor blend` |
| Files in `public/images` | `<scope>-<subject>-<size>.<ext>` | `hero-studio-wide-2400.avif` |

---

## 7. The five-phase build

The build is gated — no phase starts until the previous one is **signed off** in [PRD §9 — Timeline & Milestones](./PRD.md#9-timeline--milestones).

| Phase | Name | Key output | Phase gate |
|---|---|---|---|
| **1** | Foundation | Repo scaffolded, tokens live, fonts loaded, CI green | Tokens, fonts, CI pass |
| **2** | Structure | Layout, header/footer, page shells, navigation | LCP < 2.0s on marketing route |
| **3** | Motion | Lenis + GSAP + section timelines, page transitions, cursor | 60fps mid-tier mobile on home |
| **4** | Polish | Shaders, advanced effects, performance | Lighthouse Performance ≥ 90 mobile |
| **5** | Launch | A11y audit, copy review, CMS seed, deploy | All WCAG 2.1 AA, all smoke tests green |

See [PRD](./PRD.md) for the full breakdown.

---

## 8. Non-goals (so we don't drift)

- **No e-commerce.** The studio does not sell prints or merch online. The site drives bookings.
- **No blog/CMS-first article pipeline at launch.** A "Journal" surface is reserved for Phase 5+ if needed.
- **No multi-language at launch.** English only. Locale scaffolding via `next-intl` is in place so a Hindi or Marathi edition can ship later.
- **No 3D model viewer.** No `.glb` of a tattoo machine. WebGL is reserved for *ambient* effects (ink field, grain, distortion), not product viewers.
- **No WebGL on `prefers-reduced-motion`.** Always fall back gracefully.

---

## 9. Open questions for sign-off

These are the only blockers before Phase 1 begins. The full list lives in [PRD §10 — Open Questions](./PRD.md#10-open-questions--decisions).

1. **CMS choice — Sanity confirmed?** Or do you want to start content in MDX and migrate later?
2. **Booking — own the flow or link out?** (Calendly / Cal.com / custom Sanity form)
3. **Hindi/English toggle at launch?** Default plan is English-only with the seams in place.
4. **Original portfolio imagery — what's available and what needs to be shot?**
5. **Domain + email — `meetprerna.com` confirmed, studio@meetprerna.com set up?**
