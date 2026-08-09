"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

// Register Draggable
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}
import { createStaggeredReveal, createImageReveal } from "@/lib/animations/factories";

export default function SelectedWork() {
  const containerRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const pieces = [
    { id: 1, type: "image", src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/portfolio/portfolio-1.jpg" },
    { id: 2, type: "image", src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/portfolio/portfolio-2.jpg" },
    { id: 3, type: "video", src: "/videos/portfolio-3.mp4" }, // placeholder for video
    { id: 4, type: "image", src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/portfolio/portfolio-4.jpg" },
    { id: 5, type: "image", src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/portfolio/portfolio-5.jpg" },
    { id: 6, type: "video", src: "/videos/portfolio-6.mp4" }, // placeholder for video
    { id: 7, type: "image", src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/portfolio/portfolio-7.jpg" },
    { id: 8, type: "image", src: "https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/portfolio/portfolio-8.jpg" },
  ];

  useGSAP(() => {
    if (!containerRef.current || !railRef.current) return;

    // Standard fade reveal for the title and rail
    const revealElements = containerRef.current.querySelectorAll('.gs-reveal');
    createStaggeredReveal(revealElements);

    // Fiddle Digital dynamic image reveal (clip-path + scale)
    const imageReveals = containerRef.current.querySelectorAll('.gs-image-reveal');
    createImageReveal(imageReveals);

    // Custom Drag & Skew physics using GSAP Draggable
    const skewSetter = gsap.quickSetter(
      railRef.current.querySelectorAll('.gs-skew-item'), 
      "skewX", 
      "deg"
    );

    let velocity = 0;
    const ticker = () => {
      // Decay the skew back to 0
      velocity *= 0.9;
      if (Math.abs(velocity) < 0.1) velocity = 0;
      skewSetter(velocity);
    };
    
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.ticker.add(ticker);
      return () => gsap.ticker.remove(ticker);
    });

    let lastX = 0;
    
    Draggable.create(railRef.current, {
      type: "scrollLeft",
      edgeResistance: 0.8,
      onDragStart: function() {
        lastX = this.pointerX;
      },
      onDrag: function() {
        const delta = this.pointerX - lastX;
        velocity = Math.min(Math.max(delta * 0.5, -15), 15); // cap skew at 15deg
        lastX = this.pointerX;
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-ink py-24 overflow-hidden gs-reveal-container">
      <div className="pl-6 md:pl-8 mb-12 opacity-0 gs-reveal">
        <h2 className="font-display text-[clamp(2.25rem,6vw,5rem)] font-[400] text-ivory">
          Selected Work
        </h2>
      </div>

      {/* Drag Rail Container */}
      <div className="w-full pl-6 md:pl-8 pr-6 md:pr-0">
        <div 
          ref={railRef}
          className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar cursor-grab active:cursor-grabbing gs-reveal opacity-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {pieces.map((piece) => (
            <div 
              key={piece.id} 
              className="gs-skew-item relative flex-none w-[280px] h-[400px] md:w-[400px] md:h-[560px] bg-ink-200 rounded-sm overflow-hidden will-change-transform"
            >
              {piece.type === "image" ? (
                <Image
                  src={piece.src}
                  alt={`Selected Work ${piece.id}`}
                  fill
                  sizes="(max-width: 768px) 280px, 400px"
                  className="object-cover pointer-events-none gs-image-reveal" 
                  /* pointer-events-none prevents image dragging interfering with rail dragging */
                />
              ) : (
                <video
                  src={piece.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover pointer-events-none gs-image-reveal"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Fallback styling for hide-scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
