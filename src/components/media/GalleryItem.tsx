'use client';

import { useRef } from 'react';
import { type PortfolioItem } from '@/types/content';
import RevealImage from './RevealImage';
import { urlFor } from '@/lib/sanity/image';
import { cn } from '@/utils/cn';
import { useGsapContext } from '@/hooks/useGsapContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { gsap } from '@/lib/gsap';
import { ease, dur } from '@/animations/easing';

interface GalleryItemProps {
  item: PortfolioItem;
  index: number;
  variant: 'tattoo' | 'painting' | 'sketch';
  onClick?: () => void;
  className?: string;
}

export default function GalleryItem({ item, index, onClick, className }: GalleryItemProps) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGsapContext(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const el = containerRef.current;
    
    // Set initial state for reveal
    gsap.set(el, { clipPath: 'inset(0 100% 0 0)' });

    // Reveal animation
    const delay = Math.min(index, 5) * 0.06;
    
    gsap.to(el, {
      clipPath: 'inset(0 0% 0 0)',
      duration: dur.d620 || 0.62,
      ease: ease.editorial,
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      clearProps: 'clipPath'
    });

    // Parallax
    const mm = gsap.matchMedia();
    mm.add('(max-width: 768px)', () => {
      gsap.to(el, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    mm.add('(min-width: 769px)', () => {
      gsap.to(el, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => {
      mm.revert();
    };
  }, [index, prefersReducedMotion]);

  const handleMouseEnter = () => {
    if (prefersReducedMotion || !containerRef.current || !titleRef.current) return;
    gsap.to(containerRef.current, { scale: 1.02, duration: dur.d260 || 0.26, ease: ease.studio, overwrite: 'auto' });
    gsap.to(titleRef.current, { y: -2, duration: dur.d180 || 0.18, ease: ease.soft, overwrite: 'auto' });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion || !containerRef.current || !titleRef.current) return;
    gsap.to(containerRef.current, { scale: 1, duration: dur.d260 || 0.26, ease: ease.studio, overwrite: 'auto' });
    gsap.to(titleRef.current, { y: 0, duration: dur.d180 || 0.18, ease: ease.soft, overwrite: 'auto' });
  };

  const heroImage = item.images?.find((img) => img.isHero) || item.images?.[0];
  const imgSrc = heroImage ? urlFor(heroImage).width(800).auto('format').url() : undefined;

  return (
    <button
      ref={containerRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('group flex flex-col gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inchworm focus-visible:ring-offset-4 focus-visible:ring-offset-ink', className)}
      data-cursor="open"
      aria-label={`View ${item.title}`}
    >
      <RevealImage
        src={imgSrc}
        alt={heroImage?.alt || item.title}
        aspect="4/5"
        containerClassName="transition-opacity duration-260 group-hover:opacity-90"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full justify-between items-baseline gap-4">
          <h3 ref={titleRef} className="font-display text-body-lg text-ivory line-clamp-1">{item.title}</h3>
          <span className="text-body-sm text-ivory-dim shrink-0">{item.year}</span>
        </div>
        {(item.styles && item.styles.length > 0) && (
          <p className="text-body-xs tracking-wider text-ivory-dim uppercase line-clamp-1">
            {item.styles.join(', ')}
          </p>
        )}
      </div>
    </button>
  );
}
