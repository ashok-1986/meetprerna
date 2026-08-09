"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ConsultationHero() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Create a timeline for the initial page load sequence
    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Cinematic Wipe & Scale for the Image
    tl.fromTo(
      ".hero-image-container",
      { clipPath: "inset(100% 0% 0% 0%)" }, // Start fully clipped from the top (hidden at the bottom)
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut" }
    );
    
    tl.fromTo(
      ".hero-image",
      { scale: 1.15 }, // Start slightly zoomed in
      { scale: 1, duration: 2, ease: "power3.out" },
      "<" // Start at the same time as the wipe
    );

    // 2. Text Reveal
    tl.fromTo(
      ".hero-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" },
      "-=1.2" // Overlap with the image animation
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] min-h-[600px] flex items-end pb-24 md:pb-32 px-6 md:px-12">
      {/* Background Image Container */}
      <div className="hero-image-container absolute inset-0 z-0 overflow-hidden">
        <Image 
          src="/images/consultation-hero.jpg"
          alt="Tattoo Consultation"
          fill
          className="hero-image object-cover object-center"
          priority
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-start gap-6">
        <p className="hero-text font-mono text-sm tracking-[0.2em] uppercase text-inchworm opacity-0">
          The Process
        </p>
        <h1 className="hero-text font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] text-ivory opacity-0">
          How we bring your vision to life
        </h1>
        <p className="hero-text font-quote italic text-xl md:text-2xl text-ivory/90 max-w-2xl leading-relaxed opacity-0">
          "Every piece begins with a conversation. Here is what you can expect when booking a session."
        </p>
        <div className="hero-text opacity-0 mt-4">
          <a href="#inquiry-form" className="inline-flex items-center gap-4 bg-inchworm text-ink font-mono text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:bg-ivory transition-colors">
            Start Inquiry
          </a>
        </div>
      </div>
    </section>
  );
}
