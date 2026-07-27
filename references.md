# Reference Lookup (`docs/references.md`)

**Version:** 1.0 · **Date:** 2026-07-27

One entry per reference site. Every claim here was checked against the live site or a verified screenshot, not recalled from a description. If a new reference comes in, add an entry here before it changes `MOTION.md` or `BLUEPRINT.md`.

The point of this file: a reference gets litigated once, its verified takeaways get written down, and the next time someone says "like Athletics" the answer is a lookup, not a re-argument from memory.

---

### Floema — floema.com

**Verified:** live site.

**What it actually is:** editorial site. Numbered index sections (01–05), a visible scroll cue, massive type, staggered scroll reveals, generous space. No WebGL.

**Taken:** the numbered collection index (block 02, "The work"), the general pacing philosophy behind the slow register.

---

### Michael Aust — michael-aust.com

**Verified:** live site head/meta and stack description.

**What it actually is:** GSAP, jQuery, Lottie, SVG, Webpack. Typography-led microinteractions, a fullscreen type-led menu, scroll storytelling, black-and-white restraint. No WebGL, no three.js.

**Taken:** the fullscreen type-led mobile menu. The italic-on-hover treatment on work titles (M19), adapted for Cormorant Garamond since the original spec assumed a variable font axis this typeface doesn't have.

---

### Torch Systems — torchsystems.com

**Verified:** live site.

**What it actually is:** Webflow site. Looping `.webm` clips inside section blocks, a repeated SVG mark as a bullet, a footer text marquee, one accent colour.

**Taken:** the concept of a full-bleed looping clip in a section block (M13) — currently unbuilt, no footage exists yet. The single-accent discipline.

---

### Lando Norris — landonorris.com

**Verified:** via OFF+BRAND's own case study and Awwwards record (Site of the Year).

**What it actually is:** Webflow, by OFF+BRAND with wearegrip. The one reference with real 3D/WebGL, built on an agency team and an F1 budget. Drag-to-reveal hero, a two-layer mask reveal, a themed collection gallery ("Helmets Hall of Fame"), Rive vector motion, vivid lime accent.

**Taken:** the ink-bleed mask reveal (M16). The Sketchbook concept (M17), adapted from the helmet gallery to the actual artifact this practice produces — unused sketches, not flash. The drag gallery mechanic (M18). Rive was evaluated and not adopted; no signature vector-line asset exists yet to justify the runtime.

**Not taken:** the drag-to-reveal hero — required a bare-limb-then-tattooed pair that does not exist in the asset set. Moved to block 04 with the healed pairs instead.

---

### StringTune tutorials — supplied HTML files

**Verified:** the actual tutorial source was read directly.

**What it actually is:** two CodePen-style demos — a scattered scroll-reveal image grid, and per-character scroll-scrubbed text with a two-layer swap.

**Taken:** both mechanics, rebuilt in GSAP. The library itself was not adopted — ScrollTrigger already covers both and a second scroll-coupled library is a known cause of jank on mid-tier Android.

**Fixed on adoption:** the split-text pattern in the tutorial hides real text and paints visible text via `::before`/`::after`, which fails for screen readers. Rebuilt with the real sentence in `aria-label` and generated spans marked `aria-hidden`.

---

### Athletics — athleticsnyc.com

**Verified:** live site, fetched directly, twice, at different points in this project — the second fetch specifically to correct an earlier read.

**What it actually is:** a video-first brand studio site. Nine full-bleed Vimeo case-study videos, one section of three-word principle statements ("Original. Purposeful. Useful."), a client logo marquee, a newsletter signup. The "edge to edge" quality comes from full-bleed video and type running to the viewport edge with an empty, deliberate middle — not from a portable spacing algorithm.

**Taken:**
- The two-anchor statement layout (`DESIGN.md` §12): display word pinned to one gutter, a short supporting line pinned to the other, on the same horizontal band, middle deliberately empty. Applied to the pillars section.
- The full-width-band content rule (`DESIGN.md` §11b): a full-bleed background must lay its content out across the real width, not centre a narrow prose column inside it. This corrected a real footer bug where a 70ch measure was applied to a full-width band.
- The one-direction ground shift concept (dark to light, once, hidden behind a full-bleed image so there's no visible mid-transition state) — inspired by Athletics' colour transitions, adapted to be accessibility-safe.

**Not taken, and should not be re-proposed without new material:**
- A video-first homepage. This project has 18 photographs and no confirmed usable video footage. Building a system around nine video slots for a site with no video is building for content that doesn't exist.
- Smooth-scroll/Lenis. Explicitly cut, `DECISIONS.md` §10, for scroll-anchoring and Android performance reasons unrelated to Athletics.
- A second accent colour, magnetic buttons, a custom cursor, or a single-page rebuild. None of these are things Athletics actually does; they arrived in a separate, unsourced blueprint document and were not adopted. See `DECISIONS.md` for the reasoning against each, independently of this reference.

---

## Adding a new reference

Before proposing any change based on a new site:

1. Fetch the live site or open the actual screenshot. Do not work from a description of the site.
2. Add an entry here: what it verifiably is, what's worth taking, what's a positioning mismatch for this project and shouldn't be taken.
3. Only then propose the `MOTION.md` or `BLUEPRINT.md` change, citing this entry.

If a document arrives claiming to be a blueprint or a spec that references multiple sites at once, check it against this file line by line before running any part of it. A claim like "Athletics does X" is checkable here in seconds; if it's not in this file yet, verify it against the live site before acting on it.
