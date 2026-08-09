"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createStaggeredReveal } from "@/lib/animations/factories";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScatterPiece {
  id: number;
  type: string;
  src: string;
  width: number;
  left: string;
  top: string;
}

export default function SelectedWorkScatter() {
  const containerRef = useRef<HTMLElement>(null);
  const [pieces, setPieces] = useState<ScatterPiece[]>([]);

  // Generate random positions and sizes only on the client to avoid hydration mismatches
  useEffect(() => {
    const rawPieces = [
      { id: 1, type: "image", src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/images/portfolio/portfolio-1.jpg" },
      { id: 2, type: "image", src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/images/portfolio/portfolio-2.jpg" },
      { id: 4, type: "image", src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/images/portfolio/portfolio-4.jpg" },
      { id: 5, type: "image", src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/images/portfolio/portfolio-5.jpg" },
      { id: 7, type: "image", src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/images/portfolio/portfolio-7.jpg" },
      { id: 8, type: "image", src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/images/portfolio/portfolio-8.jpg" },
      { id: 9, type: "image", src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/images/prerna-hero-3.jpg" },
      { id: 10, type: "image", src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/images/perna-hero-2.jpeg" },
    ];

    const generateRandomLayout = () => {
      // Divide into roughly 3 vertical zones (top, middle, bottom) and 3 horizontal zones to ensure spread
      return rawPieces.map((piece, index) => {
        // Random width between 150px and 400px (smaller on mobile)
        const isMobile = window.innerWidth < 768;
        const minWidth = isMobile ? 120 : 200;
        const maxWidth = isMobile ? 250 : 450;
        const width = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
        
        // Vertical distribution: Spread across 200vh
        // We'll use percentages for top positioning, spaced out based on index
        const verticalZone = index / rawPieces.length; 
        const top = `${(verticalZone * 80) + Math.random() * 15}%`;

        // Horizontal distribution: alternate left, center, right to prevent overlap
        const horizontalZone = index % 3;
        let leftMin, leftMax;
        if (horizontalZone === 0) { leftMin = 5; leftMax = 25; }       // Left
        else if (horizontalZone === 1) { leftMin = 35; leftMax = 55; }  // Center
        else { leftMin = 65; leftMax = 85; }                            // Right
        
        // Adjust constraints based on width to not overflow screen
        const left = `${Math.floor(Math.random() * (leftMax - leftMin + 1)) + leftMin}%`;

        return {
          ...piece,
          width,
          left,
          top
        };
      });
    };

    setPieces(generateRandomLayout());
  }, []);

  useGSAP(() => {
    if (!containerRef.current || pieces.length === 0) return;

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
  }, { scope: containerRef, dependencies: [pieces] });

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
              width: `${piece.width}px`, 
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
