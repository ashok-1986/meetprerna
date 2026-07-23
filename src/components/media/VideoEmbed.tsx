'use client';

import { type HTMLAttributes, useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface VideoEmbedProps extends HTMLAttributes<HTMLDivElement> {
  vimeoId: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  transcript?: string;
}

export function VideoEmbed({ 
  vimeoId, 
  title = 'Video', 
  autoplay = false,
  loop = false,
  muted = false,
  transcript,
  className,
  ...props 
}: VideoEmbedProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loaded) setError(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [loaded]);

  // Construct Vimeo URL parameters
  const params = new URLSearchParams({
    title: '0',
    byline: '0',
    portrait: '0',
    dnt: '1', // Do not track
  });

  if (autoplay) {
    params.set('autoplay', '1');
    params.set('autopause', '0');
  }
  if (loop) params.set('loop', '1');
  if (muted || autoplay) params.set('muted', '1'); // Autoplay requires muted

  if (error) {
    return (
      <div className={cn("aspect-video bg-ink-secondary flex flex-col items-center justify-center p-6 text-center", className)} {...props}>
        <p className="text-ivory-dim font-editorial text-body-lg">Video unavailable</p>
        {transcript && <p className="text-caption text-ivory-dim mt-4 max-w-lg">{transcript}</p>}
      </div>
    );
  }

  return (
    <div 
      className={cn("relative w-full overflow-hidden bg-ink-border aspect-video transition-opacity duration-600", !loaded ? "opacity-0" : "opacity-100", className)}
      {...props}
    >
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?${params.toString()}`}
        title={title}
        className="absolute top-0 left-0 w-full h-full border-0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
