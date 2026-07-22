import { gsap } from '@/lib/gsap';
import { ease, dur } from '../easing';

export function animatePageOut(el: HTMLElement, reducedMotion = false): Promise<void> {
  return new Promise((resolve) => {
    if (reducedMotion) {
      gsap.to(el, {
        opacity: 0,
        duration: dur.d120,
        ease: 'none',
        onComplete: resolve,
      });
      return;
    }
    gsap.to(el, {
      opacity: 0,
      y: -16,
      duration: dur.d260,
      ease: ease.studio,
      onComplete: resolve,
    });
  });
}

export function animatePageIn(el: HTMLElement, reducedMotion = false): Promise<void> {
  return new Promise((resolve) => {
    if (reducedMotion) {
      gsap.fromTo(el,
        { opacity: 0 },
        { opacity: 1, duration: dur.d120, ease: 'none', onComplete: resolve }
      );
      return;
    }
    gsap.fromTo(el, 
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: dur.d420,
        ease: ease.editorial,
        onComplete: resolve,
      }
    );
  });
}
