import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPiece, imagePath, portfolio } from '@/content/portfolio'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { site } from '@/content/site'
import styles from './page.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return portfolio.map((piece) => ({ slug: piece.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const piece = getPiece(slug)
  if (!piece) return {}

  return {
    title: `${piece.title} — MeetPrerna`,
    description: piece.story ?? `${piece.medium === 'tattoo' ? 'Tattoo' : piece.medium === 'painting' ? 'Painting' : 'Sketch'} by Prerna. ${piece.motifs.join(', ')}.`,
  }
}

export default async function PortfolioPiece({ params }: Props) {
  const { slug } = await params
  const piece = getPiece(slug)

  if (!piece) {
    notFound()
  }

  const isLight = piece.medium === 'painting' || piece.medium === 'sketch'

  return (
    <main id="main-content" className={isLight ? styles.light : undefined}>
      <Link href="/portfolio" className={styles.back}>
        &larr; Archive
      </Link>

      <section aria-labelledby="piece-heading" className={styles.hero}>
        <div className={styles.imageWrap}>
          <Image
            src={imagePath(piece.medium, piece.image)}
            alt={piece.title}
            width={825}
            height={1032}
            className={styles.image}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className={styles.info}>
          <h1 id="piece-heading" className={isLight ? styles.h1Light : styles.h1}>
            {piece.title}
          </h1>

          <div className={styles.meta}>
            {piece.medium === 'tattoo' && piece.placement && (
              <span className={styles.metaItem}>{piece.placement}</span>
            )}
            {piece.motifs.length > 0 && (
              <span className={styles.metaItem}>{piece.motifs.join(', ')}</span>
            )}
          </div>

          {piece.story && (
            <p className={isLight ? styles.storyLight : styles.story}>
              {piece.story}
            </p>
          )}

          <div className={styles.ctaBlock}>
            <p className={styles.ctaSub}>
              {piece.medium === 'painting' || piece.medium === 'sketch'
                ? 'Interested in this piece?'
                : 'Want something like this?'}
            </p>
            <InteractiveHoverButton
              href={`https://wa.me/${site.whatsapp}?text=Hello,%20I%20have%20a%20query%20regarding%20tattoo`}
              trackingSource="portfolio_piece"
              trackingPage="portfolio_item"
            >
              Start a conversation
            </InteractiveHoverButton>
          </div>
        </div>
      </section>
    </main>
  )
}
