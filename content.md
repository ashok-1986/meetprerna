# MeetPrerna — Content & Copy Deck (`content.md`)

**Version:** 1.1 · **Date:** 2026-07-25 · **Status:** Binding for copy

> This file was listed in `INDEX.md` §3.3 but was not delivered in v1.0. This is it.
> Copy here is production-ready. Prerna approves it before it ships. Nothing on this site describes her practice without her sign-off.

---

## 1. Voice

Six rules. Everything else follows from them.

1. **Unhurried.** Sentences end. No stacking of clauses to sound impressive.
2. **First person on anything about the practice.** Third person on metadata, listings and schema.
3. **Specific beats superlative.** "Two sessions, four weeks apart" beats "meticulous craftsmanship".
4. **Name the fear before answering it.** The nervous first-timer is the highest-volume visitor. Say "it will hurt, here is what that is actually like" rather than avoiding the word.
5. **Elegant to a Marathi or Hindi speaker reading English.** No idiom that does not travel. No slang.
6. **Never claim a superlative about herself.** Not "best in Mumbai". The work and the reviews argue it.

**Banned words:** journey (as a metaphor), elevate, unlock, seamless, curated, bespoke, passionate, unique (as filler), transform (as filler), "we", when it means one person.

**Banned patterns:** exclamation marks, "Welcome to", rhetorical questions as headings, "DM me" as the only route, hero counters, eyebrow labels above headings.

---

## 2. The headline decision — SETTLED, do not reopen

**SHIPPING (owner decision, binding):**

- **H1:** `Beyond Ink: Your Story, Translated into Abstract Art`
- **Sub:** `Custom tattoos, original paintings and sketches: made in conversation, never in a rush.`

> **Do not change this. Do not propose alternatives.** An earlier version of this section recommended "She carries no studio. Only a needle, and everything she knows." and told the owner not to ship the line above. The owner considered that argument and chose otherwise. Typeface, palette and headline are brand voice, and brand voice is the owner's call.

**A second, independent reason the old recommendation is dead.** It opened with "She carries no studio." Prerna has since confirmed (2026-07-26) that her **primary location is Kharghar, Navi Mumbai**. That line is now factually false. Even if the recommendation had been accepted, it would have to be withdrawn today.

**Retained for the record only, not as options:**

| Option | Copy | Status |
|---|---|---|
| A | She carries no studio. Only a needle, and everything she knows. | **Dead.** Factually wrong since the Kharghar confirmation. |
| B | Your body is already a canvas. I am only holding the pen for a while. | Not chosen. Possible paid-social landing page line. |
| C | Some things do not have words yet. | Not chosen. Strong for the pillars, weak for search arrivals. |
| **D** | **Beyond Ink: Your Story, Translated into Abstract Art** | **SHIPPING.** Owner's choice. |

**Localisation note.** The shipping headline translates cleanly and carries no idiom that fails for a Marathi or Hindi speaker reading English.

---

## 3. Navigation and global copy

| Element | Copy |
|---|---|
| Nav | Work · Art · Sanctuary · About |
| Primary CTA (header) | Start a conversation |
| WhatsApp CTA | Message on WhatsApp |
| Footer CTA | Your story deserves to be worn. |
| Footer secondary | Press kit · Privacy · Terms |
| Skip link | Skip to main content |
| Logo alt | MeetPrerna, home |

**CTA vocabulary is fixed.** The button that says "Start a conversation" leads to a page headed "Start a conversation" and produces a confirmation that says "Conversation started". Same words the whole way through. Never mix "Book now", "Get in touch", "Enquire" and "Begin" across the site.

Note: "Begin a conversation" in `PRD.md` §5.1 is replaced by "Start a conversation" throughout. One phrase.

---

## 4. Home (`/`)

**Hero**
- H1: `She carries no studio. Only a needle, and everything she knows.`
- Sub: `Custom tattoos, paintings and sketches. Mumbai and Navi Mumbai, and wherever the work takes her.`
- Primary: `Start a conversation`
- Secondary: `See the work`

**Thesis block** (replaces the "Manifesto" section)
- H2: `Ink that goes deeper than skin.`
- Body: `Every person carries something they have not said out loud. I listen first. Then I translate it into a mark that honours where you have been, and where you are going. The conversation usually takes longer than the tattoo. That is on purpose.`

**Credibility strip** — sits alongside the thesis block above, same viewport.

Four figures, two columns on desktop, two-by-two on mobile.

