'use client';

import React, { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { 
    id: '01', 
    title: 'Intention', 
    desc: 'Every mark begins with purpose. We do not rush the concept or the consultation.', 
    img: '/images/portfolio/peony-back.jpg' 
  },
  { 
    id: '02', 
    title: 'Precision', 
    desc: 'Flawless execution over speed. The needle is an instrument of absolute permanence.', 
    img: '/images/portfolio/buddha-lotus.jpg' 
  },
  { 
    id: '03', 
    title: 'Sanctuary', 
    desc: 'A controlled, quiet environment. Your comfort and psychological safety dictate the pacing.', 
    img: '/images/portfolio/geometric-wolf.jpg' 
  },
  { 
    id: '04', 
    title: 'Evolution', 
    desc: 'The art ages with you. We design for the decades, not just the day of the session.', 
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
        gsap.set(headerRef.current, { opacity: 1, y: 0 });
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
      });
    }, sectionRef);

    return () => {
      mm?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#FDFFE9] text-[#0b0b0c] pt-24 md:pt-32 pb-0 overflow-hidden">
      
      {/* Standard Header locked to the 32px left gutter */}
      <div ref={headerRef} className="pl-6 md:pl-8 pr-6 md:pr-8 mb-16 max-w-[1800px] mx-auto">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/50 block mb-4">
          The Foundation
        </span>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] max-w-[20ch]">
          Four principles governing the studio.
        </h2>
      </div>

      {/* EDGE-TO-EDGE FLEX ACCORDION */}
      {/* Spans 100vw, completely breaking out of standard containers */}
      <div className="w-full h-[100vh] md:h-[75vh] flex flex-col md:flex-row border-y border-[#0b0b0c]/10">
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
                {/* Light scrim to ensure text remains readable on image hover */}
                <div className="absolute inset-0 bg-[#FDFFE9]/80 backdrop-blur-sm" />
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
      
    </section>
  );
}

export default Block05Pillars;
