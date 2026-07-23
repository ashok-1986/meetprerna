'use client';

import { useRef } from 'react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Image from 'next/image';

import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { createParallaxTimeline } from '@/animations/parallax';
import { ease, dur } from '@/animations/easing';

export default function AboutPage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Hero refs
  const portraitContainerRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);

  // Origin & Practice parallax refs
  const originImgRef = useRef<HTMLDivElement>(null);
  const practiceImgRef = useRef<HTMLDivElement>(null);

  // Timeline refs
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const timelineYearsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Section reveals
  const originRevealRef = useSectionReveal<HTMLElement>();
  const practiceRevealRef = useSectionReveal<HTMLElement>();
  const featuredRevealRef = useSectionReveal<HTMLElement>();

  useGsapContext(() => {
    if (prefersReducedMotion) return;
    if (!portraitContainerRef.current || !originImgRef.current || !practiceImgRef.current) return;

    // 1. Hero Animations
    const heroTl = gsap.timeline();
    
    gsap.set(portraitContainerRef.current, { clipPath: 'inset(0 100% 0 0)' });
    gsap.set(portraitImgRef.current, { scale: 1.05 });
    gsap.set([headlineRef.current, leadRef.current], { opacity: 0, y: 20 });

    heroTl.to(portraitContainerRef.current, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.9,
      ease: ease.editorial,
    }, 0)
    .to(portraitImgRef.current, {
      scale: 1.0,
      duration: 0.9,
      ease: ease.editorial,
      clearProps: 'scale',
    }, 0)
    .to([headlineRef.current, leadRef.current], {
      y: 0,
      opacity: 1,
      duration: dur.d620,
      ease: ease.soft,
      stagger: 0.15,
      clearProps: 'all',
    }, 0.2);

    // Hero parallax
    const heroParallax = createParallaxTimeline(portraitContainerRef.current, {
      amount: -60,
      scrub: true,
    });

    // 2. Origin & Practice Parallax
    const originParallax = createParallaxTimeline(originImgRef.current, { amount: -60, scrub: true });
    const practiceParallax = createParallaxTimeline(practiceImgRef.current, { amount: -60, scrub: true });

    // 3. Timeline
    gsap.set(timelineLineRef.current, { scaleY: 0, transformOrigin: 'top center' });
    gsap.set(timelineYearsRef.current, { opacity: 0, y: 15 });

    // Scrubbed line
    gsap.to(timelineLineRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: timelineSectionRef.current,
        start: 'top 60%',
        end: 'bottom 60%',
        scrub: true,
      }
    });

    // Staggered fade in
    gsap.to(timelineYearsRef.current, {
      opacity: 1,
      y: 0,
      duration: dur.d420,
      ease: ease.soft,
      stagger: 0.08,
      clearProps: 'all',
      scrollTrigger: {
        trigger: timelineSectionRef.current,
        start: 'top 60%',
      }
    });

    return () => {
      heroTl.kill();
      heroParallax?.kill();
      originParallax?.kill();
      practiceParallax?.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <Section spacing="hero">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-8">
              <h1 ref={headlineRef} className="font-display text-display-md text-ivory">
                Prerna.
              </h1>
              <p ref={leadRef} className="text-body-lg text-ivory-dim">
                Visual artist and tattooer based in Navi Mumbai. The practice bridges the permanence of ink on skin with the fluidity of abstract painting.
              </p>
            </div>
            <div 
              ref={portraitContainerRef}
              className="aspect-[4/5] rounded-sm relative overflow-hidden flex items-center justify-center bg-transparent"
              style={prefersReducedMotion ? { clipPath: 'inset(0 0% 0 0)' } : undefined}
            >
              <div 
                ref={portraitImgRef} 
                className="absolute inset-[-60px] bg-ink-70 flex items-center justify-center"
              >
                <Image
                  src="/images/Prerna-side-hero.png"
                  alt="Portrait of Prerna"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="section" ref={originRevealRef}>
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1 aspect-square rounded-sm relative overflow-hidden flex items-center justify-center bg-transparent">
              <div ref={originImgRef} className="absolute inset-[-60px] bg-ink-70 flex items-center justify-center">
                <span className="absolute z-10 text-body-xs uppercase tracking-wider text-ivory-dim">Origin Image Placeholder</span>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex flex-col gap-6 lg:pl-12">
              <h2 className="font-display text-h2 text-ivory">Origin.</h2>
              <p className="text-body text-ivory-dim">
                The journey began in traditional illustration before shifting to the skin. This transition required unlearning the rigid boundaries of paper and adapting to the breathing, shifting canvas of the human body.
              </p>
              <p className="text-body text-ivory-dim">
                Drawing heavily from the natural world and geometry, the work seeks to balance organic flow with structural integrity.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="section" ref={practiceRevealRef}>
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-6 lg:pr-12">
              <h2 className="font-display text-h2 text-ivory">Practice.</h2>
              <p className="text-body text-ivory-dim">
                Today, the studio practice is split between custom tattooing and abstract painting. Both disciplines inform each other. The patience required for a large-scale tattoo translates into the deliberate layers of a canvas.
              </p>
              <p className="text-body text-ivory-dim">
                The goal is always to create work that feels inherent to the space it occupies, whether a wall or a limb.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-sm relative overflow-hidden flex items-center justify-center bg-transparent">
              <div ref={practiceImgRef} className="absolute inset-[-60px] bg-ink-70 flex items-center justify-center">
                <span className="absolute z-10 text-body-xs uppercase tracking-wider text-ivory-dim">Practice Image Placeholder</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="section">
        <Container>
          <div className="flex flex-col gap-16 max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="font-display text-h2 text-ivory">Timeline.</h2>
            </div>
            
            <div className="flex flex-col border-l border-ink-20 ml-4 md:ml-0 md:pl-8 relative" ref={timelineSectionRef}>
              <div 
                ref={timelineLineRef}
                className="absolute left-[ -1px ] md:left-[-1px] top-0 bottom-0 w-[1.5px] bg-marigold origin-top"
                style={prefersReducedMotion ? { transform: 'scaleY(1)' } : undefined}
              />
              {[
                { year: 2024, event: 'Opened private studio space in Vashi.' },
                { year: 2022, event: 'First solo painting exhibition, "Silence".' },
                { year: 2019, event: 'Began full-time tattoo practice.' },
                { year: 2017, event: 'Apprenticeship completed.' },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="relative pl-8 pb-12 last:pb-0"
                  ref={(el) => { timelineYearsRef.current[i] = el; }}
                  style={prefersReducedMotion ? { opacity: 1, transform: 'none' } : undefined}
                >
                  <div className="absolute left-[-5px] top-1.5 h-2 w-2 rounded-full bg-inchworm z-10" />
                  <div className="flex flex-col gap-2">
                    <span className="text-body-sm font-bold text-ivory">{item.year}</span>
                    <p className="text-body text-ivory-dim">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="section" ref={featuredRevealRef}>
        <Container>
          <div className="flex flex-col gap-12">
            <h2 className="font-display text-h4 text-ivory text-center">Featured In</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
               {[1,2,3,4].map(i => (
                 <div key={i} className="h-12 bg-ink-70 rounded-sm flex items-center justify-center">
                   <span className="text-body-xs text-ink-20">LOGO {i}</span>
                 </div>
               ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="section" className="pb-32">
        <Container>
           <div className="text-center">
             <p className="font-serif italic text-display-sm text-ivory max-w-2xl mx-auto">
               &quot;The body is not a blank slate, it is a landscape. The ink just highlights the topography.&quot;
             </p>
           </div>
        </Container>
      </Section>
    </>
  );
}
