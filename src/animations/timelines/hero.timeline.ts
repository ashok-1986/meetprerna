import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ease, dur } from '../easing';

export interface HeroTimelineDeps {
  root: HTMLElement;
  eyebrow?: HTMLElement | null;
  headline: HTMLElement;
  subhead: HTMLElement;
  primaryCta: HTMLElement;
  secondaryCta?: HTMLElement | null;
  image: HTMLElement;
  reduceMotion: boolean;
}

export function buildHeroTimeline(deps: HeroTimelineDeps): { timeline: gsap.core.Timeline; kill: () => void } {
  const { root, eyebrow, headline, subhead, primaryCta, secondaryCta, image, reduceMotion } = deps;
  
  const timeline = gsap.timeline({ paused: true });

  if (reduceMotion) {
    gsap.set([eyebrow, headline, subhead, primaryCta, secondaryCta].filter(Boolean), { opacity: 1, y: 0 });
    gsap.set(image, { clipPath: 'inset(0 0% 0 0)' });
    return { timeline, kill: () => {} };
  }

  // Initial states
  gsap.set(image, { clipPath: 'inset(0 100% 0 0)', willChange: 'transform, clip-path' });
  const otherElements = [eyebrow, subhead, primaryCta, secondaryCta].filter(Boolean) as HTMLElement[];
  gsap.set(otherElements, { opacity: 0, y: 24, willChange: 'transform, opacity' });
  
  // Start headline visible (its words will be hidden if SplitText works)
  gsap.set(headline, { opacity: 1, y: 0 });
  
  // Use SplitText if available, else just word spans if they exist or fallback to lines/chars.
  // The stub or actual plugin is at gsap.SplitText
  let split: any = null;
  try {
    const SplitText = (gsap as any).SplitText;
    if (SplitText) {
      split = new SplitText(headline, { type: 'words' });
    }
  } catch (e) {
    // Fallback if SplitText fails
    console.warn('SplitText failed, falling back to whole-element animation', e);
  }

  // Animation sequence
  timeline.to(image, {
    clipPath: 'inset(0 0% 0 0)',
    duration: dur.d900,
    ease: ease.studio,
  }, 0.0);

  if (eyebrow) {
    gsap.set(eyebrow, { x: -16, y: 0 });
    timeline.to(eyebrow, { opacity: 1, x: 0, duration: dur.d420, ease: ease.studio }, 0.1);
  }

  if (split && split.words && split.words.length > 0) {
    gsap.set(split.words, { opacity: 0, y: 48, willChange: 'transform, opacity' });
    timeline.to(split.words, {
      opacity: 1,
      y: 0,
      duration: dur.d620,
      stagger: 0.06,
      ease: ease.editorial,
    }, 0.35);
  } else {
    // Fallback if no SplitText
    gsap.set(headline, { opacity: 0, y: 24, willChange: 'transform, opacity' });
    timeline.to(headline, { opacity: 1, y: 0, duration: dur.d620, ease: ease.editorial }, 0.35);
  }

  timeline.to(subhead, { opacity: 1, y: 0, duration: dur.d620, ease: ease.editorial }, '>');

  if (primaryCta) {
    timeline.to(primaryCta, { opacity: 1, y: 0, duration: dur.d420, ease: ease.soft }, '-=0.32');
  }
  if (secondaryCta) {
    timeline.to(secondaryCta, { opacity: 1, y: 0, duration: dur.d420, ease: ease.soft }, '<');
  }

  // Cleanup willChange
  timeline.add(() => {
    gsap.set([image, headline, ...otherElements], { clearProps: 'willChange' });
    if (split && split.words && split.words.length > 0) gsap.set(split.words, { clearProps: 'willChange' });
  });

  // Parallax on scroll
  const parallaxSt = ScrollTrigger.create({
    trigger: root,
    start: 'top top',
    end: '+=100%',
    scrub: true,
    animation: gsap.timeline()
      .to(image, { y: -120, ease: 'none' }, 0)
      .to(headline, { y: 60, ease: 'none' }, 0)
  });

  return {
    timeline,
    kill: () => {
      if (split) split.revert();
      parallaxSt.kill();
      timeline.kill();
    }
  };
}
