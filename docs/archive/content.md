# MeetPrerna — Content Inventory & Copy (`content.md`)

> The full inventory of every string, image, and asset the site needs at launch. Plus a copy deck. Source of truth for the Content Strategist.

---

## 1. Voice at a glance

**Editorial. Specific. Warm. Restraint.**

A few writing rules for everyone who touches copy:

1. **Sentences breathe.** Prefer 12–20 words. Avoid comma-spliced 40-word monsters.
2. **Concrete over abstract.** "She works from a sunlit studio in Vashi" beats "world-class facilities".
3. **First-person in essays and process copy.** Third-person in listings, metadata, and structured data.
4. **No exclamation marks.** None. The inchworm is the exclamation.
5. **No "we" in marketing copy.** "Prerna" or "the studio". A studio is not a corporate team.
6. **No superlatives without evidence.** "Custom tattoos" is fine. "The best custom tattoos in Mumbai" needs a citation. Skip the citation.
7. **Bilingual instincts.** Write English that a thoughtful Marathi or Hindi speaker would find elegant. Slang that doesn't travel doesn't ship.
8. **No emoji.** Anywhere.
9. **Banned words:** *unleash, unleash, journey, transformative, world-class, bespoke, curated, elevate, empower, dive in, unlock, delve, tapestry, realm, symphony, masterpiece, epic, groundbreaking, cutting-edge, holistic.* If a sentence loses meaning without one of these words, rewrite the sentence.

The full voice guide is in the Content Strategist's hand-off doc (delivered with the CMS).

---

## 2. Site-level copy

### 2.1 Brand statements (used in PR, social bio, footer)

| Variant | Text | Where |
|---|---|---|
| Long | MeetPrerna is a creative studio in Navi Mumbai for custom tattoos, abstract paintings, and sketches — slow, story-driven work made with care. | About page footer, press kit |
| Medium | A creative studio in Navi Mumbai. Custom tattoos, abstract paintings, sketches. | Footer |
| Short | Custom tattoos & abstract art. Mumbai. | OG, Twitter bio |
| Tagline candidates | *Ink as language. Studio as a slow room.* · *Care, before craft.* · *Each piece, a conversation.* | Manifesto header, OG card |

### 2.2 The four pillars — the short version (used in the Manifesto grid on `/`)

| Pillar | One-line | One-paragraph (used on `/studio`) |
|---|---|---|
| **Psychology** | Choosing to mark your skin is a decision about who you are becoming. | Every tattoo begins in a conversation — sometimes weeks long, sometimes years. We don't rush it. We listen to the story, the hesitation, the joy, the grief, the why-now. The work is a response to that conversation, and a translation of it. |
| **Meditation** | The needle, the brush, the pencil — three rhythms, one attention. | When Prerna works, the studio gets quiet. The radio goes off. The phone goes down. The work is its own kind of moving meditation — line, wash, line — and we keep the room still enough to hear it. |
| **Therapy** | Art is a way of saying things that don't have words. | Many of the pieces here started as something the client couldn't quite say. We don't pretend to be therapists, but we know that a finished piece on your skin, or on your wall, can carry something a paragraph couldn't. |
| **Calmness** | The studio is a quiet room, by appointment only. | No walk-ins. No loud music. No one selling you something. Just tea, natural light, a long table, and the kind of conversation that needs a long table. |

### 2.3 Studio essay (`/studio` — 600 words, first-person)

> *Drafted by the Content Strategist during Phase 5. Placeholder structure below — actual prose in `src/content/studio-essay.ts`.*

**Lead (60 words):** Open with the studio as a *place* — the light, the table, the silence.

**Middle 1 (180 words):** The practice. The three surfaces (tattoo, painting, sketch) and how they share a discipline.

**Middle 2 (180 words):** The four pillars woven in. No labels. Just the *practice* of them.

**Middle 3 (120 words):** Who comes. The first-timer, the returning collector, the international buyer.

**Close (60 words):** What we'd like the reader to do next. Two options, no pressure.

### 2.4 About (`/about` — 400 words, mixed first- and third-person)

> *Drafted during Phase 5. Placeholder structure.*

- **Lead (40 words):** "Prerna is a tattoo artist, painter, and sketch artist based in Navi Mumbai."
- **Origin (120 words):** First-person. When the work started. What she was making before she was making it on skin.
- **Practice (140 words):** First-person. The room. The day. The way the work is made.
- **Recognition (60 words):** Third-person. Press, residencies, exhibitions (with placeholders if none yet).
- **Close (40 words):** A line in Times New Roman italic. The kind of line a reader remembers.

