import Link from 'next/link';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function StudioPage() {
  return (
    <>
      <Section spacing="hero">
        <Container>
          <div className="flex flex-col gap-8 max-w-3xl">
            <h1 className="font-display text-display-md text-ivory">
              A quiet room in Vashi.
            </h1>
            <p className="text-body-lg text-ivory-dim">
              The studio is designed as a space of focus and calm. Located in Navi Mumbai, it operates strictly by appointment to ensure privacy and dedicated time for each piece.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="none">
        <Container>
          <div className="aspect-[21/9] w-full bg-ink-70 rounded-sm flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-ink/20 mix-blend-multiply" />
             <span className="relative z-10 text-body-sm text-ivory-dim tracking-wider uppercase">Studio Space Placeholder</span>
          </div>
        </Container>
      </Section>

      <Section spacing="section">
        <Container>
          <div className="flex flex-col gap-24">
            {[
              {
                title: 'Intention',
                body: 'Every piece starts with a conversation. We do not rush the consultation process.',
              },
              {
                title: 'Craft',
                body: 'The technique is slow, deliberate, and respectful of the skin as a medium.',
              },
              {
                title: 'Environment',
                body: 'Silence, natural light, and a measured pace. The room is as important as the tools.',
              },
              {
                title: 'Aftercare',
                body: 'The relationship does not end when the piece is done. We guide the healing process.',
              },
            ].map((pillar, i) => (
              <div key={i} className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <h2 className="font-display text-h3 text-ivory">{pillar.title}</h2>
                  <p className="text-body text-ivory-dim max-w-md">{pillar.body}</p>
                </div>
                <div className="lg:col-span-7">
                   <div className="aspect-[4/5] w-full max-w-md mx-auto bg-ink-70 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="section">
        <Container>
          <div className="flex flex-col gap-12">
            <h2 className="font-display text-h4 text-ivory text-center">Press & Recognition</h2>
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

      <Section spacing="section" tone="warm">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col gap-8">
              <h2 className="font-display text-h3 text-ivory">Visit the studio.</h2>
              <div className="flex flex-col gap-2 text-body text-ivory-dim">
                <p>Studio 4, Lane 7</p>
                <p>Vashi, Navi Mumbai 400703</p>
                <p className="pt-4">Tuesday – Saturday, 11:00 – 19:00 IST</p>
                <p>By appointment only.</p>
              </div>
              <Button asChild className="w-fit">
                <Link href="/book">Book an appointment</Link>
              </Button>
            </div>
            <div className="aspect-square w-full bg-ink-70 rounded-sm flex items-center justify-center">
               <span className="text-body-sm text-ivory-dim tracking-wider uppercase">Map Placeholder</span>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