| Figure | Label |
|---|---|
| `500+` | `Tattoos completed` |
| `100+` | `Custom designs` |
| `Since 2021` | `Tattooing` |
| `Fine Arts` | `Diploma, JK Academy` |

**Two volume figures, two craft facts.** The volume answers "is she experienced", the craft answers "is she trained". Together they cover the two things a first-timer and a commercial buyer each want, without either needing its own section.

**Cut, and do not reinstate:**
- **`98% client satisfaction`** — no measurement exists behind it. No survey, no rating system, and the five Senja testimonials carry no star ratings. A figure with no source is the same class of problem as an invented cancellation policy: specific, confident, and unanswerable if a journalist or commercial client asks.
- **`18 pieces in the archive`** — proposed and rejected by the owner, correctly. The archive is a curated selection, not her total output. A count of it reads as her lifetime volume and badly undersells 500+ completed pieces.

**Typography and colour.**
- Figures at `--text-display-l`, Cormorant, weight 500.
- Labels in JetBrains Mono, `--text-mono`, uppercase, `--color-ivory-dim`.
- **Figures render in `--color-ivory`, not the accent.** The reference mockup set all four in `--color-inchworm`. Four accent elements in one viewport is exactly what the accent budget in `DESIGN.md` §4 exists to prevent — when four things are loud, none of them signals "act here", and the CTA further down the page loses its meaning.
- One permitted accent use: a 1px `--color-inchworm` rule above the grid. Dilution ladder step 2.

**Render the numbers server-side. Do not animate them.**

The current live site runs this exact pattern with a count-up script and displays `Tattoos Completed 0+` when the script does not fire. That failure is visible on meetprerna.com today. The figure must be present in the HTML, readable with JavaScript disabled. This is also why hero counters are banned in `DESIGN.md` §10 — the pattern fails silently and nobody notices.

**Owner confirmation required before publishing:** Prerna confirmed 500+ completed and ~100 custom designs on 2026-07-26. If either figure is an estimate rather than a count, say "over 400" or drop the plus. A round number that turns out to be aspirational is worse than a smaller one that is exact.


**The four pillars**

Each pillar is a short block. No icons. Mono metadata line, then the sentence.

| Pillar | Line |
|---|---|
| 01 Mapping The Self | `Choosing to mark your skin is a decision about who you are becoming. I explore the meaning behind the image before I draw a single line.` |
| 02 Words Before Ink | `Every piece begins with a quiet conversation. No pressure, no rushed sketches. I listen to your story until the vision is clear enough to translate.` |
| 03 The Abstract Form | `Your story is translated into abstract art, crafted for your unique contours. Custom ink designed to age beautifully over decades, never in a rush.` |
| 04 A Safe Exhale | `The studio is a quiet room. A place to pause, to be seen, and to leave a part of your story permanently etched in peace.` |

**Selected work**
- H2: `Stories etched in skin.`
- Link: `See all work`

**Process teaser**
- H2: `How a piece actually gets made.`
- Steps: `Conversation` · `Sketch` · `Design` · `Session` · `Aftercare`
- Link: `Walk through the process`

**Trust block** (replaces the deleted counters)
- H2: `Before you decide.`
- Three items, each a real answer, not a metric:
  - `Single-use needles, opened in front of you. Every time.`
  - `You see the design and approve it before any ink is opened.`
  - `A deposit of ₹500 holds the slot for a small piece. It is not refundable, because it covers the design time before you sit down.`

> **Corrected 2026-07-26.** This line previously read "If the design is not right after two rounds, you pay nothing and we stop." Prerna has confirmed the deposit is non-refundable. The refund promise is deleted from the page and from the FAQPage JSON-LD.

**Final CTA**
- H2: `Your story deserves to be worn.`
- Primary: `Start a conversation`
- Secondary: `Message on WhatsApp`

---

## 5. Sanctuary (`/sanctuary`)

This is the page that converts the nervous first-timer. It carries the process, the pain question, hygiene, aftercare and the FAQ.

**Hero**
- H1: `The room is quiet. Take your time.`
- Sub: `What actually happens, from the first message to the day it has healed.`

**The five steps**

