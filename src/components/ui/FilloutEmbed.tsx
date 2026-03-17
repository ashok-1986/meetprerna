'use client';

import { useEffect, useRef } from 'react';
import { FILLOUT_URL } from '@/lib/constants';

interface FilloutEmbedProps {
  url?: string;
  height?: number;
  className?: string;
}

/**
 * Fillout Embed Component
 * Embeds Fillout.com form via iframe
 */
export function FilloutEmbed({
  url = FILLOUT_URL,
  height = 700,
  className = '',
}: FilloutEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Handle iframe messaging for dynamic height adjustment
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://meetprerna.fillout.com') return;

      if (event.data?.type === 'fillout-height' && iframeRef.current) {
        iframeRef.current.style.height = `${event.data.height}px`;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <iframe
        ref={iframeRef}
        src={url}
        width="100%"
        height={height}
        style={{ border: 'none' }}
        title="Booking Form"
        allow="clipboard-write"
        loading="lazy"
      />
    </div>
  );
}
