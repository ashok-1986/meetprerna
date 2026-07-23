'use client';

import React, { useRef, useEffect } from 'react';
import { useGsapContext } from '@/hooks/useGsapContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { gsap } from '@/lib/gsap';
import { ease, dur } from '@/animations/easing';

export interface FilterBarProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterBar({ filters, activeFilter, onFilterChange }: FilterBarProps) {
  const underlineRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInitialRef = useRef(true);

  // Setup GSAP Context
  const ctxRef = useGsapContext(() => {
    // We do not add the initial animations here because they depend on refs
    // that might not be fully attached when this first runs, or we want them
    // explicitly ordered. We'll use ctxRef.current.add in other effects.
  }, []);

  // Animate chips on mount
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.add(() => {
      const tl = gsap.timeline();
      if (!prefersReducedMotion && chipsRef.current.length > 0) {
        tl.from(chipsRef.current, {
          y: -8,
          opacity: 0,
          stagger: 0.04,
          ease: ease.editorial,
          duration: dur.d260,
          willChange: 'transform, opacity',
          clearProps: 'all',
        });
      }
      return () => { tl.kill(); };
    });
  }, [prefersReducedMotion, ctxRef]);

  // Handle active filter underline position and animation
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx || !underlineRef.current) return;

    const activeIndex = filters.indexOf(activeFilter);
    const activeEl = chipsRef.current[activeIndex];
    if (!activeEl) return;

    // Read layout strictly before tweening
    const { offsetLeft, offsetWidth } = activeEl;

    ctx.add(() => {
      const tl = gsap.timeline();

      if (isInitialRef.current) {
        isInitialRef.current = false;

        // Set initial position
        gsap.set(underlineRef.current, {
          x: offsetLeft,
          scaleX: offsetWidth,
        });

        // Intro animation
        if (!prefersReducedMotion) {
          tl.from(underlineRef.current, {
            scaleX: 0,
            duration: dur.d180,
            ease: ease.soft,
            transformOrigin: 'left',
            willChange: 'transform',
            clearProps: 'willChange',
          });
        }
      } else {
        // Change animation
        if (prefersReducedMotion) {
          gsap.set(underlineRef.current, {
            x: offsetLeft,
            scaleX: offsetWidth,
          });
        } else {
          tl.to(underlineRef.current, {
            x: offsetLeft,
            scaleX: offsetWidth,
            duration: dur.d260,
            ease: ease.studio,
            willChange: 'transform',
            clearProps: 'willChange',
          });
        }
      }
      
      return () => { tl.kill(); };
    });
  }, [activeFilter, filters, prefersReducedMotion, ctxRef]);

  return (
    <div className="relative flex flex-wrap items-center gap-x-2">
      {filters.map((filter, i) => {
        const isActive = filter === activeFilter;
        return (
          <button
            key={filter}
            ref={(el) => {
              chipsRef.current[i] = el;
            }}
            onClick={() => onFilterChange(filter)}
            className={`text-body-sm tracking-wider uppercase px-4 py-2 transition-colors duration-200 ${
              isActive ? 'text-inchworm' : 'text-ivory-dim hover:text-ivory'
            }`}
          >
            {filter}
          </button>
        );
      })}
      <div
        ref={underlineRef}
        className="absolute bottom-0 h-[2px] w-[1px] bg-inchworm pointer-events-none origin-left"
      />
    </div>
  );
}
