import { type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface VideoEmbedProps extends HTMLAttributes<HTMLDivElement> {
  vimeoId: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export function VideoEmbed({ 
  vimeoId, 
  title = 'Video', 
  autoplay = false,
  loop = false,
  muted = false,
  className,
  ...props 
}: VideoEmbedProps) {
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

  return (
    <div 
      className={cn("relative w-full overflow-hidden bg-ink-20 aspect-video", className)}
      {...props}
    >
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?${params.toString()}`}
        title={title}
        className="absolute top-0 left-0 w-full h-full border-0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
