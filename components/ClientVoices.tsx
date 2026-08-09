"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { createStaggeredReveal } from "@/lib/animations/factories";

export default function ClientVoices() {
  const containerRef = useRef<HTMLElement>(null);

  const testimonials = [
    {
      name: "Pramayee Bhaware",
      text: "Totally indecisive, yet the experience was still a 10. I could not have asked for a better artist than Prerna for my first tattoo. She excelled at the customization of the design, made slight adjustments, and ensured a pain-free overall experience. Great precision. 10/10 recommended.",
      sourceName: "Google Reviews",
      sourceLink: "https://g.co/kgs/test1"
    },
    {
      name: "Sambhav Chathly",
      text: "I couldn't be happier with the result! Prerna's attention to detail and artistic skill truly shine through in their work. The entire process was comfortable, and they took the time to understand exactly what I wanted. I highly recommend Prerna for anyone looking for a talented and professional tattoo artist.",
      sourceName: "Google Reviews",
      sourceLink: "https://g.co/kgs/test2"
    },
    {
      name: "Amala James",
      text: "This was my first tattoo and I was super nervous thinking about how much it was going to hurt. But Prerna did a great job - it didn't hurt as much as I had assumed. The tattoo came out exactly how I wanted and expected it.",
      sourceName: "Google Reviews",
      sourceLink: "https://g.co/kgs/test3"
    }
  ];

  useGSAP(() => {
    if (!containerRef.current) return;
    const revealElements = containerRef.current.querySelectorAll('.gs-reveal, .gs-reveal-card');
    createStaggeredReveal(revealElements);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative z-10 w-full bg-ivory text-ink py-24 md:py-48 border-b border-ink/20">
      <div className="flex flex-col w-full px-6 md:px-12">
        
        <div className="pb-12 md:pb-24 border-b border-ink/20 opacity-0 gs-reveal">
          <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-ink/50 uppercase mb-6">
            IN THEIR OWN WORDS
          </p>
          <h2 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-[400] leading-none max-w-[900px]">
            Some earlier clients<br className="hidden md:block" /> knew her as Alza.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 w-full">
          {testimonials.map((testimonial, i) => (
            <div 
              key={i} 
              className={`flex flex-col gap-8 py-12 md:py-16 opacity-0 gs-reveal-card border-b md:border-b-0
                ${i < testimonials.length - 1 ? 'md:border-r border-ink/20 md:pr-12' : 'md:pl-12'}
                ${i === 1 ? 'md:px-12' : ''}
              `}
            >
              <p className="font-quote italic text-lg lg:text-xl text-ink leading-relaxed flex-grow">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-ink/50 flex flex-col gap-2">
                <span>— {testimonial.name}</span>
                <a href={testimonial.sourceLink} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors underline decoration-ink/30 underline-offset-4">
                  Via {testimonial.sourceName}
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

