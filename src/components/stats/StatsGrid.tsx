'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './StatsGrid.module.css';

gsap.registerPlugin(ScrollTrigger);

const STATS_ITEMS = [
  { val: '500+', label: 'Tattoos completed' },
  { val: '100+', label: 'Custom designs' },
  { val: 'Since 2021', label: 'Tattooing' },
  { val: 'Fine Arts', label: 'Diploma, JK Academy' }
] as const;

export function StatsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.gs-stat-reveal', { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.gs-stat-reveal',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12, // 120ms stagger
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);

    return () => {
      mm?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={styles.section} 
      aria-labelledby="stats-heading"
    >
      {/* Left Anchor: Section Label & Heading */}
      <div className={styles.leftColumn}>
        <span className={`${styles.sectionLabel} gs-stat-reveal`}>
          The practice
        </span>
        <h2 
          id="stats-heading" 
          className={`${styles.heading} gs-stat-reveal`}
        >
          Art measured in patience, precision, and permanence.
        </h2>
      </div>

      {/* Right Anchor: 2x2 Architectural Grid */}
      <div className={styles.rightColumn}>
        <div className={styles.grid}>
          {STATS_ITEMS.map((item, idx) => (
            <div 
              key={idx} 
              className={`${styles.gridCell} gs-stat-reveal`}
            >
              <div className={styles.cellVal}>
                {item.val.split('\n').map((line, lIdx) => (
                  <React.Fragment key={lIdx}>
                    {line}
                    {lIdx < item.val.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              <p className={styles.cellLabel}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsGrid;
