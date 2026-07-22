import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import ContactForm from '@/components/sections/contact/ContactForm';

export default function ContactPage() {
  return (
    <>
      <Section spacing="hero">
        <Container>
          <div className="flex flex-col gap-8 max-w-3xl">
            <h1 className="font-display text-display-md text-ivory">
              Contact.
            </h1>
            <p className="text-body-lg text-ivory-dim">
              For press, collaborations, and general inquiries. If you are looking to book a tattoo or commission a piece, please use the booking form instead.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="section" className="pb-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-12">
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
    </>
  );
}
