# MeetPrerna — Locked Decisions (`DECISIONS.md`)

**Version:** 2.2 · **Date:** 2026-07-25 · **Status:** Binding · **Supersedes:** all conflicting statements in `PRD.md`, `designs.md`, `animations.md`, `shaders.md`, `components.md`, `ARCHITECTURE.md`, `INDEX.md`

---

## 0. Why this file exists

The v1.0 blueprint is 4,977 lines across six documents. It contradicts itself in fourteen places. An agent reading it will either guess or stop and ask. Both are expensive.

This file is the tie-breaker. The precedence order in `INDEX.md` §9 is amended to:

> **`DECISIONS.md` > `ARCHITECTURE.md` > `PRD.md` > `agents.md` > `designs.md` > `animations.md` > `shaders.md` > `components.md` > `content.md`**

If a spec says one thing and this file says another, this file wins. Do not open a PR to "fix" this file against the older docs. Open a PR to fix the older docs.

Every decision below has an owner-visible reason. If a reason turns out to be wrong, change the decision here first, then propagate.

---

## 1. The contradiction register

These are the defects found in v1.0. Each has a locked resolution below.

| # | Where | The conflict | Severity |
|---|---|---|---|
| C1 | `PRD.md` §2.1 G1 vs §2.3 | G1 targets 18 booked calls per 1,000 sessions. The north star says 1 per 1,000. An 18x gap. | Blocking |
| C2 | `PRD.md` §2.2 P5 vs §6.1 vs §8 Phase 2 | P5 promises "zero engineer hours for content updates". §6.1 locks static typed files (git push required). Phase 2 scope and gate both reference Sanity schemas and a 60s CMS round-trip. | Blocking |
| C3 | `designs.md` §2.4 | `--color-ink-50` (`#545454`) on `--color-ink` (`#1A1A1A`) is listed at 3.2:1. Actual measured ratio is **2.34:1**. It fails the 3:1 minimum for non-text UI. | Blocking |
| C4 | `designs.md` §2.1 | `--color-ink-20` (`#3a3a3a`) is darker than `--color-ink-50` (`#545454`), and is within 2 hex points of `--color-ink-70` (`#363636`). The scale is non-monotonic and has two near-duplicate tokens. | Blocking |
| C5 | `designs.md` §2.1 vs `INDEX.md` §5 | INDEX claims "the one accent". The palette ships two neons 20 degrees apart (`#C4FF61`, `#EAFF27`). Two loud signals mean neither says "act here". | Medium — **partially resolved, see D3** |
| C6 | `PRD.md` §7.2, §5.2 vs reality | PRD writes "a sunlit studio in Vashi", a map embed and `LocalBusiness` JSON-LD. Prerna owns no studio. She works on collaboration with partner studios in Mumbai and Navi Mumbai, and travels. | Blocking — **resolved, see D7** |
| C7 | `PRD.md` §6.9 vs `animations.md` §2.2 | §6.9 says the custom cursor "never replaces the system cursor". A custom cursor by definition replaces it. | High |
| C8 | `animations.md` §2.2 vs `PRD.md` §6.7 | The cursor mutates `font-variation-settings` on headings per pointermove. That is style recalc plus layout plus paint on text, every frame. §6.7 budgets 55fps on a Pixel 6a. | Blocking |
| C9 | `shaders.md` §3.6, §4.5, §5.5, §6.5, §7.5 | Five shaders, stated GPU budgets of 4 + 1 + 3 + 1 + 4 = **13ms**. A 60fps frame is 16.6ms total, for everything. | Blocking |
| C10 | `PRD.md` §6.1 vs §6.7 | three.js + @react-three/fiber + @react-three/drei to render two fullscreen quads. drei alone defeats the "lazy only" intent when tree-shaking misses. | Medium |
| C11 | `PRD.md` §4 vs `PRODUCT.md` | PRD splits `/tattoos`, `/paintings`, `/sketches`. PRODUCT.md requires the site to treat all three as one practice. | High |
| C12 | Whole blueprint | **No migration plan.** No 301 map from `/portfolio/`, `/about/`, `/contact/`, `/consultation/`. PRD §2.2 P2 targets top-3 SERP while changing every URL. | Blocking |
| C13 | Whole blueprint | **WhatsApp appears nowhere.** It is the current primary CTA on the live site and the dominant enquiry channel in this market. | Resolved, then reversed — see D8 |
| C14 | `PRODUCT.md` anti-references vs `designs.md` §3.5 | PRODUCT.md bans eyebrow scaffolding. `designs.md` line 147 defines eyebrow text as a type style, and `PRD.md` §5.3 puts an eyebrow in the `/tattoos` hero. | Medium |

Plus live-site defects found during audit, listed in §14.

**Owner corrections received 2026-07-25 (binding):** all launch assets are in hand; the neon is the brand colour and stays; Prerna owns no studio but collaborates with partner studios across Mumbai and Navi Mumbai and travels; "Alza" is her stage name. D3, D7, D12 and D14 below are rewritten accordingly.

---

## 2. D1 — Success metrics (resolves C1)

**Locked.** Drop both existing numbers. Instrument the funnel, not a single vanity figure.

| Stage | Event name | Target (of all sessions) |
|---|---|---|
| Reached the work | `work_viewed` | ≥ 40% |
| Enquiry started (Fillout form opened, `onInit`) | `enquiry_started` | ≥ 4.0% |
| Enquiry submitted (message sent or form posted) | `enquiry_submitted` | ≥ 2.0% |
| Consultation confirmed (slot agreed) | `consult_confirmed` | ≥ 0.8% |
| Custom multi-session share of confirmed | `consult_confirmed` where `type=custom` | ≥ 25% |
| Art enquiry | `art_enquiry_submitted` | ≥ 0.3% |

**Reason.** 18 per 1,000 confirmed consults from cold traffic is not achievable in year one for a solo artist. 1 per 1,000 is a failing site you would celebrate. 8 per 1,000 confirmed, off a 20 per 1,000 submitted, is honest and reachable. Measure the whole funnel so you can see which step is actually broken instead of arguing about the headline number.

**Guardrails that block a release:** LCP ≤ 2.5s mobile, CLS ≤ 0.05, INP ≤ 200ms, mobile bounce < 55%.

---

## 3. D2 — Content model (resolves C2)

> **REVERSED 2026-07-25 by D17 and D19 below. Sanity is dropped entirely. There is no CMS.** The reasoning below is kept because the trade-off it names is real and now consciously accepted rather than solved: Ashok is the person who adds new work. Read D19 for the accepted cost and the migration path.

~~**Locked: Sanity, free tier. Not static typed content.**~~

