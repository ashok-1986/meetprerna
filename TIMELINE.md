# Project Roadmap & Accountability

**Phase 1: Cognitive Foundation (Weeks 1-2)**

* Establish repository and Next.js boilerplate.
* Configure Tailwind CSS with the official brand color and typography scale — **pending Prerna's sign-off on the revised single-accent palette** (see `DESIGN.md`).
* Implement the local Markdown parsing utility.
* Set up routing for the finalized 5-page architecture (`/`, `/portfolio`, `/portfolio/[slug]`, `/about`, `/connect`).
* **Content-blocking items to collect from Prerna before later phases stall:**
  * 3–5 real client quotes for the Client Voices section (see `CONTENT.md`).
  * Specifics for Narrative Blocks 2 and 4 — what the fear in Block 2 actually was; one concrete training memory for Block 4 (see `CONTENT.md`, "Optimized Story Blocks"). Recommend a short voice-note or interview pass with her this phase.

**Phase 2: Structural Implementation (Weeks 3-4)**

* Build out the static UI components and page routing across all 5 pages.
* Integrate placeholder content ensuring narrative alignment with Prerna's journey from Prayagraj to Mumbai, using the optimized story arc.
* Build the `/connect` intake form per `CONSULTATION.md`.
* Achieve 100% responsive layouts across mobile, tablet, and desktop viewports, including mobile fallbacks for hover-dependent effects (see `TECH_SPEC.md`).

**Phase 3: Motion & Animation (Weeks 5-6)**

* Integrate GSAP for scroll triggers and text reveals.
* Build the pinned-scroll narrative sequence for `/about` and the Home teaser.
* Develop the WebGL liquid distortion hover effects for the portfolio grid (desktop) and the tap-to-flip mobile equivalent.
* Implement the custom cursor logic (desktop only).
* Implement `prefers-reduced-motion` fallbacks across all effects.

**Phase 4: Content & Performance Review (Week 7)**

* Replace placeholders with final, optimized WebP imagery via the responsive image pipeline.
* Drop in final Client Voices quotes and finalized narrative copy (contingent on Phase 1 content collection).
* Conduct strict Lighthouse auditing to ensure a 90+ performance score.
* Verify all interactive elements function smoothly without frame dropping, and verify WCAG AA contrast across the palette.

**Phase 5: Launch & Handoff (Week 8)**

* Final deployment via Vercel.
* DNS routing for the production domain.
* Delivery of standard operating procedures for adding new `.md` files for future artwork and future client quotes.
