import type { Metadata } from 'next'
import { Suspense } from 'react'
import { portfolio } from '@/content/portfolio'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { ArchiveGridClient } from './ArchiveGrid.client'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Portfolio — MeetPrerna',
  description:
    'Tattoos, paintings and sketches by Prerna. Fine line, abstract, flora, realism and geometric. Filter by medium, motif and placement.',
}

export default function PortfolioArchive() {
  return (
    <main id="main-content">
      <section aria-labelledby="archive-heading" className={styles.hero}>
        <h1 id="archive-heading" className={styles.h1}>
          The archive.
        </h1>
        <p className={styles.sub}>
          Tattoos, paintings and sketches, in one place, because they are one practice.
        </p>
      </section>

      <Suspense fallback={null}>
        <ArchiveGridClient pieces={portfolio} />
      </Suspense>

      {portfolio.length > 0 && (
        <section className={styles.ctaStrip} aria-labelledby="cta-strip-heading">
          <p id="cta-strip-heading" className={styles.ctaText}>
            Have something in mind? Send it across, even if it is only a feeling.
          </p>
          <InteractiveHoverButton href="/consulting">
            Start a conversation
          </InteractiveHoverButton>
        </section>
      )}
    </main>
  )
}