| Step | Heading | Body |
|---|---|---|
| 01 | Conversation | `We talk before we draw. Sometimes for an hour, sometimes across a few weeks. Bring references if you have them. Bring nothing if you do not. "I have a feeling and no picture for it" is a normal place to start.` |
| 02 | Sketch | `I draw by hand first. You see rough work, not a finished pitch. This is where the idea gets honest.` |
| 03 | Design | `The sketch becomes a stencil built for your body, not for a flat page. Line weight, placement and how the shape moves when you move. You approve it before anything is opened.` |
| 04 | Session | `Eat before you come. Wear something that gives me access to the area. We start slow, we stop when you need to stop. I will talk you through the first few minutes of breathing.` |
| 05 | Aftercare | `You leave with written instructions and my number. Healing takes two to four weeks. A touch-up, if it needs one, is included.` |

**The pain section** (do not skip this, it is the top search intent for first-timers)
- H2: `Yes, it hurts. Here is what that actually means.`
- Body: `It is closer to a hot scratch than a cut. Ribs, spine, elbows and ankles are sharper. Forearms, outer thighs and shoulders are gentler. Most people settle within ten minutes. We stop whenever you ask, as often as you ask, and nobody keeps score.`

**Hygiene section**
- H2: `What comes out of the packet.`
- Body: `Fresh needles opened in front of you. New grips, new tubes, new ink caps for every session. Gloves changed whenever I touch anything that is not you. The station is wiped down and covered before you sit.`

**FAQ** — eight questions, `FAQPage` schema. Answers below are from Prerna, 2026-07-26, rewritten in her voice per §1.

**1. What does it cost?**

`It depends on three things: the size, how detailed the design is, and how many sessions it needs.`

`I will not quote a number before we have talked, because a guess helps neither of us.`

`Once the design is agreed, a deposit holds the slot. ₹500 for a small piece, rising to ₹1,000, ₹1,500 and ₹2,000 as the work gets larger.`

> Tiers confirmed by Prerna 2026-07-26: "500 for a small tattoo, then raises to 1000, 1500 and finally 2000." She did not define which sizes map to which tier, so do not invent thresholds.

**2. How long will it take?**

`A small piece usually takes four to five hours in one sitting.`

`I know that sounds long for something small. It is deliberate. I do not rush a stencil and I do not rush the line work, and the difference shows in five years, not on the day.`

`Larger pieces depend on the size and where they sit on the body. Some areas take longer than others. I will give you a real number once I have seen the design.`

**3. Do I need to know exactly what I want?**

`No. Most people do not.`

`When someone tells me they want a tattoo but have no idea what, I ask three things. Do you have a reference, even a rough one? Is there a story behind it? And what do you like the most, generally, not in tattoos.`

`Any one of those is enough to start. The design comes out of that conversation, not before it.`

**4. Can I see the design before the day?**

`Yes. The stencil is built for your body and you approve it before any ink is opened.`

> **Removed 2026-07-26:** the previous version of this answer ended "If the design is not right after two rounds, you pay nothing and we stop." Prerna has confirmed the deposit is **non-refundable**. That sentence is deleted from the page and from the JSON-LD. See Q8.

**5. Where do you work from?**

`My primary location is Kharghar, in Navi Mumbai. That is where most sessions happen.`

`I also work from studios elsewhere in Mumbai when there is demand, at places I have collaborated with before. If you are somewhere else in the city, tell me where and I will let you know what is possible.`

> Partner studios are **not named**. Prerna has not confirmed permission from them. Do not add names until she does.

**6. Do you travel?**

`Yes, but not on a fixed schedule.`

`Travel depends on what comes in through the enquiry form. If you are outside Mumbai and you want a piece, send me the details and I will tell you honestly whether I can make it work.`

**7. Can I get a tattoo over a scar or an existing piece?**

`This one I will not answer in general terms, because the honest answer depends on your skin, the scar, and what is already there.`

`Send me a photo through the enquiry form and we can talk about it properly. I would rather tell you the truth about your case than give you a rule that might not apply to it.`

> This is deliberate. A general answer about scar tissue is medical guidance, and someone with a keloid or a recent surgical scar could act on it. Routing to a conversation is both safer and more honest. **Do not replace this with general advice.**

**8. What if I change my mind?**

`The deposit is not refundable, but it is not lost either.`

`If you need to move your date, tell me and we will find another one. The deposit moves with you. If I need to move it, the same thing. It stays with you until we find a time that works.`

`The only time a deposit is gone is if someone stops replying altogether.`

> Confirmed by Prerna 2026-07-26, verbatim: "Yes, happily" on rescheduling, and "it will be carry forwarded to the next date, once paid, it will be safe with us unless client ghosts us."
> This is a **more generous policy than most studios offer** and it should read as a trust signal, not as fine print. Do not bury it, and do not add notice windows, forfeiture clauses or conditions she has not stated.

