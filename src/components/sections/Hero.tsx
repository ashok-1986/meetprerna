'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero Section Component
 * Homepage hero with two-column layout, animated text reveal, and studio image
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading lines
      const lines = headingRef.current?.querySelectorAll('.hero-line');
      if (lines) {
        gsap.fromTo(
          lines,
          { y: '105%' },
          {
            y: '0%',
            duration: 1.2,
            stagger: 0.18,
            ease: 'expo.out',
            delay: 0.5,
          }
        );
      }

      // Fade in content after heading
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 1.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 overflow-hidden"
    >
      {/* Background Number */}
      <span
        className="absolute top-20 right-10 md:right-20 text-[280px] md:text-[400px] font-serif text-ivory/40 pointer-events-none select-none"
        style={{ lineHeight: 0.8 }}
      >
        01
      </span>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="relative z-10">
            <SectionEyebrow text="Custom Tattoo Artist" />

            {/* Animated Heading */}
            <h1
              ref={headingRef}
              className="text-hero font-serif text-ivory mb-6 md:mb-8"
              style={{ letterSpacing: '-0.02em' }}
            >
              <div className="overflow-hidden">
                <span className="hero-line block">Ink that</span>
              </div>
              <div className="overflow-hidden">
                <span className="hero-line block">resonates</span>
              </div>
            </h1>

            {/* Sub Text & CTAs */}
            <div ref={contentRef} className="opacity-0">
              <p className="text-muted text-sm md:text-base max-w-md mb-8 leading-relaxed">
                Story-driven custom tattoos in Navi Mumbai. Every design is a
                collaboration, every session a ritual.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/consultation"
                  className="px-6 py-3 bg-green text-black text-sm font-medium hover:bg-yellow transition-colors duration-300"
                  data-cursor="hover"
                >
                  Book Free Consultation
                </Link>
                <Link
                  href="/portfolio"
                  className="px-6 py-3 border border-ivory/30 text-ivory text-sm hover:border-green hover:text-green transition-colors duration-300"
                  data-cursor="hover"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[60vh] md:h-[80vh] hidden md:block">
            <Image
              src="/assets/prerna-bw-studio.jpg"
              alt="Prerna tattoo studio by Prerna, Navi Mumbai"
              fill
              className="object-cover"
              style={{ objectPosition: 'center top' }}
              priority
            />
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-black) 0%, transparent 30%)',
              }}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 right-6 md:right-12 flex items-end gap-3">
          <span className="text-muted text-xs uppercase tracking-widest writing-vertical">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-ivory/30 overflow-hidden">
            <div className="w-full h-4 bg-green scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
