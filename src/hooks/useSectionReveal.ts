/**
 * useSectionReveal — shared reveal hook.
 *
 * Returns a ref to attach to a section. Animates opacity 0→1, y 24→0
 * on scroll enter. Respects prefers-reduced-motion.
 *
 * Reference: docs/components.md §1.2, docs/designs.md §5.2.
 */
'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { createRevealTimeline } from '@/animations/reveal';

export function useSectionReveal<T extends HTMLElement = HTMLDivElement>(
  options: { y?: number; start?: string; delay?: number } = {}
) {
  const { y = 24, start = 'top 80%', delay = 0 } = options;
  const ref = useRef<T>(null);
  const reduce = usePrefersReducedMotion();

  useGsapContext(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reduce) {
        gsap.set(el, { opacity: 1, y: 0 });
        if (el.hasAttribute('data-reveal-children')) {
          gsap.set(el.children, { opacity: 1, y: 0 });
        }
        return;
      }

      const hasChildren = el.hasAttribute('data-reveal-children');
      const { kill } = createRevealTimeline(el, { 
        y, 
        children: hasChildren,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none reverse',
        }
      });

      return () => {
        kill();
      };
    },
    [reduce, y, start, delay]
  );

  return ref;
}