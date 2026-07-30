'use client';

import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import styles from './FeatureSlider.module.css';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const circleEase = CustomEase.create('circleEase', '0.77, 0, 0.175, 1');

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
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    const incomingEl = slideRefs.current[nextIndex];
    if (!incomingEl) return;

    // Reset incoming slide clip-path to circle(0% at 50% 50%)
    gsap.set(incomingEl, { clipPath: 'circle(0% at 50% 50%)' });

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(nextIndex);
        setIncomingIndex(null);
        setIsTransitioning(false);
        // Clear clip-path properties to prevent render interference in other browsers
        gsap.set(incomingEl, { clearProps: 'clipPath' });
      }
    });

    // 1. Spreading Circle Wipe Reveal (1000ms duration)
    tl.to(incomingEl, {
      clipPath: 'circle(150% at 50% 50%)',
      duration: 1.0,
      ease: circleEase
    });
  }, [activeIndex, isTransitioning, shouldReduceMotion]);

  // Autoplay and progress bar tween controller
  useEffect(() => {
    if (isTransitioning || shouldReduceMotion) return;

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

  // Clean initial text render reveal + transition reveals
  useLayoutEffect(() => {
    if (shouldReduceMotion) return;
    const titleChars = titleRef.current?.children;
    const descChars = descRef.current?.children;
    if (titleChars || descChars) {
      const targets = [];
      if (titleChars) targets.push(...Array.from(titleChars));
      if (descChars) targets.push(...Array.from(descChars));
      
      const delay = isTransitioning ? 0.4 : 0; // Sync with circle wipe (1.0s duration - 0.6s overlap)

      gsap.fromTo(targets,
        { opacity: 0, y: 12 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.015, 
          ease: 'power3.out',
          delay: delay
        }
      );
    }
  }, [textIndex, shouldReduceMotion, isTransitioning]);

  return (
    <section className={styles.sliderSection} aria-label="Featured Works Gallery">
      
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
            <div 
              key={slide.id} 
              ref={el => { slideRefs.current[idx] = el; }}
              className={className}
            >
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
