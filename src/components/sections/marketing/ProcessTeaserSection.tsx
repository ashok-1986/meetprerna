import { AnimatedSection } from '@/components/layout/AnimatedSection';
import Container from '@/components/layout/Container';

export function ProcessTeaserSection() {
  return (
    <AnimatedSection spacing="section" data-reveal-children>
      <Container>
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          <div className="flex flex-col gap-6 md:w-1/3">
            <span className="text-body-sm tracking-wider text-ivory-dim uppercase">
              The process
            </span>
            <h2 className="font-display text-display-sm text-ivory">
              How we work.
            </h2>
            <p className="text-body-lg text-ivory-dim">
              Every tattoo is a collaboration. We take the time to understand your intent before ink ever touches skin.
            </p>
          </div>

          <div className="flex flex-col gap-12 md:w-1/2">
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
    </AnimatedSection>
  );
}