### 2.5 Process (`/process` — five steps, ~1,200 words total)

| Step | Title | Length | Lede |
|---|---|---|---|
| 1 | **Conversation** | ~200 words | The brief, the consult, the references. |
| 2 | **Sketch** | ~250 words | Pencil to paper. The first wrong lines. |
| 3 | **Design** | ~250 words | Digital refinement, iterations, sign-off. |
| 4 | **Session** | ~300 words | The day-of. What to bring, what to expect. |
| 5 | **Aftercare** | ~200 words | Healing, touch-ups, the long arc. |

### 2.6 Navigation (primary)

| Label | URL |
|---|---|
| Studio | `/studio` |
| Tattoos | `/tattoos` |
| Paintings | `/paintings` |
| Sketches | `/sketches` |
| Process | `/process` |
| About | `/about` |
| Contact | `/contact` |
| Begin a piece | `/book` |

**Footer (secondary):**

| Label | URL |
|---|---|
| Press | `/press` (reserved, not built) |
| FAQ | `/faq` (reserved) |
| Privacy | `/privacy` |
| Instagram | external |
| Are.na | external |

### 2.7 404 page

> **404.** This page is somewhere we haven't inked yet.
> The studio is open. → [Get in touch](/contact)

### 2.8 Error page (500)

> **Something on our side.**
> Try again in a moment. If you're here about a piece, [write to us directly](mailto:studio@meetprerna.com) — it goes to a real inbox.

---

## 3. Home (`/`) — section copy

### 3.1 Hero

- **Eyebrow:** *Meet Prerna — Mumbai, IN*
- **Headline (display-xl, two lines):**
  > *Ink as language.*
  > *Studio as a slow room.*
- **Subhead (body-lg):** Custom tattoos, abstract paintings, and sketches — story-driven work made by hand, in a quiet studio in Vashi.
- **Primary CTA:** *Begin a piece* → `/book`
- **Secondary CTA:** *See the work* → `#work`

### 3.2 Manifesto

- **Eyebrow:** *The thesis*
- **Title (display-md):** *Four ideas that make the work.*
- **Body (body-lg, single paragraph):** Every piece at MeetPrerna is a small argument about attention, presence, healing, and care. We don't say it; we practice it. The studio is structured around four ideas — psychology, meditation, therapy, calmness — and the four ideas are the same idea: *the slow room where the work happens*.
- **Pillar grid (4 items, 1 line each):** *Psychology · Meditation · Therapy · Calmness*

### 3.3 Selected Work

- **Eyebrow:** *Selected work*
- **Title (display-sm):** *Recent pieces.*
- **Body:** A curated set — 6 pieces spanning tattoos, paintings, and sketches. Click any to open the detail.
- **CTA:** *See the full archive* → `/tattoos`

### 3.4 Process teaser

- **Eyebrow:** *The process*
- **Title (display-sm):** *How a piece gets made.*
- **Steps (5 lines, 1 per step):**
  1. *Conversation — the brief.*
  2. *Sketch — pencil to paper.*
  3. *Design — refining the line.*
  4. *Session — the day of.*
  5. *Aftercare — the long arc.*
- **CTA:** *Read the full process* → `/process`

### 3.5 Studio vignette

- **Eyebrow:** *The space*
- **Title (display-sm):** *A quiet room, by appointment only.*
- **Body:** Two or three studio photographs with no text. A short caption below: *Vashi, Navi Mumbai. Tea, natural light, a long table.*

### 3.6 Testimonials

- **Eyebrow:** *Words from the room*
- **Title (display-sm):** *What clients say.*
- **3 pull-quotes** (Times New Roman italic, marigold underline). First name + last initial + city.

### 3.7 Final CTA / Footer

- **Title (display-md):** *Begin a piece.*
- **Body:** Send a brief. We respond within 48 hours. The studio is open for consultations Tuesday through Saturday.
- **CTA:** *Open the form* → `/book`

---

## 4. Studio (`/studio`) — section copy

| Section | Eyebrow | Title | Body / Notes |
|---|---|---|---|
| Hero | *The studio* | *A quiet room in Vashi.* | One-line address and founding year. |
| The space | *The space* | *The light, the table, the silence.* | 200-word essay. |
| Four pillars | *The practice* | *Four ideas.* | One section per pillar, with a portrait. |
| Press | *Recognition* | *Selected press.* | Logos (or "no press yet — for the right piece, please write to us"). |
| CTA | *Visit* | *By appointment only.* | Map embed + address. |

---

