"use client";

import React, { useRef } from "react";
import Link from "next/link";
import MagneticInkButton from "./MagneticInkButton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSanctuary() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const textBlocks = gsap.utils.toArray<HTMLElement>('.sanc-block');
    textBlocks.forEach((block) => {
      gsap.fromTo(block, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-ivory text-ink pt-24 pb-32 overflow-hidden">
      
      {/* Chapter 3 */}
      <div className="w-full flex flex-col md:flex-row gap-12 lg:gap-16 relative min-h-[50vh] px-6 md:px-12 items-center">
        <div className="md:w-1/3 relative">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-ink/50">03 / The Decision</span>
            <h2 className="font-display text-3xl md:text-4xl text-ink">A Bet on the Unknown</h2>
          </div>
        </div>
        <div className="md:w-2/3 flex flex-col gap-8 font-body text-lg md:text-xl leading-relaxed text-ink/90">
          <p className="sanc-block w-full">
            In 2020, while the world stopped, I had to make a choice. The lockdown forced a clarity I couldn't ignore. I packed up and moved to Mumbai. It wasn't just a change of geography; it was an active bet on myself during a genuinely terrifying year to pursue a life entirely built on art.
          </p>
          <blockquote className="sanc-block border-l-2 border-ink/20 pl-8 font-quote text-3xl md:text-4xl italic leading-tight text-ink w-full">
            &ldquo;It wasn't a change of geography; it was an active bet on myself.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Chapter 4 */}
      <div className="w-full flex flex-col md:flex-row gap-12 lg:gap-16 relative min-h-[50vh] px-6 md:px-12 items-center mt-24 md:mt-0 mb-32">
        <div className="md:w-1/3 relative">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-ink/50">04 / The Apprenticeship</span>
            <h2 className="font-display text-3xl md:text-4xl text-ink">The First Mark</h2>
          </div>
        </div>
        <div className="md:w-2/3 flex flex-col gap-8 font-body text-lg md:text-xl leading-relaxed text-ink/90">
          <p className="sanc-block w-full">
            In September 2022, I began my apprenticeship at Galaxy Tattoo Studio. All the theory became sharply real. My very first anchor in this new world was a piece I tattooed on my own leg: &ldquo;This too shall pass.&rdquo; A permanent reminder on living skin, grounding everything that was to come.
          </p>
          <blockquote className="sanc-block border-l-2 border-ink/20 pl-8 font-quote text-3xl md:text-4xl italic leading-tight text-ink w-full">
            &ldquo;My very first anchor was a piece I tattooed on my own leg.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Handoff / CTA */}
      <div className="w-full pt-24 border-t border-ink/10 flex flex-col items-center text-center gap-8 sanc-block px-6 md:px-12">
        <h3 className="font-display text-5xl md:text-7xl leading-none">Your story, <br className="hidden md:block"/>told in art.</h3>
        <p className="font-body text-xl text-ink/70 max-w-xl">
          Let's sit together, talk, and turn your thoughts into something permanent.
        </p>
        <MagneticInkButton 
          href="/connect" 
          className="mt-8"
        >
          Start a Consultation
        </MagneticInkButton>
      </div>

    </section>
  );
}
