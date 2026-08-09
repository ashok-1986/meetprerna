export default function TermsPage() {
  return (
    <main className="min-h-screen bg-ivory text-ink pt-32 pb-24 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">Terms of Service</h1>
        
        <p className="font-mono text-sm uppercase tracking-wider text-ink/60 mb-8">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl">1. Acceptance of Terms</h2>
          <p className="font-body text-base leading-relaxed text-ink/80">
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this site.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl">2. Consultations and Bookings</h2>
          <p className="font-body text-base leading-relaxed text-ink/80">
            All tattoo bookings require a prior consultation and a non-refundable deposit to secure your appointment. We reserve the right to decline any project that does not align with our artistic style or capabilities.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl">3. Intellectual Property</h2>
          <p className="font-body text-base leading-relaxed text-ink/80">
            All content, designs, images, and artwork displayed on this website are the intellectual property of MeetPrerna. You may not reproduce, distribute, or use any materials without explicit written permission.
          </p>
        </section>

        <section className="flex flex-col gap-4 mt-8">
          <p className="font-body text-sm text-ink/60">
            If you have any questions about these Terms, please contact us at <a href="mailto:prerna@meetprerna.com" className="underline hover:text-inchworm-deep">prerna@meetprerna.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