**Reason.** `PRD.md` §2.2 P5 is a real product requirement, not a nice-to-have. Prerna is a solo artist who will add work weekly. "Content change = git push + Vercel deploy" means every new tattoo photo needs an engineer. That is a permanent tax and it will end with the site going stale in four months, which is exactly how the current site got here.

Phase 2 scope and the Phase 2 gate already assume Sanity. `§6.1` is the outlier. `§6.1` is wrong.

**Schemas (locked):** `portfolioPiece` (with a `medium` field: Tattoo, Painting, Sketch — one type, not two, since the archive is merged), `series`, `testimonial`, `faq`, `page`, `siteSettings`.

**Cost check:** Sanity free tier covers 3 users, 10k documents, 1M API requests a month. This site will use a fraction of that. If it ever exceeds it, the site is doing very well and the bill is affordable.

**Non-negotiable:** Phase 5 includes a recorded 30-minute CMS handover with Prerna, plus a one-page runbook. If she cannot add a piece unaided at the end of it, Phase 5 has not passed.

---

## 4. D3 — Colour system (resolves C3, C4; C5 partially)

**Reversed from v1.1. The neon is the brand colour and it stays.** Full spec in `DESIGN.md`.

The owner call is correct and my v1.1 reasoning was wrong. Pillars are not expressed through hue. A calm site is not a green-grey site. It is a site with one loud thing per screen, a lot of space, and no pressure patterns. You can be calm in neon. You cannot be calm in clutter.

The discipline moves from hue to **quantity, placement and pacing**, which are enforceable in a way that "make it feel meditative" is not. See the accent budget in `DESIGN.md` §4.

**What changes anyway, because these are defects and not taste:**

1. **`--color-ink-50` `#545454` is documented at 3.2:1. Measured, it is 2.34:1.** It fails the 3:1 floor for the non-text UI it is used for. Replaced with `#6B6B6B` at 3.27:1.
2. **The grey scale is not monotonic.** `ink-20` `#3a3a3a` is darker than `ink-50` `#545454` and sits two hex points from `ink-70` `#363636`. Two near-identical tokens with contradictory names. An agent will pick the wrong one. Renumbered to `ink-100 / 200 / 300 / 500`.
3. **`--color-marigold` `#EAFF27` is deleted.** Two neons twenty degrees apart do not read as two signals. They read as one blurry signal, and then neither says "act here". One accent means the accent means something. This is the only part of C5 that survives.

**The locked palette, all ratios measured:**

| Token | Hex | Ratio on `--color-ink` | Role |
|---|---|---|---|
| `--color-ink` | `#1A1A1A` | base | canvas |
| `--color-ink-100` | `#212121` | 1.1:1 | raised surface |
| `--color-ink-200` | `#2A2A2A` | 1.2:1 | hover surface |
| `--color-ink-300` | `#363636` | 1.4:1 | decorative hairline only |
| `--color-ink-500` | `#6B6B6B` | 3.3:1 | meaningful border, disabled |
| `--color-ivory` | `#FDFFE9` | 17.2:1 | body text |
| `--color-ivory-dim` | `#C9CBB6` | 10.4:1 | captions, metadata |
| `--color-inchworm` | `#C4FF61` | 14.8:1 | **the one accent** |
| `--color-inchworm-deep` | `#9FCC4A` | 9.3:1 | pressed |
| `--color-danger` | `#FF6B6B` | 6.3:1 | form errors |

**The accent budget (this is how neon stays subtle):** one filled accent element per viewport, accent only ever means "act here" or "you are here", and a four-step dilution ladder from solid fill down to a 12% tint. Full rules in `DESIGN.md` §4. Most of the site lives at steps 2 and 3. A solid fill appears about six times in the whole build.

---

## 5. D4 — Typography (reversed to the PRD's choice, owner correction 2026-07-25)

**Reversed.** `DECISIONS.md` v1.1 replaced the PRD's fonts with Fraunces, Inter and JetBrains Mono. The stated reason was that `PRD.md` §10 Q6 parked the MG12 licence and made Phase 1 depend on it. That was a real blocker, but it only justified replacing **MG12**. Replacing Cormorant Garamond too was overreach: it is OFL licensed, free, and blocks nothing. Typeface is brand voice and it is the owner's call.

| Role | Face | Licence | Notes |
|---|---|---|---|
| Display | **Cormorant Garamond** | OFL, self-hosted | As `PRD.md` §6.4. Use the variable build if available on Google Fonts; otherwise static weights 400 / 500 / 600. |
| Body and UI | **Inter** | OFL, self-hosted | This was the PRD's own stated fallback for MG12 (`PRD.md` §6.4, §10 Q6). MG12 stays parked; swap in if the licence ever clears. |
| Accent serif | **Tinos** | OFL, self-hosted | Metric-compatible substitute for Times New Roman. See D4.2. |
| Metadata | **JetBrains Mono** | OFL, self-hosted | Year, medium, dimensions, placement, session count. |
| Devanagari | **Noto Serif Devanagari** | OFL | Fallback only. No Devanagari copy exists yet. |

### D4.1 — Cormorant weight on dark, mandatory

Cormorant Garamond is a high-contrast Garamond revival with very fine hairlines. Two things compound against it here: the site is light-on-dark, which optically thins strokes, and the hero headline sits over a photograph at up to 10rem.

**At `--text-display-xl` and `--text-display-l`, use weight 500 or 600. Never 300, never 400.** At body and caption sizes 400 is fine, but Cormorant is not a body face on this site anyway; Inter is.

If a headline still looks fragile over an image after this, the fix is the scrim from `BLUEPRINT.md`, not a heavier weight beyond 600, which starts to lose the face's character.

### D4.2 — Times New Roman cannot be used directly

`PRD.md` §6.4 states "Times New Roman is the system font — no asset needed." That is true on a desktop OS and false on the web in practice.

Times New Roman is Monotype's, bundled with Windows and Office, and not licensable for `@font-face` embedding. Declaring it means depending on the visitor's device: Mac substitutes Times, Windows has the real thing, and most Android devices have neither and fall back to Noto Serif or Roboto Serif. Given the expected traffic is largely Android arriving from Instagram, **most visitors would never see the intended face**, and the fallback would be arbitrary.

**Locked: use Tinos.** OFL, on Google Fonts, self-hostable, and metric-compatible with Times New Roman, meaning identical widths and near-identical shapes. Same intent, consistent everywhere. Liberation Serif is an equivalent alternative.

### D4.3 — Two serifs need a narrow, stated role

