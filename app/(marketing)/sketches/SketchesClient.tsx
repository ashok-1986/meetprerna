'use client';

import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Gallery from '@/components/media/Gallery';
import { SeriesRow } from '@/components/ui/SeriesRow';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { type PortfolioItem } from '@/types/content';

interface SketchesClientProps {
  items: PortfolioItem[];
}

export default function SketchesClient({ items }: SketchesClientProps) {

const SERIES = [
  { year: 2024, name: 'Anatomy', count: 24 },
  { year: 2023, name: 'Botanicals', count: 18 },
];


  const heroRef = useSectionReveal();
  const seriesRef = useSectionReveal();
  const galleryRef = useSectionReveal();

  return (
    <>
      <Section spacing="hero" ref={heroRef}>
        <Container>
          <div className="flex flex-col gap-8 max-w-3xl">
            <h1 className="font-display text-display-md text-ivory">
              Sketches.
            </h1>
            <p className="text-body-lg text-ivory-dim">
              Pencil and ink studies capturing movement, form, and transient ideas.
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
            <Gallery items={items} variant="sketch" columns={3} />
          </div>
        </Container>
      </Section>
    </>
  );
}
