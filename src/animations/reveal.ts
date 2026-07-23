import { gsap } from '@/lib/gsap';
import { ease, dur } from './easing';

export function createRevealTimeline(
  el: HTMLElement,
  options?: {
    /**
     * @deprecated No longer applied as a positional transform — a translateY
     * reveal moves the element's rendered bounding rect and gets scored as
     * real Cumulative Layout Shift by Chromium's Layout Instability API,
     * even though transforms don't trigger reflow. Kept in the signature
     * for call-site compatibility only; the value is ignored.
     */
    y?: number;
    duration?: number;
    stagger?: number;
    children?: boolean;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): { timeline: gsap.core.Timeline; kill: () => void } {
  const { duration = dur.d620, stagger = 0.06, children = false, scrollTrigger } = options || {};

  const timeline = gsap.timeline({
    paused: !scrollTrigger, // Only pause if not driven by ScrollTrigger
    scrollTrigger
  });

  if (children) {
    const childNodes = gsap.utils.toArray(el.children);
    gsap.set(childNodes, { autoAlpha: 0 });

    timeline.to(childNodes, {
      autoAlpha: 1,
      duration,
      stagger,
      ease: ease.editorial,
    });
  } else {
    gsap.set(el, { autoAlpha: 0 });

    timeline.to(el, {
      autoAlpha: 1,
      duration,
      ease: ease.editorial,
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
