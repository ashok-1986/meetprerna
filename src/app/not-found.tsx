import Link from 'next/link'
import { StartConversationCTA } from '@/components/ui/StartConversationCTA'
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
        <StartConversationCTA
          className={styles.secondary}
          trackingSource="not_found_page"
          trackingPage="/not-found"
        >
          Start a conversation
        </StartConversationCTA>
      </div>
    </main>
  )
}
