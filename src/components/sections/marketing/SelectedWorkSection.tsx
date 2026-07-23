'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { useGsapContext } from '@/hooks/useGsapContext';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function WorkItem({ i }: { i: number }) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useGsapContext(() => {
    if (reduce || !containerRef.current || !imageRef.current) return;

    const tl = gsap.timeline({ paused: true });
    
    // Initial state
    gsap.set(imageRef.current, { filter: 'grayscale(100%)', scale: 1 });
    
    tl.to(imageRef.current, {
      filter: 'grayscale(0%)',
      scale: 1.05,
      duration: 0.42,
      ease: 'power2.out',
    });

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    const el = containerRef.current;
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      tl.kill();
    };
  }, [reduce]);

  return (
    <Link href={`/tattoos/project-${i}`} ref={containerRef} className="group flex flex-col gap-4 overflow-hidden block" data-cursor="open">
      <div className="aspect-[4/5] w-full bg-ink-secondary rounded-sm overflow-hidden">
        <div ref={imageRef} className="w-full h-full bg-ivory-dim transition-none" style={{ willChange: 'transform, filter' }} />
      </div>
      <div className="flex justify-between text-body-sm">
        <span className="text-ivory group-hover:text-inchworm transition-colors duration-260">Project Title {i}</span>
        <span className="text-ivory-dim">2024</span>
      </div>
    </Link>
  );
}

export function SelectedWorkSection() {
  const ref = useSectionReveal();

  return (
    <Section spacing="section" ref={ref}>
      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-body-sm tracking-wider text-ivory-dim uppercase">
                Selected work
              </span>
              <h2 className="font-display text-display-sm text-ivory">
                Recent pieces.
              </h2>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/tattoos">View archive</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <WorkItem key={i} i={i} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
