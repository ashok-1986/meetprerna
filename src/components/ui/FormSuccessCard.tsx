'use client';

import React, { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ease, dur } from '@/animations/easing';
import { useGsapContext } from '@/hooks/useGsapContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface FormSuccessCardProps {
  title?: string;
  message?: string;
  calendarLink?: string;
}

export const FormSuccessCard: React.FC<FormSuccessCardProps> = ({
  title = 'Success!',
  message = 'Your message has been sent.',
  calendarLink
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(() => {
    const tl = gsap.timeline();
    if (prefersReducedMotion) {
      tl.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: dur.d420, ease: ease.editorial }
      );
    } else {
      tl.fromTo(containerRef.current,
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: dur.d420, ease: ease.editorial, clearProps: 'scale' }
      );
    }
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="p-8 rounded-xl border border-white/10 flex flex-col items-center text-center opacity-0 bg-surface">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-inchworm/20 text-inchworm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h3 className="text-2xl font-display mb-3">{title}</h3>
      <p className="text-gray-400 mb-6">{message}</p>
      
      {calendarLink && (
        <a 
          href={calendarLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-inchworm transition-colors"
        >
          Book a Meeting
        </a>
      )}
    </div>
  );
};

FormSuccessCard.displayName = 'FormSuccessCard';
