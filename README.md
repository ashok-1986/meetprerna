# MeetPrerna — Documentation Manifest

**Version:** 2.0 · **Date:** 2026-07-25 · **Replaces:** `INDEX.md`

---

## The streamline

v1.0 shipped 8 documents and 4,977 lines. With my additions it reached 18 files and roughly 6,600 lines. An agent reading 18 files averages across them, and averaging is how you get a site that is 80% right everywhere and excellent nowhere.

**Now: 8 files, roughly 2,400 lines.**

| Was | Now | Change |
|---|---|---|
| `INDEX.md` (236) | `README.md` | This file |
| `PRD.md` (592) | `PRD.md` | Kept. Business doc. §4, §6.1, §7.2 superseded by `DECISIONS.md`. |
| `ARCHITECTURE.md` (338) | `ARCHITECTURE.md` | Kept. Read §5 folder architecture. It overlaps PRD §6; ARCHITECTURE wins. |
| `designs.md` (686) | **`DESIGN.md`** (~200) | Merged and corrected. **Delete `designs.md`.** |
| `animations.md` (542) + `shaders.md` (659) | **`MOTION.md`** (~260) | Merged. **Delete both.** |
| `components.md` (1,295) | `components.md` | Kept as-is. It is a lookup reference, not a read-through doc. |
| (missing) | **`docs/agents.md`** | Was listed in INDEX §3.3, never delivered. |
| (missing) | **`docs/content.md`** | Was listed in INDEX §3.3, never delivered. |
| (missing) | **`DECISIONS.md`** | The tie-breaker. New. |
| (missing) | **`AGENTS.md`**, `.agents/rules/`, `.agents/workflows/` | Antigravity wiring. Without it the specs are docs the agent may or may not read. |

---

## Final structure

```
meetprerna/
├── AGENTS.md              # root standing rules. every agent reads this first.
├── DECISIONS.md           # the locked answers. overrides everything.
├── DESIGN.md              # tokens, accent budget, type, space
├── MOTION.md              # the register, shaders, budgets
├── BLUEPRINT.md           # block-by-block page architecture, attributed to references
├── BUILD-PLAN.md          # phase prompts, paste-ready
├── README.md              # this file
├── docs/
│   ├── PRD.md             # business: goals, personas. §5 dead, §4/§6.1/§7.2 superseded.
│   ├── ARCHITECTURE.md    # system map, folder structure
│   ├── agents.md          # the five agent personas
│   ├── content.md         # copy deck, asset inventory, SEO surface
│   └── components.md      # component API reference (lookup only)
└── .agents/
    ├── rules/             # 00-core, 10-design-system, 20-motion, 30-quality
    └── workflows/         # /build-section, /review-ui
```

Delete after copying across: `designs.md`, `animations.md`, `shaders.md`, `INDEX.md`.

---

## Precedence

`DECISIONS.md` > `AGENTS.md` > `BLUEPRINT.md` > `ARCHITECTURE.md` > `PRD.md` > `docs/agents.md` > `DESIGN.md` > `MOTION.md` > `docs/content.md` > `docs/components.md`

**`PRD.md` §5 is dead.** `BLUEPRINT.md` replaces it.

If a doc contradicts `DECISIONS.md`, the doc is wrong. Fix the doc, not the decision.

---

## Reading order

**30 minutes, to start building:** `AGENTS.md`, `DECISIONS.md`, your persona in `docs/agents.md`, then `BUILD-PLAN.md` Phase 1.

**Everything else is read on demand.** `DESIGN.md` when you touch visuals. `MOTION.md` when you touch animation. `docs/content.md` when you write copy. `docs/components.md` when you need a component API. Nobody reads all eight in one sitting, including the agent.

---

## The four owner corrections, 2026-07-25

Binding. Applied throughout.

1. **All launch assets are in hand.** The content gate is lifted. Replaced by a one-day asset audit in Phase 1 covering counts, resolution, and written subject consent. `DECISIONS.md` §15.
2. **The neon is the brand colour and it stays.** Pillars are expressed through quantity, placement and pacing, not hue. See the accent budget, `DESIGN.md` §4. Marigold is still deleted because two neons mean neither one signals action.
3. **No owned studio.** Collaborates with partner studios across Mumbai and Navi Mumbai, plus travel. New "Where to find me" section. `Person` plus `Service` schema, no `LocalBusiness`. `DECISIONS.md` §8.
4. **Alza is Prerna's stage name.** Testimonials are legitimate. Disclose once on `/about`, add `alternateName` to schema, keep source links. `DECISIONS.md` §13.

---

## What the reference sites actually taught us

Checked, not assumed. Full table in `MOTION.md` §1.

Three of your four references use **zero WebGL**. Floema is editorial typography and staggered reveals. Michael Aust is GSAP, Lottie and SVG. Torch Systems is Webflow with looping `.webm` clips and a footer marquee. Only Lando Norris runs real 3D, and that was OFF+BRAND with an F1 budget and an Awwwards Site of the Year result.

The v1.0 blueprint specced five shader passes and 659 lines of GLSL to chase a texture that three of the four produce with a video loop and good easing.

**Two shaders ship, ambient only.** The site is carried by GSAP choreography, typography and one silent looping clip of her hand working. That last one, M13 in the register, will do more for the Meditation pillar than every shader in the original spec, weighs about 400KB, and works on a four-year-old Android.

---

## Current state

| Phase | Status |
|---|---|
| Blueprint | Complete and reconciled |
| Assets | **In hand.** Audit due in Phase 1. |
| Phase 1 Foundation | Ready to start. Prompt is in `BUILD-PLAN.md`. |
| Live site defects | 3 open, roughly one hour. `DECISIONS.md` §14. |

Revised timeline with the content gate lifted: **4 to 5 weeks** to launch. Critical path is Phase 2, not Phase 3.