Cormorant Garamond and Tinos are both serifs with broadly similar proportions. Used loosely, a reader does not perceive two typefaces, only an inconsistency. Tinos therefore gets **one** job, and the job must be written down before it ships.

**Default, unless the owner specifies otherwise: Tinos italic is used for client testimonial quotes only.** That is a defensible role. It marks someone else's voice as distinct from Prerna's, which is exactly the kind of distinction a second face should earn. Everywhere else, display is Cormorant and everything else is Inter.

If Tinos has no defined role, do not load it. An unused font is 20 to 40KB of nothing.

### D4.4 — Scale unchanged

**Two display sizes only.** `display-xl` `clamp(3.25rem, 11vw, 10rem)` and `display-l` `clamp(2.25rem, 6vw, 5rem)`. Nothing in between. This restriction is what creates the identity and it survives the typeface change.

**Eyebrows remain banned.** Mono is for real metadata only.

---

## 6. D5 — Information architecture, merged (reverses the two-route split, resolves C11 more fully than v1.2 did)

**Reversed with owner input, 2026-07-25.** One portfolio route, not two.

```
/                    Home
/portfolio           All work: tattoos, paintings, sketches, one archive
/portfolio/[slug]    Piece detail
/sanctuary           The practice, the four pillars, the process, pain and aftercare, FAQ
/about               Prerna. Travel and residency calendar.
/consulting          Consultation request. The Fillout embed lives here. Renamed from /book.
/contact             General and commercial enquiries. Press kit. Lighter weight than /consulting.
/privacy  /terms     Legal
```

`/work` and `/art` as separate routes are dropped.

**This is a better call than the split I locked in v1.2, not just a different one.** `PRODUCT.md` states plainly that the site should treat tattooing, painting and sketching as one creative practice. My two-route split partially contradicted that founding document in exchange for SEO depth and a light-mode moment for the paintings. One merged archive is more faithful to the brief than my own earlier decision was.

**How the merge works.** `/portfolio` is one archive with a filter bar:

- **Medium** — Tattoo, Painting, Sketch, All. Always visible.
- **Motif** — always visible, applies across all media.
- **Placement** — appears only when Medium is Tattoo.
- **Size / material** — appears only when Medium is Painting or Sketch.

One array, one grid, one set of internal links, one body of SEO equity. Filtering is client-side over the in-memory array. Do not build three separate data paths for what is one collection.

**What is lost, and the partial fix.** The light-mode "gallery wall" moment for paintings does not survive as a whole-route treatment when tattoos and art share one archive — switching the entire background colour mid-scroll as a user filters between media is jarring, and jarring contradicts the Calmness pillar more than losing the light mode costs. Instead: **individual piece detail pages (`/portfolio/[slug]`) render in light mode when the piece's medium is Painting or Sketch.** The archive grid itself stays dark and consistent. Stepping into a single painting's detail page becomes "stepping into a lit room," which keeps the idea's best part — the contrast between her two mediums — without forcing a mode switch onto a page that is trying to be one calm collection.

**Persona D gets a real page, not just a footer link.** v1.2 deprioritised the corporate/brand buyer to a footer press-kit link and a checkbox inside the booking form. With `/contact` now a real route, that persona gets a proper, lightweight page: a short statement of professionalism, the press kit, and a simple contact route, separate from the more personal tattoo consultation flow on `/consulting`. This is a genuine improvement, not a compromise — it was always the persona that fit worst inside a form built for someone processing a life decision.

---

## 7. D6 — Redirect map (resolves C12)

**Locked. This ships in Phase 2, not Phase 5.** The current site ranks for "custom tattoo artist Mumbai". Changing every URL without 301s throws that away.

| Old (live today) | New | Type |
|---|---|---|
| `/portfolio/` | `/portfolio` | 301 |
| `/about/` | `/about` | 301 |
| `/contact/` | `/contact` | 301 |
| `/consultation/` | `/consulting` | 301 |
| `/wp-content/uploads/*` | closest new asset, else `/portfolio` | 301 |
| any `/?p=` or `/?page_id=` | `/` | 301 |

**The merge actually improves this table.** The old `/portfolio/` maps almost onto the new `/portfolio` directly, which is close to a trailing-slash normalisation rather than a real URL change. That is about as clean a redirect as this migration gets, and it exists because the merge happens to land on the same word the old site already used.

The old `/contact/` and `/consultation/` used to both collapse into one new URL (`/book`), which lost the distinction between a general enquiry and an actual consultation request. With `/contact` now a real route, `/contact/` maps to the new `/contact` and `/consultation/` maps to `/consulting`, each landing on the page that actually matches its old intent. More accurate than the version it replaces.

Implement in `next.config.js` `redirects()`. Verify every one with `curl -I` before the DNS switch. Keep the old sitemap live for 30 days. Submit the new sitemap to Search Console on switch day, and use the Change of Address tool only if the domain changes (it does not, so do not).

**Structured data (corrected, see D7):** `Person`, `Service`, `BreadcrumbList`, `FAQPage` on `/sanctuary`. `VisualArtwork` applies conditionally on `/portfolio/[slug]`, only when the piece's `medium` field is Painting or Sketch. **No `LocalBusiness`.**

---

## 8. D7 — Positioning: no owned studio, partner studios, travelling (resolves C6)

**Corrected with owner input.** Prerna owns no studio. She works **on collaboration with studios across Mumbai and Navi Mumbai**, and she travels.

This is better than either version in the docs. `PRD.md` §7.2 invented "a sunlit studio in Vashi" with a map embed and `LocalBusiness` schema. My v1.1 over-corrected to "no physical location at all". Both were wrong. There are real rooms where a client meets her. They are just not hers.

**Locked treatment:**

- **Schema:** `Person` (with `alternateName: "Alza"`, see D12) plus `Service` with `areaServed: Mumbai, Navi Mumbai`. **No `LocalBusiness`, no owned `address`, no `geo`.**
- **Primary location, confirmed 2026-07-26: Kharghar, Navi Mumbai.** Most sessions happen there. This is more concrete than the earlier "no fixed base" reading and it is worth stating in copy, because a first-timer's real question is where they physically go. It is still **not** a published street address and still **not** grounds for `LocalBusiness` schema. Naming the neighbourhood is honest and useful; publishing premises she has not confirmed is not.
- **New section, "Where to find me"**, on `/about` and linked from `/consulting`. Two blocks:
  - **Partner studios.** Each named, with the neighbourhood and the days she works there. This answers the nervous first-timer's real question, which is "where do I actually go?", without inventing an address.
  - **~~Travel calendar~~ — does not exist. Corrected 2026-07-26.** Prerna confirmed she has no travel schedule: she travels on request, based on what arrives through the enquiry form. Do not build a calendar and do not publish dates.
  - **Replace it with "Travel on request."** One short block: she works primarily from Kharghar, travels within Mumbai on demand, and will consider outside Mumbai if you ask. This is still a differentiator, it is just an availability model rather than a schedule. A calendar with no entries reads as an abandoned site; "tell me where you are" reads as an open door.
