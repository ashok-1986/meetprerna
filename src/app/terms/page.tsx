import type { Metadata } from 'next'
import { Header } from '@/components/header/Header'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of use, booking deposits, cancellation policy and client conduct for MeetPrerna.',
}

export default function Terms() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className={styles.section} aria-labelledby="terms-heading">
          <h1 id="terms-heading" className={styles.sectionHeading}>
            Terms
          </h1>
          <p className={styles.body}>
            These terms cover the use of this website and the services offered by Prerna.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="booking-heading">
          <h2 id="booking-heading" className={styles.sectionHeading}>
            Booking and deposits
          </h2>
          <p className={styles.body}>
            A deposit is taken once the design is agreed. For a small piece the deposit is ₹500,
            rising to ₹1,000, ₹1,500 and ₹2,000 as the work gets larger. It is deducted from the
            final cost.
          </p>
          <p className={styles.body}>
            The deposit is not refundable, but it is not lost either. If you need to move your
            date, tell me and we will find another one. The deposit moves with you. If I need to
            move it, the same thing — it stays with you until we find a time that works.
          </p>
          <p className={styles.body}>
            The only time a deposit is gone is if you stop replying altogether.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="conduct-heading">
          <h2 id="conduct-heading" className={styles.sectionHeading}>
            Client conduct and safety
          </h2>
          <p className={styles.body}>
            You must be 18 or older. You must disclose medical conditions that affect tattooing
            (allergies, blood disorders, immune conditions, medications). You must not attend
            under the influence of alcohol or drugs. Prerna reserves the right to refuse or stop
            a session if safety is compromised.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="copyright-heading">
          <h2 id="copyright-heading" className={styles.sectionHeading}>
            Intellectual property
          </h2>
          <p className={styles.body}>
            All designs, sketches, paintings and photographs on this site are the copyright of
            Prerna. You may not reproduce, distribute or create derivative works without written
            permission. A tattoo is a personal, non-transferable licence to wear the design on
            your body — it does not transfer copyright.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="liability-heading">
          <h2 id="liability-heading" className={styles.sectionHeading}>
            Limitation of liability
          </h2>
          <p className={styles.body}>
            The site is provided &ldquo;as is&rdquo; without warranties. Prerna is not liable for
            indirect, incidental or consequential damages arising from use of the site or reliance
            on its content. Tattoo results vary by skin type, placement, aftercare and individual
            healing. The aftercare instructions provided are guidance, not a medical guarantee.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="changes-heading">
          <h2 id="changes-heading" className={styles.sectionHeading}>
            Changes to these terms
          </h2>
          <p className={styles.body}>
            We may update these terms. Material changes will be posted here with a revised date.
            Continued use after changes constitutes acceptance.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="contact-heading">
          <h2 id="contact-heading" className={styles.sectionHeading}>
            Contact
          </h2>
          <p className={styles.body}>
            Questions about these terms: <a href="mailto:prerna@meetprerna.com" className={styles.link}>
            prerna@meetprerna.com</a>.
          </p>
        </section>
      </main>
    </>
  )
}
