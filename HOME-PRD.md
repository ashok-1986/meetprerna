# HOME PAGE PRD (Product Requirements Document)


## 0. GLOBAL RULES (Strict Enforcement)


1. **Layout System:** Two-Anchor layout only. Content is pinned to the left 32px gutter (24px mobile) and right 32px gutter. **DO NOT use centered containers** (`max-w-7xl`, `container mx-auto`). The middle space must remain empty to create physical tension.
2. **Backgrounds (The Ground Shift):** The top half of the site (Blocks 01 to 04) must use the dark ground (`--color-ink`). The bottom half switches to a light ground (`--color-ivory`).
3. **Header Behavior (D25 Sync):** The header remains transparent and full-width until exactly **120px** of scroll. It then shrinks into the dark pill shape. Do not use viewport-height (svh) triggers for the header.
4. **Accent Color (Neon `#C4FF61`):** Strict 10% threshold. Use strictly on the Logo, Primary CTAs, and a maximum of 2-3 high-impact keywords. Do not use on body text or headings.
5. **Typography:**
* Display: Cormorant Garamond. **H1 weight must be 400** (Owner override).
* Body: Inter.
* Metadata: JetBrains Mono.


6. **Motion:** Native scroll driven by GSAP `ScrollTrigger`. Animate ONLY GPU-accelerated properties (`transform`, `opacity`, `clip-path`, `filter`). Respect `prefers-reduced-motion`.


---


## BLOCK 01: HERO (The Hook & Awareness)


**Goal:** Instant cinematic impact and emotional connection.
* **Layout:** Exactly `100svh` Sticky Camera. Full-bleed background image (`prerna-working-bw.jpg`). Scrim overlay: `linear-gradient` applied to ensure text readability on the right side.
* **Copy (Two-Anchor):**
* **Left Anchor (H1):** "Art that agesBeautifully." (2 lines. Cormorant Garamond, weight 400, `--text-display-xl`, `--color-ivory`).
* **Right Anchor (Subhead):** "Tattoos look striking when fresh, but I design for the decades. Custom ink crafted for your unique contours, made in quiet conversation, and never in a rush." (Inter, `--text-body-l`, `--color-ivory-dim`, max-width applied).
* **Right Anchor (CTA):** "Start a conversation" (Link: `/consulting`). **Styling:** Transparent bg, 1px solid `#C4FF61` border, text `#C4FF61`, rounded-full. Hover: Solid `#C4FF61` bg, `--color-ink` text.


* **Engineering Constraints (Strict):**
* **FOUC Guard:** Parent containers (`h1`, `p`, `a`) MUST hardcode Tailwind `opacity-0` in the server JSX. Restore visibility via a `<noscript>` style block.
* **Layout Physics:** The Left Anchor (H1 container) MUST have `flex-none` and `whitespace-nowrap` applied so Flexbox does not vertically crush the text on 13-inch screens.
* **Animation Engine:** Do NOT use a time-based load reveal. The hero animation is driven exclusively by a GSAP `.timeline` with `scrollTrigger` using `scrub: true` and `pin: ".gs-hero-camera"`. Characters are pushed down via CSS/GSAP `.set` and scrubbed to `y: 0%`.




---


## BLOCK 02: LOCATION MARQUEE (The "Where")


**Goal:** Immediate geographical qualification.
* **Layout:** Full-width band. Dark background.
* **Copy:** "Mumbai · Navi Mumbai · Travelling Artist" (Repeated for seamless loop). JetBrains Mono, `--text-mono`, `--color-ivory-dim`.
* **Animation:** Continuous horizontal CSS scroll. 40s linear duration. Pauses on hover.
* **Accessibility:** Use `aria-hidden` on duplicate visual tracks for screen readers.


---


## BLOCK 03: STATS GRID (The Credibility)


**Goal:** Establish tenure and volume instantly to soothe first-timer anxiety.
* **Layout:** Two-Anchor.
* **Left Anchor:** Thesis "Ink that goes deeper than skin." (Cormorant Garamond, `--text-display-l`, weight 400).
* **Right Anchor:** 2x2 Grid. Add thin hairlines (`1px solid --color-ink-300`) between cells.


