"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { createStickyStack, createTextReveal } from "@/lib/animations/factories";
import RippleEffect from "@/components/RippleEffect";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;

    const words = textRef.current.querySelectorAll(".word-inner");
    const reveals = containerRef.current.querySelectorAll('.gs-reveal-hero');
    const bgImage = containerRef.current.querySelector('.gs-bg-image');
    const bgOverlay = containerRef.current.querySelector('.gs-bg-overlay');

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Oevra style cinematic entrance: fast start, gentle settle, max 800ms
      const tl = gsap.timeline();

      // Start with background image scaled up and dark
      gsap.set(bgImage, { scale: 1.05 });
      gsap.set(bgOverlay, { backgroundColor: "rgba(0,0,0,1)" }); // Start fully black
      
      // Reveal the background
      tl.to(bgOverlay, { 
        backgroundColor: "rgba(0,0,0,0.25)", 
        duration: 0.8, 
        ease: "power2.out" 
      }, 0);
      
      tl.to(bgImage, { 
        scale: 1, 
        duration: 0.8, 
        ease: "power2.out" 
      }, 0);

      // Stagger subhead and CTA
      tl.to(reveals, { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        ease: "power2.out", 
        stagger: 0.1 
      }, 0.2);
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(reveals, { opacity: 1, y: 0 });
      gsap.set(bgOverlay, { backgroundColor: "rgba(0,0,0,0.25)" });
    });
    
    // Apply SplitText reveal
    if (textRef.current) {
      createTextReveal([textRef.current]);
    }

    // Apply Sticky Stack to the hero
    createStickyStack(containerRef);

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] overflow-hidden bg-ink">
      {/* Background Image with Ripple Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <RippleEffect 
          image={`https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/images/prerna-hero.jpg`}
          className="absolute inset-0 w-full h-full gs-bg-image will-change-transform"
          intensity={3}
          rippleSize={40}
        />
        <div className="absolute inset-0 gs-bg-overlay mix-blend-multiply will-change-[background-color] pointer-events-none" />
      </div>

      {/* Edge-to-Edge Layout Container */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between pt-32 pb-12 md:pb-16 px-6 md:px-12 lg:px-16 pointer-events-none">
        
        {/* Top Meta Area (Optional, since Header handles main nav, we leave it clear or add tiny text) */}
        <div className="w-full flex justify-between items-start">
           <div className="gs-reveal-hero opacity-0 font-mono text-xs uppercase tracking-widest text-ivory/70">
              {/* Extra meta can go here if needed, leaving it empty or subtle */}
           </div>
        </div>

        {/* Bottom Area: Body Text & Massive Title */}
        <div className="w-full flex flex-col md:flex-row items-end justify-between gap-12">
           
           {/* Bottom Left: CTA */}
           <div className="flex-none gs-reveal-hero opacity-0 pointer-events-auto mb-2 md:mb-6">
              <InteractiveHoverButton href="/connect" text="Start a conversation" />
           </div>

           {/* Bottom Right: Body + Title */}
           <div className="flex flex-col items-start md:items-end text-left md:text-right">
              <p className="gs-reveal-hero opacity-0 font-body text-base md:text-lg leading-relaxed text-ivory max-w-sm mb-6 md:pr-2">
                Translating stories into fine-art tattoos and abstract canvases that endure.
              </p>
              
              <h1 ref={textRef} className="font-display text-[clamp(2.5rem,8vw,8rem)] font-[400] leading-[0.9] m-0 p-0 text-ivory flex flex-col items-start md:items-end whitespace-nowrap">
                 <span>VISUAL ARTIST</span>
                 <span className="flex items-center gap-4">
                   <span className="text-[0.6em] font-sans font-light opacity-70">+</span> 
                   <span>TATTOOIST</span>
                 </span>
              </h1>
           </div>
        </div>

      </div>

      {/* FOUC Fallback for No-JS */}
      <noscript>
        <style>{`
          .opacity-0 { opacity: 1 !important; }
        `}</style>
      </noscript>
    </section>
  );
}


