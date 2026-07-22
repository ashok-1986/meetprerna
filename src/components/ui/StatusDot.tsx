'use client';

import { useRef } from 'react';
import { useGsapContext } from '@/hooks/useGsapContext';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function StatusDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useGsapContext(() => {
    if (reduce || !dotRef.current) return;

    const dot = dotRef.current;
    let timeoutId: NodeJS.Timeout;

    // The pulse timeline
    const pulse = gsap.to(dot, {
      scale: 1.4,
      opacity: 0.2,
      duration: 2, // half cycle for 4s total (yoyo back takes 2s)
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      paused: true,
    });

    const resetTimer = () => {
      pulse.pause();
      gsap.to(dot, { scale: 1, opacity: 0.6, duration: 0.26, ease: 'power2.out' });

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        pulse.play();
      }, 30000);
    };

    // Initial start
    resetTimer();

    window.addEventListener('mousemove', resetTimer, { passive: true });
    window.addEventListener('click', resetTimer, { passive: true });
    window.addEventListener('keydown', resetTimer, { passive: true });
    window.addEventListener('touchstart', resetTimer, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      pulse.kill();
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, [reduce]);

  return (
    <div className="relative flex items-center justify-center w-2 h-2">
      <div 
        className="absolute inset-0 rounded-full bg-inchworm opacity-60"
        ref={dotRef}
        style={{ willChange: reduce ? 'auto' : 'transform, opacity' }}
      />
    </div>
  );
}
