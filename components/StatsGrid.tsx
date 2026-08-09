"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createStaggeredReveal } from "@/lib/animations/factories";
import TextMotion from "@/components/ui/TextMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StatsGrid() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Animate the text and stat elements natively
    const revealElements = containerRef.current.querySelectorAll('.gs-reveal, .gs-reveal-stat');
    createStaggeredReveal(revealElements);

    // Scroll-Triggered Opacity Animation for the Images and mobile stat blocks
    const mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const images = containerRef.current!.querySelectorAll('.gs-reveal-img');
      images.forEach((img) => {
        gsap.set(img, { scale: 1.05, opacity: 0, y: 40 });
        
        gsap.to(img, {
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: img, 
            start: "top 80%", // Start fade-in when image top enters bottom of screen
          }
        });
      });
      
      // Keep mobile touch active classes working for stats
      const stats = containerRef.current!.querySelectorAll('.gs-reveal-stat');
      stats.forEach((stat) => {
        ScrollTrigger.create({
          trigger: stat,
          start: "top 75%",
          end: "bottom 25%",
          toggleClass: "is-active",
        });
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Instant reveal fallback
      const images = containerRef.current!.querySelectorAll('.gs-reveal-img');
      images.forEach((img) => gsap.set(img, { scale: 1, opacity: 1 }));
    });

    return () => mm.revert(); // clean up
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative z-10 w-full min-h-screen bg-ink text-ivory flex flex-col items-stretch py-12 md:py-24"
    >
      {/* Header Section (Above Grid) */}
      <div className="w-full max-w-screen-2xl mx-auto px-8 md:px-12 lg:px-16 mb-16 md:mb-24">
        <div className="flex flex-col gap-6">
          <span className="font-mono text-xs md:text-sm tracking-widest text-ivory/70 uppercase opacity-0 gs-reveal">
            Credibility
          </span>
          <h2 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-[400] leading-[1.15] max-w-4xl text-balance">
            <TextMotion 
              text="Art measured in patience, precision, and permanence." 
              preset="dissolve" 
              trigger="sectionInView" 
              delay={0.2} 
              duration={1.5} 
            />
          </h2>
        </div>
      </div>

      {/* 3x2 Grid Section */}
      <div className="flex-1 w-full max-w-screen-2xl mx-auto px-8 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
        
        {/* Row 1 */}
        {/* Cell 1: Fine Arts Diploma */}
        <div className="flex flex-col justify-center gap-4 opacity-0 gs-reveal-stat order-1">
          <span className="font-display text-[clamp(2.5rem,4vw,4.5rem)] text-ivory leading-[1.1]">Fine Arts</span>
          <span className="font-mono text-xs text-ivory/70 uppercase tracking-widest leading-relaxed max-w-[15ch]">
            Diploma, JK Academy
          </span>
        </div>

        {/* Cell 2: 500+ Tattoos */}
        <div className="flex flex-col justify-center gap-4 opacity-0 gs-reveal-stat order-2">
          <span className="font-display text-[clamp(2.5rem,4vw,4.5rem)] text-ivory leading-[1.1]">500+</span>
          <span className="font-mono text-xs text-ivory/70 uppercase tracking-widest leading-relaxed max-w-[15ch]">
            Tattoos completed
          </span>
        </div>

        {/* Cell 3: Image 1 (Align Right) */}
        <div className="flex items-center justify-end opacity-0 gs-reveal-img order-3 -mr-8 md:-mr-12 lg:-mr-16">
          <div className="relative w-full max-w-[300px] overflow-hidden">
            <img 
              src={`https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/home-bento-image-1.jpg`} 
              alt="Prerna working"
              loading="lazy"
              className="w-full h-auto block" 
            />
          </div>
        </div>


        {/* Row 2 */}
        {/* Cell 4: Image 2 (Align Left) */}
        <div className="flex items-center justify-start opacity-0 gs-reveal-img order-6 lg:order-4 mt-8 lg:mt-0 -ml-8 md:-ml-12 lg:-ml-16">
          <div className="relative w-full max-w-[300px] overflow-hidden">
            <img 
              src={`https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/home-bento-image-2.jpg`} 
              alt="Prerna studio"
              loading="lazy"
              className="w-full h-auto block" 
            />
          </div>
        </div>

        {/* Cell 5: 100+ Custom designs */}
        <div className="flex flex-col justify-center gap-4 opacity-0 gs-reveal-stat order-4 lg:order-5 mt-8 lg:mt-0">
          <span className="font-display text-[clamp(2.5rem,4vw,4.5rem)] text-ivory leading-[1.1]">100+</span>
          <span className="font-mono text-xs text-ivory/70 uppercase tracking-widest leading-relaxed max-w-[15ch]">
            Custom designs
          </span>
        </div>

        {/* Cell 6: 10+ Years Artistry */}
        <div className="flex flex-col justify-center gap-4 opacity-0 gs-reveal-stat order-5 lg:order-6 mt-8 lg:mt-0">
          <span className="font-display text-[clamp(2.5rem,4vw,4.5rem)] text-ivory leading-[1.1]">10+ Years</span>
          <span className="font-mono text-xs text-ivory/70 uppercase tracking-widest leading-relaxed max-w-[15ch]">
            Artistry
          </span>
        </div>

      </div>
    </section>
  );
}

