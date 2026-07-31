'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Process.module.css';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    num: '01',
    label: 'The Intake',
    desc: 'You fill out the consultation form. Tell me about your idea, your placement, and your timeline.',
    imageSrc: null
  },
  {
    num: '02',
    label: 'The Conversation',
    desc: 'I review your brief, and we move to WhatsApp. This is where we discuss the details, answer your questions, and build the vision together.',
    imageSrc: '/images/process/conversation.jpg'
  },
  {
    num: '03',
    label: 'The Design',
    desc: 'Once we agree on the direction, I draft the custom design. We refine it until it is exactly right for you.',
    imageSrc: '/images/process/design.jpg'
  },
  {
    num: '04',
    label: 'The Session',
    desc: 'We meet in person. The studio is quiet, the kit is single-use, and we take the time to get it right. Never in a rush.',
    imageSrc: '/images/process/session.jpg'
  },
  {
    num: '05',
    label: 'The Aftercare',
    desc: 'You leave with clear healing instructions. I check in with you as it heals, and once it is settled, I ask for your honest feedback.',
    imageSrc: null
  }
] as const;

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.gs-process-reveal', { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.gs-process-reveal',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
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
    <section ref={sectionRef} className={styles.section} aria-label="The Process Guide">
      {/* Header Row: Contains Section Label */}
      <div className={`${styles.headerRow} gs-process-reveal`}>
        <div className={styles.leftAnchor}>
          <span className={styles.sectionLabel}>THE PROCESS</span>
        </div>
        <div className={styles.rightAnchor} />
      </div>

      {/* Steps List */}
      <div className={styles.stepsContainer}>
        {PROCESS_STEPS.map((step) => (
          <div 
            key={step.num} 
            className={`${styles.stepRow} gs-process-reveal`}
          >
            <div className={styles.leftAnchor}>
              <h3 className={styles.stepTitle}>
                <span className={styles.stepNumber}>{step.num}</span>
                {step.label}
              </h3>
            </div>
            <div className={styles.rightAnchor}>
              <p className={styles.stepDesc}>{step.desc}</p>
              {step.imageSrc && (
                <div className={styles.imageWrapper}>
                  <Image 
                    src={step.imageSrc} 
                    alt={step.label} 
                    width={600} 
                    height={450} 
                    className={styles.stepImage}
                    priority={step.num === '02'}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Process;
