"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createStaggeredReveal } from "@/lib/animations/factories";
import { siteImages } from "@/lib/data/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SCATTER_CONFIG = [
  { left: "15%", top: "5%", width: "clamp(120px, 25vw, 250px)" },
  { left: "75%", top: "15%", width: "clamp(150px, 30vw, 350px)" },
  { left: "45%", top: "28%", width: "clamp(180px, 35vw, 420px)" },
  { left: "12%", top: "42%", width: "clamp(140px, 28vw, 300px)" },
  { left: "82%", top: "55%", width: "clamp(160px, 32vw, 380px)" },
  { left: "35%", top: "70%", width: "clamp(170px, 34vw, 400px)" },
  { left: "75%", top: "85%", width: "clamp(130px, 26vw, 280px)" },
  { left: "25%", top: "95%", width: "clamp(140px, 28vw, 320px)" },
];

export default function SelectedWorkScatter() {
  const containerRef = useRef<HTMLElement>(null);
  
  const pieces = siteImages.home.scatter.map((src, index) => ({
    id: index + 1,
    src,
    ...SCATTER_CONFIG[index % SCATTER_CONFIG.length]
  }));

  useGSAP(() => {
    if (!containerRef.current) return;

    // Fade reveal for the title
    const revealElements = containerRef.current.querySelectorAll('.gs-reveal');
    createStaggeredReveal(revealElements);

    // Staggered reveal for scattered images as they enter the viewport
    const mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const images = containerRef.current!.querySelectorAll('.gs-scatter-item');
      
      images.forEach((img) => {
        gsap.fromTo(img, 
          { opacity: 0, y: 100, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 90%", // Trigger slightly before it comes into view
              end: "top 40%",
              scrub: 0.5, // Smooth scrub effect
            }
          }
        );
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const images = containerRef.current!.querySelectorAll('.gs-scatter-item');
      gsap.set(images, { opacity: 1, y: 0, scale: 1 });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-ink py-24 md:py-48 gs-reveal-container h-[250svh] overflow-hidden">
      <div className="absolute top-24 md:top-48 pl-6 md:pl-12 opacity-0 gs-reveal z-20 flex flex-col gap-6">
        <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-ivory/50 uppercase">
          Portfolio
        </span>
        <h2 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-[400] text-ivory leading-none">
          Selected Work
        </h2>
      </div>

      <div className="relative w-full h-full mt-24">
        {pieces.map((piece) => (
          <div 
            key={piece.id} 
            className="gs-scatter-item absolute opacity-0 will-change-transform"
            style={{ 
              width: piece.width, 
              left: piece.left, 
              top: piece.top,
              transform: `translateX(-50%)` // Center align based on left %
            }}
          >
            <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: '3/4' }}>
              <Image
                src={piece.src}
                alt={`Selected Work ${piece.id}`}
                fill
                sizes="(max-width: 768px) 250px, 450px"
                className="object-cover pointer-events-none" 
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
