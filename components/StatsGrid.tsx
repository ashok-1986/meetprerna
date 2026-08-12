"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextMotion from "@/components/ui/TextMotion";
import { siteImages } from "@/lib/data/site";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StatsGrid() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Create scroll triggers for the grid label
      gsap.fromTo('.gs-grid-label', 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.gs-grid-label',
            start: "top 85%"
          }
        }
      );

      // Set initial states
      gsap.set('.gs-grid-img-wrapper', { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" });
      gsap.set('.gs-grid-img', { scale: 1.15 });
      gsap.set('.gs-stat-word', { y: "110%" });
      gsap.set('.gs-stat-sub', { opacity: 0, y: 10 });

      // Use ScrollTrigger.batch to stagger cells row by row as they scroll in
      ScrollTrigger.batch('.bento-cell', {
        start: "top 85%",
        onEnter: (batch) => {
          batch.forEach((cell, i) => {
            const delay = i * 0.15; // stagger elements in the same batch

            const imgWrapper = cell.querySelector('.gs-grid-img-wrapper');
            const img = cell.querySelector('.gs-grid-img');
            if (imgWrapper && img) {
              gsap.to(imgWrapper, {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 0.8,
                ease: "power3.inOut",
                delay: delay
              });
              gsap.to(img, {
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                delay: delay
              });
            }

            const statWord = cell.querySelector('.gs-stat-word');
            const statSub = cell.querySelector('.gs-stat-sub');
            if (statWord && statSub) {
              gsap.to(statWord, {
                y: "0%",
                duration: 0.8,
                ease: "power4.out",
                delay: delay
              });
              gsap.to(statSub, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: delay + 0.2
              });
            }
          });
        }
      });
      
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
        <div className="bento-cell flex flex-col justify-center gap-4 order-1">
          <div className="overflow-hidden">
            <span className="gs-stat-word inline-block font-display text-[clamp(2.5rem,4vw,4.5rem)] text-ivory leading-[1.1]">Fine Arts</span>
          </div>
          <span className="gs-stat-sub font-mono text-xs text-ivory/70 uppercase tracking-widest leading-relaxed max-w-[15ch]">
            Diploma, JK Academy
          </span>
        </div>

        {/* Cell 2: 500+ Tattoos */}
        <div className="bento-cell flex flex-col justify-center gap-4 order-2">
          <div className="overflow-hidden">
            <span className="gs-stat-word inline-block font-display text-[clamp(2.5rem,4vw,4.5rem)] text-ivory leading-[1.1]">500+</span>
          </div>
          <span className="gs-stat-sub font-mono text-xs text-ivory/70 uppercase tracking-widest leading-relaxed max-w-[15ch]">
            Tattoos completed
          </span>
        </div>

        {/* Cell 3: Image 1 (Align Right) */}
        <div className="bento-cell flex items-center justify-end order-3 -mr-8 md:-mr-12 lg:-mr-16">
          <div className="gs-grid-img-wrapper relative w-full max-w-[300px] overflow-hidden">
            <Image 
              src={siteImages.home.credibilityBento1} 
              alt="Prerna working"
              width={300}
              height={450}
              className="gs-grid-img w-full h-auto block object-cover" 
            />
          </div>
        </div>


        {/* Row 2 */}
        {/* Cell 4: Image 2 (Align Left) */}
        <div className="bento-cell flex items-center justify-start order-6 lg:order-4 mt-8 lg:mt-0 -ml-8 md:-ml-12 lg:-ml-16">
          <div className="gs-grid-img-wrapper relative w-full max-w-[300px] overflow-hidden">
            <Image 
              src={siteImages.home.credibilityBento2} 
              alt="Prerna studio"
              width={300}
              height={450}
              className="gs-grid-img w-full h-auto block object-cover" 
            />
          </div>
        </div>

        {/* Cell 5: 100+ Custom designs */}
        <div className="bento-cell flex flex-col justify-center gap-4 order-4 lg:order-5 mt-8 lg:mt-0">
          <div className="overflow-hidden">
            <span className="gs-stat-word inline-block font-display text-[clamp(2.5rem,4vw,4.5rem)] text-ivory leading-[1.1]">100+</span>
          </div>
          <span className="gs-stat-sub font-mono text-xs text-ivory/70 uppercase tracking-widest leading-relaxed max-w-[15ch]">
            Custom designs
          </span>
        </div>

        {/* Cell 6: 10+ Years Artistry */}
        <div className="bento-cell flex flex-col justify-center gap-4 order-5 lg:order-6 mt-8 lg:mt-0">
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
