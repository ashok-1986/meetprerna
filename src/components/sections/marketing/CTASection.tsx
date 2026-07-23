import Link from 'next/link';
import { AnimatedSection } from '@/components/layout/AnimatedSection';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export function CTASection() {
  return (
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
  );
}
