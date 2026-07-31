'use client'

import Link from 'next/link'
import { TrackingWhatsAppLink } from '@/components/ui/TrackingWhatsAppLink'
import styles from './error-pages.module.css'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  void error; void reset;

  return (
    <main id="main-content" className={styles.page}>
      <h1 className={styles.h1}>Something broke on our side.</h1>
      <p className={styles.body}>
        Not you. Try again in a minute, or message on WhatsApp.
      </p>
      <div className={styles.actions}>
        <Link href="/portfolio" className={styles.primary}>
          See the work
        </Link>
        <TrackingWhatsAppLink 
          className={styles.secondary}
          trackingSource="error_page"
          trackingPage="/error"
        >
          Start a conversation
        </TrackingWhatsAppLink>
      </div>
    </main>
  )
}
