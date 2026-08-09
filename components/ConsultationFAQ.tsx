"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createStaggeredReveal } from "@/lib/animations/factories";

const faqs = [
  {
    q: "What is your minimum rate?",
    a: "My minimum for any session is a standard base rate. Final pricing depends on the size, placement, and detail of the piece. We will agree on the estimate before you pay a deposit."
  },
  {
    q: "Do you show the design before the appointment?",
    a: "No, all designs are revealed on the day of the appointment. We will have dedicated time to discuss and make minor adjustments together in the studio before we begin."
  },
  {
    q: "Do you do cover-ups or rework other artists' tattoos?",
    a: "I take on cover-ups on a case-by-case basis. Please include clear photos of the existing tattoo in natural light when submitting your inquiry so I can assess if my style is a good fit."
  },
  {
    q: "How should I prepare for my appointment?",
    a: "Get a good night's sleep, eat a solid meal beforehand, stay hydrated, and wear comfortable clothing that allows easy access to the area being tattooed."
  }
];

export default function ConsultationFAQ() {
  const containerRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const revealElements = containerRef.current.querySelectorAll('.gs-reveal');
    createStaggeredReveal(revealElements);
  }, { scope: containerRef });

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={containerRef} className="w-full bg-ink text-ivory py-24 md:py-32 px-6 md:px-12 border-t border-ivory/20">
      <div className="max-w-4xl mx-auto flex flex-col">
        <h2 className="gs-reveal opacity-0 font-display text-4xl md:text-6xl mb-16">Frequently Asked Questions</h2>
        
        <div className="flex flex-col border-t border-ivory/20">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="gs-reveal opacity-0 border-b border-ivory/20">
                <button 
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center py-6 md:py-8 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-inchworm focus-visible:outline-offset-4 rounded group"
                  aria-expanded={isOpen}
                >
                  <span className={`font-display text-2xl md:text-3xl transition-colors duration-300 ${isOpen ? 'text-inchworm' : 'group-hover:text-inchworm'}`}>
                    {faq.q}
                  </span>
                  <span className={`ml-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45 text-inchworm' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 4V20M4 12H20" />
                    </svg>
                  </span>
                </button>
                <div 
                  className="grid transition-[grid-template-rows] duration-500 ease-in-out" 
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="font-body text-lg text-ivory/80 pb-8 leading-relaxed max-w-3xl">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
