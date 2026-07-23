'use client';

import { useRef } from 'react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { createParallaxTimeline } from '@/animations/parallax';
import { useGsapContext } from '@/hooks/useGsapContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function StudioVignetteSection() {
  const ref = useSectionReveal();
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useGsapContext(() => {
    if (reduce || !imageRef.current) return;

    const { kill } = createParallaxTimeline(imageRef.current, { 
      amount: -100, 
      trigger: ref.current || undefined 
    });

    return () => {
      kill();
    };
  }, [reduce]);

  return (
    <Section spacing="section" ref={ref}>
      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-body-sm tracking-wider text-ivory-dim uppercase">
              The space
            </span>
            <h2 className="font-display text-display-sm text-ivory">
              A quiet room, by appointment only.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="aspect-video bg-ink-secondary rounded-sm md:col-span-8 overflow-hidden relative">
              <div ref={imageRef} className="absolute inset-[-100px] bg-ivory-dim" />
            </div>
            <div className="aspect-[3/4] bg-ink-secondary rounded-sm md:col-span-4" />
            <div className="aspect-[21/9] bg-ink-secondary rounded-sm md:col-span-12" />
          </div>
          <p className="text-body-sm text-ivory-dim text-center mt-4">
            Vashi, Navi Mumbai. Designed for calm.
          </p>
        </div>
      </Container>
    </Section>
  );
}
