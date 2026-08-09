export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ivory text-ink pt-32 pb-24 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">Privacy Policy</h1>
        
        <p className="font-mono text-sm uppercase tracking-wider text-ink/60 mb-8">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl">1. Information We Collect</h2>
          <p className="font-body text-base leading-relaxed text-ink/80">
            We collect information you provide directly to us, such as when you fill out a contact form, request a consultation, or communicate with us via email or social media. This may include your name, email address, phone number, and any other details you choose to share regarding your tattoo project.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl">2. How We Use Your Information</h2>
          <p className="font-body text-base leading-relaxed text-ink/80">
            The information we collect is used solely to provide, maintain, and improve our services. Specifically, we use it to schedule appointments, discuss design concepts, respond to your inquiries, and keep you updated on your project&apos;s status.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl">3. Data Sharing and Security</h2>
          <p className="font-body text-base leading-relaxed text-ink/80">
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We implement reasonable security measures to maintain the safety of your personal information when you submit a request or enter your details on our site.
          </p>
        </section>

        <section className="flex flex-col gap-4 mt-8">
          <p className="font-body text-sm text-ink/60">
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:prerna@meetprerna.com" className="underline hover:text-inchworm-deep">prerna@meetprerna.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
