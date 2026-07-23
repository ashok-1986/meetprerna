'use client';

import Script from 'next/script';

interface FilloutEmbedProps {
  formId: string;
  height?: number;
  className?: string;
}

export function FilloutEmbed({ formId, height = 800, className = '' }: FilloutEmbedProps) {
  return (
    <div className={`w-full ${className}`}>
      <div 
        style={{ width: '100%', height: `${height}px` }} 
        data-fillout-id={formId} 
        data-fillout-embed-type="standard" 
        data-fillout-inherit-parameters
      />
      <Script
        src="https://server.fillout.com/embed/v1/"
        strategy="lazyOnload"
      />
    </div>
  );
}
