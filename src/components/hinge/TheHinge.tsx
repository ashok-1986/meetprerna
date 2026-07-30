'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function TheHinge() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(textRef.current, { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
            }
          }
        );
      });
    }, textRef);
    return () => {
      mm?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative w-full h-[80svh] min-h-[600px] overflow-hidden bg-[#111111]">
      
      {/* Full Bleed Video Background with Poster Fallback */}
      <div className="absolute inset-0 w-full h-full bg-[#111111]">
        <video 
          src="/video/hinge-loop.mp4" 
          poster="/images/hinge-poster.jpg"
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Subtle scrim to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />
      </div>

      {/* Left-Anchored Typography */}
      <div className="absolute bottom-16 md:bottom-24 left-0 w-full px-6 md:px-8 max-w-[1800px] mx-auto z-10">
        <h2 
          ref={textRef}
          className="font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.1] max-w-[18ch] font-normal"
        >
          <span className="text-[#FDFFE9] block">
            She has never done the same thing twice.
          </span>
          <span className="text-[#C4FF61] block mt-2">
            On purpose.
          </span>
        </h2>
      </div>
      
    </section>
  );
}

export default TheHinge;
