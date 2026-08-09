# MeetPrerna: Web Platform Architecture

This repository contains the source code and documentation for the "meetprerna" digital portfolio. The platform is designed as an immersive, motion-rich visual experience that positions Prerna as a multidisciplinary visual artist.

**Brand Identity & Purpose**
The core mission of this platform is to reflect an artist who translates human experiences into visual metaphors. It captures the intersection of deep passion and professional skill, moving from early roots near the Sangam to the meticulous, collaborative medium of skin. The design reflects a journey of choosing bravery over comfort.

**Target Audience**

* Prospective tattoo clients seeking highly customized, narrative-driven living ink.
* Art collectors interested in abstract canvas paintings and charcoal sketches.
* Creative collaborators looking for a visual storyteller with a fine arts foundation.

**Site Architecture (finalized — Phase 2)**
meetprerna is a **5-page site**, not a single long-scroll page. Home carries condensed teasers of every section with links out to dedicated pages, so portfolio pieces and the full narrative each get their own shareable URL. Full breakdown in `CONTENT.md`.

1. `/` — Home
2. `/portfolio` — Filterable grid across all three categories
3. `/portfolio/[slug]` — Individual piece detail page
4. `/about` — Full narrative (all four story blocks)
5. `/connect` — Structured consultation intake (see `CONSULTATION.md`)

**Primary / Secondary CTA**
Primary: **"Share Your Story"** → `/connect`, repeated across Hero, portfolio detail pages, and a closing CTA band on Home.
Secondary: **"See the Work"** → `/portfolio`, appears in the Hero only, never competes with the primary ask further down the funnel.

**Technical Architecture Overview**
This project relies on Next.js for high performance and seamless SEO optimization. Advanced animations are powered by GSAP and Three.js, avoiding standard templates to ensure an unconstrained creative showcase. All content is managed strictly via local Markdown and JSON files to eliminate the overhead of external CMS solutions.