---

## 5b. About (`/about`)

Persona: anyone deciding whether to trust her. Slow register. `prerna-hero.jpg` at the top.

**Hero**
- H1: `I started with a brush.`
- Sub: `Painter and sketch artist first. The needle came later, and it did not replace anything.`

**How this started**

`I painted long before I tattooed. Abstract work, mostly on paper, mostly for myself.`

`At some point a canvas on a wall stopped being enough. People do not want to look at their life transitions from across a room. They want to carry them. Grief, a decision, something that finally went right. Those things want a place to live, and skin turned out to be the place.`

`So I brought the brush with me. The way I think about weight, and where a line thickens or thins, comes from painting, not from a tattoo apprenticeship. That is why my work looks the way it does.`

**Why it works this way**

`Most tattoo studios are not built for people who are unsure. They are fast, loud, and they assume you arrive knowing the vocabulary. If you hesitate at the door, that room does not help you.`

`I wanted the opposite of that room.`

`No rushed stencils. No brushed-off questions. You can arrive with a mess of feelings and no words for them, and that is a normal place to start, not a problem to fix before you book.`

`I am not a therapist and I do not pretend to be one. What I can do is hold the room, keep it quiet, and pay attention. Most things come out easier when your hands are busy and nobody is watching your face.`

**How this started — replace the opening paragraph with this**

`I started on someone else's studio floor in 2021. Five years later the work is under my own name.`

`I painted long before I tattooed. Abstract work, mostly on paper, mostly for myself.`

`At some point a canvas on a wall stopped being enough. People do not want to look at their life transitions from across a room. They want to carry them. Grief, a decision, something that finally went right. Those things want a place to live, and skin turned out to be the place.`

`So I brought the brush with me. The way I think about weight, and where a line thickens or thins, comes from painting, not from a tattoo apprenticeship. That is why my work looks the way it does.`

> The opening line replaces "emerged from nowhere" framing. Specific and checkable beats vague and impressive: her CV shows a fine arts diploma in 2021, a first studio the same year, studio operations by 2022, her own practice by 2025. Say the dates, not the arc.

---

**A note on who is holding the needle** — NEEDS PRERNA'S SIGN-OFF BEFORE IT SHIPS

`Most tattoo artists in this city are men. I am not.`

`A lot of my work sits on ribs, backs, and places people do not usually show. For some clients that turns out to matter. If it matters to you, now you know.`

> **Why this is on the site.** Look at the placements in the archive: ribs, back, shoulder blade, underbust, thigh. A meaningful share of her work sits on parts of the body many women do not undress in front of a stranger easily. For that client, a female artist is not a preference, it is a practical consideration, and nothing currently on the site tells them. It serves the highest-volume persona directly and costs two sentences.
>
> **Why it is worded flatly.** No superlative, no claim, nothing disputable. It states a fact about the local field and a fact about her work, and lets the reader who needs it draw the conclusion. Anything warmer reads as marketing and undercuts itself.
>
> **What must never be written.** "The only female tattoo artist in Navi Mumbai", or any variant. Navi Mumbai has over a million people and an active tattoo scene. The claim is almost certainly false, trivially disproven, and one competitor screenshot does more damage than it could ever earn. This was proposed and rejected on 2026-07-26.
>
> **This is Prerna's call, not a marketing decision.** Some artists want the work to stand on its own and find this framing reductive. Do not ship it without her explicit yes. If she declines, delete the section entirely — do not soften it into a hint.


**Where to find me**

`My primary location is Kharghar, in Navi Mumbai. Most sessions happen there.`

`I also work from studios elsewhere in Mumbai when there is demand, at places I have collaborated with before.`

> Do not name partner studios. Prerna has not confirmed their permission.

**Travel**

`I travel on request, not on a schedule.`

`If you are outside Mumbai and you want a piece, send me the details through the enquiry form and I will tell you honestly whether I can make it work.`

> There is **no travel calendar**. Do not build one and do not publish dates.

**The name**

`Some earlier clients knew me as Alza. That was an old nickname. The work is under Prerna now.`

> One line, past tense, no explanation needed. It exists so a visitor reading the testimonials is not confused. Keep `alternateName: "Alza"` in the `Person` schema so anyone searching the old name still finds her.

