'use client';

import Script from 'next/script';
import { useInView } from 'react-intersection-observer';

interface FilloutEmbedProps {
  formId: string;
  height?: number;
  className?: string;
}

export function FilloutEmbed({ formId, height = 800, className = '' }: FilloutEmbedProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px', // Load just before it comes into view
  });

  return (
    <div ref={ref} className={`w-full ${className}`} style={{ minHeight: `${height}px` }}>
      {inView && (
        <>
          <div 
            style={{ width: '100%', height: `${height}px` }} 
            data-fillout-id={formId} 
            data-fillout-embed-type="standard" 
            data-fillout-inherit-parameters
            data-fillout-dynamic-resize
          />
          <Script
            src="https://server.fillout.com/embed/v1/"
            strategy="lazyOnload"
          />
        </>
      )}
    </div>
  );
}
