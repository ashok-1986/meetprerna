'use client';

import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import styles from './FeatureSlider.module.css';

const slides = [
  {
    id: 1,
    title: 'Serpentine Spine',
    description: 'Fine Line Tattoo Art / Back & Spine',
    src: '/images/portfolio/peony-back.jpg'
  },
  {
    id: 2,
    title: 'Abstract Flora',
    description: 'Watercolour Botanical Styling / Forearm',
    src: '/images/portfolio/brushstroke-butterfly.jpg'
  },
  {
    id: 3,
    title: 'Geometric Panther',
    description: 'Detailed Dotwork & Blackwork / Thigh',
    src: '/images/portfolio/geometric-wolf.jpg'
  },
  {
    id: 4,
    title: 'Botanical Sleeve',
    description: 'Organic Ivy & Floral Contour / Arm',
    src: '/images/portfolio/lion-and-birds.jpg'
  }
];

export function FeatureSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [textIndex, setTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const changeSlide = useCallback((nextIndex: number) => {
    if (isTransitioning || nextIndex === activeIndex) return;
    setIsTransitioning(true);
    setIncomingIndex(nextIndex);

    // Instantly update text index at start of transition
    setTextIndex(nextIndex);

    if (shouldReduceMotion) {
      setActiveIndex(nextIndex);
      setIncomingIndex(null);
      setIsTransitioning(false);
      return;
    }

    // Reset ink blot scale to 0
    gsap.set('#ink-path', { attr: { transform: 'translate(0.5, 0.5) scale(0)' } });

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(nextIndex);
        setIncomingIndex(null);
        setIsTransitioning(false);
      }
    });

    // 1. Spreading Ink Blot Reveal
    tl.to('#ink-path', {
      attr: { transform: 'translate(0.5, 0.5) scale(4)' },
      duration: 1.4,
      ease: 'power2.inOut'
    });

    // 2. Staggered Text Reveal
    const titleChars = titleRef.current?.children;
    const descChars = descRef.current?.children;

    if (titleChars || descChars) {
      const targets = [];
      if (titleChars) targets.push(...Array.from(titleChars));
      if (descChars) targets.push(...Array.from(descChars));

      tl.fromTo(targets,
        { opacity: 0, y: 12 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.015, 
          ease: 'power3.out' 
        },
        '-=0.6' // overlap with ink spread reveal
      );
    }
  }, [activeIndex, isTransitioning, shouldReduceMotion]);

  // Autoplay and progress bar tween controller
  useEffect(() => {
    if (isTransitioning) return;

    const targetBar = document.querySelector(`.progress-bar-${activeIndex}`);
    if (!targetBar) return;

    const progressTween = gsap.fromTo(targetBar,
      { width: '0%' },
      {
        width: '100%',
        duration: 5,
        ease: 'none',
        onComplete: () => {
          const nextIdx = (activeIndex + 1) % slides.length;
          changeSlide(nextIdx);
        }
      }
    );

    return () => {
      progressTween.kill();
      gsap.set(targetBar, { width: '0%' });
    };
  }, [activeIndex, isTransitioning, shouldReduceMotion, changeSlide]);

  // Clean initial text render reveal
  useLayoutEffect(() => {
    if (shouldReduceMotion) return;
    const titleChars = titleRef.current?.children;
    const descChars = descRef.current?.children;
    if (titleChars || descChars) {
      const targets = [];
      if (titleChars) targets.push(...Array.from(titleChars));
      if (descChars) targets.push(...Array.from(descChars));
      gsap.fromTo(targets,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.015, ease: 'power3.out' }
      );
    }
  }, [shouldReduceMotion]);

  return (
    <section className={styles.sliderSection} aria-label="Featured Works Gallery">
      {/* SVG Ink Blot Mask Definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="ink-bleed-clip" clipPathUnits="objectBoundingBox">
            <path
              id="ink-path"
              transform="translate(0.5, 0.5) scale(0)"
              transform-origin="center"
              d="M 0 0 C 0.25,-0.28 0.38,-0.12 0.46,0.16 C 0.52,0.44 0.28,0.38 0.12,0.46 C -0.16,0.52 -0.32,0.28 -0.42,0.12 C -0.48,-0.16 -0.28,-0.38 0,0 Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Slide Images Stack */}
      <div className={styles.slideContainer}>
        {slides.map((slide, idx) => {
          let className = styles.slide;
          if (idx === activeIndex) {
            className = `${styles.slide} ${styles.slideActive}`;
          } else if (idx === incomingIndex) {
            className = `${styles.slide} ${styles.slideIncoming}`;
          }

          return (
            <div key={slide.id} className={className}>
              <img
                src={slide.src}
                alt={slide.title}
                className={styles.slideImage}
              />
            </div>
          );
        })}
      </div>

      {/* Typography Overlay - Frosted Glass Card */}
      <div className={styles.overlayContainer}>
        <div className={styles.glassCard}>
          <h3 ref={titleRef} className={styles.title}>
            {!shouldReduceMotion ? (
              slides[textIndex].title.split('').map((char, i) => (
                <span
                  key={i}
                  className="inline-block opacity-0 translate-y-[12px]"
                  style={{ whiteSpace: 'pre' }}
                >
                  {char}
                </span>
              ))
            ) : (
              slides[textIndex].title
            )}
          </h3>
          <p ref={descRef} className={styles.description}>
            {!shouldReduceMotion ? (
              slides[textIndex].description.split('').map((char, i) => (
                <span
                  key={i}
                  className="inline-block opacity-0 translate-y-[12px]"
                  style={{ whiteSpace: 'pre' }}
                >
                  {char}
                </span>
              ))
            ) : (
              slides[textIndex].description
            )}
          </p>
        </div>
      </div>

      {/* Bottom Nav Bar with Frosted Glass UI */}
      <div className={styles.bottomNav}>
        <span className={styles.navMeta}>FEATURED PORTFOLIO</span>
        
        <div className={styles.navItems}>
          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.id}
                onClick={() => changeSlide(idx)}
                disabled={isTransitioning}
                className={`${styles.navButton} ${isActive ? styles.navButtonActive : ''}`}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              >
                <span className={styles.navTitle}>{slide.title}</span>
                <div className={styles.progressBarContainer}>
                  <div className={`${styles.progressBar} progress-bar-${idx}`} />
                </div>
              </button>
            );
          })}
        </div>

        <span className={styles.navMeta}>
          {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}

export default FeatureSlider;
