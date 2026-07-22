import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { site } from '@/config/site';

export const metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy and data handling for ${site.name}.`,
};

export default function PrivacyPage() {
  return (
    <Section spacing="hero">
      <Container>
        <div className="flex flex-col gap-12 max-w-2xl">
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-h2 text-ivory">Privacy Policy</h1>
            <p className="text-body text-ivory-dim">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-body-lg text-ivory-dim leading-relaxed">
              At {site.name}, we are committed to protecting your privacy. This policy outlines the minimal data we collect to operate our studio and how we handle it.
            </p>

            <h2 className="font-display text-h4 text-ivory mt-12 mb-6">Data Collection</h2>
            <p className="text-body text-ivory-dim leading-relaxed mb-4">
              We collect information only when you explicitly provide it to us through our contact or booking forms. This includes:
            </p>
            <ul className="list-disc pl-6 text-body text-ivory-dim mb-8 flex flex-col gap-2">
              <li>Your name and email address</li>
              <li>Project details, descriptions, and reference images</li>
              <li>Other information you choose to include in your inquiry</li>
            </ul>

            <h2 className="font-display text-h4 text-ivory mt-12 mb-6">How We Use Your Data</h2>
            <p className="text-body text-ivory-dim leading-relaxed mb-4">
              The information you provide is used strictly for:
            </p>
            <ul className="list-disc pl-6 text-body text-ivory-dim mb-8 flex flex-col gap-2">
              <li>Communicating with you regarding your inquiry or booking</li>
              <li>Designing and preparing for your tattoo or commission</li>
              <li>Managing studio operations and scheduling</li>
            </ul>

            <h2 className="font-display text-h4 text-ivory mt-12 mb-6">Data Storage & Third Parties</h2>
            <p className="text-body text-ivory-dim leading-relaxed mb-4">
              Form submissions are securely routed to our studio inbox via Resend. We do not sell, rent, or share your personal information with third parties for marketing purposes.
            </p>

            <h2 className="font-display text-h4 text-ivory mt-12 mb-6">Analytics</h2>
            <p className="text-body text-ivory-dim leading-relaxed mb-4">
              We use Plausible Analytics to understand how visitors interact with our website. Plausible is a privacy-first, cookie-less analytics tool that tracks overall trends anonymously. It does not track individual users across devices or websites, and it does not collect personal data.
            </p>

            <h2 className="font-display text-h4 text-ivory mt-12 mb-6">Your Rights</h2>
            <p className="text-body text-ivory-dim leading-relaxed mb-4">
              You have the right to request access to the personal data we hold about you, or ask that we delete it. To make a request, please contact us.
            </p>

            <h2 className="font-display text-h4 text-ivory mt-12 mb-6">Contact</h2>
            <p className="text-body text-ivory-dim leading-relaxed">
              If you have any questions about this privacy policy, please contact us at <a href="mailto:studio@meetprerna.com" className="text-inchworm hover:underline">studio@meetprerna.com</a>.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
