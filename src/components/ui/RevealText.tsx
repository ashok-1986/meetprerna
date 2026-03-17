'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * Reveal Text Component
 * Animates text by splitting into lines/words and revealing with GSAP
 */
export function RevealText({
  text,
  className = '',
  delay = 0,
  stagger = 0.1,
  once = true,
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once, margin: '-100px' });

  useEffect(() => {
    if (!isInView || !containerRef.current) return;

    const lines = containerRef.current.querySelectorAll('.reveal-line');
    
    gsap.fromTo(
      lines,
      { y: '105%' },
      {
        y: '0%',
        duration: 1.2,
        stagger: stagger,
        ease: 'expo.out',
        delay: delay,
      }
    );
  }, [isInView, delay, stagger]);

  // Split text into lines (by line break) or words
  const lines = text.split('\n');

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.span
            className="reveal-line inline-block"
            style={{ y: '105%' }}
          >
            {line}
          </motion.span>
          {index < lines.length - 1 && <br />}
        </div>
      ))}
    </div>
  );
}
