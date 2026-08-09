"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

interface MagneticInkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function MagneticInkButton({ href, children, className = "" }: MagneticInkButtonProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const fillerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !fillerRef.current) return;

    // Magnetic pull setup
    const xTo = gsap.quickTo(containerRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(containerRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    
    const textXTo = gsap.quickTo(textRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const textYTo = gsap.quickTo(textRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = containerRef.current!.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // Magnetic pull (stronger on container, subtle on text)
      xTo(x * 0.3);
      yTo(y * 0.3);
      textXTo(x * 0.1);
      textYTo(y * 0.1);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top } = containerRef.current!.getBoundingClientRect();
      
      // Calculate where the cursor entered relative to the button
      const relX = clientX - left;
      const relY = clientY - top;

      // Position the ink drop exactly at the entry point and expand
      gsap.set(fillerRef.current, { left: relX, top: relY });
      gsap.to(fillerRef.current, {
        width: "300%",
        paddingTop: "300%",
        duration: 0.6,
        ease: "power2.out",
      });

      // Change text color to dark
      gsap.to(textRef.current, { color: "#1A1A1A", duration: 0.3 });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top } = containerRef.current!.getBoundingClientRect();
      
      const relX = clientX - left;
      const relY = clientY - top;

      // Shrink ink drop back to the exit point
      gsap.to(fillerRef.current, {
        width: "0%",
        paddingTop: "0%",
        left: relX,
        top: relY,
        duration: 0.5,
        ease: "power2.out",
      });

      // Reset magnetic pull
      xTo(0);
      yTo(0);
      textXTo(0);
      textYTo(0);

      // Restore text color
      gsap.to(textRef.current, { color: "#FCF9F2", duration: 0.3 });
    };

    const el = containerRef.current;
    
    // Only attach magnetic behavior if users haven't requested reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (mq.matches) {
      el.addEventListener("mousemove", handleMouseMove);
    }
    
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Link 
      href={href}
      ref={containerRef}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-ink px-12 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inchworm focus-visible:outline-offset-4 ${className}`}
    >
      <div 
        ref={fillerRef}
        className="absolute bg-inchworm rounded-full w-0 pt-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
      />
      <span 
        ref={textRef} 
        className="relative z-10 font-mono uppercase text-sm tracking-[0.15em] text-ivory pointer-events-none"
      >
        {children}
      </span>
    </Link>
  );
}