- **Copy discipline.** Always "I work out of [Studio] in [area] on these dates". Never "my studio". Never "our facilities". `content.md` §4 and §5 already follow this.
- **Hygiene copy must be accurate about ownership.** She brings her own single-use kit. The autoclave, the licensing and the room belong to the partner studio. Say exactly that. Do not claim someone else's equipment as hers, and do not imply she has none.
- **Consent to name partners.** Get written permission from each studio before listing them. A partner studio is a business relationship, not a location tag.

**SEO upside.** Naming real neighbourhoods where she actually works gives honest local relevance for "tattoo artist Andheri", "tattoo artist Vashi" and similar, without a fake address. This is a better local SEO position than the fabricated one in `PRD.md` §7.2, and it will not get flagged.

---

## 9. D8 — Fillout is the primary conversion surface, WhatsApp is a fallback (reverses v1.1's D8, resolves C13)

**Reversed with owner input, 2026-07-25.** v1.1 made WhatsApp the primary route with a self-built form as secondary. That is now inverted. **Fillout is the CTA everywhere. WhatsApp is a small fallback link, never a button, never accent-coloured.**

Form ID confirmed: `gvnCVtzfz2us`.

**What this changes, concretely:**

- Every "Start a conversation" CTA — header, hero, final CTA block, the Sketchbook — **navigates to `/consulting`**, not to a `wa.me` link. `content.md` §3 already locked this vocabulary rule: the button says "Start a conversation", the page it leads to is headed "Start a conversation". That rule was written before D8 existed and it was right. Follow it.
- `/consulting` embeds the Fillout **standard** embed, framed in our own chrome (see D8.2 below). This matches the exact snippet the owner supplied. No popup, no slider invented on top of it.
- WhatsApp drops to one small utility link: footer, and a one-line fallback next to the embed on `/consulting` ("Having trouble? Message us on WhatsApp"). It is never styled as a CTA and never claims the accent colour treatment.
- The self-built form scope from v1.0 — react-hook-form, zod, a custom `/api/consulting` route handler, Resend delivery of the form itself — **is dropped.** Fillout owns form logic, validation, storage and notification. Resend keeps its place for anything else the site needs to send (press kit requests, partner studio outreach), just not for this form.

**D8.0 — The contact hierarchy, locked 2026-07-26.**

Three routes exist. They are not equal and the inequality is deliberate.

| Tier | Channel | Where it appears | Treatment |
|---|---|---|---|
| **Primary** | Fillout form at `/consulting` | Every CTA on every page, without exception | Filled accent button. This is the only conversion path that gets promoted. |
| **Secondary** | `prerna@meetprerna.com` | Footer, and `/contact` below the form pointer | Small text link, `--color-ivory-dim`, underlined. Never a button. |
| **Secondary** | WhatsApp | Footer only | Small text link, `--color-ivory-dim`, underlined. Never a button, never accent-coloured. |

**Every primary CTA routes to `/consulting`.** Not to a `mailto:`, not to `wa.me`. The button says "Start a conversation", the page it opens is headed "Start a conversation", and the form on it is the thing that gets measured. One promoted path.

**Why keep email and WhatsApp at all.** Press, commercial and collaboration enquiries are genuinely better suited to email — someone sending a rate card or a PDF should not be filling in a tattoo consultation form. And a small number of people will not use a web form under any circumstances. Both channels exist as escape hatches, findable by anyone who looks, promoted to nobody.

**Why they stay small.** Every enquiry that arrives by WhatsApp or email is invisible to the funnel in §2. Fillout measures visitors, starts and completions at source; a WhatsApp message measures nothing. Splitting the funnel across three promoted channels would mean none of them is measurable. Concentrating on one and leaving the others discoverable is what makes the numbers mean anything.

**Before `prerna@meetprerna.com` ships, confirm the mailbox receives mail.** The current live site displays that address while its `mailto:` points at `hello@prosepixel.co`, which is the signature of a template placeholder that was never connected. Send a test message. **If it bounces, the address does not ship** — an advertised address that silently drops a press enquiry is worse than no address at all.

**D8.1 — Why `@fillout/react`, not the raw script tag the owner pasted.**

The pasted snippet is the vanilla embed: a script tag plus a `div` with `data-fillout-*` attributes. That works on a static HTML page. It has a specific, well-known failure mode on a Next.js App Router site: the Fillout script scans the DOM for `data-fillout-id` elements once, on load. If a user reaches `/consulting` via a **client-side route transition** rather than a hard page load, that `div` mounts after the scanner has already run, and the embed silently never appears.

Use the `@fillout/react` package instead. `FilloutStandardEmbed` for `/consulting`, matching `data-fillout-embed-type="standard"` from the snippet. It owns its own mount lifecycle through React, so it works identically on a hard load and a client-side transition. Same form ID, same behaviour, no SPA bug.

```tsx
import { FilloutStandardEmbed } from '@fillout/react';

<FilloutStandardEmbed
  filloutId="gvnCVtzfz2us"
  dynamicResize
  inheritParameters
  parameters={{ source: 'header' }}   // or "sketchbook", "sanctuary", etc.
  onInit={(submissionUuid) => track('enquiry_started', { source: 'fillout' })}
  onSubmit={(submissionUuid) => track('enquiry_submitted', { submissionUuid })}
/>
```

`onInit` and `onSubmit` map directly onto the funnel events in D1. This is a cleaner signal than the WhatsApp-tap proxy the previous version relied on — a WhatsApp deep link only proves a tap, never proves a message was actually sent. A Fillout submission is a confirmed event.

**D8.2 — "Seamlessly into our palette" is two jobs, not one.**

Fillout renders in an iframe. `tokens.css` cannot reach inside it. Matching the palette is genuinely two separate pieces of work, and only one of them is code:

1. **The chrome around the iframe** — this is a normal component, built like any other. Give the embed its own section: the `/consulting` heading and sub-line from `content.md` §7, a card surface at `--color-ink-100` with a `--color-ink-300` hairline, generous padding, then the embed inside it. A skeleton or shimmer placeholder while the script loads. If the script fails to load (ad blockers block third-party embed scripts often enough that this needs handling, not hoping), show a static fallback: the WhatsApp line, and an `mailto:` link.
2. **The inside of the iframe** — this cannot be styled from our codebase at all. It is set once, by hand, inside Fillout's own theme editor at `build.fillout.com`, using their preset colour and font pickers plus their custom CSS box. This is a manual task for whoever has the Fillout account, not something an Antigravity prompt can do. The literal values to enter are below. Do this once, before Phase 2 ships `/consulting`.

