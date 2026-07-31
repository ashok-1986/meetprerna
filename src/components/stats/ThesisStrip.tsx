'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/app/page.module.css';

gsap.registerPlugin(ScrollTrigger);

const STATS_ITEMS = [
  { val: '500+', label: 'Tattoos completed' },
  { val: '100+', label: 'Custom designs' },
  { val: 'Since 2021', label: 'Tattooing' },
  { val: 'Fine Arts', label: 'Diploma, JK Academy' }
] as const;

export function ThesisStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.gs-thesis-reveal', { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.gs-thesis-reveal',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
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
      className={styles.thesisSection} 
      aria-label="Thesis and Credibility stats"
    >
      {/* Left Anchor: Section Label & Heading */}
      <div className={`${styles.thesisLeft} gs-thesis-reveal`}>
        <span className={styles.thesisLabel} style={{ display: 'block', marginBottom: '24px' }}>
          CREDIBILITY
        </span>
        <h2>
          Ink that goes deeper than skin.
        </h2>
      </div>

      {/* Right Anchor: Body copy & stats */}
      <div className={`${styles.thesisRight} gs-thesis-reveal`}>
        <p className={styles.thesisBody}>
          I believe tattoos are more than decoration. They are landmarks of who you are, 
          crafted through collaboration and executed with rigorous, fine-art discipline.
        </p>

        <div className={styles.thesisGrid}>
          {STATS_ITEMS.map((item, idx) => (
            <div 
              key={idx} 
              className={styles.thesisFigure}
            >
              <span className={styles.thesisValue}>
                {item.val.split('\n').map((line, lIdx) => (
                  <React.Fragment key={lIdx}>
                    {line}
                    {lIdx < item.val.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </span>
              <span className={styles.thesisLabel}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ThesisStrip;
