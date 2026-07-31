'use client';

import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Process.module.css';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    num: '01',
    label: 'The Intake',
    desc: 'You fill out the consultation form. Tell me about your idea, your placement, and your timeline.',
    videoSrc: null
  },
  {
    num: '02',
    label: 'The Conversation',
    desc: 'I review your brief, and we move to WhatsApp. This is where we discuss the details, answer your questions, and build the vision together.',
    videoSrc: '/video/process-conversation.webm'
  },
  {
    num: '03',
    label: 'The Design',
    desc: 'Once we agree on the direction, I draft the custom design. We refine it until it is exactly right for you.',
    videoSrc: '/video/process-design.webm'
  },
  {
    num: '04',
    label: 'The Session',
    desc: 'We meet in person. The studio is quiet, the kit is single-use, and we take the time to get it right. Never in a rush.',
    videoSrc: '/video/process-session.webm'
  },
  {
    num: '05',
    label: 'The Aftercare',
    desc: 'You leave with clear healing instructions. I check in with you as it heals, and once it is settled, I ask for your honest feedback.',
    videoSrc: null
  }
] as const;

interface StepVideoProps {
  src: string;
}

function StepVideo({ src }: StepVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        rootMargin: '0px 0px -15% 0px',
        threshold: 0.1,
      }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div className="w-[120px] h-[120px] shrink-0 rounded-[2px] overflow-hidden relative bg-black/5 ml-auto md:ml-8">
      <video
        ref={videoRef}
        src={src}
        preload="none"
        muted
        playsInline
        loop
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.gs-process-reveal', { opacity: 1, y: 0 });
        gsap.set('.gs-process-step', { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Section label reveal
        gsap.fromTo('.gs-process-reveal',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
            }
          }
        );

        // Steps staggered reveal
        gsap.fromTo('.gs-process-step',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsContainerRef.current,
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
      {/* Left Column: Label */}
      <div className={`${styles.leftColumn} gs-process-reveal`}>
        <span className={styles.sectionLabel}>The process</span>
      </div>

      {/* Right Column: 5 Steps */}
      <div ref={stepsContainerRef} className={styles.rightColumn}>
        {PROCESS_STEPS.map((step, idx) => (
          <React.Fragment key={step.num}>
            <div className={`${styles.stepWrapper} gs-process-step`}>
              <div className={styles.stepHeader}>
                <h3 className={styles.stepTitle}>
                  <span className={styles.stepNumber}>{step.num}</span>
                  {step.label}
                </h3>
                {step.videoSrc && <StepVideo src={step.videoSrc} />}
              </div>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
            {idx < PROCESS_STEPS.length - 1 && (
              <hr className={`${styles.divider} gs-process-step`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default Process;
