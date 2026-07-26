# MeetPrerna — Build Blueprint (`BLUEPRINT.md`)

**Version:** 1.0 · **Date:** 2026-07-25 · **Supersedes:** `PRD.md` §5 (page-by-page specifications)

`PRD.md` §5 is dead. It described a generic portfolio. This is the reference-derived version. Every block below names where it came from.

---

## 1. What each reference contributes

Four sites, four different jobs. They are not blended. Each owns a layer, so they never fight in the same viewport.

| Reference | Owns | Contributes |
|---|---|---|
| **Floema** | **The skeleton** | Numbered collection index with live counts. Visible scroll cue. Massive editorial type. Section rhythm at 192px. The three-verb triad. |
| **Michael Aust** | **The type and the menu** | Fullscreen type-led menu instead of a dropdown. Typography as the interface, not a delivery vehicle. Kinetic type on hover. Restraint everywhere else. |
| **Torch Systems** | **The texture and the proof** | Looping silent video inside section blocks. A repeated mark as a structural bullet. Footer marquee. Large pull-quote cards for social proof. |
| **Lando Norris** | **The signature interactions** | Drag-to-reveal. Two-layer mask reveal. Themed collection gallery of a practice-specific artifact. Rive vector motion. Bold type plus one vivid accent. |

**The layering rule.** Floema decides where things sit. Michael Aust decides how they read. Torch decides what moves in the background. Lando decides what you can grab with your hand. If two of them want the same viewport, Floema loses first, then Torch.

---

## 2. Entry sequence

**From:** Lando (cinematic entry), Michael Aust (type-led).

A single stencil line draws itself into her mark, then lifts. 1100ms, then gone.

Hard constraints, because preloaders normally wreck LCP:

- First visit only. `sessionStorage` flag.
- Hard cap 1200ms. It never waits for assets.
- The hero image (`origin.jpg`) loads **behind** it, so LCP is unaffected. Its black ground matches `--color-ink`, so there is no visible seam when the entry lifts.
- Skippable on any key, tap or scroll.
- Skipped entirely under `prefers-reduced-motion` and on `saveData`.

Uses M20 (Rive), so the entry and the footer mark are the same 60KB file.

---

## 3. The menu

**From:** Michael Aust.

Not a hamburger dropdown. A fullscreen type-led menu.

Four items set in Fraunces at `display-l`, stacked, left-aligned, huge. Hovering an item does two things at once: the WONK axis animates 0 → 1 so the serifs turn hand-drawn (M19), and a piece of her work masks in on the right half (M16). Portfolio, Sanctuary, About, Contact.

"Start a conversation" is not in this menu. It stays a separate CTA, outside the pill on desktop and at the bottom of this panel on mobile, always pointing at `/consulting`. `DECISIONS.md` §9.

Bottom edge carries the mono metadata: current city, next travel date, and a small "Start a conversation" link to `/consulting`.

Open 280ms `drawer`. Close 180ms. Focus trapped, Escape closes, focus returns to the trigger.

This is the single biggest personality lever on the site and it costs almost nothing to build.

---

## 4. Home, block by block

