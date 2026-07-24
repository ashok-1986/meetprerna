'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { useGsapContext } from '@/hooks/useGsapContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { buildHeroTimeline } from '@/animations/timelines/hero.timeline';

export function HeroSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const primaryCtaRef = useRef<HTMLAnchorElement>(null);
  const secondaryCtaRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useGsapContext(() => {
    if (!rootRef.current || !headlineRef.current || !subheadRef.current || !primaryCtaRef.current || !imageRef.current) return;

    const { timeline, kill } = buildHeroTimeline({
      root: rootRef.current,
      eyebrow: eyebrowRef.current,
      headline: headlineRef.current,
      subhead: subheadRef.current,
      primaryCta: primaryCtaRef.current,
      secondaryCta: secondaryCtaRef.current,
      image: imageRef.current,
      reduceMotion,
    });
    
    timeline.play();

    return () => {
      kill();
    };
  }, [reduceMotion]);

  return (
    <div ref={rootRef} className="relative min-h-[100dvh] flex flex-col justify-center">
      <Section spacing="hero" tone="default" className="flex-1 flex flex-col justify-center pb-24">
        <Container>
          <div className="flex flex-col gap-6 max-w-4xl relative z-10">
            <span ref={eyebrowRef} className="block text-[10px] tracking-widest text-ivory-dim uppercase">
              NAVI MUMBAI · MUMBAI · ARTIST & CREATOR · ITINERANT
            </span>
            
            <h1 ref={headlineRef} className="font-display text-display-lg tracking-tight text-ivory leading-[0.95]" data-cursor="lead">
              <span className="block">She carries no studio.</span>
              <span className="block">Only a needle</span>
              <span className="block text-inchworm italic">and everything she knows.</span>
            </h1>
            
            <p ref={subheadRef} className="text-[11px] tracking-widest text-ivory-dim uppercase mt-4">
              EVERY CITY. EVERY SKIN. EVERY STORY — PERMANENT.
            </p>
            
            <div className="flex pt-4">
              <Button 
                asChild 
                className="bg-inchworm text-ink hover:bg-inchworm-deep rounded-full px-8 uppercase text-[10px] tracking-widest font-semibold h-10"
              >
                <Link href="/book" ref={primaryCtaRef}>Ask your consultant</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      
      {/* Background Image & Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src="/images/prerna-hero.png"
            alt="Meet Prerna Studio"
            fill
            priority
            className="object-cover"
          />
          {/* Dark gradient overlay to make text pop */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/60 to-transparent" />
          <div className="absolute inset-0 bg-ink/20" />
        </div>
      </div>
    </div>
  );
}
