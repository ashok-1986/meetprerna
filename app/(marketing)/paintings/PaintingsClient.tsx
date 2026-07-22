'use client';

import Link from 'next/link';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Gallery from '@/components/media/Gallery';
import { Button } from '@/components/ui/Button';
import { SeriesRow } from '@/components/ui/SeriesRow';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { type PortfolioItem } from '@/types/content';

interface PaintingsClientProps {
  items: PortfolioItem[];
}

export default function PaintingsClient({ items }: PaintingsClientProps) {

const SERIES = [
  { year: 2024, name: 'Currents', count: 8 },
  { year: 2023, name: 'Silence', count: 12 },
  { year: 2022, name: 'Form & Void', count: 6 },
];


  const heroRef = useSectionReveal();
  const seriesRef = useSectionReveal();
  const galleryRef = useSectionReveal();
  const ctaRef = useSectionReveal();

  return (
    <>
      <Section spacing="hero" ref={heroRef}>
        <Container>
          <div className="flex flex-col gap-8 max-w-3xl">
            <h1 className="font-display text-display-md text-ivory">
              Paintings.
            </h1>
            <p className="text-body-lg text-ivory-dim">
              Abstract paintings and originals exploring form, texture, and silence.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="section" ref={seriesRef}>
        <Container>
          <div className="flex flex-col gap-12">
            <h2 className="font-display text-h4 text-ivory">Series Index</h2>
            <div className="flex flex-col border-t border-ink-20">
              {SERIES.map((series, i) => (
                <SeriesRow
                  key={series.name}
                  year={series.year}
                  name={series.name}
                  count={series.count}
                  index={i}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="section" ref={galleryRef}>
        <Container>
          <div className="flex flex-col gap-12">
            <h2 className="font-display text-h4 text-ivory">Featured Works</h2>
            <Gallery items={items} variant="painting" columns={2} />
          </div>
        </Container>
      </Section>

      <Section spacing="section" tone="warm" ref={ctaRef} data-reveal-children>
        <Container>
           <div className="flex flex-col items-center text-center gap-8 py-12">
            <h2 className="font-display text-display-sm text-ivory">
              Collect a piece.
            </h2>
            <p className="text-body-lg text-ivory-dim max-w-md">
              View available works or commission a custom painting for your space.
            </p>
            <div className="flex gap-4 mt-4">
               <Button asChild size="lg">
                 <Link href="/contact">Inquire about availability</Link>
               </Button>
               <Button asChild variant="secondary" size="lg">
                 <Link href="/contact">Commission a painting</Link>
               </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
