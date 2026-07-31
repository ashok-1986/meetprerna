'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import styles from './SelectedWork.module.css';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedPiece {
  id: string;
  title: string;
  category: string;
  placement: string;
  image: string;
  year: number;
}

const featuredPieces: FeaturedPiece[] = [
  {
    id: 'serpentine-spine',
    title: 'Serpentine Spine',
    category: 'Fine Line Tattoo',
    placement: 'Spine',
    image: '/images/portfolio/peony-back.jpg',
    year: 2025,
  },
  {
    id: 'abstract-flora',
    title: 'Abstract Flora',
    category: 'Watercolour Botanical',
    placement: 'Forearm',
    image: '/images/portfolio/brushstroke-butterfly.jpg',
    year: 2025,
  },
  {
    id: 'geometric-panther',
    title: 'Geometric Panther',
    category: 'Dotwork & Blackwork',
    placement: 'Thigh',
    image: '/images/portfolio/geometric-wolf.jpg',
    year: 2024,
  },
  {
    id: 'botanical-sleeve',
    title: 'Botanical Sleeve',
    category: 'Custom Design',
    placement: 'Full Arm',
    image: '/images/portfolio/lion-and-birds.jpg',
    year: 2024,
  },
];

export function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal animation (only if motion is allowed)
      if (!shouldReduceMotion) {
        gsap.fromTo(
          cardsRef.current,
          {
            opacity: 0,
            y: 48,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      } else {
        // Instant set for reduced motion
        gsap.set(cardsRef.current, { opacity: 1, y: 0 });
      }

      // Horizontal scroll animation (only if motion is allowed)
      if (!shouldReduceMotion && scrollSectionRef.current && containerRef.current) {
        const scrollSection = scrollSectionRef.current;
        const totalWidth = scrollSection.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = Math.max(0, totalWidth - viewportWidth);

        if (scrollDistance > 0) {
          gsap.to(scrollSection, {
            x: -scrollDistance,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: () => `+=${scrollDistance}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                const progress = self.progress;
                const index = Math.min(
                  Math.floor(progress * (featuredPieces.length - 1)),
                  featuredPieces.length - 1
                );
                setActiveIndex(index);
              },
            },
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section className="relative w-full overflow-hidden bg-[#1A1A1A]">
      {/* Section header */}
      <div className="relative z-10 px-8 py-24 md:px-16 md:py-32">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9CBB6]/50 block mb-4">
          Block 03
        </span>
        <h2 className="font-serif text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[0.98] text-[#FDFFE9]">
          Selected Work
        </h2>
        <p className="mt-6 max-w-[52ch] font-sans text-base leading-[1.6] text-[#C9CBB6]">
          Custom tattoos, original paintings and sketches: made in conversation,
          never in a rush.
        </p>
      </div>

      {/* Horizontal scroll container */}
      <div 
        ref={containerRef} 
        className={`relative w-full ${
          shouldReduceMotion 
            ? 'h-auto py-12 overflow-x-auto scrollbar-none' 
            : 'h-[120vh]'
        }`}
      >
        <div 
          ref={scrollSectionRef} 
          className={`flex gap-8 px-8 md:gap-12 md:px-16 ${
            shouldReduceMotion ? 'w-max' : 'w-full'
          }`}
        >
          {featuredPieces.map((piece, index) => (
            <div
              key={piece.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative flex-shrink-0"
            >
              {/* Card container */}
              <div className="relative h-[60vh] w-[45vw] min-w-[320px] max-w-[600px] overflow-hidden rounded-[2px]">
                {/* Image */}
                <Image
                  src={piece.image}
                  alt={`${piece.title} - ${piece.category}`}
                  fill
                  className="object-cover transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-102"
                  sizes="(min-width: 1440px) 600px, 45vw"
                  priority={index === 0}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent opacity-60" />

                {/* Card content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                  {/* Metadata */}
                  <div className="mb-3 flex items-center gap-3 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-[#C9CBB6]">
                    <span>{piece.category}</span>
                    <span className="text-[#6B6B6B]">·</span>
                    <span>{piece.placement}</span>
                    <span className="text-[#6B6B6B]">·</span>
                    <span>{piece.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[0.92] text-[#FDFFE9]">
                    {piece.title}
                  </h3>

                  {/* Accent line */}
                  <div className="mt-4 h-[1px] w-12 bg-[#C4FF61] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator (hidden on reduced motion) */}
      {!shouldReduceMotion && (
        <div className="fixed bottom-8 left-1/2 z-20 -translate-x-1/2">
          <div className="flex gap-2 font-mono text-[0.75rem] text-[#C9CBB6]">
            <span className="text-[#C4FF61]">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span>/</span>
            <span>{String(featuredPieces.length).padStart(2, '0')}</span>
          </div>
        </div>
      )}

      {/* Scroll hint (hidden on reduced motion) */}
      {!shouldReduceMotion && (
        <div className="fixed bottom-8 right-8 z-20 hidden md:block">
          <div className="flex flex-col items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-[#C9CBB6]">
            <span>Scroll</span>
            <div className="h-12 w-[1px] bg-[#C4FF61] overflow-hidden relative">
              <div className={`absolute top-0 left-0 h-full w-full bg-[#C4FF61] ${styles.scrollHintAnimation}`} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SelectedWork;
