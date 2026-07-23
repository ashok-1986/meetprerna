import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { FilloutEmbed } from '@/components/sections/marketing/FilloutEmbed';

export const metadata = {
  title: 'Contact | MeetPrerna',
  description: 'Get in touch with Prerna for general inquiries, collaborations, or questions.',
};

export default function ContactPage() {
  return (
    <main className="pt-24 pb-32">
      <Section spacing="section">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <h1 className="display-md mb-8">Get in touch.</h1>
              <p className="body-lg text-ivory-dim mb-12">
                We respond within 48 hours. For urgent inquiries, email studio@meetprerna.com directly.
              </p>
              <FilloutEmbed formId="gvnCVtzfz2us" height={800} />
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-12 lg:pt-32">
               <div className="flex flex-col gap-4">
                 <h2 className="font-display text-h4 text-ivory border-b border-ink-20 pb-4">Direct Email</h2>
                 <a href="mailto:studio@meetprerna.com" className="text-body text-ivory-dim hover:text-ivory transition-colors">
                   studio@meetprerna.com
                 </a>
               </div>

               <div className="flex flex-col gap-4">
                 <h2 className="font-display text-h4 text-ivory border-b border-ink-20 pb-4">Studio Location</h2>
                 <p className="text-body text-ivory-dim">
                   Sector 17, Vashi<br />
                   Navi Mumbai, 400703<br />
                   India
                 </p>
                 <p className="text-body-sm text-ivory-dim mt-2 italic">
                   Strictly by appointment. No walk-ins.
                 </p>
               </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