**Closing CTA**
- `If any of this sounds like the room you want to be in, start a conversation.`
- Links to `/consulting`.

**Training and timeline** — confirmed 2026-07-26 from Prerna's CV

Insert after "How this started":

`I studied fine art at JK Academy of Art and Design in Wadala, and finished the diploma before I ever picked up a machine. The painting came first. The tattooing came out of it, not instead of it.`

`I have been tattooing since 2021. Most of that has been with Witch Art Tattoos in Mumbai, where I still work.`

> **Say "since 2021", not "six years" or "seven years".** Prerna said 6-7 in conversation, but her own CV states "5+ years" and lists her first tattooing role from 2021. A dated fact matches the document, never goes stale, and cannot be contradicted by a CV someone reads later.
>
> **Name Witch Art Tattoos only.** Prerna's explicit instruction. Her CV also lists InkQLab and Galaxy Tattoo; neither has consented to being named here.

**Still needed from Prerna**
- `TODO(prerna): whether other partner studios consent to being named.`

---

## 6. Portfolio (`/portfolio`)

Tattoos, paintings and sketches share one archive: one practice, one collection, one body of SEO equity.

**Archive hero**
- H1: `The archive.`
- Sub: `Tattoos, paintings and sketches, in one place, because they are one practice. Filter by medium, motif, placement or size.`

**Detail page hero, when medium is Tattoo** — dark, standard site register.

**Detail page hero, when medium is Painting or Sketch** — light mode. This is the one place the site changes register, and it is deliberate: stepping into a single piece reads as walking into a lit room.
- H1: the piece's title.
- Sub: `Original work on paper and canvas.` where relevant, or drop it for a sketch.

**Piece metadata format** (mono, this is what mono is for)
- Tattoo: `2025 · Forearm · 2 sessions · Fine line`
- Painting or sketch: `2024 · Ink and gouache on paper · 42 × 59 cm · Available`

**Piece story** (60 to 120 words each, first person, from Prerna)

Template she can fill: `What they came with. What we found. What changed between the first sketch and the last.`

**Empty state (filters return nothing)**
- `Nothing in the archive matches that yet. Clear the filters, or send me what you have in mind and we will make the first one.`
- Action: `Start a conversation`

**Grid CTA strip**
- `Have something in mind? Send it across, even if it is only a feeling.`

---

## 7. Forms and system copy

**Consulting page (`/consulting`) — chrome around the Fillout embed**

The form fields themselves (name, contact, project type, brief, references, consent) live inside Fillout, built and maintained there, not in this codebase. What follows is the copy for everything **around** the embed, which is a normal page section like any other.

- H1: `Start a conversation.`
- Sub: `Tell me what you are carrying. I usually reply within 8 hours.`
- [Fillout embed sits here, framed in a card.]
- Fallback line below the embed, small, --color-ivory-dim: `Having trouble? Message on WhatsApp instead.` — a text link, not a button, not accent-coloured.

