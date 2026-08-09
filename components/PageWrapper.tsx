"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createStaggeredReveal, createDoubleExposureTransition } from "@/lib/animations/factories";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Simulate double exposure entry on the whole page wrapper
    gsap.fromTo(containerRef.current, 
      { opacity: 0, filter: "contrast(1.2) brightness(0.8)" },
      { opacity: 1, filter: "contrast(1) brightness(1)", duration: 0.8, ease: "power2.out" }
    );
    
    // Select all section elements (except Hero and Preloader which handle their own entry)
    const sections = containerRef.current.querySelectorAll('section:not(:first-child):not(.gs-hinge-section)');
    if (sections.length > 0) {
      createStaggeredReveal(sections);
    }
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative w-full overflow-hidden will-change-[opacity,filter]">
      {children}
    </main>
  );
}