**Fillout theme sheet — enter these exactly, in Fillout's editor:**

| Fillout setting | Value | Matches |
|---|---|---|
| Background | `#1A1A1A` | `--color-ink` |
| Text | `#FDFFE9` | `--color-ivory` |
| Muted / helper text | `#C9CBB6` | `--color-ivory-dim` |
| Button / accent | `#C4FF61` | `--color-inchworm` |
| Button text | `#1A1A1A` | `--color-ink` (dark label on the filled accent, 14.8:1) |
| Button hover / pressed | `#9FCC4A` | `--color-inchworm-deep` |
| Input border | `#363636` | `--color-ink-300` |
| Input border, focus | `#C4FF61` | `--color-inchworm` |
| Error text | `#FF6B6B` | `--color-danger` |
| Border radius | `2px` | `DESIGN.md` §7 |
| Font | Inter | matches body face. Fraunces is not available as a standard Google Font inside Fillout's picker; do not fight this, headings inside the form stay Inter. |

If Fillout's custom CSS box is available on the plan in use, paste:

```css
.fillout-form { font-family: 'Inter', sans-serif; }
:focus-visible { outline: 2px solid #C4FF61; outline-offset: 2px; }
```

That second line is the one thing the preset pickers usually miss: a visible focus ring matching `--color-focus`, which the accessibility gate in `.agents/rules/30-quality-gates.md` requires everywhere on the site, including inside third-party embeds.

**D8.3 — CSP and script loading.**

`PRD.md` §6.10 and the original CSP note both said no third-party script in the global `<head>`. That rule stands, and Fillout does not break it if loaded correctly: `@fillout/react` lazy-loads its own script only when a `Fillout*Embed` component actually mounts, not globally. Add `server.fillout.com` to `script-src` and `frame-src` in the CSP header, scoped if the CSP tooling supports per-route policies, global if it does not — a single additional trusted domain is a small cost either way.

**D8.4 — Data residency note, not legal advice.**

Client PII, including reference image uploads, now leaves the site and is processed by Fillout. Add one line to `/privacy` naming Fillout as a data processor and linking their privacy policy. This is a flag, not a legal opinion; if the volume of enquiries grows enough to matter, get an actual privacy review at that point.

---

## 10. D9 — Custom cursor (resolves C7, C8)

**Locked: cut from v1.**

**Reasons, in order of weight:**

1. It replaces the system cursor, which contradicts `PRD.md` §6.9's own commitment.
2. `animations.md` §2.2 mutates `font-variation-settings` on headings per pointermove. That triggers style recalculation, layout and paint on text every single frame. It is the most expensive thing on the page and it directly breaks the 55fps Pixel 6a gate in §6.7.
3. `mix-blend-mode: difference` on a moving element forces large-area recomposition each frame. It is slow on iOS Safari specifically.
4. Frequency rule: the user sees the cursor 100% of the time they are on the site. The more often an animation is seen, the less it should move. This is the one element that should be the quietest, and the spec makes it the loudest.
5. It does not move a single number in §2.

**Replacement:** on media cards only, gated behind `@media (hover: hover) and (pointer: fine)`, a 200ms `ease-out` scale to `1.02` on the image inside a fixed frame, plus a static "View" label that fades in. No JS on pointermove at all.

If this is overruled, it goes behind a feature flag, ships in Phase 5 only, and only after the Phase 3 frame-rate gate has passed **without** it.

---

## 11. D10 — Smooth scroll (Lenis)

**Locked: cut from v1.**

**Reasons.** Lenis hijacks native scroll. It breaks browser scroll-anchoring, fights iOS momentum and rubber-banding, adds a permanent requestAnimationFrame loop, and is the single most common cause of scroll jank on mid-tier Android. Mid-tier Android is the stated performance target in `PRD.md` §6.8.

GSAP ScrollTrigger works correctly on native scroll. The `duration: 1.2` inertia in `animations.md` §0 is a taste preference. The frame budget is not.

Native scroll ships. Revisit after launch with real user monitoring data, not before. `scroll-behavior: smooth` is allowed on anchor jumps only, and disabled under `prefers-reduced-motion`.

---

## 12. D11 — Shader budget (resolves C9, C10)

**Locked: two shaders in v1.** InkField and Grain. That is it.

**The arithmetic.** `shaders.md` states per-pass GPU budgets of 4ms, 1ms, 3ms, 1ms and 4ms. That is 13ms. A 60fps frame is 16.6ms **total**, and that total also has to cover JavaScript, style, layout, paint and composite. Adding GSAP ScrollTrigger and a per-frame cursor on top of 13ms of GPU work does not hold 55fps on a Pixel 6a. It will not be close.

**Locked constraints on the two that ship:**

- One canvas, root layout, `z-index: 0`, `pointer-events: none`.
- **Library: OGL**, roughly 10KB gzipped, not three.js + @react-three/fiber + @react-three/drei. The GLSL in `shaders.md` is portable and does not change. Only the mount layer changes. If the team is faster in R3F, R3F is allowed, but **drei is banned** because it is where the weight comes from.
- DPR capped at **1.25 on mobile**, 1.75 on desktop.
- `requestAnimationFrame` paused when the canvas is off-screen (IntersectionObserver) and when `document.hidden`.
- Hard kill switch, canvas never mounts, when any of: `prefers-reduced-motion: reduce`, `navigator.connection.saveData`, `navigator.deviceMemory <= 4`, `navigator.hardwareConcurrency <= 4`, no WebGL context.
- Fallback is a static CSS radial gradient plus a pre-rendered grain PNG under 30KB. It must look deliberate, not broken.
- Combined GPU budget: **≤ 5ms** on a Pixel 6a, measured, not assumed.

Distortion, InkDrop and the Process shader are moved to a post-launch backlog. They ship only if 30 days of real user monitoring shows headroom.

---

## 13. D12 — "Alza" is Prerna's stage name (resolved)

**Resolved with owner input.** Alza is Prerna's stage name. The existing reviews are legitimate and can be republished.

The remaining issue is not authenticity, it is legibility. A first-time visitor lands on a site called MeetPrerna, scrolls to the testimonials, and reads five reviews praising someone called Alza. That visitor is on the page for exactly one reason: to check whether this artist is real. Confusion at the trust moment costs more than a missing testimonial.

