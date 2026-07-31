'use client';

import React, { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { 
    id: '01', 
    title: 'Mapping The Self', 
    desc: 'Choosing to mark your skin is a deeply personal step toward who you are becoming. Uncovering the true weight and meaning behind the idea always comes before a single line is drawn.', 
    img: '/images/portfolio/peony-back.jpg' 
  },
  { 
    id: '02', 
    title: 'Words Before Ink', 
    desc: 'Every piece begins with a quiet, unhurried conversation. There is no pressure and no ticking clock. Listening to your story takes priority until the vision feels perfectly clear.', 
    img: '/images/portfolio/buddha-lotus.jpg' 
  },
  { 
    id: '03', 
    title: 'The Abstract Form', 
    desc: 'Experiences are translated into flowing, abstract art that naturally complements the unique shape of your body. This is custom work, designed without rush, meant to live and age beautifully for decades.', 
    img: '/images/portfolio/geometric-wolf.jpg' 
  },
  { 
    id: '04', 
    title: 'A Safe Exhale', 
    desc: 'The studio acts as a private sanctuary. It is a quiet, comfortable space to finally pause, feel truly seen, and let a piece of your journey be permanently etched in total peace.', 
    img: '/images/portfolio/lion-and-birds.jpg' 
  },
];

export function Block05Pillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([headerRef.current, '.gs-teaser-reveal'], { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        );

        gsap.fromTo('.gs-teaser-reveal',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '.gs-teaser-reveal',
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
    <section ref={sectionRef} className="w-full min-h-[100svh] flex flex-col bg-[#FDFFE9] text-[#0b0b0c] pt-24 md:pt-32 overflow-hidden">
      
      {/* Standard Header */}
      <div ref={headerRef} className="pl-6 md:pl-8 pr-6 md:pr-8 mb-16 max-w-[1800px] w-full mx-auto shrink-0">
        <span className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-[#6B6B6B] block mb-6">
          THE FOUNDATION
        </span>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] max-w-[20ch]">
          Four principles governing the studio.
        </h2>
      </div>

      {/* EDGE-TO-EDGE FLEX ACCORDION */}
      {/* Spans 100vw, completely breaking out of standard containers */}
      <div className="flex-1 w-full flex flex-col md:flex-row border-t border-[#0b0b0c]/10">
        {pillars.map((pillar, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div 
              key={pillar.id}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onMouseEnter={() => setExpandedIndex(idx)}
              onMouseLeave={() => setExpandedIndex(null)}
              onFocus={() => setExpandedIndex(idx)}
              onBlur={() => setExpandedIndex(null)}
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setExpandedIndex(isExpanded ? null : idx);
                }
              }}
              className={`relative flex-1 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#0b0b0c]/10 last:border-0 overflow-hidden transition-all duration-[800ms] motion-reduce:transition-none ease-[cubic-bezier(0.76,0,0.24,1)] bg-[#FDFFE9] cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-black/30 z-10 ${
                isExpanded ? 'flex-[1.5] md:flex-[2.5]' : ''
              }`}
            >
              {/* Hover/Expanded Image Background - Reveals organically */}
              <div 
                className={`absolute inset-0 w-full h-full transition-opacity duration-[800ms] motion-reduce:transition-none ease-out z-0 ${
                  isExpanded ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={pillar.img} 
                  alt={pillar.title} 
                  className={`w-full h-full object-cover transition-transform duration-[1200ms] motion-reduce:transition-none ease-out ${
                    isExpanded ? 'scale-100' : 'scale-110'
                  }`}
                />
                {/* Gradient scrim: Solid at the bottom for text legibility, fading to transparent at the top for image clarity */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FDFFE9] via-[#FDFFE9]/60 to-[#FDFFE9]/10 transition-opacity duration-[800ms]" />
              </div>

              {/* Top Label */}
              <div className="relative z-10 p-6 md:p-8">
                <span 
                  className={`font-mono text-[10px] md:text-[12px] tracking-widest transition-colors duration-500 ${
                    isExpanded ? 'text-[#0b0b0c]' : 'text-[#0b0b0c]/40'
                  }`}
                >
                  {pillar.id}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col">
                <h3 
                  className={`font-serif text-3xl md:text-5xl text-[#0b0b0c] transition-all duration-500 ${
                    isExpanded ? 'mb-4' : 'mb-0'
                  }`}
                >
                  {pillar.title}
                </h3>
                
                {/* Description - Expands on hover/focus/click */}
                <div 
                  className={`grid transition-[grid-template-rows] duration-500 motion-reduce:transition-none ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <p className="overflow-hidden font-sans text-sm md:text-base leading-relaxed text-[#0b0b0c]/80 max-w-[30ch]">
                    {pillar.desc}
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Teaser link aligned to the right gutter */}
      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-8 mt-12 mb-12 flex justify-end gs-teaser-reveal opacity-0">
        <p className="font-sans text-sm md:text-base text-[#0b0b0c]/50">
          Curious about how a session works? Read the full{' '}
          <a 
            href="/sanctuary" 
            className="text-[#0b0b0c]/50 hover:text-[#0b0b0c] underline decoration-[#0b0b0c]/30 hover:decoration-[#0b0b0c] underline-offset-4 transition-all duration-300 font-medium"
          >
            5-step process
          </a>
          , pain, and aftercare guide.
        </p>
      </div>
      
    </section>
  );
}

export default Block05Pillars;
