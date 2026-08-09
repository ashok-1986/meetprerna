"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutShift() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Parallax the background image
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax the text slightly faster
      gsap.to(textRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Reveal words on scroll
      const words = gsap.utils.toArray('.shift-word');
      gsap.fromTo(words, 
        { opacity: 0.15, filter: "blur(4px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "center 40%",
            scrub: 1, // Adds a slight smoothing to the scrub
          }
        }
      );
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const quote = "I realized that skin is a living, breathing canvas that moves, heals, and demands a meditative patience that paper never asks of you.";
  const words = quote.split(" ");

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[85svh] md:h-[100svh] overflow-hidden z-20 origin-top bg-ink"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-ink">
        <Image
          ref={imageRef}
          src="/images/about.jpg"
          alt="The Living Canvas"
          fill
          className="object-cover object-center md:object-[center_30%] opacity-90 scale-110 will-change-transform"
        />
        {/* Overlays for legibility */}
        <div className="absolute inset-0 bg-ink/20 pointer-events-none" /> 
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent pointer-events-none" />
      </div>

      {/* Typography */}
      <div ref={textRef} className="absolute inset-0 z-20 flex flex-col justify-end items-start px-6 md:px-12 pb-16 md:pb-24 text-left pointer-events-none">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="font-display text-[clamp(2.25rem,6vw,5rem)] font-[400] leading-tight max-w-[900px] text-ivory drop-shadow-lg flex flex-wrap gap-x-[0.25em] gap-y-[0.1em]">
            {words.map((word, i) => (
              <span key={i} className="shift-word inline-block will-change-[opacity,filter]">
                {word}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
