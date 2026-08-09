"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { createFadeUpReveal } from "@/lib/animations/factories";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function ClosingCTA() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const revealElements = containerRef.current.querySelectorAll('.gs-reveal');
    createFadeUpReveal(revealElements);
  }, { scope: containerRef });

  return (
    <section id="inquiry-form" ref={containerRef} className="relative z-10 w-full bg-ivory text-ink py-24 md:py-48 px-6 md:px-12 flex flex-col items-center">
      
      <div className="w-full max-w-4xl text-center mb-12 opacity-0 gs-reveal">
        <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-ink/50 uppercase mb-6">
          Connect
        </p>
        <h2 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-[400] leading-none">
          Start a conversation
        </h2>
      </div>

      <div className="w-full max-w-4xl opacity-0 gs-reveal flex justify-center mt-12">
        <InteractiveHoverButton 
          href="https://meetprerna.fillout.com/book" 
          text="Book a Consultation"
          className="text-ink border-ink hover:text-ink font-mono uppercase text-sm tracking-[0.2em]"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </section>
  );
}

