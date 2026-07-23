'use client';

import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { useSectionReveal } from '@/hooks/useSectionReveal';

export function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
  const ref = useSectionReveal();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <Section spacing="section" ref={ref} data-reveal-children>
      <Container>
        <div className="flex flex-col gap-16 text-center">
          <div className="flex flex-col gap-4 items-center">
            <span className="text-body-sm tracking-wider text-ivory-dim uppercase">
              Words from the room
            </span>
            <h2 className="font-display text-display-sm text-ivory">
              What clients say.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {testimonials.slice(0, 3).map((t, i) => (
              <div key={t._id || i} className="flex flex-col gap-6">
                <p className="font-serif italic text-h4 text-ivory pb-6 border-b-2 border-inchworm">
                  &quot;{t.quote}&quot;
                </p>
                <span className="text-body-sm text-ivory-dim uppercase tracking-wider">
                  {t.attribution}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
