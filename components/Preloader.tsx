"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Check if we've already seen the preloader this session or if reduced motion is on
    const hasSeenPreloader = sessionStorage.getItem('prerna_preloader_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (hasSeenPreloader === 'true' || prefersReducedMotion) {
      setIsComplete(true);
      return;
    }

    if (!containerRef.current) return;

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        sessionStorage.setItem('prerna_preloader_seen', 'true');
        setIsComplete(true);
      }
    });

    // 1. Brief pause to show the solid mask (loading state)
    tl.to({}, { duration: 0.5 });
    
    // 2. Shrink the circular clip-path to 0% to reveal the site behind the overlay
    tl.fromTo(containerRef.current, 
      { clipPath: "circle(150% at 50% 50%)" },
      { 
        clipPath: "circle(0% at 50% 50%)", 
        duration: 1.2, 
        ease: "power3.inOut" 
      }
    );

    return () => {
      document.body.style.overflow = '';
      tl.kill();
    };
  }, []);

  if (isComplete) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-ink"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Optional Logo or spinner inside the preloader */}
      </div>
    </div>
  );
}
