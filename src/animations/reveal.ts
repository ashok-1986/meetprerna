import { gsap } from '@/lib/gsap';
import { ease, dur } from './easing';

export function createRevealTimeline(
  el: HTMLElement,
  options?: { 
    y?: number; 
    duration?: number; 
    stagger?: number; 
    children?: boolean;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): { timeline: gsap.core.Timeline; kill: () => void } {
  const { y = 24, duration = dur.d620, stagger = 0.06, children = false, scrollTrigger } = options || {};

  const timeline = gsap.timeline({ 
    paused: !scrollTrigger, // Only pause if not driven by ScrollTrigger
    scrollTrigger 
  });

  if (children) {
    const childNodes = gsap.utils.toArray(el.children);
    gsap.set(childNodes, { opacity: 0, y, willChange: 'transform, opacity' });

    timeline.to(childNodes, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: ease.editorial,
      onComplete: () => {
        gsap.set(childNodes, { clearProps: 'willChange' });
      },
    });
  } else {
    gsap.set(el, { opacity: 0, y, willChange: 'transform, opacity' });

    timeline.to(el, {
      opacity: 1,
      y: 0,
      duration,
      ease: ease.editorial,
      onComplete: () => {
        gsap.set(el, { clearProps: 'willChange' });
      },
    });
  }

  return {
    timeline,
    kill: () => {
      timeline.kill();
      timeline.scrollTrigger?.kill();
    },
  };
}