**When rebuilding the field list inside Fillout**, use this as the brief (the actual field creation happens in Fillout's dashboard):

| Field | Label | Helper |
|---|---|---|
| Name | Your name | |
| Contact | Email or WhatsApp number | `Whichever you actually check.` |
| Type | What is this about? | Tattoo · Painting · Sketch · Commercial · Not sure yet |
| Placement | Where on the body? | `Skip it if you are not sure.` |
| Brief | Tell me about it | `A feeling is enough. You do not need the right words.` |
| References | Add references | `Up to 5 images, 10MB each. Optional.` |
| Consent | I am happy for Prerna to contact me about this enquiry. | Links to Privacy |

**Fillout's own success and error states** are configured inside their builder, not written here as component copy. Set the completion message to something close to: `Conversation started. It is with me. I read every one myself, so it takes a day or two. If it is urgent, message me on WhatsApp.` Keep the voice from §1: unhurried, first person, no exclamation marks.

**Contact page (`/contact`)**

Lighter weight than `/consulting` on purpose. This page is for press, collaboration, commercial enquiries and general questions, not for someone deciding on a tattoo.

- H1: `Get in touch.`
- Sub: `For press, collaborations, commercial enquiries or anything that is not a tattoo consultation.`
- Body, short: `Looking to book a piece instead? Start a conversation.` — links to `/consulting`.
- Press kit: `Download the press kit` — links to the PDF.
- Primary route: point at `/consulting`, note the usual 8-hour reply. This is the promoted path.
- Secondary, below it, small and unpromoted: `prerna@meetprerna.com` as a plain text link for press, commercial and collaboration enquiries. `--color-ivory-dim`, underlined, never a button.
- **Verify the mailbox receives mail before publishing.** The current live site shows this address with a `mailto:` pointing elsewhere. If it bounces, remove it.

Keep this page fast and plain. No embed required here unless Prerna wants the same Fillout form in a shorter mode; a mailto link is enough for launch.

**404**
- H1: `This page has healed over.`
- Body: `The link is gone or was never here. The work is still where you left it.`
- Action: `See the work`

**500**
- H1: `Something broke on our side.`
- Body: `Not you. Try again in a minute, or message on WhatsApp.`

**Reduced-motion / no-WebGL:** no copy. The page just works. Never tell a user their device is limited.

---

## 8. SEO surface (corrected)

Replaces `PRD.md` §7.2. No `LocalBusiness`.

| Route | Title | Meta description |
|---|---|---|
| `/` | `Custom Tattoo Artist in Mumbai & Navi Mumbai — MeetPrerna` | `Custom tattoos, paintings and sketches by Prerna. Slow consultation, hand-drawn design, single-use kit. Start a conversation.` |
| `/portfolio` | `Portfolio: Tattoos, Paintings & Sketches — MeetPrerna` | `Custom tattoo work, original paintings and ink sketches by Prerna. Fine line, abstract, flora and geometry. Filter by medium, motif, placement and size.` |
| `/sanctuary` | `The Process, The Pain, The Aftercare — MeetPrerna` | `What actually happens, from first message to healed tattoo. Hygiene, pain, timelines and answers to the questions people are scared to ask.` |
| `/about` | `About Prerna — Tattoo Artist, Painter, Sketch Artist` | `Painter and sketch artist first, tattoo artist second. Working from Kharghar, Navi Mumbai, and travelling on request.` |
| `/consulting` | `Start a Conversation — MeetPrerna` | `Send a brief or a feeling. Usually a reply within 8 hours. Tattoo and art consultations.` |
| `/contact` | `Contact — MeetPrerna` | `Press, collaborations and commercial enquiries. For tattoo or art consultations, start a conversation instead.` |

**Primary keyword targets:** `custom tattoo artist mumbai`, `tattoo artist navi mumbai`, `fine line tattoo mumbai`, `abstract tattoo artist india`, `first tattoo mumbai`.

The `/sanctuary` page is the SEO workhorse. "Does a tattoo hurt", "first tattoo what to expect" and "tattoo aftercare" are high-volume, low-competition informational queries that bring exactly the persona this site converts best.

**Alt text policy.** Describe the mark and the placement, not the emotion. `Fine line botanical tattoo along the left forearm, healed` beats `beautiful meaningful tattoo`. Never leave alt empty on a portfolio image. Decorative shapes get `alt=""`.

---

## 9. Asset inventory and the content gate

**This is the critical path. Nothing else on this project is at real risk.**

| Asset | Minimum for launch | Status |
|---|---|---|
| Healed tattoo photos (≥ 4 weeks healed, natural light) | 24 | Not started |
| Fresh or in-session photos | 8 | Not started |
| Artwork photographed flat, ≥ 3000px long edge, with a colour reference card | 12 | Not started |
| Studio, hands, tools, station setup | 8 | Not started |
| Portraits of Prerna (1 square, 1 wide, 1 editorial) | 3 | Not started |
| Piece stories, 60 to 120 words each | 12 | Not started |
| Verified testimonials, named and sourced | 3 | **Blocked** |
| Sanctuary copy: process, pain, hygiene, aftercare | ~1,200 words | Drafted above, needs Prerna |
| FAQ answers | 8 | Needs Prerna |
| Pricing or deposit policy statement | 1 | Needs Prerna |
| Aftercare sheet (PDF) | 1 | Not started |
| Travel and residency calendar | 1 | Not started |
| Press kit PDF (≤ 4MB) | 1 | Phase 5 |

**Locked gate:** Phase 3 does not start until 80% of the rows above are delivered.

**Book the shoot in week one.** One half-day, one photographer, consistent light. Twenty-four good frames from a single session beat sixty inconsistent ones gathered over three months. Shoot October to February to avoid Mumbai heat and humidity affecting both the artist and the equipment.

**Subject consent is opt-in.** No client photograph is published without written permission. Add a permission checkbox to the consultation flow now, so the next twelve months of work is cleared by default.