## 5. Tattoos (`/tattoos`)

| Field | Value |
|---|---|
| Hero eyebrow | *The archive* |
| Hero title | *Tattoos.* |
| Hero body | A browsable archive of custom work — line, blackwork, flora, abstract, geometry. Click any piece to see the full case. |
| Filter | Style · Body area · Year |
| Empty state | *Nothing in this style — yet.* Reset filter, or get in touch about a custom piece. |
| Card | Title · Year · Style tag(s). |
| Detail (dialog) | Title, year, placement, body area, style tags, healing notes if any, 3–6 images, related pieces, CTA. |

---

## 6. Paintings (`/paintings`)

| Field | Value |
|---|---|
| Hero eyebrow | *The canvas* |
| Hero title | *Paintings.* |
| Hero body | Abstract work in acrylic, gouache, and mixed media. Studio enquiries and commissions welcome. |
| Series index | *Year — Series name — N pieces* |
| Card | Title · Year · Medium · Dimensions |
| Detail (dialog) | Title, year, medium, dimensions, status (available / sold / commission), 3–6 images, artist's note, CTA. |

---

## 7. Sketches (`/sketches`)

| Field | Value |
|---|---|
| Hero eyebrow | *The thinking* |
| Hero title | *Sketches.* |
| Hero body | Pencil and ink studies — the thinking-before-the-thinking. |
| Card | Title · Year · Medium |
| Hover state | A process note from Prerna: *"The first wrong lines."* |

---

## 8. Process (`/process`) — section copy

| Step | Eyebrow | Title | Body lead |
|---|---|---|---|
| 1 | *01 — Conversation* | *The brief.* | Every piece starts with a conversation. We talk for an hour — sometimes two. |
| 2 | *02 — Sketch* | *Pencil to paper.* | Prerna draws by hand first. The sketch is wrong, then less wrong, then right. |
| 3 | *03 — Design* | *Refining the line.* | The sketch is digitized, refined, sent for your sign-off. |
| 4 | *04 — Session* | *The day of.* | Eat, sleep well, bring ID, wear loose clothing. We provide the calm. |
| 5 | *05 — Aftercare* | *The long arc.* | Heal. Photograph. Send us photos at week 2 and week 6. Touch-up if needed. |

---

## 9. About (`/about`) — section copy

| Section | Eyebrow | Title |
|---|---|---|
| Hero | *The artist* | *Prerna.* |
| Origin | *Origin* | *The work before the work.* |
| Practice | *Practice* | *A day in the studio.* |
| Recognition | *Recognition* | *Selected press.* |
| Closing | — | *The line.* (Times New Roman italic) |

---

## 10. Contact (`/contact`) — section copy

| Field | Value |
|---|---|
| Hero eyebrow | *The studio is open.* |
| Hero title | *Get in touch.* |
| Address | Studio 4, Lane 7, Vashi, Navi Mumbai 400703 |
| Hours | Tuesday–Saturday, 11:00–19:00 IST, by appointment only |
| Phone | +91 98200 00000 (placeholder) |
| Email | studio@meetprerna.com |
| Map | Embedded Google Map (lazy-loaded on interaction) |

### 10.1 Form labels

| Field | Label | Placeholder | Helper |
|---|---|---|---|
| Name | *Your name* | — | — |
| Email | *Email* | *you@somewhere.com* | — |
| Project type | *Project type* | *Tattoo · Painting · Sketch · Other* | Pick one. |
| Brief | *Your brief* | *Tell us about the piece. Reference images, dimensions, dates, anything that helps.* | Markdown allowed. |
| References | *References (up to 5)* | *Drop images here.* | 10MB per image. |
| Consent | *I agree to the privacy policy.* | checkbox | required |

### 10.2 Error messages

| Condition | Message |
|---|---|
| Required empty | *This one's needed.* |
| Email invalid | *That doesn't look like an email. Check for a typo?* |
| Brief too short | *A little more, please. Even two lines help us help you.* |
| File too large | *That image is over 10MB. Try compressing it.* |
| Submission failed | *Something on our end. Try again, or write to studio@meetprerna.com directly.* |

---

## 11. Book (`/book`) — section copy

- **Eyebrow:** *Begin a piece*
- **Title (display-md):** *Tell us about it.*
- **Subhead:** Send a brief. We respond within 48 hours, Tuesday–Saturday IST.
- **Form fields:** project type · body area (tattoo) · preferred month · references (up to 5) · brief · name · email · phone (optional) · consent.
- **Success state:** *Sent.* A confirmation card with a calendar link to the studio and a note: *"We've got it. We reply within 48 hours. — Prerna"*.

