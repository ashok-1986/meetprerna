"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutStory() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Fade in text blocks as they scroll into view
    const textBlocks = gsap.utils.toArray<HTMLElement>('.story-block');
    textBlocks.forEach((block) => {
      gsap.fromTo(block, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-ink text-ivory pt-24 pb-32 overflow-hidden">
      
      {/* Chapter 1 */}
      <div className="w-full flex flex-col md:flex-row gap-12 lg:gap-16 relative min-h-[50vh] px-6 md:px-12 items-center">
        <div className="md:w-1/3 relative">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-ivory/50">01 / The Instinct</span>
            <h2 className="font-display text-3xl md:text-4xl text-ivory">Where It Began</h2>
          </div>
        </div>
        <div className="md:w-2/3 flex flex-col gap-8 font-body text-lg md:text-xl leading-relaxed text-ivory/90">
          <p className="story-block w-full">
            Dance, music, and sketching were never separate disciplines for me—they were the exact same instinct, just expressed in different languages. Growing up where the Ganga and Yamuna meet in Prayagraj, art wasn't laid out as a career path. It was my quiet, necessary rebellion.
          </p>
          <blockquote className="story-block border-l-2 border-ivory/20 pl-8 font-quote text-3xl md:text-4xl italic leading-tight text-ivory w-full">
            &ldquo;They were the exact same instinct, expressed in different languages.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Chapter 2 */}
      <div className="w-full flex flex-col md:flex-row gap-12 lg:gap-16 relative min-h-[50vh] px-6 md:px-12 items-center mt-24 md:mt-32">
        <div className="md:w-1/3 relative">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-ivory/50">02 / The Turn</span>
            <h2 className="font-display text-3xl md:text-4xl text-ivory">The Weight of Permanence</h2>
          </div>
        </div>
        <div className="md:w-2/3 flex flex-col gap-8 font-body text-lg md:text-xl leading-relaxed text-ivory/90">
          <p className="story-block w-full">
            I was genuinely terrified of the needle, of the blood, of a craft that offered absolutely no undo button. But I had learned early on stage that shaking hands before a performance vanish the second the music starts. The fear of permanence wasn't a warning; it was proof that the art mattered. If it scares you, it's exactly what you are meant to do.
          </p>
          <blockquote className="story-block border-l-2 border-ivory/20 pl-8 font-quote text-3xl md:text-4xl italic leading-tight text-ivory w-full">
            &ldquo;The fear wasn't a warning; it was proof that the art mattered.&rdquo;
          </blockquote>
        </div>
      </div>

    </section>
  );
}
