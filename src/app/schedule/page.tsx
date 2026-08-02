import type { Metadata } from 'next'
import { FilloutEmbed } from '@/components/forms/FilloutEmbed.client'
import { site } from '@/content/site'
import styles from './page.module.css'

// Deliberately unlisted: no nav link, no footer link, no CTA links here
// anywhere in the codebase. This page only exists as a URL Prerna sends
// personally after WhatsApp or after reviewing an /enquiry submission.
export const metadata: Metadata = {
  title: 'Schedule',
  description: 'Pick a date and time for your session.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function Schedule() {
  return (
    <main id="main-content">
      <section className={styles.hero}>
        <h1 className={styles.h1}>Pick a time that works.</h1>
        <p className={styles.sub}>This link is just for you — pick whatever slot suits you best.</p>
      </section>

      <section className={styles.formSection} aria-labelledby="form-heading">
        <div className={styles.formCard}>
          <div className={styles.filloutWrapper}>
            <FilloutEmbed filloutId={site.scheduleFilloutId} />
          </div>
          <p className={styles.fallback}>
            Having trouble? <a href={`https://wa.me/${site.whatsapp}`} className={styles.whatsappLink}>Message on WhatsApp</a>
          </p>
        </div>
      </section>
    </main>
  )
}