---

## 12. FAQ (8 questions, ≤ 60 words each)

> The full FAQ lives in `src/content/faqs.ts`. Below is the editorial draft.

1. **What styles do you work in?** *Custom line, blackwork, flora, geometry, and abstract. We don't do portraits, photorealism, or letters in non-Latin scripts.*
2. **What's the studio minimum?** *Tattoos start at ₹6,000 for small line pieces. Larger work is quoted per piece after the consultation.*
3. **How does pricing work?** *Per piece, not hourly. You see a quote after the design is finalized. The deposit (₹3,000) books the session.*
4. **Do you take walk-ins?** *No. The studio is by appointment only — that's how we keep the room calm.*
5. **What's the deposit policy?** *₹3,000, non-refundable, applied to the final piece. Reschedules with 48 hours notice keep the deposit.*
6. **What should I bring to the appointment?** *Photo ID. A snack. Loose, dark clothing that gives access to the area. A reference image, printed if you can.*
7. **Do you do cover-ups?** *Sometimes. We assess on a case-by-case basis after a consultation.*
8. **Do you do touch-ups?** *Yes — one complimentary touch-up within six months of the original session.*

---

## 13. Testimonials (3–6 short quotes)

> Placeholder structure. Final testimonials delivered in Phase 5 with first name + last initial + city.

| Quote | Attribution |
|---|---|
| *The studio is the quietest place I've been in Mumbai. The piece took seven months from the first call to the day. Worth every week.* | Aanya R., Mumbai |
| *I came in for a small line piece. I left with the smallest line piece and the largest decision of my year. I love it.* | Devansh M., Bengaluru |
| *We commissioned a painting for our office in London. Prerna shipped it, framed, with a note. We hung it in the lobby.* | Lina S., London |

---

## 14. Portfolio taxonomy

### 14.1 Style tags (taxonomy — locked)

- `line` — fine line, single-needle
- `blackwork` — solid black, no grey
- `flora` — botanical, plant-based
- `geometry` — geometric, sacred-geometry adjacent
- `abstract` — abstract, painterly

(Each portfolio item has 1–3 style tags.)

### 14.2 Body area (tattoos only)

- `arm` (forearm, upper arm, sleeve)
- `back`
- `chest`
- `leg`
- `rib`
- `neck`
- `hand`
- `ankle`
- `wrist`

### 14.3 Series (paintings, sketches)

- A `series` is a named collection (e.g., "Salt 2024", "Quiet Hours"). Each series has 3–12 pieces.

### 14.4 Year range

- All items carry a `year` (integer). The portfolio filter has a year slider (last 5 years visible by default; older archives expandable).

---

## 15. Image inventory (minimum viable launch)

| Asset | Count | Notes |
|---|---|---|
| **Portfolio — tattoos** | 24 | 4–6 per style tag. 1 hero shot + 2 detail shots each. |
| **Portfolio — paintings** | 12 | 3 per series. |
| **Portfolio — sketches** | 8 | 2 per series. |
| **Hero still** | 1 | The wide hero on `/`. Studio interior with Prerna at work. |
| **About portraits** | 3 | 1 square, 1 wide, 1 editorial (3:4). |
| **Studio photos** | 8 | 6 wide, 2 detail. |
| **Process illustrations** | 5 | One per step, documentary style. |
| **OG fallback** | 1 | Static, 1200×630. |
| **Press kit images** | 6 | High-res downloadable, with credit + license. |

### 15.1 Image naming convention

```
<scope>-<subject>-<use>-<size>.<ext>

e.g.,
hero-studio-wide-1920.avif
portfolio-tattoo-line-2024-floral-arm-1200.avif
about-prerna-portrait-3x4-800.avif
og-default-1200x630.avif
```

### 15.2 Image metadata (alt text rules)

- **Portfolio item:** the title + the style + the body area. *e.g., "Floral fine-line tattoo on inner forearm, 2024."*
- **Portrait of Prerna:** *"Prerna, tattoo artist and painter, in her Vashi studio."*
- **Studio wide:** *"The MeetPrerna studio in Vashi — long work table and natural light."*
- **Decorative / pattern / texture:** `alt=""` (decorative).

---

## 16. SEO surface — full

### 16.1 Per-route metadata

