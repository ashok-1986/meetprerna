'use client';

import { useRef } from 'react';
import { useGsapContext } from '@/hooks/useGsapContext';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ease, dur } from '@/animations/easing';

interface SeriesRowProps {
  year: number;
  name: string;
  count: number;
  index: number;
  onClick?: () => void;
}

/**
 * SeriesRow — a single row in the series index.
 * Per animations.md §5.5:
 * - Enter: left-to-right mask, 420ms editorial, stagger 0.08 (driven by index).
 * - Hover: count column translates x: 0 → 4, 180ms soft. Marigold underline animates in.
 */
export function SeriesRow({ year, name, count, index, onClick }: SeriesRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useGsapContext(() => {
    const row = rowRef.current;
    const countEl = countRef.current;
    const underline = underlineRef.current;
    if (!row || !countEl || !underline) return;

    if (reduce) {
      gsap.set(row, { clipPath: 'inset(0 0% 0 0)', opacity: 1 });
      return;
    }

    // Initial state: masked from the right
    gsap.set(row, {
      clipPath: 'inset(0 100% 0 0)',
      willChange: 'clip-path',
    });
    gsap.set(underline, { scaleX: 0, transformOrigin: 'left center' });

    // Reveal on scroll
    const revealTl = gsap.timeline({ paused: true });
    revealTl.to(row, {
      clipPath: 'inset(0 0% 0 0)',
      duration: dur.d420,
      ease: ease.editorial,
      delay: index * 0.08,
    });

    ScrollTrigger.create({
      trigger: row,
      start: 'top 85%',
      toggleActions: 'play none none none',
      animation: revealTl,
    });

    // Hover: count translates, underline draws
    const hoverTl = gsap.timeline({ paused: true });
    hoverTl
      .to(countEl, { x: 4, duration: dur.d180, ease: ease.soft }, 0)
      .to(underline, { scaleX: 1, duration: dur.d260, ease: ease.studio }, 0);

    const onEnter = () => hoverTl.play();
    const onLeave = () => hoverTl.reverse();

    row.addEventListener('mouseenter', onEnter);
    row.addEventListener('mouseleave', onLeave);

    return () => {
      row.removeEventListener('mouseenter', onEnter);
      row.removeEventListener('mouseleave', onLeave);
      hoverTl.kill();
      revealTl.kill();
    };
  }, [reduce, index]);

  return (
    <div
      ref={rowRef}
      className="relative flex justify-between items-center py-6 border-b border-ink-20 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="flex items-center gap-8">
        <span className="text-body-sm text-ivory-dim">{year}</span>
        <h3 className="font-display text-h4 text-ivory">{name}</h3>
      </div>
      <span ref={countRef} className="text-body-sm text-ivory-dim">
        {count} works
      </span>
      {/* Marigold underline for hover */}
      <div
        ref={underlineRef}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-marigold"
        style={{ transformOrigin: 'left center' }}
      />
    </div>
  );
}
