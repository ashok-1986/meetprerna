'use client';

import React, { useRef, useLayoutEffect } from 'react';
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
        {pillars.map((pillar) => (
          <div 
            key={pillar.id}
            className="group relative flex-1 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#0b0b0c]/10 last:border-0 overflow-hidden transition-all duration-[800ms] motion-reduce:transition-none ease-[cubic-bezier(0.76,0,0.24,1)] hover:flex-[1.5] md:hover:flex-[2.5] bg-[#FDFFE9]"
          >
            {/* Hover Image Background - Reveals organically */}
            <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] motion-reduce:transition-none ease-out z-0">
              <img 
                src={pillar.img} 
                alt={pillar.title} 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1200ms] motion-reduce:transition-none ease-out"
              />
              {/* Light scrim to ensure text remains readable on image hover */}
              <div className="absolute inset-0 bg-[#FDFFE9]/80 backdrop-blur-sm transition-opacity duration-[800ms] motion-reduce:transition-none" />
            </div>

            {/* Top Label */}
            <div className="relative z-10 p-6 md:p-8">
              <span className="font-mono text-[10px] md:text-[12px] tracking-widest text-[#0b0b0c]/40 group-hover:text-[#0b0b0c] transition-colors duration-500">
                {pillar.id}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 p-6 md:p-8 flex flex-col">
              <h3 className="font-serif text-3xl md:text-5xl text-[#0b0b0c] mb-0 group-hover:mb-4 transition-all duration-500">
                {pillar.title}
              </h3>
              
              {/* Description - Expands on hover */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 motion-reduce:transition-none ease-[cubic-bezier(0.76,0,0.24,1)]">
                <p className="overflow-hidden font-sans text-sm md:text-base leading-relaxed text-[#0b0b0c]/80 max-w-[30ch]">
                  {pillar.desc}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>
      
    </section>
  );
}

export default Block05Pillars;
