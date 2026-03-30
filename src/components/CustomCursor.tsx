"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const ringPosition = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      
      // Immediately update dot position
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.hasAttribute('data-cursor-hover')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Animation loop for ring
    const animateRing = () => {
      if (cursorRingRef.current) {
        ringPosition.current.x += (mousePosition.current.x - ringPosition.current.x) * 0.1;
        ringPosition.current.y += (mousePosition.current.y - ringPosition.current.y) * 0.1;
        
        cursorRingRef.current.style.transform = `translate(${ringPosition.current.x - 16}px, ${ringPosition.current.y - 16}px) ${isHovering ? 'scale(2)' : ''}`;
        cursorRingRef.current.style.backgroundColor = isHovering ? 'rgba(196, 255, 97, 0.15)' : '';
        cursorRingRef.current.style.borderColor = isHovering ? '#C4FF61' : '#C4FF61';
      }
      
      requestRef.current = requestAnimationFrame(animateRing);
    };

    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHovering]);

  // Hide cursor on mobile devices
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice && cursorDotRef.current && cursorRingRef.current) {
      cursorDotRef.current.style.display = 'none';
      cursorRingRef.current.style.display = 'none';
    }
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="cursor-dot fixed top-0 left-0 w-2 h-2 bg-[#C4FF61] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorRingRef}
        className="cursor-ring fixed top-0 left-0 w-8 h-8 border border-[#C4FF61] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}