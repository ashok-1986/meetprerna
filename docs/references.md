# Reference Log

This document officially logs external design references and the specific mechanics extracted from them. As per `AGENTS.md`, any reference that contradicts locked design documents must be recorded here along with the corresponding design decision.

| Reference URL | Mechanics Extracted | Applied To |
|---|---|---|
| `https://oevra.com/` (Primary) | WebGL fluid simulations, noise overlays, smooth GSAP horizontal scrolls. Edge-to-Edge immersive layout. SplitText reveals. | Global Motion Architecture, Global Layout (`DESIGN.md`, `HOME-PRD.md`), Text Reveals. |
| `https://fiddle.digital/` | Image appearance and dynamic reveal logic (masking, clipping, scale-in `1.1 -> 1.0`). | Image Components, Portfolio previews. |
| `https://floema.com/` | Elegant, staggered text reveals and general typographic pacing. | Text reveals and general cinematic pacing. |
| `https://framer.com/m/ImageScroller-kjnj.js@aP86nmOJy6tPfN0rRzeL` | Image Scroller component mechanics (drag/horizontal rail physics with velocity skew). | Portfolio Selected Work block. |
| `https://framer.com/m/Interactive-Components-Preloader-LoadScreen-j67ejr.js@avLwyyJ0iIdSjc2rmvzz` | Interactive page loader mechanics and entry sequencing (masking initial render). | Global Entry (`layout.tsx`). |
| `https://framer.com/m/CircleExpandCard-Hwe1Cb.js@3oVhqtycivGXKTvLWUxu` | Circle expand clip-path reveal mechanics. | Global Entry Preloader. |
