import Link from 'next/link'
import styles from './error-pages.module.css'

export default function NotFound() {
  return (
    <main id="main-content" className={styles.page}>
      <h1 className={styles.h1}>This page has healed over.</h1>
      <p className={styles.body}>
        The link is gone or was never here. The work is still where you left it.
      </p>
      <div className={styles.actions}>
        <Link href="/portfolio" className={styles.primary}>
          See the work
        </Link>
        <a 
          href="https://wa.me/917738147935?text=Hello,%20I%20have%20a%20query%20regarding%20tattoo" 
          target="_blank"
          rel="noopener noreferrer"
          className={styles.secondary}
        >
          Start a conversation
        </a>
      </div>
    </main>
  )
}