| # | Block | From | What it is | Moves |
|---|---|---|---|---|
| 00 | Entry | Lando + Aust | Stencil line draws her mark | M20 |
| 01 | **Hero: full-bleed portrait** | **Aust (type-led) + OFF+BRAND (mask reveal)** | `origin.jpg`, 2752×1536 landscape, full-bleed at 100svh. She sits right of centre with near-black negative space to her left; the headline occupies that space. Reveals via M16, headline assembles over it via M1. **Change history:** drag-to-reveal removed (no bare-limb pair); briefly changed to an editorial split on a mis-measurement of a 896×1195 reference upload; reverted once the real 2752×1536 export was confirmed. | M16, M1 |
| 02 | **The index** | **Floema (01 to 05 collections)** | Four numbered rows with live counts, each a filtered view into `/portfolio`. `01 Tattoos (48)` `02 Paintings (12)` `03 Sketches (30)` `04 The Practice` (links to `/sanctuary`). Row hover fills with `inchworm-tint`, the count ticks. Below it, the scroll cue. | M19, M11 |
| 02b | **Thesis + credibility strip** | Floema + **Athletics (two-anchor)** | "Ink that goes deeper than skin." with the four-figure strip beside it: 500+ completed, 100+ custom, Since 2021, Fine Arts. Figures in `--color-ivory`, NOT accent — four accent elements in one viewport breaks the budget in `DESIGN.md` §4. Server-rendered, never counted up in JS. **Widen to the two-anchor gutters** rather than the 1200px cap, `DESIGN.md` §12. Copy in `content.md` §4. | M3 |
| 03 | **Selected work, drag rail** | **Lando (drag nav) + Torch (video)** | Horizontal drag through 8 pieces. Every third card is a silent 6s loop of the needle working instead of a still. Momentum on release, damping at the ends, visible arrows as well. | M18, M13, M6 |
| 04 | **Fresh → healed** | **Lando (drag reveal). The signature.** | One piece, huge, with a draggable divider. Left is day zero. Right is four weeks healed. Mono caption gives the interval. Six pairs confirmed, so this rotates. Nothing else in Mumbai answers "what will it look like in a year". | M15 |
| 05 | The practice | Floema (editorial pacing) + **Athletics (two-anchor)** | Slow register begins. Four pillars in the **two-anchor mode**, `DESIGN.md` §12: pillar name at `--text-display-xl` pinned to the left gutter, its single sentence pinned right, middle left empty. One pillar per viewport. **No image per pillar** — the empty middle is the design and an image collapses it. No icons. Copy in `content.md` §4. | M3, M21 |
| 05b | **The still band** | Torch (full-bleed section block) | **Changed 2026-07-26: no video.** Full-bleed black-and-white still of Prerna working (`prerna-working-bw.jpg`), ~80svh, with two lines over it: "She has never done the same thing twice." then "On purpose." in solid accent. Slow register. No `<video>` element, no poster attribute, no playback logic — a dead element pointing at nothing is worse than no element. If footage ever exists, M13 layers over the still without changing the markup around it. | M3 |
| 06 | Process | Floema (numbering on a real sequence) + Torch (webm) | `01 Conversation` to `05 Aftercare`. Three of the five carry a silent loop. Numbering is honest here because it is a real sequence. | M3, M13 |
| 07 | **The Sketchbook** | **Lando ("Helmets Hall of Fame")** | See §5. Replaces the flash sheet. Lives inside `/portfolio`, filtered to Sketch, and gets its own scattered treatment here on Home as a teaser. | M17 |
| 08 | Voices | Torch (pull-quote cards) | Three large quote cards, not a carousel. Name, city, source link. One line above: some clients know her as Alza. | M3, M5 |
| 09 | Where to find me | Torch (footer marquee) | Continuous marquee of partner studios and travel cities. Pauses on hover. Duplicate is `aria-hidden`. Static list under reduced motion. | M10 |
| 10 | Close | Lando (Rive) | The mark redraws. One CTA. The session line M2 terminates here as its underline. | M20, M2 |

Ten blocks. Blocks 01, 03, 04 and 07 are physical register. Blocks 05, 06 and 08 are slow register. They never share a viewport.

---

## 4b. Art direction: the portrait set

Four portraits are in hand. They are **portraits of Prerna, not photographs of her work**, so they carry personality and presence, not proof. Proof comes from the portfolio and the healed pairs. Never use a portrait where a piece of work is what the section actually needs.

