import Link from 'next/link';
import { AnimatedSection } from '@/components/layout/AnimatedSection';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { HeroSection } from '@/components/sections/marketing/HeroSection';
import { sanityClient } from '@/lib/sanity/client';
import { featuredPortfolioQuery, testimonialsQuery } from '@/lib/sanity/queries';
import { STATIC_FALLBACK_FEATURED, STATIC_FALLBACK_TESTIMONIALS } from '@/lib/sanity/fallbackData';
import { urlFor } from '@/lib/sanity/image';
import type { PortfolioItem } from '@/types/content';
import { buildMetadata, buildPersonJsonLd } from '@/lib/seo';
import { TestimonialsSection } from '@/components/sections/marketing/TestimonialsSection';

export const metadata = buildMetadata({
  title: 'Custom Tattoos & Abstract Art in Mumbai',
  description: 'MeetPrerna is a Navi Mumbai creative studio by Prerna — custom tattoos, abstract paintings, and sketches. Each piece is a slow, personal conversation.',
  path: '/',
});

export default async function Home() {
  const featuredItems = await sanityClient.fetch(
    featuredPortfolioQuery,
    {},
    { next: { tags: ['portfolio'] } }
  ).catch((err) => {
    console.error('[Sanity] Portfolio fetch failed:', err.message);
    return STATIC_FALLBACK_FEATURED;
  });
  const testimonials = await sanityClient.fetch(
    testimonialsQuery,
    {},
    { next: { tags: ['testimonials'] } }
  ).catch((err) => {
    console.error('[Sanity] Testimonials fetch failed:', err.message);
    return STATIC_FALLBACK_TESTIMONIALS;
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildPersonJsonLd()),
        }}
      />
      {/* 1. HeroSection */}
      <HeroSection />

      {/* 2. ManifestoSection */}
      <AnimatedSection spacing="section" data-reveal-children>
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
                { name: 'Psychology', desc: 'Choosing to mark your skin is a decision about who you are becoming.' },
                { name: 'Meditation', desc: 'The needle, the brush, the pencil — three rhythms, one attention.' },
                { name: 'Therapy', desc: 'Art is a way of saying things that don\'t have words.' },
                { name: 'Calmness', desc: 'The studio is a quiet room, by appointment only.' },
              ].map((pillar, i) => (
                <div key={i} className="flex flex-col gap-4 border-t border-ink-20 pt-6">
                  <h3 className="font-display text-h4 text-ivory">{pillar.name}</h3>
                  <p className="text-body-sm text-ivory-dim">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </AnimatedSection>

      {/* 3. SelectedWorkSection */}
      <AnimatedSection spacing="section" data-reveal-children>
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
              {featuredItems.slice(0, 6).map((item: PortfolioItem, i: number) => (
                <Link key={item._id || i} href={`/${item.kind}s#${item.slug?.current}`} className="group flex flex-col gap-4">
                  {item.images?.[0] ? (
                    <div 
                      role="img"
                      aria-label={item.images[0]?.alt || `${item.title} — ${item.year}`}
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
      </AnimatedSection>

      {/* 4. ProcessTeaserSection */}
      <AnimatedSection spacing="section" data-reveal-children>
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
                { step: '01', title: 'Consultation', desc: 'Send a brief. We review inquiries weekly and will reach out to schedule a conversation.' },
                { step: '02', title: 'Design', desc: 'We work together to design a piece that fits perfectly with your body flow and personal narrative.' },
                { step: '03', title: 'Refinement', desc: 'A collaborative session to adjust line weights, scale, and placement before the appointment.' },
                { step: '04', title: 'Execution', desc: 'The session itself. A quiet space, natural light, and a slow, deliberate application of ink.' },
                { step: '05', title: 'Aftercare', desc: 'Detailed healing instructions and a follow-up to ensure the piece settles perfectly into your skin.' },
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
      </AnimatedSection>

      {/* 5. StudioVignetteSection */}
      <AnimatedSection spacing="section" data-reveal-children>
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
      </AnimatedSection>

      {/* 6. TestimonialsSection */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 7. CTASection */}
      <AnimatedSection spacing="section" tone="warm" data-reveal-children>
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
      </AnimatedSection>
    </>
  );
}