| Route | `<title>` | `<meta description>` |
|---|---|---|
| `/` | `MeetPrerna — Custom Tattoos & Abstract Art in Mumbai` | `A Navi Mumbai-based creative studio by Prerna — custom tattoos, abstract paintings, and sketches. Each piece is a slow, personal conversation.` |
| `/studio` | `The Studio — MeetPrerna` | `A sunlit studio in Vashi, a four-pillar practice, and the way the work is made.` |
| `/tattoos` | `Tattoos — MeetPrerna` | `Custom tattoos by Prerna: line, blackwork, flora, geometry, abstract. Browse the archive.` |
| `/paintings` | `Paintings — MeetPrerna` | `Abstract paintings and original art for collectors and interiors. Studio enquiries welcome.` |
| `/sketches` | `Sketches — MeetPrerna` | `Original pencil and ink sketches, the thinking-before-the-thinking.` |
| `/process` | `The Process — MeetPrerna` | `From first conversation to healed tattoo: how a piece at MeetPrerna actually gets made.` |
| `/about` | `About Prerna — MeetPrerna` | `Prerna is a tattoo artist, painter, and sketch artist based in Navi Mumbai. Bio, statement, and selected recognition.` |
| `/contact` | `Contact — MeetPrerna` | `Start a project, ask a question, or visit the studio in Vashi by appointment.` |
| `/book` | `Book a Consultation — MeetPrerna` | `Send a brief. Get a response within 48 hours. Begin a custom tattoo, painting, or sketch.` |

### 16.2 JSON-LD types

| Page | Type |
|---|---|
| All | `Person` (Prerna) |
| `/contact`, `/book` | `LocalBusiness` + `ProfessionalService` |
| Portfolio item detail | `VisualArtwork` |
| All (where applicable) | `BreadcrumbList` |
| `/process`, `/about` | `FAQPage` |
| Portfolio images | `ImageObject` with `license` and `creator` |

### 16.3 Open Graph

| Field | Value |
|---|---|
| `og:title` | Per-route title above. |
| `og:description` | Per-route description above. |
| `og:image` | `app/api/og/route.tsx` renders per-route. |
| `og:type` | `website` for marketing, `article` for portfolio details. |
| `og:site_name` | `MeetPrerna` |
| `og:locale` | `en_IN` |
| Twitter | `summary_large_image` |

### 16.4 Sitemap and robots

- `sitemap.ts` enumerates all public routes + every portfolio item.
- `robots.ts` allows all crawlers; references the sitemap.
- A "Press" route is reserved but not built — its presence in the nav is unlinked.

### 16.5 RSS / Atom

- An `Atom` feed of `/journal` entries is scaffolded but the feed is empty at v1. Reserved.

---

## 17. Asset delivery checklist (Phase 5)

- [ ] All copy proofread by a second reader.
- [ ] All portfolio items ingested into Sanity with the schema fields.
- [ ] All images uploaded to the Sanity asset CDN.
- [ ] All images have alt text and credit (where applicable).
- [ ] All press logos cleared for use.
- [ ] Studio essay finalized.
- [ ] About page finalized.
- [ ] Five process steps finalized.
- [ ] 8 FAQs finalized.
- [ ] 3–6 testimonials with permission to publish.
- [ ] Press kit PDF assembled (≤ 4MB).
- [ ] `studio@meetprerna.com` configured and tested.
- [ ] Forms tested end-to-end with real email delivery.
- [ ] 404 and 500 pages translated (the strings only, no need for full localization).

---

## 18. Editorial brief for Prerna

> A short note from the team to the studio. Delivered during the kickoff.

**What we're building, in one paragraph:**
A website that feels like the studio feels — slow, careful, considered, and warm. A site that argues the same thesis your work argues: that making a mark on someone, on a canvas, on paper, is a slow act of attention, and that the act is the point. The site is a magazine, not a brochure. The animations are the studio's quiet. The four pillars are felt, not labeled.

**What we need from you (Prerna):**

1. **The studio essay** — a 600-word first-person piece about the room, the practice, the day. We'll edit.
2. **The about text** — a 400-word mix of first- and third-person. We'll edit.
3. **The five process steps** — your words, in your order, with one image per step.
4. **Portfolio** — the 24–36 pieces, with titles, year, style, body area, and 1–3 photos each.
5. **Studio photographs** — a single half-day shoot, planned for the right light.
6. **A list of "must publish" vs. "if there's space"** — we'd rather have 24 great pieces than 50 mediocre ones.
7. **Permission to publish** confirmation for every client photo.

**What we promise:**

- No copy goes live without your sign-off.
- No image goes live without your sign-off.
- No animation goes live without your eyes on a 30-second screen recording.
- The site is *yours* — every page, every word, every pixel is your voice, just better-lit.
