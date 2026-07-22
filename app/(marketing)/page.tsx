import Link from 'next/link';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { HeroSection } from '@/components/sections/marketing/HeroSection';
import { sanityClient } from '@/lib/sanity/client';
import { featuredPortfolioQuery } from '@/lib/sanity/queries';
import { STATIC_FALLBACK_FEATURED } from '@/lib/sanity/fallbackData';
import { urlFor } from '@/lib/sanity/image';

export const revalidate = 60;

export default async function Home() {
  const featuredItems = await sanityClient.fetch(featuredPortfolioQuery).catch(() => STATIC_FALLBACK_FEATURED);
  const itemsToRender = featuredItems && featuredItems.length > 0 ? featuredItems : STATIC_FALLBACK_FEATURED;

  return (
    <>
      {/* 1. HeroSection */}
      <HeroSection />

      {/* 2. ManifestoSection */}
      <Section spacing="section">
        <Container>
          <div className="flex flex-col gap-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="text-body-sm tracking-wider text-ivory-dim uppercase">
                  The thesis
                </span>
              </div>
              <div className="flex flex-col gap-6 lg:col-span-7">
                <h2 className="font-display text-display-md text-ivory">
                  Four ideas that make the work.
                </h2>
                <p className="text-body-lg text-ivory-dim max-w-lg">
                  We believe in intentionality over speed. The studio operates on these four foundational pillars to ensure every piece is meaningful.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Pillar One', desc: 'A description for pillar one.' },
                { name: 'Pillar Two', desc: 'A description for pillar two.' },
                { name: 'Pillar Three', desc: 'A description for pillar three.' },
                { name: 'Pillar Four', desc: 'A description for pillar four.' },
              ].map((pillar, i) => (
                <div key={i} className="flex flex-col gap-4 border-t border-ink-20 pt-6">
                  <h3 className="font-display text-h4 text-ivory">{pillar.name}</h3>
                  <p className="text-body-sm text-ivory-dim">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. SelectedWorkSection */}
      <Section spacing="section">
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
              {itemsToRender.slice(0, 6).map((item: any, i: number) => (
                <Link key={item._id || i} href={`/${item.kind}s#${item.slug?.current}`} className="group flex flex-col gap-4">
                  {item.images?.[0] ? (
                    <div 
                      className="aspect-[4/5] w-full rounded-sm bg-ink-70 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]" 
                      style={{ backgroundImage: `url(${urlFor(item.images[0]).width(800).auto('format').url()})` }}
                    />
                  ) : (
                    <div className="aspect-[4/5] w-full bg-ink-70 rounded-sm" />
                  )}
                  <div className="flex justify-between text-body-sm">
                    <span className="text-ivory">{item.title}</span>
                    <span className="text-ivory-dim">{item.year}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. ProcessTeaserSection */}
      <Section spacing="section">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-body-sm tracking-wider text-ivory-dim uppercase">
                The process
              </span>
              <h2 className="font-display text-display-sm text-ivory max-w-sm">
                How a piece gets made.
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-12">
              {[
                { step: '01', title: 'Consultation', desc: 'Process step 1 copy pending.' },
                { step: '02', title: 'Design', desc: 'Process step 2 copy pending.' },
                { step: '03', title: 'Refinement', desc: 'Process step 3 copy pending.' },
                { step: '04', title: 'Execution', desc: 'Process step 4 copy pending.' },
                { step: '05', title: 'Aftercare', desc: 'Process step 5 copy pending.' },
              ].map((p, i) => (
                <div key={i} className="flex gap-8">
                  <span className="font-display text-h3 text-inchworm pt-1">{p.step}</span>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-h4 text-ivory">{p.title}</h3>
                    <p className="text-body text-ivory-dim max-w-md">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. StudioVignetteSection */}
      <Section spacing="section">
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
              <div className="aspect-video bg-ink-70 rounded-sm md:col-span-8" />
              <div className="aspect-[3/4] bg-ink-70 rounded-sm md:col-span-4" />
              <div className="aspect-[21/9] bg-ink-70 rounded-sm md:col-span-12" />
            </div>
            <p className="text-body-sm text-ivory-dim text-center mt-4">
              Vashi, Navi Mumbai. Designed for calm.
            </p>
          </div>
        </Container>
      </Section>

      {/* 6. TestimonialsSection */}
      <Section spacing="section">
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
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-6">
                  <p className="font-serif italic text-h4 text-ivory pb-6 border-b-2 border-inchworm">
                    &quot;This was the most calm and considered tattoo experience I have ever had. Prerna creates a truly safe space.&quot;
                  </p>
                  <span className="text-body-sm text-ivory-dim uppercase tracking-wider">
                    — Client {i}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. CTASection */}
      <Section spacing="section" tone="warm">
        <Container>
          <div className="flex flex-col items-center text-center gap-8 py-12">
            <h2 className="font-display text-display-md text-ivory">
              Begin a piece.
            </h2>
            <p className="text-body-lg text-ivory-dim max-w-md">
              Books are currently open for the next quarter. We reply to all inquiries within 48 hours.
            </p>
            <Button asChild size="xl" className="mt-4">
              <Link href="/book">Start your brief</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
