"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { createSectionTransition, createDoubleExposureTransition } from "@/lib/animations/factories";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Select all section elements (except Hero and Preloader which handle their own entry)
    const sections = containerRef.current.querySelectorAll('section:not(:first-child):not(.gs-hinge-section)');
    if (sections.length > 0) {
      createSectionTransition(sections);
    }
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative w-full overflow-hidden">
      {children}
    </main>
  );
}
