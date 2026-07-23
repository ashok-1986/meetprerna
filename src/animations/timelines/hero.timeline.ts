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
  // IMPORTANT: use tl.from() instead of gsap.set() + tl.to()
  // If this timeline is killed, elements revert to their CSS defaults (visible).
  const tl = gsap.timeline({
    defaults: { ease: 'expo.out', duration: 0.62 },
    onComplete: () => {
      // Nuclear option: force everything visible when done
      gsap.set([headline, subhead, primaryCta, secondaryCta, image], {
        clearProps: 'opacity,transform,clipPath,will-change',
      });
    },
  });

  // Image mask reveal (from hidden → visible)
  if (image) {
    tl.from(image, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 0.9,
      ease: 'power3.inOut',
    }, 0);
  }

  // Eyebrow
  if (eyebrow) {
    tl.from(eyebrow, { opacity: 0, x: -16, duration: 0.42, ease: 'power2.inOut' }, 0.1);
  }

  // Headline words (or whole headline if SplitText failed)
  tl.from(targets, { opacity: 0, y: 48, stagger: 0.06 }, 0.35);

  // Subhead
  if (subhead) {
    tl.from(subhead, { opacity: 0, y: 24 }, '-=0.32');
  }

  // CTAs
  if (primaryCta) {
    tl.from(primaryCta, { opacity: 0, y: 16, duration: 0.42, ease: 'power1.out' }, '-=0.32');
  }
  if (secondaryCta) {
    tl.from(secondaryCta, { opacity: 0, y: 16, duration: 0.42, ease: 'power1.out' }, '-=0.32');
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
  };

  return { timeline: tl, kill };
}
