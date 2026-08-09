"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OevraExpandSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const wrapper = containerRef.current.querySelector(".gs-expand-wrapper");
    const image = containerRef.current.querySelector(".gs-expand-image");
    const textContent = containerRef.current.querySelectorAll(".gs-expand-text");
    const darkOverlay = containerRef.current.querySelector(".gs-dark-overlay");

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // 200vh of scrolling distance to scrub through
          scrub: 1,      // 1 second of smoothing for the scrub
          pin: true,     // Pin the entire section while scrubbing
        },
      });

      // 1. Expand the clip-path from a small centered rectangle to full screen
      tl.to(wrapper, {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        duration: 2,
        ease: "power2.inOut",
      }, 0);

      // 2. Add a slight scale-down parallax effect to the image as it expands
      tl.to(image, {
        scale: 1,
        duration: 2,
        ease: "power2.inOut",
      }, 0);

      // 3. Fade in a dark overlay over the image so text is readable
      tl.to(darkOverlay, {
        opacity: 0.6,
        duration: 1,
        ease: "power2.inOut",
      }, 1);

      // 4. Stagger in the text once the image is almost fully expanded
      tl.to(textContent, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      }, 1.2);
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(wrapper, { clipPath: "inset(0% 0% 0% 0% round 0px)" });
      gsap.set(image, { scale: 1 });
      gsap.set(darkOverlay, { opacity: 0.6 });
      gsap.set(textContent, { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100svh] bg-ivory overflow-hidden"
    >
      {/* The element that expands via clip-path. Starts small (30% inset from top/bottom, 35% from left/right) */}
      <div 
        className="gs-expand-wrapper absolute inset-0 w-full h-full z-0 will-change-[clip-path]"
        style={{ clipPath: "inset(30% 35% 30% 35% round 16px)" }}
      >
        <Image
          src={`https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/prerna-hero.jpg`}
          alt="Artistic Process"
          fill
          className="gs-expand-image object-cover object-center scale-125 will-change-transform"
        />
        {/* Dark overlay that fades in when expanded */}
        <div className="gs-dark-overlay absolute inset-0 bg-ink opacity-0 will-change-[opacity]" />
      </div>

      {/* Text Content (Hidden initially via GSAP) - HIDING FOR NOW AS REQUESTED */}
      {/* 
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-6 md:px-16 max-w-[1440px] mx-auto pointer-events-none">
        
        <div className="gs-expand-text opacity-0 translate-y-12 font-mono text-sm tracking-widest text-inchworm mb-6 uppercase">
          (01) Be More Creative
        </div>
        
        <h2 className="gs-expand-text opacity-0 translate-y-12 font-display text-4xl md:text-7xl text-ivory max-w-3xl leading-tight mb-8">
          Creativity is a skill anyone can learn and improve.
        </h2>
        
        <p className="gs-expand-text opacity-0 translate-y-12 font-body text-lg md:text-xl text-ivory-dim max-w-xl leading-relaxed">
          The process is designed to enhance your creative thinking skills and create the optimal conditions (inside and out) for your expression to thrive — all based on volumes of research in psychology.
        </p>

      </div> 
      */}
    </section>
  );
}
