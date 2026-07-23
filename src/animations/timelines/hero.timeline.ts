/**
 * MeetPrerna — Hero timeline (GSAP 3.15+)
 * Rule: NEVER use gsap.set() to hide elements. Use tl.from() so
 * elements revert to visible if the timeline is killed.
 */
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';

export interface HeroTimelineDeps {
  root: HTMLElement;
  eyebrow?: HTMLElement | null;
  headline: HTMLElement;
  subhead?: HTMLElement | null;
  primaryCta?: HTMLElement | null;
  secondaryCta?: HTMLElement | null;
  image?: HTMLElement | null;
  reduceMotion: boolean;
}

export function buildHeroTimeline(deps: HeroTimelineDeps) {
  const { root, eyebrow, headline, subhead, primaryCta, secondaryCta, image, reduceMotion } = deps;

  // ── Reduced motion: nothing to animate ─────────────────────────────
  if (reduceMotion) {
    return { timeline: gsap.timeline(), kill: () => {} };
  }

  // ── Safety: if headline isn't in DOM, bail ─────────────────────────
  if (!headline) {
    console.warn('[hero.timeline] headline ref is null');
    return { timeline: gsap.timeline(), kill: () => {} };
  }

  // ── SplitText (defensive) ──────────────────────────────────────────
  let split: SplitText | null = null;
  let targets: Element[] | NodeListOf<Element> = [headline];

  try {
    split = new SplitText(headline, { type: 'words' });
    if (split.words && split.words.length > 0) {
      targets = split.words;
    }
  } catch (e) {
    console.warn('[hero.timeline] SplitText failed, falling back to whole element', e);
  }

  // ── Build timeline ─────────────────────────────────────────────────
  // Use imperative gsap.set() + tl.to() to prevent Strict Mode from getting stuck on from() states
  
  if (image) {
    gsap.set(image, { clipPath: 'inset(0 100% 0 0)' });
  }
  if (eyebrow) {
    gsap.set(eyebrow, { opacity: 0, x: -16 });
  }
  gsap.set(targets, { opacity: 0, y: 48 });
  if (subhead) {
    gsap.set(subhead, { opacity: 0, y: 24 });
  }
  if (primaryCta) {
    gsap.set(primaryCta, { opacity: 0, y: 16 });
  }
  if (secondaryCta) {
    gsap.set(secondaryCta, { opacity: 0, y: 16 });
  }

  const tl = gsap.timeline({
    defaults: { ease: 'expo.out', duration: 0.62 },
    onComplete: () => {
      // Clean up inline styles once done so Tailwind classes take over if needed
      gsap.set([eyebrow, headline, subhead, primaryCta, secondaryCta, image, ...Array.from(targets)], {
        clearProps: 'all',
      });
    },
  });

  if (image) {
    tl.to(image, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut' }, 0);
  }
  if (eyebrow) {
    tl.to(eyebrow, { opacity: 1, x: 0, duration: 0.42, ease: 'power2.inOut' }, 0.1);
  }
  tl.to(targets, { opacity: 1, y: 0, stagger: 0.06 }, 0.35);
  if (subhead) {
    tl.to(subhead, { opacity: 1, y: 0 }, '-=0.32');
  }
  if (primaryCta) {
    tl.to(primaryCta, { opacity: 1, y: 0, duration: 0.42, ease: 'power1.out' }, '-=0.32');
  }
  if (secondaryCta) {
    tl.to(secondaryCta, { opacity: 1, y: 0, duration: 0.42, ease: 'power1.out' }, '-=0.32');
  }

  // ── Parallax on scroll ─────────────────────────────────────────────
  const parallaxAnim = gsap.timeline().to(headline, { y: 60, ease: 'none' }, 0);
  if (image) {
    parallaxAnim.to(image, { y: -120, ease: 'none' }, 0);
  }

  const parallaxSt = ScrollTrigger.create({
    trigger: root,
    start: 'top top',
    end: '+=100%',
    scrub: true,
    animation: parallaxAnim
  });

  // ── Kill function ──────────────────────────────────────────────────
  const kill = () => {
    tl.kill();
    parallaxSt.kill();
    if (split) split.revert();
    
    // Nuclear option: force everything visible when unmounted / reverted
    gsap.set([eyebrow, headline, subhead, primaryCta, secondaryCta, image, ...Array.from(targets)], {
      opacity: 1,
      x: 0,
      y: 0,
      clipPath: 'inset(0 0% 0 0)',
      clearProps: 'all'
    });
  };

  return { timeline: tl, kill };
}
