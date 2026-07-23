import { AnimatedSection } from '@/components/layout/AnimatedSection';
import Container from '@/components/layout/Container';

export function ManifestoSection() {
  return (
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
              { name: 'Pillar One', desc: 'A description for pillar one.' },
              { name: 'Pillar Two', desc: 'A description for pillar two.' },
              { name: 'Pillar Three', desc: 'A description for pillar three.' },
              { name: 'Pillar Four', desc: 'A description for pillar four.' },
            ].map((pillar, i) => (
              <div key={i} className="flex flex-col gap-4 border-t border-ink-border pt-6">
                <h3 className="font-display text-h4 text-ivory">{pillar.name}</h3>
                <p className="text-body-sm text-ivory-dim">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </AnimatedSection>
  );
}
