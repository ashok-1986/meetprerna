"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { createFadeUpReveal } from "@/lib/animations/factories";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    num: "01",
    title: "The Intake",
    desc: (
      <>
        You fill out the consultation form{" "}
        <a href="#inquiry-form" className="text-inchworm hover:underline font-medium">
          here
        </a>
        . Tell me about your idea, your placement, and your timeline.
      </>
    )
  },
  {
    num: "02",
    title: "The Conversation",
    desc: "I review your brief, and we move to WhatsApp. This is where we discuss the details, answer your questions, and build the vision together."
  },
  {
    num: "03",
    title: "The Design",
    desc: "Once we agree on the direction, I draft the custom design. We refine it until it is exactly right for you."
  },
  {
    num: "04",
    title: "The Session",
    desc: "We meet in person. The studio is quiet, the kit is single-use, and we take the time to get it right. Never in a rush."
  },
  {
    num: "05",
    title: "The Aftercare",
    desc: "You leave with clear healing instructions. I check in with you as it heals, and once it is settled, I ask for your honest feedback."
  }
];

export default function ConsultationProcess() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const mm = gsap.matchMedia();
    const stepsElements = containerRef.current.querySelectorAll('.step-container');
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Progress line fill animation
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top center",
              end: "bottom center",
              scrub: true,
            }
          }
        );
      }

      // 2. Light up numbers and fade in text as the line reaches them
      stepsElements.forEach((el) => {
        const number = el.querySelector('.step-number');
        const textContainer = el.querySelector('.step-text');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top center",
            end: "bottom center",
            scrub: true, // we can scrub or just toggle. A scrubbed fade-in feels nice.
          }
        });

        // The number turns inchworm
        tl.fromTo(number, 
          { color: "rgb(31, 31, 31, 0.1)" }, // ink color at 10% opacity
          { color: "#D1FF4D", ease: "power2.out", duration: 0.2 } // inchworm color
        );

        // The text fades in
        tl.fromTo(textContainer,
          { opacity: 0.2, y: 50 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 },
          "<" // start at same time as number color change
        );
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (lineRef.current) gsap.set(lineRef.current, { scaleY: 1 });
      stepsElements.forEach((el) => {
        const number = el.querySelector('.step-number');
        const textContainer = el.querySelector('.step-text');
        gsap.set(number, { color: "#D1FF4D" });
        gsap.set(textContainer, { opacity: 1, y: 0 });
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-ivory text-ink py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative flex flex-col gap-16 md:gap-32 py-16">
        
        {/* The Track Line */}
        <div className="absolute top-0 bottom-0 left-8 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-ink/10 z-0">
          {/* The Fill Line */}
          <div ref={lineRef} className="w-full h-full bg-inchworm origin-top" style={{ transform: "scaleY(0)" }}></div>
        </div>

        {steps.map((step, index) => (
          <div 
            key={index}
            className={`step-container relative z-10 flex flex-col md:flex-row gap-6 md:gap-16 items-start pl-16 md:pl-0 ${
              index % 2 !== 0 ? 'md:flex-row-reverse md:text-right' : ''
            }`}
          >
            {/* Number */}
            <div className={`md:w-1/2 flex flex-col justify-center ${index % 2 !== 0 ? 'md:items-start' : 'md:items-end'}`}>
              <span className="step-number font-display text-7xl md:text-[10rem] drop-shadow-sm font-semibold transition-colors duration-300 leading-none" style={{ color: "rgb(31, 31, 31, 0.1)" }}>
                {step.num}
              </span>
            </div>
            
            {/* Text */}
            <div className={`step-text md:w-1/2 flex flex-col gap-4 pt-4 md:pt-12 ${index % 2 !== 0 ? 'md:items-end' : 'md:items-start'}`}>
              <h3 className="font-display text-3xl md:text-4xl">{step.title}</h3>
              <p className={`font-body text-lg md:text-xl text-ink/80 leading-relaxed max-w-md ${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
