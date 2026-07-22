import { gsap, ScrollTrigger } from '@/lib/gsap';

export function createParallaxTimeline(
  el: HTMLElement,
  options: { amount: number; trigger?: HTMLElement; scrub?: boolean | number }
): { trigger: ScrollTrigger; kill: () => void } {
  const { amount, trigger = el, scrub = true } = options;

  gsap.set(el, { willChange: 'transform' });

  const timeline = gsap.to(el, {
    y: amount,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub,
      invalidateOnRefresh: true,
      onLeave: () => gsap.set(el, { clearProps: 'willChange' }),
      onEnterBack: () => gsap.set(el, { willChange: 'transform' }),
    },
  });

  return {
    trigger: timeline.scrollTrigger!,
    kill: () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    },
  };
}
