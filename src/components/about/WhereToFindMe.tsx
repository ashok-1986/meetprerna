'use client';

import React, { useRef, useState, useLayoutEffect } from 'react';
import { FilloutStandardEmbed } from '@fillout/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhereToFindMe.module.css';

gsap.registerPlugin(ScrollTrigger);

export function WhereToFindMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.gs-find-reveal', { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.gs-find-reveal',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.04, // 40ms stagger
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
      aria-labelledby="where-to-find-heading"
    >
      {/* Left Column: Label & Heading */}
      <div className={styles.leftColumn}>
        <span className={`${styles.sectionLabel} gs-find-reveal`}>
          Where to find me
        </span>
        <h2 
          id="where-to-find-heading" 
          className={`${styles.heading} gs-find-reveal`}
        >
          Your session, your neighbourhood.
        </h2>
      </div>

      {/* Right Column: Body Copy & Form Card */}
      <div className={styles.rightColumn}>
        <p className={`${styles.bodyText} gs-find-reveal`}>
          I work primarily from Kharghar, Navi Mumbai, and collaborate with partner studios 
          across Mumbai on demand. Rather than tie you to one fixed address, I meet you where 
          you are comfortable.
        </p>

        <div className={`${styles.formCard} gs-find-reveal`}>
          <h3 className={styles.cardHeading}>Start a conversation</h3>
          <p className={styles.cardSubline}>
            Tell me your preferred area and timing. I will confirm the nearest available studio.
          </p>

          {loading && (
            <div className={styles.skeleton} aria-hidden="true">
              <div className={styles.skeletonLine} />
              <div className={styles.skeletonLineShort} />
              <div className={styles.skeletonInput} />
              <div className={styles.skeletonInput} />
              <div className={styles.skeletonButton} />
            </div>
          )}

          <div className={styles.iframeContainer}>
            <FilloutStandardEmbed
              filloutId="gvnCVtzfz2us"
              dynamicResize
              inheritParameters
              parameters={{ source: 'where-to-find-me' }}
              onInit={() => {
                console.log('enquiry_started');
                setLoading(false);
              }}
              onSubmit={() => console.log('enquiry_submitted')}
            />
          </div>

          <p className={styles.fallbackText}>
            Having trouble with the form?{' '}
            <a href="mailto:prerna@meetprerna.com" className={styles.fallbackLink}>
              Email prerna@meetprerna.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhereToFindMe;
