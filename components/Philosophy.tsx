"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      title: "The Quiet Before The Line",
      description: "Mumbai is loud. Silence here is something you have to intentionally build. Whether you are sitting in my chair for a session or we are discussing a commission, the work starts by stripping away the noise. I listen to what is actually being said long before my hands start moving. No pressure, no ticking clock."
    },
    {
      title: "Translating The Unsaid",
      description: "Some things do not have words yet. Grief, a decision, something that finally went right. My practice is translation. I take what you are carrying and build a physical language of shape, texture, and weight to hold it. The medium changes—ink on skin, gouache on paper, a collaborative project—but the intent is exactly the same."
    },
    {
      title: "The Painter’s Hand",
      description: "I painted long before I picked up a machine. The way I think about negative space, or where a line thickens and thins, comes directly from fine art. Because of that foundation, I do not design for the day. I plan for how a canvas will sit in a room ten years from now, exactly as I plan for how ink settles into living skin."
    },
    {
      title: "A Room To Breathe",
      description: "Art is an exchange. You bring a piece of yourself, and I give it a physical place to live. Whatever the format—a private studio session, an exhibition, or a shared creative space—my job is to hold the room. I create a quiet environment where you can finally pause, drop your shoulders, and simply be seen."
    }
  ];

  useGSAP(() => {
    if (!containerRef.current || !listRef.current) return;
    
    // We want each item to fade in fully when in the center of the viewport,
    // and fade out when moving away.
    const items = listRef.current.querySelectorAll('.philosophy-item');
    
    items.forEach((item) => {
      gsap.fromTo(item, 
        { opacity: 0.15 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 65%",
            end: "top 35%",
            scrub: true,
          }
        }
      );
      
      // Fade back out as it goes up
      gsap.to(item, {
        opacity: 0.15,
        scrollTrigger: {
          trigger: item,
          start: "top 35%",
          end: "top 5%",
          scrub: true,
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-ivory text-ink py-24 md:py-48 px-6 md:px-12 gs-reveal-container">
      
      {/* Top Label */}
      <div className="w-full mb-24 md:mb-32">
        <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-ink/50 uppercase">
          THE PRACTICE
        </span>
      </div>

      {/* List Container */}
      <div ref={listRef} className="flex flex-col w-full border-t border-ink/20">
        {pillars.map((pillar, index) => (
          <div 
            key={index} 
            className="philosophy-item group flex flex-col md:flex-row w-full items-start justify-between gap-6 md:gap-12 border-b border-ink/20 py-12 md:py-20 transition-colors duration-500 hover:bg-ink/[0.02]"
          >
            {/* Left: Large Serif Title */}
            <div className="w-full md:w-1/2 shrink-0">
              <h3 className="font-display text-4xl md:text-6xl lg:text-7xl text-ink font-light tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-4">
                {pillar.title}
              </h3>
            </div>
            
            {/* Right: Small Description */}
            <div className="w-full md:w-1/3 lg:w-1/4 md:mt-4">
              <p className="font-body text-sm md:text-base text-ink/70 leading-relaxed text-left max-w-[45ch]">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