* **Copy (Right Anchor):**
* **500+** / Tattoos completed
* **100+** / Custom designs
* **Since 2021** / Tattooing
* **Fine Arts** / Diploma, JK Academy


* **Technical Requirement:** All figure containers must have a fixed `min-height` (e.g., `2.3em`) so single-line and double-line figures align perfectly on the same baseline.
* **Animation:**
* Trigger: `start: "top 65%"`.
* Duration: **1200ms**. Stagger: **120ms**. Technique: `opacity: 0` to `1`, `translateY: 16px` to `0`.
* Hover: Specific grid cell background fills with `rgba(253, 255, 233, 0.05)` and shifts up 4px. **NO JavaScript number counters.**
* **NOTE (unreconciled):** shipped `StatsGrid.tsx` actually uses `start: "top 85%"`, **800ms** duration, `translateY: 30px`. Stagger (120ms) and easing (`power3.out`) match this spec. Whoever reconciles this doc should decide which numbers are correct — `src/components/about/HowThisStarted.tsx` deliberately follows the shipped component, not this spec.




---


## BLOCK 04: SELECTED WORK DRAG RAIL (The "Designs")


**Goal:** Physical proof of skill and aesthetic diversity.
* **Layout:** Horizontal drag rail breaking the right bound. 8 pieces. Every 3rd card is a silent, looping video.
* **Interaction:** Native horizontal scroll + JS pointer drag physics. Cursor changes to `grab`/`grabbing`.
* **Animation:** Standard GSAP scroll reveal for the container.


---


## BLOCK 04b: THE STILL BAND (The Hinge)


**Goal:** The visual palate cleanser and the single ground shift (Dark → Light).
* **Layout:** Full-bleed, ~80svh. Background image: `prerna-working-bw.jpg` (Next.js `<Image>` with `fill`, `object-fit: cover`).
* **Copy (Left Anchor, pinned to 32px gutter):**
* Line 1: "She has never done the same thing twice." (`--text-display-l`, `--color-ivory`).
* Line 2: "On purpose." (`--text-display-l`, `--color-inchworm` / neon accent).


* **The Ground Shift (CRITICAL):** This section acts as the curtain. The page background must transition from `--color-ink` to `--color-ivory` underneath this image. When the user scrolls past it, the site is permanently on the light ground for the rest of the page. DO NOT use a scroll-scrubbed crossfade. The image hides the transition.


---


## BLOCK 05: THE 4 PILLARS TEASER (The Philosophy)


**Goal:** Explain the methodology briefly and set expectations for the studio experience.
* **Layout:** Two-Anchor on light ground. Left: Pillar Names. Right: Short teaser sentences.
* **Copy:**
* **01 Mapping The Self:** "Choosing to mark your skin is a decision about who you are becoming."
* **02 Words Before Ink:** "Every piece begins with a quiet conversation. No pressure, no rushed sketches."
* **03 The Abstract Form:** "Your story is translated into abstract art, crafted for your unique contours."
* **04 A Safe Exhale:** "The studio is a quiet room. A place to pause, to be seen, and to leave a part of your journey permanently etched in peace."


* **Animation:** Standard GSAP scroll reveal. 40ms stagger.


---


## BLOCK 06: INVESTMENT TEASER (The "Pricing")


**Goal:** Answer the money question transparently to qualify leads.
* **Layout:** Two-Anchor. Left: "Investment". Right: "Custom work starts at ₹[X,XXX]. See the full pricing and process guide." (Link to `/sanctuary`).
* **Animation:** Standard GSAP scroll reveal.


---


## BLOCK 07: VOICES (The "Proof")


**Goal:** Social proof for final assurance.
* **Layout:** 3 large testimonial cards.
* **Copy:** "Some earlier clients knew her as Alza." + 3 client quotes.
* **Animation:** Standard GSAP scroll reveal. 40ms stagger.


---


## BLOCK 08: CLOSE (The Action)


**Goal:** Final conversion.
* **Layout:** Centered or Two-Anchor.
* **Copy:** "Start a conversation". Link to `/consulting`.
* **Animation:** Standard GSAP scroll reveal.
