import type { Metadata } from 'next'
import styles from './page.module.css'
import { TrackingWhatsAppLink } from '@/components/ui/TrackingWhatsAppLink'

export const metadata: Metadata = {
  title: 'Get in touch',
  description: 'Press, commercial and general enquiries. For tattoo consultations, start a conversation.',
}

export default function Contact() {
  return (
    <main id="main-content">
        <section className={styles.hero} aria-labelledby="contact-heading">
          <h1 id="contact-heading" className={styles.h1}>
            Get in touch.
          </h1>
          <p className={styles.sub}>
            Press, commercial work and general enquiries. For tattoo consultations,
            <TrackingWhatsAppLink 
              className={styles.consultingLink}
              trackingSource="body_text"
              trackingPage="/contact"
            >
              start a conversation
            </TrackingWhatsAppLink>
            .
          </p>
        </section>

        <section className={styles.section} aria-labelledby="email-heading">
          <h2 id="email-heading" className={styles.sectionHeading}>
            Email
          </h2>
          <p className={styles.body}>
            <a             href="mailto:prerna@meetprerna.com" className={styles.link}>
              prerna@meetprerna.com
            </a>
          </p>
        </section>

        <section className={styles.section} aria-labelledby="whatsapp-heading">
          <h2 id="whatsapp-heading" className={styles.sectionHeading}>
            WhatsApp
          </h2>
          <p className={styles.body}>
            <TrackingWhatsAppLink className={styles.whatsappLink} trackingSource="whatsapp_section" trackingPage="/contact">
              Message on WhatsApp
            </TrackingWhatsAppLink>
          </p>
        </section>

        <section className={styles.section} aria-labelledby="press-heading">
          <h2 id="press-heading" className={styles.sectionHeading}>
            Press kit
          </h2>
          <p className={styles.body}>
            <a href="/press-kit.pdf" className={styles.link}>
              Download press kit (PDF, ≤ 4 MB)
            </a>
          </p>
        </section>
      </main>
  )
}
