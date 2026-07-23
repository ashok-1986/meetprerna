'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { ease, dur } from '@/animations/easing';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

import { LazyVideo } from '@/components/media/LazyVideo';

interface ProcessVideo {
  _id: string;
  title: string;
  vimeoId: string;
  step: number;
  poster?: any;
}

interface ProcessClientProps {
  videos: ProcessVideo[];
}

export default function ProcessClient({ videos }: ProcessClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const heroRef = useSectionReveal<HTMLElement>();
  const ctaRef = useSectionReveal<HTMLElement>();

  const steps = [
    {
      num: '01',
      title: 'The Brief',
      body: 'Every piece begins with a written brief. This is where you outline your idea, the mood, placement, and any references. We review every submission carefully to ensure our styles align before moving forward.',
    },
    {
      num: '02',
      title: 'Consultation',
      body: 'If the project is a fit, we schedule an in-person or video consultation. We discuss scale, flow, and intent. No drawing happens yet—this is about understanding the core of what we are creating.',
    },
    {
      num: '03',
      title: 'Design & Review',
      body: 'The design is drafted. Depending on the complexity, you will see the design either a few days prior to your appointment or on the day itself. We leave room for final adjustments to ensure it sits perfectly on the body.',
    },
    {
      num: '04',
      title: 'Execution',
      body: 'The appointment is dedicated to calm focus. We work at a measured pace. The studio environment is strictly controlled to maintain a peaceful atmosphere throughout the session.',
    },
    {
      num: '05',
      title: 'Aftercare',
      body: 'Healing is the final phase of the process. We provide detailed aftercare instructions and specific products to ensure the piece settles into the skin exactly as intended.',
    },
  ];

  useGsapContext(
    () => {
      if (prefersReducedMotion) return;

      const stepEls = gsap.utils.toArray<HTMLElement>('.process-step', containerRef.current);
      
      stepEls.forEach((step) => {
        const num = step.querySelector('.step-num');
        const title = step.querySelector('.step-title');
        const body = step.querySelector('.step-body');
        const images = step.querySelectorAll('.step-image');
        const parallaxTargets = step.querySelectorAll('.parallax-target');
        const line = step.querySelector('.step-line');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
          }
        });

        if (num) {
          tl.fromTo(
            num,
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: dur.d620, ease: ease.editorial }
          );
        }

        if (title && body) {
          tl.fromTo(
            [title, body],
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: dur.d620, ease: ease.editorial, stagger: 0.1, clearProps: 'all' },
            '-=0.4'
          );
        }

        if (images.length) {
          tl.fromTo(
            images,
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0 0 0 0)', duration: dur.d620, ease: ease.editorial, stagger: 0.1, clearProps: 'clipPath' },
            '-=0.5'
          );
        }

        parallaxTargets.forEach((target) => {
          gsap.fromTo(
            target,
            { y: 0 },
            { 
              y: -60, 
              ease: 'none',
              scrollTrigger: {
                trigger: step,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        });

        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: step,
                start: 'top 50%',
                end: 'bottom 50%',
                scrub: true,
              }
            }
          );
        }
      });
      
    },
    [prefersReducedMotion]
  );

  return (
    <div ref={containerRef}>
      <Section spacing="hero" ref={heroRef}>
        <Container>
          <div className="flex flex-col gap-8 max-w-3xl">
            <h1 className="font-display text-display-md text-ivory">
              The five steps.
            </h1>
            <p className="text-body-lg text-ivory-dim">
              The process of creating a custom piece is methodical and unhurried. From the initial brief to the final healed result, each step is considered.
            </p>
          </div>
        </Container>
      </Section>

      <div className="flex flex-col gap-y-0 relative">
        {steps.map((step, i) => {
          // Find matching video for this step (1-indexed based on i)
          const video = videos.find(v => v.step === i + 1);
          
          return (
            <Section key={i} spacing="section" className="process-step border-t border-ink-20 relative">
              {i < steps.length - 1 && !prefersReducedMotion && (
                <div className="step-line absolute left-4 md:left-8 top-1/2 h-full w-[1.5px] bg-marigold origin-top hidden lg:block z-0" />
              )}
              <Container>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 relative z-10">
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <span className="step-num font-display text-display-sm text-ivory-dim">
                      {step.num} —
                    </span>
                    <h2 className="step-title font-display text-h2 text-ivory">{step.title}</h2>
                    <p className="step-body text-body-lg text-ivory-dim max-w-md">{step.body}</p>
                  </div>
                  
                  <div className="lg:col-span-7 flex flex-col sm:flex-row gap-6">
                     <div className="step-image flex-1 aspect-[4/5] bg-ink-70 rounded-sm flex items-center justify-center relative overflow-hidden">
                        <div className="parallax-target absolute inset-[-60px] flex items-center justify-center bg-ink-70 w-[calc(100%+120px)] h-[calc(100%+120px)]">
                          <span className="text-body-xs uppercase tracking-wider text-ivory-dim">Image Placeholder</span>
                        </div>
                     </div>
                     <div className="step-image flex-1 aspect-[4/5] bg-ink-80 rounded-sm flex items-center justify-center relative overflow-hidden">
                        <div className="parallax-target absolute inset-[-60px] flex items-center justify-center bg-ink-80 w-[calc(100%+120px)] h-[calc(100%+120px)]">
                          {video ? (
                            <LazyVideo 
                              vimeoId={video.vimeoId}
                              title={video.title}
                              poster={video.poster}
                              aspectRatio="portrait"
                              className="w-full h-full pointer-events-auto"
                              priority={i === 0}
                            />
                          ) : (
                            <span className="text-body-xs uppercase tracking-wider text-ivory-dim">Video Poster</span>
                          )}
                        </div>
                     </div>
                  </div>
                </div>
              </Container>
            </Section>
          );
        })}
      </div>

      <Section spacing="section" tone="warm" ref={ctaRef} data-reveal-children>
        <Container>
           <div className="flex flex-col items-center text-center gap-8 py-12">
            <h2 className="font-display text-display-sm text-ivory">
              Ready to begin?
            </h2>
            <Button asChild size="xl" className="mt-4">
              <Link href="/book">Start your brief</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
