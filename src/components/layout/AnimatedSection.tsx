'use client';

import { forwardRef } from 'react';
import Section, { type SectionProps } from './Section';
import { useSectionReveal } from '@/hooks/useSectionReveal';

export const AnimatedSection = forwardRef<HTMLElement, SectionProps>(
  (props, forwardedRef) => {
    // useSectionReveal returns a ref that we attach to the section
    const animRef = useSectionReveal<HTMLElement>();
    
    return (
      <Section
        {...props}
        ref={(node) => {
          // Merge refs
          if (animRef) {
            (animRef as React.MutableRefObject<HTMLElement | null>).current = node;
          }
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
      />
    );
  }
);

AnimatedSection.displayName = 'AnimatedSection';