**Locked treatment:**

- **Disclose once, plainly.** On `/about`: `Prerna also works as Alza.` One line. No explanation needed, no story required.
- **Normalise attribution in testimonials.** Where a review names Alza, render it as written but attribute it consistently. A single line above the testimonial block does the job: `Some clients know her as Alza.`
- **Schema:** add `alternateName: "Alza"` to the `Person` JSON-LD. Small SEO win. Searches for either name land on the same site.
- **Still required regardless of the name:** each testimonial carries a first name, last initial, city, and a link to source (Google review, Instagram comment, or written permission on file). That part of the original decision stands. A quote with no traceable source is worth less than three that have one.
- **Resolved 2026-07-26: Alza is retired.** Prerna confirmed the brand is "Prerna" or "MeetPrerna"; Alza was an old nickname. Use the past tense: `Some earlier clients knew her as Alza.` Keep `alternateName: "Alza"` in the `Person` schema so anyone searching the old name still finds her. Do not use Alza in any new copy.

---

## 14. D13 — Fix the live site this week (independent of the rebuild)

These are defects on `meetprerna.com` right now. The rebuild is 7 to 10 weeks away. These take an hour.

| Defect | Detail | Fix |
|---|---|---|
| **Footer links point to a template demo** | "Expertise", "About" and "Blog" in the footer all resolve to `etemplates.wdesignkit.com/techtide/...` | Point to real pages or delete the links. |
| **Email mismatch** | The footer displays `prerna@meetprerna.com` but the `mailto:` is `hello@prosepixel.co` | Correct the `mailto:`. |
| **Counters render "0 +"** | "Tattoos Completed 0+", "Client Satisfaction 0%" when the count-up script does not fire | Delete the counter block. It is also banned by PRODUCT.md's anti-references. |
| **Testimonials name "Alza"** | See D12 | Resolve or remove. |

The footer says "Powered by ALCHEMETRYX". Broken links on a site carrying your own agency credit cost more than the hour it takes to fix them.

---

## 15. D14 — Team, timeline, and the gate that replaced the content gate

**Locked.** `PRD.md` §9 plans 7 to 10 weeks across five named leads. `PRD.md` §13 has six approval signature lines. You are one person driving agents in Antigravity. Six signature lines is theatre.

- The five roles in `docs/agents.md` are **agent personas**, not people. One human approves. Prerna approves anything describing her practice.
- Re-cut solo-plus-agents timeline is in `BUILD-PLAN.md`.

**The content gate is lifted.** All launch assets are confirmed in hand. `PRD.md` §11 rated "content not ready" as the top risk and it is now closed. That removes the longest pole and cuts roughly three weeks off the plan.

**It is replaced by a one-day asset audit in Phase 1**, which is a much smaller thing but not a skippable one:

- Count the healed tattoo photos. Target 24. Confirm each is at least four weeks healed and shot in usable light.
- Count photographed artworks. Target 12. Confirm 3000px minimum on the long edge.
- Confirm studio, portrait and process frames are present.
- Confirm **written subject consent** exists for every client photograph. If consent is missing for a piece, it does not publish, however good it is.
- Confirm the partner studios have agreed to be named (see D7).
- **Confirm fresh-and-healed photo pairs exist.** Signature move M15 (`MOTION.md` §6) needs the same piece shot at day zero and at four weeks or later, framed alike. Six pairs is enough. If they do not exist, message past clients for a healed photo. This is the one asset gap worth chasing, because M15 answers the biggest unspoken fear a first-timer has and no competitor in Mumbai answers it.
- Rename to slugs and sort into `/public/images/{portfolio,hero,about,studio,og}/`.

One day, done before Phase 2 starts. The point is not to doubt the assets. It is that finding a consent gap in week five is expensive and finding it in week one is free.

**The critical path is now Phase 2, not Phase 3.** `PRD.md` §9 named Phase 3 (Motion) as critical. With content in hand and Lenis, the custom cursor and three shaders cut, motion is roughly five days of work. Phase 2, which is nine routes plus content files plus redirects plus the Fillout embed, is the long pole. Plan accordingly.

---

## 16. What did not change

These v1.0 decisions are correct and stay as written:

- Next.js App Router, TypeScript strict, pnpm.
- Tailwind for layout, CSS Modules for component internals, CSS variables as the single token source.
- GSAP with ScrollTrigger for scroll choreography. (Licence note: since GSAP 3.13, all plugins including SplitText, MotionPath and Inertia are free under the Webflow acquisition. No Club licence needed. Nobody needs to worry about this.)
- Radix primitives for Dialog, Tabs, Tooltip.
- **Rive is approved** as the third motion layer, roughly 100KB lazy loaded, replacing shader passes 3, 4 and 5. It is a vector motion runtime built for line work, and it is what OFF+BRAND used on landonorris.com. `MOTION.md` §6, M20.
- Zod-validated server handlers, rate limited at the edge.
- Vitest, Playwright, axe-core, Lighthouse CI as blocking gates.
- Phase-gated delivery with checklist gates rather than vibes.
- The four pillars as an architectural constraint, not a tagline.
- No e-commerce, no multi-language, no accounts, no comments in v1.

The bones are good. The corrections above are about the twenty percent that would have cost real time.

## 18. D17 — Final stack, locked 2026-07-25. No CMS.

Sanity is dropped. The blueprint's content layer was built for a product, not a portfolio. This is the shipped stack.

| Job | Tool | Notes |
|---|---|---|
| Enquiries | **Fillout**, form `gvnCVtzfz2us` | Already built. `/consulting`. See D8. |
| Deposits | **Cashfree** (UPI) | Already built, outside this site. Not Stripe: Stripe India is invite-only since May 2024 and does not do domestic INR. Cashfree holds RBI PA authorisation and handles UPI intent flow properly. |
| Images | **`/public/images/` in the repo** | ~30 images total. Cloudinary was specified and then dropped as over-engineering: it added an account, three env vars, an upload script and a folder-mode gotcha to solve a problem that does not exist at this size. Next.js `<Image>` already handles resizing, AVIF/WebP conversion, lazy loading and blur placeholders for local files. See D20. |
| Testimonials | **Senja** | Live. Collection form and widgets already configured. See D18. |
| Piece metadata | **A typed file in the repo** | See D19. |

There is no CMS and no database. Anything that changes rarely lives in the repo. Anything that changes often lives in the tool that owns it.

---

## 19. D18 — Senja: use the API, not the widget embed

Senja is live at project `meetprerna`. Five testimonials imported and approved.

**Collection link, for sharing at the end of a session:**
`https://senja.io/p/meetprerna/r/collect`