| Image | Where | Why |
|---|---|---|
| `origin.jpg` — hands framing face, black ground | **Home hero, block 01, full-bleed** | The strongest of the four. Direct eye contact, hands visible (her instrument), chest piece visible, black ground blending into `--color-ink` with no seam. **2752×1536, 126KB JPG. Supports full-bleed to 1440 at 2x density.** |
| `prerna-hero.jpg` — leather jacket, arm raised, red ground | `/about`, top | Landscape, so it works as a wide band. Red-dominant, so keep the accent off this section. |
| `practice.jpg` — red glitter, jewelled collar, red ground | Section break between blocks 06 and 07 | Pure atmosphere. No CTA over it, no accent near it. |
| `prerna-side-hero.jpg` — sunglasses, grey and gold | `/contact`, or the press kit | **Not the hero.** The sunglasses hide her eyes, and this site's thesis is being seen and being met. Wrong image for a first impression. |

**The red problem, stated plainly.** Two of the four are crimson-dominant. `--color-inchworm` (`#C4FF61`) against deep red is a near-complementary pairing: it vibrates and is hard to control. This is not a reason to change the brand colour. It is a reason to apply the accent budget strictly on those two sections: **no filled accent element in any viewport containing a red-dominant photograph.** A thin line, or nothing. The black-ground images carry the accent fine.

**Consistency note.** `origin.jpg` and `practice.jpg` share a grade. `prerna-hero.jpg` and `prerna-side-hero.jpg` read differently in skin rendering and colour treatment. Place them far apart in the scroll so the difference never shows up in one view.

**Source resolutions.** `origin.jpg` as shipped is **2752×1536**, 126KB, and supports full-bleed to 1440 at 2x density.

The reference PNGs supplied earlier were smaller (896×1195 for `origin` and `practice`, 1344×768 for `prerna-hero`, 1404×1924 for `prerna-side-hero`). Those are previews, not the export masters. **Always measure the file in `/public/images/`, never a reference copy.** A layout decision was briefly made on the wrong file because of this.

Before any layout assumes full-bleed for the other three, confirm their shipped export sizes the same way.

**Format.** All four arrived as PNG. Convert to JPG before they go in the repo. A photograph saved as PNG is typically five to ten times larger than the same image as an 80% JPG, with no visible difference. This is the single biggest file-size win available and it takes one batch export.

---

## 4c. The ground shift — dark to light, once, on scroll

**Added 2026-07-26**, from the Athletics NYC reference. This is the one genuinely new mechanic that reference contributes, and it fits this brand better than it fits theirs.

**The idea.** The page does not stay one colour. It begins on `--color-ink` and ends on `--color-ivory`. One transition, one direction, never back.

**Why it means something here.** She works in ink on skin, and in paint on paper. Dark for the work, paper for the words is not a decorative flourish, it is the two halves of her practice made into the page itself.

| Blocks | Ground | Contains |
|---|---|---|
| 01 hero, 02 index, 02b thesis, 03 drag rail | `--color-ink` | The work. Tattoo photography sits properly on dark. |
| **05b still band** | **the hinge** | Full-bleed photograph. See below. |
| 05 pillars, 06 process, 08 voices, 09 where to find me, 10 close | `--color-ivory` | The words. Reading is easier on paper. |

**The hinge solves the hard problem.** A scroll-scrubbed background transition normally fails accessibility: somewhere in the middle you have ivory text on mid-grey at roughly 2:1, and that state can persist for several seconds of slow scrolling.

Block 05b is a full-bleed photograph occupying the whole viewport. **Change the ground behind it, while it covers the screen.** Nothing is visible to transition, no intermediate state exists, and by the time the photo scrolls away the ground is already ivory. The image is the curtain.

No scrub, no crossfade, no intermediate contrast state. This is the entire implementation.

**On the light half:**
- Text `--color-ink` on `--color-ivory` — 16.4:1.
- **The accent cannot be text on light.** `--color-inchworm` on ivory is roughly 2:1 and fails. On the light half the accent is fill-only: a filled inchworm button with `--color-ink` label (14.8:1), or a 2px underline. `DESIGN.md` §9.
- The session line (M2) continues across the shift. Below the hinge it needs `--color-inchworm-deep`, not `--color-inchworm`, or it disappears into the paper.
- Footer stays `--color-ink`. It grounds the page and stops the light half feeling like it runs off the bottom.

