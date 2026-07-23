import Link from 'next/link';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { FilloutEmbed } from '@/components/sections/marketing/FilloutEmbed';

export const metadata = {
  title: 'Book | MeetPrerna',
  description: 'Submit your brief to book a project with Prerna.',
};

export default function BookPage() {
  return (
    <>
      <Section spacing="hero">
        <Container>
          <div className="flex flex-col gap-8 max-w-3xl">
            <h1 className="font-display text-display-md text-ivory">
              Book a project.
            </h1>
            <p className="text-body-lg text-ivory-dim">
              Submit your brief below. Please ensure you have read the <Link href="/process" className="text-ivory hover:text-inchworm transition-colors underline underline-offset-4">process</Link> before submitting. We review all submissions carefully.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="section" className="pb-32">
        <Container>
          <div className="max-w-3xl mx-auto">
             <FilloutEmbed formId="gvnCVtzfz2us" height={800} />
          </div>
        </Container>
      </Section>
    </>
  );
}
