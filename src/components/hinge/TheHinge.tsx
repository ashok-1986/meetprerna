'use client';

import { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function TheHinge() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setShouldReduceMotion(event.matches);
    };
    mediaQuery.addEventListener('change', listener);

    let mm: gsap.MatchMedia;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.hinge-reveal', { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.hinge-reveal',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
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
      mediaQuery.removeEventListener('change', listener);
      mm?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[100svh] overflow-hidden bg-[#111111]">
      <style>{`
        @keyframes hinge-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .hinge-marquee-track {
          animation: hinge-marquee 40s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hinge-marquee-track {
            animation: none !important;
          }
        }
      `}</style>

      {/* LAYER 1: Background Video/Scrim (z-0) */}
      <div className="absolute inset-0 h-full w-full opacity-60 bg-[#111111]">
        {!shouldReduceMotion ? (
          <video 
            src="/video/studio-bg.mp4" 
            poster="/images/hinge-poster.jpg"
            autoPlay 
            muted 
            loop 
            playsInline
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        ) : (
          <img 
            src="/images/hinge-poster.jpg" 
            alt="Prerna working in the studio" 
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[#111111]/50" />
      </div>

      {/* LAYER 2: Massive Scrolling Marquee (z-10) */}
      <div className="hinge-reveal absolute inset-x-0 top-[25vh] md:top-[30vh] z-10 overflow-hidden">
        <div className="hinge-marquee-track flex w-max whitespace-nowrap font-serif text-[#FDFFE9] text-[18vh] md:text-[28vh] leading-none opacity-90">
          <span className="pr-[8vw]">She has never done the same thing twice. &mdash; </span>
          <span className="pr-[8vw]">She has never done the same thing twice. &mdash; </span>
        </div>
      </div>

      {/* LAYER 3: Cutout Portrait (z-20) */}
      <img 
        src="/images/prerna-cutout.jpg" 
        alt="Prerna Portrait" 
        className="hinge-reveal pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 z-20 h-[85%] md:h-[95%] w-auto object-contain drop-shadow-2xl"
      />

      {/* Subtle Floating Accent Text (Optional) */}
      <div className="hinge-reveal absolute bottom-12 md:bottom-24 left-6 md:left-12 z-30">
        <span className="font-serif text-[#C4FF61] text-3xl md:text-5xl italic font-normal">
          On purpose.
        </span>
      </div>

    </section>
  );
}

export default TheHinge;
