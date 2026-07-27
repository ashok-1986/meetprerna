# meetprerna — Header and Footer, week of 27 Jul 2026

Two prompts. Run them one at a time. Header first, audit it, then footer.

---

## PROMPT 1 — Header (Senior Web Developer role)

```
ROLE: Senior Web Developer.

TASK: Replace the current site header with a scroll-shrink header.
Reference implementation is attached as header-scroll-shrink.html.
Port the behaviour and the structure. Do not port anything else.

BEHAVIOUR
- At scroll 0: full-width bar, height 84px, square corners, no shadow.
- At scroll 120px and beyond: centred pill, max-width 680px, height 56px,
  border-radius 22px, 14px top offset, drop shadow visible.
- The transition is scrubbed 1:1 with scroll position. No lerp, no easing,
  no smoothing. Scroll is already a smooth input.
- Below 720px the pill does not shrink. It stays full-bleed at 68px, and
  collapses to 56px. Nav links are replaced by a Menu toggle.

NON-NEGOTIABLE CONSTRAINTS
1. Only four properties may be driven by scroll: margin-top, max-width,
   height, border-radius. All on the pill element itself.
2. backdrop-filter blur radius is CONSTANT at 14px. Never animate the
   blur radius. It re-composites the backdrop every frame.
3. box-shadow is static, on a ::after pseudo-element. Animate its opacity
   only. Never animate shadow blur.
4. Font sizes are FIXED. Do not scale the logo, nav links, or CTA text
   with scroll. Shrinking text mid-scroll causes subpixel reflow and
   reads as a wobble.
5. Do not use 100vw anywhere. It includes the scrollbar and throws the
   pill off centre on desktop. Use a full-width band with an inner pill
   set to margin-inline: auto.
6. No will-change on layout properties. It is cost with no benefit.
7. Add contain: layout paint style to the pill.
8. Round the progress value to 3 decimal places before writing it to the
   CSS variable, and skip the write if the value is unchanged.
9. On load, snap to the correct progress value. Do not animate 0 to 1 on
   a mid-page refresh.
10. prefers-reduced-motion: reduce must pin progress to 1 permanently.
    A disabled CSS transition is not reduced-motion handling here, the
    effect is JS driven.

TOKENS — from DESIGN.md, do not invent or substitute
- Near-black: #0B0B0C, pill background rgba(11,11,12,0.92)
- Neon lime: #C4FF61
- Text: #F5F2EA, muted rgba(245,242,234,0.62)
- Display: Cormorant Garamond. Body: Inter.

CONTENT
- Brand: meetprerna (Cormorant Garamond, links to /)
- Nav: Portfolio, About, Blog. Each label must match its route slug.
  Verify the slugs before you write them. If the blog route is /journal
  then the label is Journal, not Blog. Do not guess.
- CTA: "Book a session", links to /consulting, outlined neon pill
- The neon dot appears only on the link with aria-current="page".
  It indicates active route. It is not decoration.

ACCESSIBILITY
- Visible focus rings on every interactive element, neon, 2px, 3px offset.
- Hover states gated behind @media (hover: hover) and (pointer: fine).
- Mobile toggle carries aria-expanded and aria-controls.
- Escape closes the mobile panel and returns focus to the toggle.

ONE MENU ONLY
Remove the floating MENU pill currently fixed to the bottom of the
viewport. Navigation lives in the header and nowhere else. This site has
one menu. Do not leave both in place.

OUT OF SCOPE
Do not touch any other section. Do not change DESIGN.md. Do not add
libraries. This is CSS variables plus one scroll listener.

WHEN DONE
Report First Load JS before and after, and confirm the a11y suite still
passes.
```

---

## PROMPT 2 — Footer (UX/UI role, then Developer)

```
ROLE: UX/UI Designer. You own alignment, spacing, hierarchy, and
presentation. Ashok has locked the content. You have not been given a
layout, and that is deliberate. Propose one before building.

CONTENT — locked, in this order
1. "Your story deserves to be worn." XL display type, Cormorant Garamond.
   This is the signature element. Let it be the largest thing on screen.
2. CONTACT US
   prerna@meetprerna.com
   No phone number. No WhatsApp. Email only.
3. Nav: Portfolio / About / Blog
   Identical labels to the header, in the same order. Each matches its
   route slug.
4. FOLLOW US, social icons
5. Powered by Alchemetryx

THE FOOTER'S JOB
Brand signature, not conversion. Ashok chose this explicitly. So it does
not need to sell. It needs to close the page with the same voice the
hero opened it with. The booking CTA lives above the footer, not in it.

RULES
- The footer INVERTS. Background is neon lime #C4FF61. Type is the
  project's existing --color-ink (#1A1A1A). Do NOT mint a new near-black
  hex. This is a section rule and it goes into DESIGN.md as a dated
  amendment so nobody re-litigates it on the next section.
- There is no third colour. The orange on the Alchemetryx credit is gone.
- Quiet tier is stepped, not flat. Three levels:
    email         --color-ink at full opacity
    nav / social  --color-ink at 0.75
    credit        --color-ink at 0.65
  The email is the only contact route on the whole footer now that
  WhatsApp is gone. It must not sit at the same weight as a vendor credit.
- The credit alpha is 0.65, NOT 0.60. The 0.60 figure was calculated
  against #0B0B0C. Against the lighter #1A1A1A it lands near 4.3:1 and
  fails AA for small text. 0.65 lands near 5.1:1. Treat both numbers as
  starting points and let the a11y suite decide.
- One grid. Right now one column is right-aligned and disciplined, the
  other floats with no relationship to the margin. Pick a grid and hold
  every element to it.
- The MENU pill must not overlap any footer element. Check this at
  1440, 1024, 768, and 375.
- Year, if shown, is dynamic. Never hardcoded.
- Social icons: open all four accounts first. Keep any with a post in the
  last 90 days, drop the rest. Pinterest is a real tattoo discovery
  channel, so do not cut it on principle, cut it only if it is dead.
  Instagram goes first in the row. Do not make it a larger icon, that
  reads as clumsy. Position carries the weight.

BEFORE YOU BUILD
Verify every social link resolves to a live account. Remove any that do
not. A dead link is worse than a missing one.

DELIVER
An ASCII wireframe of your proposed layout at desktop and mobile, with a
one-line reason for the hierarchy. Get sign-off, then build.
```

---

## Three things to fix regardless

1. **The email link is broken.** The markup reads `prerna@meetprerna.com`
   as visible text but the href points at `hello@prosepixel.co`, with a
   zero-width joiner character in it. That is template residue. If it is
   live, every enquiry from the footer is going to a stranger.

2. **The nav links point at the template.** Expertise, About, and Blog
   currently resolve to `etemplates.wdesignkit.com/techtide/...`. Point
   them at your own routes.

3. **Nav labels match their route slug. Always.** The label for
   `/portfolio` is "Portfolio". Not "Work", not "Expertise". This is a
   standing rule, not a one-off ruling: if the label and the slug ever
   disagree, one of them is wrong and the slug wins.

   Apply the same rule to every other nav item before you build. If a
   link reads "Journal" and points at `/blog`, that is the same bug in a
   different place. Fix it in the same pass.

## One note, said once, then dropped

There is no location string anywhere on the site now. The header line was
removed and the footer does not carry one. "Kharghar, Navi Mumbai" in the
footer is how local search finds a local artist, and local first-timers
are your highest-volume persona. Your call. Not raising it again.
