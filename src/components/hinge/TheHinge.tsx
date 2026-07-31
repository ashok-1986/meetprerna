'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function TheHinge() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const lineOneRef = useRef<HTMLSpanElement>(null);
  const lineTwoRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
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
      mm?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[80svh] overflow-hidden bg-[var(--color-ink)] py-[192px]">
      
      {/* Full Bleed Image Background */}
      <div className="absolute inset-0 w-full h-full bg-[var(--color-ink)] opacity-80">
        <Image 
          src="/images/prerna-working-bw.jpg" 
          alt="Prerna working in the studio" 
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Scrim for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/40 to-transparent" />
      </div>

      {/* Left-Anchored Parallax Typography */}
      <div 
        ref={textContainerRef}
        className="absolute bottom-16 md:bottom-24 left-0 w-full px-6 md:px-8 max-w-[1800px] mx-auto z-10"
      >
        <h2 
          className="font-serif leading-[1.1] max-w-[18ch] font-normal"
          style={{ fontSize: 'var(--text-display-l)' }}
        >
          {/* Mask Wrapper 1 */}
          <span className="block overflow-hidden pb-2">
            <span ref={lineOneRef} className="block text-[var(--color-ivory)] transform origin-bottom">
              She has never done the same art twice.
            </span>
          </span>
          {/* Mask Wrapper 2 */}
          <span className="block overflow-hidden pt-2">
            <span ref={lineTwoRef} className="block text-[var(--color-inchworm)] transform origin-bottom">
              On purpose.
            </span>
          </span>
        </h2>
      </div>
      
    </section>
  );
}

export default TheHinge;
