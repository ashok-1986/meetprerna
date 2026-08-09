MeetPrerna — Design System & Motion Architecture (v2.0)

Status: Provisional & Flexible Reference
Version Control Notes: Updated to incorporate DESIGN.md tokens, HOME-PRD.md specifications, and BLUEPRINT.md layout rules. Resolves conflicting structural concepts into a unified native-GSAP architecture.

1. Design System Foundation

1.1 Color Tokens & Accent Budget

The palette relies on a monotonic light-to-dark surface system with a strict 10% "Accent Budget" for the neon highlight.

Dark Ground (Ink):

--color-ink: #111111 (Base canvas)

--color-ink-100: #212121 (Raised cards/dialogs)

--color-ink-200: #2A2A2A (Hover surface)

--color-ink-300: #363636 (Decorative hairlines ONLY)

--color-ink-500: #6B6B6B (Borders, disabled elements)

Light Ground (Ivory):

--color-ivory: #FDFFE9 (Body text on dark, base canvas on light)

--color-ivory-dim: #C9CBB6 (Captions, metadata)

The Accent (Inchworm):

--color-inchworm: #C4FF61 (Primary CTA, focus rings)

--color-inchworm-deep: #9FCC4A (Pressed states, text on light ground)

--color-inchworm-tint: rgb(196 255 97 / 0.12) (Fills, never text)

Semantic:

--color-danger: #FF6B6B

Accent Usage: Restricted to functional signals ("act here" or "you are here"). Never used as decoration, background fills larger than a button, or body text.

1.2 Typography Hierarchy

Display & Headings: Cormorant Garamond (Weights: 300, 400). Standard H1 weight is strictly 400.

--text-display-xl: clamp(3.25rem, 11vw, 10rem)

--text-display-l: clamp(2.25rem, 6vw, 5rem)

Note: No sizes exist between display-l and h1.

Body & UI: Urbanist (Weight: 400). Base size capped at 16px min on mobile. Measure (line length) restricted to 38-52ch (mobile) and 62-70ch (desktop).

Metadata & Eyebrows: JetBrains Mono. Used exclusively for real data (years, mediums, stats) and Section Eyebrows. 
*   **Section Eyebrow Standard:** `font-mono text-xs md:text-sm tracking-[0.2em] uppercase`. Color: `text-ivory/50` on dark grounds, `text-ink/50` on light grounds.

Accent Serif: Libre Baskerville (Weight: 400, Italic only). Reserved strictly for testimonial quotes.

1.3 Spacing, Grid & Elevation

Spacing Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192 (px).

Section Rhythm: 96px (Mobile) / 192px (Desktop).

The Edge-to-Edge Layout (Primary Mode): Full-bleed sections dominating the viewport width. Content spans fluidly without being constrained to isolated left/right gutters. Centered utility containers (max-w-7xl) are banned in favor of fluid, immersive scaling that touches the screen edges.

Elevation: Zero drop shadows on the dark canvas. Depth is achieved via surface tones (ink-100, ink-200) or a 12px backdrop-filter: blur.

2. Component Inventory & Specs

2.1 Core UI Architecture

Type-Led Fullscreen Menu (Michael Aust Ref): Replaces standard dropdowns. Hovering a navigation item transitions the font axis to italic and dynamically masks a portfolio image onto the right half of the screen.

The Hinge (Dark to Light Shift): A full-bleed background image (80svh) that acts as a curtain. The CSS background transitions from Ink to Ivory while the image is pinned over the viewport, seamlessly changing the site's register without crossfade artifacts.

Stats Grid (Athletics Ref): A 2x2 typographic grid divided by 1px hairlines. Figures render server-side (NO Javascript counters). Hovering a quadrant fills the background with a 5% Ivory tint and shifts the cell up 4px. Note: Animation timing adjusted to start: "top 85%", 800ms duration, translateY: 30px for a snappier UI feel.

2.2 Integrated Interactive Components (Adapted natively)

Selected Work Drag Rail (Lando/Torch Ref): Horizontal gallery breaking the right boundary. Implements native CSS horizontal scrolling combined with JavaScript pointer drag physics (cursor: grab/grabbing). Every 3rd card is a silent, looping video.

The Sketchbook (Lando Ref): A scattered, un-gridded layout of sketches on a light ground. Hover scales the image 1.04 with a slight rotation (±2deg). Tapping opens a detailed lightbox.

3. Motion Architecture & Animation Principles

Core Philosophy: Native scroll driven by GSAP ScrollTrigger. Strictly limited to GPU-accelerated properties (transform, opacity, clip-path, filter). Zero scroll-hijacking (Lenis is banned).

3.1 Transition Definitions & Timing

UI Motion (Micro-interactions): 200ms - 300ms. Driven by CSS transition. Hover states are gated behind @media (hover: hover) and (pointer: fine). Exit animations sit at 60-70% of enter duration. No ease-in used on UI.

Narrative Motion (Scroll Reveals): 800ms to 1200ms. (Note: Document conflicts noted between 800ms and 1200ms will be resolved based on component density during build).

Standard Stagger: 40ms (Text/Cards) to 120ms (Massive Display Grids).

3.2 Specific Implementation Patterns

Cinematic Hero Scrub (Block 01): The H1 does not time-load. It is pinned (100svh) and text is scrubbed from y: 100% to 0% directly via scroll progress. FOUC guards (opacity-0) are hardcoded in JSX and restored via <noscript>.

StringTune/Floema Text Reveals: The text split-and-reveal animations from the StringTune reference are built in GSAP. The actual text remains in an aria-label, while visually animated spans are aria-hidden to protect screen readers.

The Continuous Session Line: A single SVG stroke threading through the page, drawn via ScrollTrigger scrub. Changes color from Inchworm to Inchworm-deep as it crosses the Hinge into the light ground.

3.3 Accessibility & Reduced Motion

prefers-reduced-motion: Honored strictly. If active, cinematic scrubs disable, GSAP timelines fast-forward or revert to opacity fades, and the continuous session line renders fully drawn.

A11y Floor: Focus rings must use --color-inchworm, 2px solid, 2px offset. Every interactive element must be keyboard reachable.

4. Usage Guidelines for Developers

Component API: Rely on fluid typographic scaling and edge-to-edge aware flex/grid layouts.

Asset Handling: All imagery utilizes the Next.js <Image> component with explicit sizes. No raw <img> tags.

Provisional Adjustments: Treat animation timings, stagger rates, and exact easing curves as flexible. They should be tuned in the browser to maintain 60fps (minimum 55fps target on mid-tier mobile).