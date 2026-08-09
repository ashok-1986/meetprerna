"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current || !textRef.current) return;

    let mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const words = textRef.current!.querySelectorAll(".word-inner");
      const reveals = textRef.current!.querySelectorAll(".gs-reveal-hero");
      
      const tl = gsap.timeline();
      
      // Image fade/scale
      tl.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.5, ease: "power3.out" },
        0
      );

      // Stagger H1 words up (matches Home Hero)
      tl.to(words, { 
        y: "0%", 
        opacity: 1, 
        duration: 1.2, 
        ease: "power4.out", 
        stagger: 0.1 
      }, 0.5);

      // Fade in subhead
      tl.to(reveals, { 
        opacity: 1, 
        y: 0, 
        duration: 1.0, 
        ease: "power3.out", 
        stagger: 0.2 
      }, 1.0);

      // Parallax on scroll
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const words = textRef.current!.querySelectorAll(".word-inner");
      const reveals = textRef.current!.querySelectorAll(".gs-reveal-hero");
      gsap.set([imageRef.current, words], { opacity: 1, scale: 1, y: 0 });
      gsap.set(reveals, { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[85vh] md:h-screen min-h-[600px] bg-ink overflow-hidden flex items-end pb-12 md:pb-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          ref={imageRef}
          src={`https://pub-fc30457eaa7a478196bf63dff9cbf7d3.r2.dev/images/prerna-hero-about.jpg`}
          alt="Prerna - Multidisciplinary Visual Artist"
          fill
          priority
          className="object-cover object-center md:object-[center_20%] opacity-80"
        />
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      </div>

      {/* Hero Typography */}
      <div ref={textRef} className="absolute inset-0 z-10 flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-12 pointer-events-none">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 w-full">
          
          {/* Left Anchor: H1 */}
          <div className="flex-1 min-w-0 max-w-5xl">
            <h1 className="font-display text-[clamp(3.25rem,9vw,8rem)] font-[400] leading-[0.9] m-0 p-0 text-ivory tracking-tight">
              <HeroWord text="Translating invisible feelings into" /> <span className="italic font-serif"><HeroWord text="art." /></span>
            </h1>
          </div>

          {/* Right Anchor: Subhead */}
          <div className="flex-none max-w-sm flex flex-col items-start md:items-end text-left md:text-right gap-6">
            <p className="gs-reveal-hero opacity-0 translate-y-4 font-body text-lg md:text-xl leading-relaxed text-ivory/80">
              I don't believe art belongs in just one frame. Whether it is on a canvas, paper, or skin, the purpose is always the same.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Inline word-split for the hero */
function HeroWord({ text }: { text: string }) {
  return (
    <span aria-label={text} className="inline-block">
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: "0.25em" }}
        >
          <span className="word-inner inline-block will-change-transform opacity-0 translate-y-full">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
