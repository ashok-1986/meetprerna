'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Voices.module.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Totally indecisive, yet the experience was still a 10. I could not have asked for a better artist than Alza for my first tattoo. She excelled at the customization of the design, made slight adjustments, and ensured a pain-free overall experience. Great precision.",
    name: "— Pramayee Bhaware"
  },
  {
    quote: "This was my first tattoo and I was super nervous thinking about how much it was going to hurt. But Alza did a great job - it didn't hurt as much as I had assumed. The tattoo came out exactly how I wanted and expected it to look. This beautiful art was perfectly done by Alza.",
    name: "— Amala James"
  },
  {
    quote: "I had a really great experience here. The place was very hygienic too. Prerna, the tattoo artist went through the entire process and I got the exact tattoo I asked for. It turned out beautiful!",
    name: "— Rutuja Babar"
  }
];

export function Voices() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.gs-voice-reveal', { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.gs-voice-reveal',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
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
    <section ref={sectionRef} className={styles.section} aria-label="Client Voices">
      {/* Small Section Label */}
      <span className={`${styles.label} gs-voice-reveal`}>
        Some earlier clients knew her as Alza.
      </span>

      {/* Grid of quote cards */}
      <div className={styles.grid}>
        {testimonials.map((t, idx) => (
          <div key={idx} className={`${styles.card} gs-voice-reveal`}>
            <blockquote className={styles.quote}>
              {t.quote}
            </blockquote>
            <span className={styles.name}>
              {t.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Voices;
