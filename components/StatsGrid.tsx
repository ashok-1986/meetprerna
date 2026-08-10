"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextMotion from "@/components/ui/TextMotion";
import { siteImages } from "@/lib/data/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StatsGrid() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Create unified orchestrated timeline for the Bento grid
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // Set initial states for clean SSR/hydration matching
      gsap.set('.gs-grid-label', { opacity: 0, y: 20 });
      gsap.set('.gs-grid-img-wrapper', { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" });
      gsap.set('.gs-grid-img', { scale: 1.15 });
      gsap.set('.gs-stat-word', { y: "110%" });
      gsap.set('.gs-stat-sub', { opacity: 0, y: 10 });

      // Sequence
      // 1. Label
      tl.to('.gs-grid-label', { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });

      // 2. Image Wipes (Precision cut)
      tl.to('.gs-grid-img-wrapper', {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.8,
        ease: "power3.inOut",
        stagger: 0.1
      }, "-=0.3");

      tl.to('.gs-grid-img', {
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1
      }, "<");

      // 3. Stat Numbers (Heavy stamp)
      tl.to('.gs-stat-word', {
        y: "0%",
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.05
      }, "-=0.8");

      // 4. Stat Subtext
      tl.to('.gs-stat-sub', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05
      }, "-=0.6");
      
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Instant reveal fallback
      gsap.set('.gs-grid-label', { opacity: 1, y: 0 });
      gsap.set('.gs-grid-img-wrapper', { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });
      gsap.set('.gs-grid-img', { scale: 1 });
      gsap.set('.gs-stat-word', { y: "0%" });
      gsap.set('.gs-stat-sub', { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative z-10 w-full min-h-screen bg-ink text-ivory flex flex-col items-stretch py-12 md:py-24 overflow-hidden"
    >
      {/* Header Section (Above Grid) */}
      <div className="w-full max-w-screen-2xl mx-auto px-8 md:px-12 lg:px-16 mb-16 md:mb-24">
        <div className="flex flex-col gap-6">
          <span className="gs-grid-label font-mono text-xs md:text-sm tracking-widest text-ivory/70 uppercase">
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
        <div className="flex flex-col justify-center gap-4 order-1">
          <div className="overflow-hidden">
            <span className="gs-stat-word inline-block font-display text-[clamp(2.5rem,4vw,4.5rem)] text-ivory leading-[1.1]">Fine Arts</span>
          </div>
          <span className="gs-stat-sub font-mono text-xs text-ivory/70 uppercase tracking-widest leading-relaxed max-w-[15ch]">
            Diploma, JK Academy
          </span>
        </div>

        {/* Cell 2: 500+ Tattoos */}
        <div className="flex flex-col justify-center gap-4 order-2">
          <div className="overflow-hidden">
            <span className="gs-stat-word inline-block font-display text-[clamp(2.5rem,4vw,4.5rem)] text-ivory leading-[1.1]">500+</span>
          </div>
          <span className="gs-stat-sub font-mono text-xs text-ivory/70 uppercase tracking-widest leading-relaxed max-w-[15ch]">
            Tattoos completed
          </span>
        </div>

        {/* Cell 3: Image 1 (Align Right) */}
        <div className="flex items-center justify-end order-3 -mr-8 md:-mr-12 lg:-mr-16">
          <div className="gs-grid-img-wrapper relative w-full max-w-[300px] overflow-hidden">
            <img 
              src={siteImages.home.credibilityBento1} 
              alt="Prerna working"
              loading="lazy"
              className="gs-grid-img w-full h-auto block" 
            />
          </div>
        </div>


        {/* Row 2 */}
        {/* Cell 4: Image 2 (Align Left) */}
        <div className="flex items-center justify-start order-6 lg:order-4 mt-8 lg:mt-0 -ml-8 md:-ml-12 lg:-ml-16">
          <div className="gs-grid-img-wrapper relative w-full max-w-[300px] overflow-hidden">
            <img 
              src={siteImages.home.credibilityBento2} 
              alt="Prerna studio"
              loading="lazy"
              className="gs-grid-img w-full h-auto block" 
            />
          </div>
        </div>

        {/* Cell 5: 100+ Custom designs */}
        <div className="flex flex-col justify-center gap-4 order-4 lg:order-5 mt-8 lg:mt-0">
          <div className="overflow-hidden">
            <span className="gs-stat-word inline-block font-display text-[clamp(2.5rem,4vw,4.5rem)] text-ivory leading-[1.1]">100+</span>
          </div>
          <span className="gs-stat-sub font-mono text-xs text-ivory/70 uppercase tracking-widest leading-relaxed max-w-[15ch]">
            Custom designs
          </span>
        </div>

        {/* Cell 6: 10+ Years Artistry */}
        <div className="flex flex-col justify-center gap-4 order-5 lg:order-6 mt-8 lg:mt-0">
          <div className="overflow-hidden">
            <span className="gs-stat-word inline-block font-display text-[clamp(2.5rem,4vw,4.5rem)] text-ivory leading-[1.1]">10+ Years</span>
          </div>
          <span className="gs-stat-sub font-mono text-xs text-ivory/70 uppercase tracking-widest leading-relaxed max-w-[15ch]">
            Artistry
          </span>
        </div>

      </div>
    </section>
  );
}
