'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { VideoEmbed } from './VideoEmbed';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { urlFor } from '@/lib/sanity/image';

interface LazyVideoProps {
  vimeoId: string;
  title?: string;
  poster?: any; // Sanity Image object
  className?: string;
  aspectRatio?: 'video' | 'square' | 'portrait';
  priority?: boolean;
}

export function LazyVideo({ 
  vimeoId, 
  title, 
  poster,
  className,
  aspectRatio = 'video',
  priority = false
}: LazyVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
  };

  // Construct Vimeo thumbnail URL if no Sanity poster is provided
  // Note: For HD Vimeo videos, it's generally better to provide a custom poster
  // via Sanity or fetch the thumbnail via Vimeo API. 
  // We'll use the Sanity poster if provided.
  const posterUrl = poster?.asset ? urlFor(poster).width(1200).url() : null;

  return (
    <div 
      ref={ref}
      role="button"
      tabIndex={0}
      className={cn(
        "relative w-full overflow-hidden bg-ink-20 group cursor-pointer", 
        aspectClasses[aspectRatio],
        className
      )}
      onClick={!isPlaying ? handlePlayClick : undefined}
      onKeyDown={(e) => {
        if (!isPlaying && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handlePlayClick();
        }
      }}
    >
      {/* Poster Image */}
      {!isPlaying && (
        <div className="absolute inset-0 w-full h-full z-10 transition-opacity duration-500">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={title || 'Video poster'}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-ink-10 text-ivory-dim">
              No poster provided
            </div>
          )}
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-ink-30/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-inchworm flex items-center justify-center text-ink shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      )}

      {/* Video Embed */}
      {(inView && isPlaying) && (
        <VideoEmbed 
          vimeoId={vimeoId} 
          title={title}
          autoplay={true} 
          className="absolute inset-0 z-0 h-full w-full"
        />
      )}
    </div>
  );
}
