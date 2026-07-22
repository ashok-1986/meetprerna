'use client';

import { useRef } from 'react';
import { useGsapContext } from '@/hooks/useGsapContext';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useGsapContext(() => {
    if (reduce || !barRef.current) return;

    gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center', willChange: 'transform' });

    const st = gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: true,
      },
    });

    return () => st.kill();
  }, [reduce]);

  if (reduce) {
    return <div className="fixed top-0 left-0 right-0 h-[2px] bg-inchworm z-header opacity-50" />;
  }

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-[2px] bg-inchworm z-[100]"
      ref={barRef}
    />
  );
}