Put this on a small card in the aftercare pack, as a QR code. The moment to ask is while the client is still in the chair hearing the aftercare talk, not three days later over WhatsApp.

**Do not use the Senja widget embed on this site.** The embed is available and works:

```html
<script src="https://widget.senja.io/widget/3a634517-abc1-4813-b1dc-4a56a65acb8e/platform.js" async></script>
<div class="senja-embed" data-id="3a634517-abc1-4813-b1dc-4a56a65acb8e" data-mode="shadow" data-lazyload="false"></div>
```

But it renders in a shadow DOM with Senja's own styling, which `tokens.css` cannot reach. That is the same iframe problem as Fillout, except here we have a choice, because Senja has an API and Fillout does not expose form internals.

**Locked: fetch testimonials from the Senja API at build time and render them in our own components.** M10, the marquee, is already specified in `MOTION.md` as our own build with our own tokens, pause-on-hover and an `aria-hidden` duplicate. The Senja widget cannot do any of that correctly. Revalidate hourly with ISR so a newly approved testimonial appears without a deploy.

Keep the widget embed as a fallback only, if the API path costs more than an hour.

---

## 20. D20 — Images live in `/public`, not Cloudinary (reverses the Cloudinary decision)

**Reversed 2026-07-25.** No Cloudinary. No media host. Images sit in the repo.

**Why the reversal.** The owner is non-technical. The Cloudinary path required a new account, three environment variables, a Node upload script, and an understanding of why `public_id` differs from `asset_folder` in dynamic folder mode. That is a real cost, paid by a person who has shipped several sites by putting images in folders.

At roughly 30 images, Cloudinary buys almost nothing. Next.js `<Image>` already does the work that matters for local files: it resizes per breakpoint, converts to AVIF or WebP automatically, lazy-loads below the fold, and generates blur placeholders. Vercel serves them from its CDN either way. The only genuine Cloudinary advantages, keeping large libraries out of git and changing images without a redeploy, do not apply: 30 optimised images is a trivial repo cost, and image changes already require a redeploy because `portfolio.ts` lives in the repo too.

**Folder structure, extended from what the owner already uses:**

```
public/images/
  portfolio/    the 15 pieces, plus healed pairs
  hero/         hero images
  about/        about page
  studio/       studio, hands, tools, process stills
  og/           social share images
public/video/   process clips (M13)
```

**Naming: the filename is the identifier.** Lowercase, hyphens, no spaces. `tidal.jpg`. A healed pair is `tidal.jpg` and `tidal-healed.jpg`. That is the whole convention.

**One real constraint.** Source images must be resized and compressed before being added. A 5MB phone photo bloats the repo even though the served version is optimised. Max 2000px on the long edge, under about 1MB each. This is a two-minute job in any photo tool and is the only discipline this approach requires.

**The migration path, if this ever stops working.** If the library grows past ~200 images or Prerna needs to change images without a deploy, move to Cloudinary then. Because `portfolio.ts` stores an image *path* either way, that migration changes one helper function and nothing else.

---

## 21. D19 — Piece metadata lives in the repo

The image file does not know it is a fine-line forearm piece from 2025. That data has to live somewhere, and the honest options were a typed file in the repo or a light Airtable layer.

**Locked: a typed file in the repo.** `src/content/portfolio.ts`, one object per piece.

```ts
export type Piece = {
  slug: string;
  title: string;
  medium: 'tattoo' | 'painting' | 'sketch';
  year: number;
  image: string;               // filename only, e.g. "tidal.jpg"
  healed?: string;             // e.g. "tidal-healed.jpg", enables M15
  motifs: string[];
  placement?: string;          // tattoo only
  sessions?: number;           // tattoo only
  dimensions?: string;         // painting and sketch only
  available?: boolean;         // painting and sketch only
  story?: string;              // 60 to 120 words, her voice
};
```

`/portfolio`'s filter bar reads from this array. No fetch, no database, no API call, instant filtering.

**The known cost, stated plainly.** Every new piece means editing this file and redeploying. Prerna cannot do that from her phone. Ashok is the person who adds new work, indefinitely, until this changes.

That is an accepted trade, not an oversight. The migration path, if it ever gets painful: move the array into Airtable, keep the exact same `Piece` shape, and fetch it at build time. Because the shape does not change, that migration touches one file and nothing else. Build the simple version now.

---


## 22. D21 — Measurement architecture: two systems, different jobs

**Locked 2026-07-25.** There are two measurement layers on this site and they answer different questions. Conflating them is what caused the confusion in the first place, so the split is written down here explicitly.

### Layer 1: the funnel. Measured at source, not by us.

Nothing in our codebase records the funnel. Every number in §2 comes from a tool that already owns that step:

| Metric from §2 | Source | Cost |
|---|---|---|
| `work_viewed` | Vercel Analytics, page view on `/portfolio` | free |
| `enquiry_started` | Fillout Analytics tab, **Unique Visitors** | free, all plans |
| `enquiry_submitted` | Fillout Analytics tab, **Finished** | free, all plans |
| Completion rate | Fillout, finished ÷ unique visitors | free, all plans |
| Attribution (which page sent them) | Fillout hidden field via the embed's `source` parameter | free |
| `art_enquiry_submitted` | Fillout, filtered on the project-type field | free |
| `consult_confirmed` | **Offline.** Cashfree and studio records. | not a web event |

Fillout measures the form from inside the form, which is strictly more accurate than a client-side event listener that can miss, double-fire, or be blocked. Page-level drop-off inside the form is Business plan and above; the four fields above are on all plans and are the ones that matter.

**Do not build a client-side funnel event pipeline. It would be less accurate than what already exists, for more code.**

### Layer 2: on-site behaviour. Ours, because nothing else can see it.

`/api/analytics` exists for the questions no third party can answer, all of which are variants of **"is the expensive thing we built actually being used?"**

This site has several costly signature interactions. M15 the healed slider, M17 the Sketchbook, M18 the drag gallery, M21 the per-character pillar text. Each took real build time. Without this layer there is no way to know whether anyone touches them, and therefore no basis for keeping or cutting them later.

Initial event set, deliberately small:

| Event | Fires when | Answers |
|---|---|---|
| `slider_used` | M15 divider dragged past 10% | Is the healed comparison worth its build cost? |
| `sketchbook_opened` | A sketch is opened, with its slug | Which sketches pull? |
| `filter_used` | A `/portfolio` filter is applied, with medium and motif | What are people actually looking for? |
| `scroll_depth` | 25 / 50 / 75 / 100% on `/sanctuary` | Do people reach the pain and hygiene sections, or leave first? |
| `cta_tapped` | Any "Start a conversation", with page and position | Taps that never reach the form. Fillout cannot see these. |