**Degraded paths.** No JS: the ground is decided by section, in CSS, no observer required. Under `prefers-reduced-motion` nothing changes, because there is nothing animating. This mechanic is free in both.

---

## 4d. Edge bleed — media cut by the viewport, not contained

**Added 2026-07-26**, same reference.

Athletics runs media off the edge of the screen rather than inside a padded column. It reads as editorial rather than as a template, and it costs nothing.

**Where it applies:**
- Drag rail cards bleed off the right edge — the rail should look like it continues past the screen, because it does.
- The still band is already full-bleed.
- On `/portfolio/[slug]`, the piece image bleeds off one edge rather than sitting centred with equal margins.

**Text is edge-aligned too, in a different way.** Both are edge-to-edge; the mechanism differs because the constraint differs.

| | How it reaches the edge |
|---|---|
| **Images** | Literally cut by the viewport. The frame runs off-screen. |
| **Display type** | Starts at the 32px left gutter. No 1200px cap, no centred column. `DESIGN.md` §12. |
| **Body copy** | Pinned to the 32px *right* gutter, so its right edge touches the page edge — but it keeps its line length. |

**The one thing that does not happen: body copy stretching across the full width.** That is not edge-to-edge alignment, it is a readability failure. A 16px line running 1400px means the eye loses its place returning to the next line, which is the entire reason the measure rule exists.

The reference does exactly this. In both Athletics screenshots the body copy is a narrow column pinned to an edge, roughly 40 to 55 characters, never spanning. The dramatic effect comes from a huge word at one edge and a small tight column at the other, with distance between them. Stretch the small column and the effect disappears.

**Where edge bleed does not apply at all:**
- The grid on `/portfolio` stays contained. It is a scannable archive with filters, and a bleeding grid fights scanning.

**Do NOT skew or rotate the image containers.** Athletics angles theirs, and it works because their thumbnails are abstract brand assets where a tilt reads as energy. These are photographs of tattoos on someone's body. Skewing a photograph of a piece makes the piece itself look wrong, and the work is the subject here, not the frame.

---

## 4e. Section labels — a narrow reversal of the eyebrow ban

**`DESIGN.md` §6 and `PRODUCT.md`'s anti-references both ban eyebrow labels.** The Athletics screenshots are full of them: "What we do", "Our specialties", "How we do it", "Our work", "Some of our clients".

That ban was aimed at a specific pattern: a decorative label sitting above a heading, adding nothing, present because a template had one. That pattern stays banned.

Athletics' labels do a different job. Their page is long and unnumbered, and the labels tell you where you are in it. That is orientation, not garnish.

**Narrow permission, and the limits are the point:**
- Permitted on `/` and `/sanctuary` only. Both are long scrolls where a reader can lose their place.
- JetBrains Mono, `--text-mono`, `--color-ivory-dim`. Sentence case, not uppercase.
- It must name the section in words a visitor would use. "The work", "The practice", "Where to find me".
- **One per section, maximum, and never above the H1.** The hero does not get one.
- Banned everywhere else. `/consulting`, `/contact`, `/privacy`, `/terms` and every detail page are short enough that a label is decoration.

If a label could be deleted without a reader losing their place, delete it.

---

## 5. The Sketchbook (replaces the flash sheet)

**From:** Lando's "Helmets Hall of Fame". **Cut:** the flash sheet, because she does not sell flash and the margin reason is correct.

The move that mattered in the Lando gallery is not flash. It is **a themed collection of an artifact that only that practice produces**, presented as a browsable wall with a story behind each one. Helmets for a driver. For a custom artist, that artifact is the **unused sketches**.

Every tattoo artist has hundreds of drawings that never became tattoos. Studies, rejected directions, abstract pages, things drawn while thinking. They cost nothing, they already exist, and they are the most honest thing on any artist's site.

**Why it beats the flash sheet for her:**

- It shows range and thinking, which is exactly what Persona C wants before pitching an idea.
- It sells nothing, so it carries zero pressure. That serves the Therapy pillar directly.
- It feeds `/portfolio`'s sketch filter, which currently leans thin.
- It is unlimited, free content she can add to weekly from her phone.

