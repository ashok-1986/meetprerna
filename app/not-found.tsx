import Link from 'next/link';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Section>
      <Container narrow className="flex flex-col items-center text-center">
        <h1 className="font-display text-display-xl tracking-tightest text-ivory">
          404
        </h1>
        <p className="mt-4 text-body-lg text-ivory-dim">
          This page does not exist.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Back to studio</Link>
        </Button>
      </Container>
    </Section>
  );
}
