# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- Primary: First-time tattoo clients or thoughtful collectors seeking meaningful, custom permanent art. They may be anxious about the permanence and are looking for trust and a collaborative process.
- Secondary: Fine art admirers interested in original abstract canvas paintings or charcoal sketches.

## Product Purpose
A digital portfolio and conversion funnel for Prerna, a multidisciplinary artist (tattoos, canvas, sketches) based in Mumbai. The goal is to establish deep credibility, showcase her distinct aesthetic, and persuade visitors to book a thoughtful, 1-hour consultation (via Fillout) for a custom piece.

## Positioning
"Art that ages beautifully" and "Ink that goes deeper than skin." Unlike flash-sheet tattoo parlors, Prerna insists on a 1-hour conversation before drawing a single line. The process is collaborative, therapeutic, and entirely custom.

## Operating Context
A highly visual, editorial web experience. Visitors will evaluate the quality of the art, the tone of the copy, and the aesthetic refinement of the site to gauge whether they trust Prerna with their skin.

## Capabilities and Constraints
- **Stack:** Next.js App Router, TypeScript, Tailwind CSS (for layout only), CSS Modules/Variables (for tokens), GSAP (ScrollTrigger), OGL (for WebGL).
- **Motion:** No scroll-hijacking (Lenis is banned). GSAP ScrollTrigger for native scroll reveals. 55fps minimum target.
- **Constraints:** Edge-to-edge fluid layouts. No centered max-width containers. Hard limits on the neon "Inchworm" accent color (10% budget).
- **Content:** Relies entirely on high-quality photography and specific, personal storytelling (no generic lorem ipsum or fabricated testimonials).

## Brand Commitments
- **Voice:** Calm, intentional, editorial, and confident.
- **Identity:** Monotonic dark ground (`--color-ink`) dominating the top half of experiences, transitioning to a light ground (`--color-ivory`) for deep reading or delicate sketch viewing.
- **Typography:** Cormorant Garamond (H1 must be weight 400), Inter for body, JetBrains Mono for metadata and eyebrows.

## Evidence on Hand
- Portfolio images across three mediums: Tattoos (Living Ink), Canvas (Abstract Paintings), and Paper (Charcoal Sketches).
- A narrative outlining her transition from fine arts to tattooing, specifically the 2020 Mumbai decision and apprenticeship under Vikrant Koli.
- Real client quotes emphasizing the pre-draw conversation and trust.

## Product Principles
1. **The Art Leads:** UI Chrome must recede. Do not skew, frame, or distract from the actual artwork.
2. **Trust Through Process:** Emphasize the consultation and the thought behind the work over just the final aesthetic.
3. **Editorial Elegance:** Treat the site like a high-end print magazine (fluid type scales, rigid baselines, deliberate whitespace).
4. **Purposeful Motion:** Animation must feel cinematic but respect native scroll physics and `prefers-reduced-motion` settings.