**Build:** 20 to 30 sketches on a light paper ground, scattered on a seeded layout like a real desk. Hover lifts one with `scale(1.04)` and `rotate(±2deg)`, 220ms. Tap opens it large with her one-line note on what it was for. CTA underneath: `This never became a tattoo. It could.` Routes to `/consulting?source=sketchbook&piece={slug}`, prefilling the Fillout form's brief field if a matching hidden field exists (confirm the field mapping inside Fillout, this is a manual step, not a code one).

**Register entry M17 is renamed** from Flash Sheet to Sketchbook. Same mechanic, different content, better fit.

---

## 6. Other routes

**`/portfolio` (physical archive, mixed medium).** One archive, one filter bar: Medium (Tattoo, Painting, Sketch, All), Motif always on, Placement shown only when Medium is Tattoo, Size/material shown only when Medium is Painting or Sketch. M18 drag rail is the primary browse. M19 on titles. M16 on image entry. Detail pages open by shared element transition (M7) from the card. The Sketchbook lives here in full when Medium is Sketch.

**`/portfolio/[slug]` — the one place the site changes mode.** Dark for Tattoo pieces. **Light mode for Painting and Sketch pieces** — ivory ground, ink text, accent fill-only, never text. This replaces the whole-route light mode from the earlier split: the archive grid stays one consistent dark register throughout, and only a single piece's own detail page steps into the light, which reads as walking into a lit room rather than the page switching underneath a user mid-browse. M15 fresh-to-healed appears here on every tattoo piece that has a healed pair. Provenance metadata in mono on every piece.

**`/contact`.** Lighter weight than `/consulting`, and this is deliberate, not an afterthought. Built for Persona D (the time-poor corporate or brand buyer) and for press, collaboration and general questions that are not a tattoo consultation. A short statement of professionalism, the press kit download, and a simple contact route — email or the same Fillout embed in a shorter configuration if Fillout supports a secondary short-form. No drag, no shader, no physical register. This page's whole job is to read as competent and quick.

**`/sanctuary` (slow, no exceptions).** This page is read, not performed. Floema pacing throughout. Five numbered steps, three silent loops, accordion FAQ. Pain, hygiene and cost come before the CTA, not after. No drag, no pinning, no parallax.

**`/about` (slow, with one physical moment).** Portrait using the same drag-reveal mechanic as the hero, this time bare arm to her own work. Then the practice statement, where she works from (Kharghar primary, Mumbai on demand, partner studios **unnamed** until they consent), and a short "travel on request" block. **There is no travel calendar** — she travels on request, not on a schedule. `DECISIONS.md` §8.

**`/consulting`.** M5 and M8 only. The Fillout embed is not something we animate; it is a third-party iframe. WhatsApp appears once, as a small fallback line beside the embed, never as its own button. `DECISIONS.md` §9.

---

## 7. Honest note on platform

Three of your four references are Webflow, including the one that won Site of the Year. You are right that the platform is not what makes them good.

With Sanity now dropped, the honest reason for Next.js is narrower than it was: cost (no monthly platform fee), SEO and redirect control, and the fact that M15, M16, M18 and M19 are custom code on any platform anyway. It is not that Webflow could not do this. It is that on Webflow you would pay monthly and still hand-build the same five signature interactions.

What is not standard on any platform is the six signature moves. M15, M16, M18, M19 and M20 are custom builds anywhere, Webflow included.

---

## 8. What this replaces

- `PRD.md` §5, all page-by-page specs. Dead.
- `PRD.md` §5.1's section list, which was Hero, Manifesto, Selected Work, Process Teaser, Studio Vignette, Testimonials, Footer. Generic. Replaced by §4 above.
- `MOTION.md` §7 per-page choreography. Superseded by §4 and §6 here.

The register in `MOTION.md` §4 and §6 stays as the mechanical spec. This file is the arrangement.
