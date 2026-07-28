import type { Metadata } from 'next'
import { FilloutEmbed } from '@/components/forms/FilloutEmbed.client'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Start a Conversation',
  description: 'Send a brief or a feeling. Reply within two working days. Tattoo, painting, sketch or commercial enquiries.',
}

export default function Consulting() {
  return (
    <main id="main-content">
      <section className={styles.hero}>
        <h1 className={styles.h1}>Start a conversation.</h1>
        <p className={styles.sub}>Tell me what you are carrying. I reply within two working days.</p>
      </section>

      <section className={styles.formSection} aria-labelledby="form-heading">
        <div className={styles.formCard}>
          <div className={styles.filloutWrapper}>
            <FilloutEmbed filloutId="gvnCVtzfz2us" />
          </div>
          <p className={styles.fallback}>
            Having trouble? <a href="https://wa.me/919820012345" className={styles.whatsappLink}>Message on WhatsApp</a>
          </p>
        </div>
      </section>
    </main>
  )
}
