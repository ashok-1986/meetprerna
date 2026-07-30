'use client';

import { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function TheHinge() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const lineOneRef = useRef<HTMLSpanElement>(null);
  const lineTwoRef = useRef<HTMLSpanElement>(null);
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
        gsap.set([lineOneRef.current, lineTwoRef.current], { opacity: 1, y: '0%' });
        gsap.set(textContainerRef.current, { y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. The Masked Reveal Animation (Plays once when scrolled into view)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%", // Triggers when the section is 40% up the screen
          }
        });

        tl.fromTo(lineOneRef.current,
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 1.2, ease: "expo.out" }
        )
        .fromTo(lineTwoRef.current,
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 1.2, ease: "expo.out" },
          "-=0.95" // Heavy overlap for a fluid, sequential reveal
        );

        // 2. The Parallax Drift (Scrubs continuously with the user's scroll)
        gsap.to(textContainerRef.current, {
          y: "-15vh", // Drifts upward slightly as you scroll down
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }, sectionRef);

    return () => {
      mediaQuery.removeEventListener('change', listener);
      mm?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[100svh] overflow-hidden bg-[#111111] py-[96px] lg:py-[192px]">
      
      {/* Full Bleed Video Background with Poster Fallback */}
      <div className="absolute inset-0 w-full h-full bg-[#111111] opacity-80">
        {!shouldReduceMotion ? (
          <video 
            src="/video/hinge-loop.mp4" 
            poster="/images/hinge-poster.jpg"
            autoPlay 
            muted 
            loop 
            playsInline
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src="/images/hinge-poster.jpg" 
            alt="Prerna working in the studio" 
            className="w-full h-full object-cover"
          />
        )}
        {/* Gradient Scrim for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
      </div>

      {/* Left-Anchored Parallax Typography */}
      <div 
        ref={textContainerRef}
        className="absolute bottom-16 md:bottom-24 left-0 w-full px-6 md:px-8 max-w-[1800px] mx-auto z-10"
      >
        <h2 className="font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.1] max-w-[18ch] font-normal">
          {/* Mask Wrapper 1 */}
          <span className="block overflow-hidden pb-2">
            <span ref={lineOneRef} className="block text-[#FDFFE9] transform origin-bottom">
              She has never done the same art twice.
            </span>
          </span>
          {/* Mask Wrapper 2 */}
          <span className="block overflow-hidden pt-2">
            <span ref={lineTwoRef} className="block text-[#C4FF61] transform origin-bottom">
              On purpose.
            </span>
          </span>
        </h2>
      </div>
      
    </section>
  );
}

export default TheHinge;