`scroll_depth` on `/sanctuary` is the most valuable of the five. That page is where a nervous first-timer either gets reassured or leaves, and it is the page most likely to be too long.

**Constraints.**

- No PII. No IP addresses, no fingerprinting, no user identifiers. Event name plus a small props object only.
- Honour `navigator.doNotTrack`. Return early, send nothing.
- `keepalive: true` so an event fires on a page the user is leaving.
- All errors swallowed. Measurement never blocks or breaks a page.
- Zero third-party dependency weight. This is a `fetch` to our own route.

**Current state: the sink is deliberately open.** The route logs to console today. Vercel logs are ephemeral and unqueryable, so **nothing is being retained yet, and that is a known and accepted state, not a gap.** The interface exists so a real destination can be attached later without touching a single call site. When traffic justifies it, point the route at whatever store is convenient.

**Naming rule, and this is the part that caused the confusion.** Do not call this module `analytics.ts` and do not call its function `track()`. Generic names invite the assumption that the funnel is being recorded here. It is not, and someone reading this file in six months will assume otherwise. Name it for what it does: `src/lib/behaviour.ts`, exporting `recordInteraction()`. The route keeps a header comment stating plainly that the funnel lives in Fillout and Vercel, not here.

---

## 23. D16 — Headline reversal and the city line, owner corrections 2026-07-25

**Headline.** `content.md` §2 recommended "She carries no studio. Only a needle, and everything she knows." and explicitly told the owner not to ship "Beyond Ink: Your Story, Translated into Abstract Art," calling it a stock tagline.

**Overridden.** The hero H1 ships as `Beyond Ink: Your Story, Translated into Abstract Art`, at `--text-display-xl`. The reasoning against it stands as written in `content.md` §2 for the record, and is overridden anyway. This is a brand-voice call, not a factual one, and the owner has the final word on how the site sounds.

**The sub-line**, matching register: `Custom tattoos, original paintings and sketches: made in conversation, never in a rush.` Mirrors the H1's colon construction rather than dropping to plain prose underneath it, so the two lines read as one voice instead of a headline followed by a caption. If a different sub was intended by "similar," swap the clause after the colon; keep the colon and the "made in conversation" phrase, since that is the line doing the work the old sub-line's "wherever the work takes her" used to do.

**The city line — REMOVED from the header, 2026-07-27.**

`Mumbai · Navi Mumbai · Travelling Artist | ✈️ Now in Goa` no longer
appears in the navigation. Owner decision: the header is being
rebuilt section by section, starting from a clean header, and this
line does not return to it.

It was previously specced as a `siteSettings.cityLine` string, editable
by Prerna, appearing between the logo and the nav pill. That entire
element is cut. Where "where she works from" and "travels on request"
live now: `/about`, in the "Where to find me" section (`content.md`
§5b) and, if wanted later, the footer's centre column
(`DESIGN.md` §11b). Do not re-add it to the header without a new,
explicit owner decision recorded here.

`DESIGN.md` §10 bans emoji as icons, for real reasons: inconsistent rendering across Android skins, and an odd fit next to a monospace metadata line built to read like a shipping label. That stands as general guidance. This one line is an explicit exception, made once, by the owner, not a precedent for icons elsewhere on the site. If it ever looks wrong in practice, the fix without losing the warmth is a small inline SVG plane in `--color-inchworm` in place of the emoji glyph, same position, same meaning, consistent rendering everywhere.

---

## 24. D22 — Footer redesign: WhatsApp removed from the footer, footer inverts (owner decision, 2026-07-27)

**Reverses part of D8.0.** D8.0's contact hierarchy table listed WhatsApp as a footer-only secondary channel, alongside email. That is now removed from the footer specifically. Email is the sole contact route on the footer. This does not touch WhatsApp anywhere else it might reasonably still appear (it was never promoted beyond a small fallback link to begin with, per D8.0) — it is a footer-only removal, made because the footer's job was redefined as brand signature rather than conversion, and a two-channel footer contradicts a single quiet contact route sitting under a loud signature line.

**The footer inverts.** Background `--color-inchworm`, text `--color-ink`, per `DESIGN.md` §9 (amended same date, item 3). Locked content, in order: the signature line ("Your story deserves to be worn."), a contact column (email only), a nav column (identical labels and order to the header — real routes, not renamed ones; see the nav-label rule below), a social column (Instagram only until further handles are confirmed live), and a "Powered by Alchemetryx" credit. No CTA in the footer — the booking CTA lives in the page content above it, not duplicated into the footer.

**Nav labels always match their route slug.** Settled the same date: the label for `/portfolio` is "Portfolio", not "Work" and not "Expertise". If a label and its slug ever disagree, the slug wins and the label is the bug. Applies identically to the header and the footer — they carry the same four items (Portfolio, Sanctuary, About, Contact) in the same order, because those are the site's only real routes.

**Social icons are not equal-weight by default.** Only accounts with a confirmed, live handle ship. At the time of this decision, that is Instagram only (`instagram.com/meetprerna.tattoos`, corrected from a wrong `prerna.tattoos` handle found in `layout.tsx`'s Person schema — same class of bug as the previously-fixed broken email link, just in a different file). Pinterest, Facebook and YouTube are not included until their real handles are supplied and confirmed live; the row is built so adding one is an append, not a rebalance.

**A legal row (Privacy, Refund Policy, Terms) is planned but not built.** The footer's layout is deliberately a plain top-to-bottom block stack with no `space-between` spanning its full height, specifically so that row can be appended later as its own block without touching anything above it.

---


## 25. D25 — Header redesigned to 2-stage pill (owner decision, 2026-07-27)

**Reverses part of SCROLL COORDINATION.** The previously locked 3-stage header convergence (`data-nav="0/1/2"` with thresholds at 80px and 220px) is completely removed. 

**New spec:** 
A simpler 2-stage model using `120px` as the singular scroll threshold.
* **Top (0-119px):** Full-width, transparent, height 84px.
* **Scrolled (120px+):** The header shrinks to an 800px max-width pill with `border-radius: 22px`, `height: 56px`, and an opaque background (`rgba(11, 11, 12, 0.92)`). The `backdrop-filter: blur(14px)` is constant to prevent scroll jank.
* **Mobile (<1024px):** Remains full-width and transparent at all times, no pill shrink, locked at 68px height.
* **CTA Button:** InteractiveHoverButton replaced with a standard link. Default: transparent with 1px solid Ivory border. Hover: Ivory background with Ink text.
