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
    <div ref={rootRef}>
      <Section spacing="hero" tone="default">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 relative z-10">
            <div className="lg:col-span-5">
              <span ref={eyebrowRef} className="block text-body-sm tracking-wider text-ivory-dim uppercase">
                Meet Prerna — Mumbai, IN
              </span>
            </div>
            <div className="flex flex-col gap-8 lg:col-span-7">
              <h1 ref={headlineRef} className="font-display text-display-xl tracking-tight text-ivory leading-none" data-cursor="lead">
                Ink as language. Studio as a slow room.
              </h1>
              <p ref={subheadRef} className="text-body-lg text-ivory-dim max-w-lg">
                A Navi Mumbai-based creative studio by Prerna — custom tattoos, abstract paintings, and sketches. Each piece is a slow, personal conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" ref={primaryCtaRef as React.Ref<any>}>
                  <Link href="/book">Begin a piece</Link>
                </Button>
                <Button asChild variant="secondary" size="lg" ref={secondaryCtaRef as React.Ref<any>}>
                  <Link href="/tattoos">See the work</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Background Image / Placeholder for parallax effect */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
        <div ref={imageRef} className="absolute inset-0 bg-ink-80">
          <Image
            src="/images/prerna-hero.png"
            alt="Meet Prerna Studio"
            fill
            priority
            className="object-cover opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
