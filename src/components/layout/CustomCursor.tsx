'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Custom Cursor Component
 * Dual-element cursor with dot and ring that follows mouse with GSAP animation
 * Hides on touch devices, expands on hover over interactive elements
 */
export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is touch-based (mobile)
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsMobile(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isMobile || !cursorDotRef.current || !cursorRingRef.current) return;

    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Dot follows instantly
      gsap.to(cursorDot, {
        x: clientX - 4,
        y: clientY - 4,
        duration: 0.08,
        ease: 'power2.out',
      });

      // Ring follows with lag
      gsap.to(cursorRing, {
        x: clientX - 20,
        y: clientY - 20,
        duration: 0.12,
        ease: 'power2.out',
      });
    };

    // Track hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="hover"]')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    // Track click
    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-green z-[10000] pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%)',
          transition: isClicking
            ? 'width 0.1s, height 0.1s, background-color 0.1s'
            : isHovering
              ? 'width 0.2s, height 0.2s, background-color 0.2s'
              : 'none',
          width: isClicking ? '5px' : isHovering ? '12px' : '8px',
          height: isClicking ? '5px' : isHovering ? '12px' : '8px',
          backgroundColor: isHovering ? 'var(--color-yellow)' : 'var(--color-green)',
        }}
      />

      {/* Cursor Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 rounded-full border z-[10000] pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%)',
          transition: isClicking
            ? 'width 0.1s, height 0.1s, border-width 0.1s'
            : isHovering
              ? 'width 0.3s, height 0.3s, border-width 0.3s'
              : 'none',
          width: isClicking ? '28px' : isHovering ? '60px' : '40px',
          height: isClicking ? '28px' : isHovering ? '60px' : '40px',
          borderWidth: '1px',
          borderColor: 'rgba(196, 255, 97, 0.4)',
        }}
      />
    </>
  );
}
