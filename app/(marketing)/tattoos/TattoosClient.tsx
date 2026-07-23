'use client';

import { useState, useMemo } from 'react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import Gallery from '@/components/media/Gallery';
import { FilterBar } from '@/components/ui/FilterBar';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { type PortfolioItem } from '@/types/content';

interface TattoosClientProps {
  items: PortfolioItem[];
}

const FILTERS = ['All', 'Line', 'Blackwork', 'Flora', 'Geometry', 'Abstract'];

export default function TattoosClient({ items }: TattoosClientProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const heroRef = useSectionReveal();
  const galleryRef = useSectionReveal();

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return items;
    return items.filter(
      (item) => item.styles?.includes(activeFilter)
    );
  }, [activeFilter, items]);

  return (
    <>
      <Section spacing="hero" ref={heroRef}>
        <Container>
          <div className="flex flex-col gap-8 max-w-3xl">
            <span className="text-body-sm tracking-wider text-ivory-dim uppercase">
              The archive
            </span>
            <h1 className="font-display text-display-md text-ivory">
              Tattoos.
            </h1>
            <p className="text-body-lg text-ivory-dim">
              Custom tattoos by Prerna: line, blackwork, flora, geometry, abstract. Browse the archive.
            </p>
          </div>
        </Container>
      </Section>

      {/* Filter Bar */}
      <div className="sticky top-[var(--header-height)] z-40 w-full border-b border-ink-border bg-ink/90 backdrop-blur-sm py-4">
        <Container>
          <FilterBar
            filters={FILTERS}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </Container>
      </div>

      <Section spacing="section" ref={galleryRef}>
        <Container>
          <Gallery items={filteredItems} variant="tattoo" columns={3} />
        </Container>
      </Section>
    </>
  );
}
