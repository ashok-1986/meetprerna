"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { createStaggeredReveal } from "@/lib/animations/factories";

export default function Hinge() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Reveal the text inside
    const revealElements = containerRef.current.querySelectorAll('.gs-reveal');
    createStaggeredReveal(revealElements);
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden gs-hinge-section z-20 origin-top"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/videos/prerna-working.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-ink/40" /> {/* Overlay for text legibility */}
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-end items-start px-6 md:px-12 pb-24 text-left">
        <h2 className="font-display text-[clamp(2.25rem,6vw,5rem)] font-[400] leading-tight max-w-[800px]">
          <span className="block text-ivory opacity-0 gs-reveal">She has never done the same art twice.</span>
          <span className="block text-ivory opacity-0 gs-reveal">On purpose.</span>
        </h2>
      </div>
    </section>
  );
}
