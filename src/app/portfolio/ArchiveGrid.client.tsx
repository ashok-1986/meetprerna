'use client'

import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { imagePath, type Piece } from '@/content/portfolio'
import styles from './page.module.css'

const MEDIUMS = ['All', 'Tattoo', 'Painting', 'Sketch'] as const

const PLACEMENT_ORDER = [
  'All',
  'Upper back',
  'Back',
  'Shoulder blade',
  'Upper arm',
  'Forearm',
  'Ribs',
  'Collarbone',
  'Thigh',
] as const

interface Props {
  pieces: Piece[]
}

function uniqueValues(pieces: Piece[], key: keyof Piece): string[] {
  const seen = new Set<string>()
  for (const p of pieces) {
    if (key === 'motifs') {
      for (const m of p.motifs) seen.add(m)
    } else {
      const v = p[key]
      if (typeof v === 'string') seen.add(v)
    }
  }
  const arr = Array.from(seen)
  arr.sort((a, b) => {
    const countA = pieces.filter((p) =>
      key === 'motifs' ? p.motifs.includes(a) : p[key] === a
    ).length
    const countB = pieces.filter((p) =>
      key === 'motifs' ? p.motifs.includes(b) : p[key] === b
    ).length
    return countB - countA
  })
  return arr
}

export function ArchiveGridClient({ pieces }: Props) {
  const searchParams = useSearchParams()

  const [activeMedium, setActiveMedium] = useState<string>('All')
  const [activePlacement, setActivePlacement] = useState<string>('All')
  const [activeMotifs, setActiveMotifs] = useState<Set<string>>(new Set())

  // Read ?medium= from URL on mount
  useEffect(() => {
    const m = searchParams.get('medium')
    if (m && MEDIUMS.map((x) => x.toLowerCase()).includes(m)) {
      const label = MEDIUMS.find((x) => x.toLowerCase() === m)
      if (label) setActiveMedium(label)
    }
  }, [searchParams])

  // Filter by medium first
  const mediumFiltered = useMemo(() => {
    if (activeMedium === 'All') return pieces
    return pieces.filter((p) => p.medium === activeMedium.toLowerCase())
  }, [pieces, activeMedium])

  const hasTattoos = useMemo(
    () => mediumFiltered.some((p) => p.medium === 'tattoo'),
    [mediumFiltered]
  )

  // Options derived from medium-filtered set
  const allMotifs = useMemo(() => uniqueValues(mediumFiltered, 'motifs'), [mediumFiltered])
  const allPlacements = useMemo(() => {
    const set = new Set(mediumFiltered.map((p) => p.placement).filter(Boolean) as string[])
    return PLACEMENT_ORDER.filter((p) => p === 'All' || set.has(p))
  }, [mediumFiltered])

  // Then by placement and motifs
  const filtered = useMemo(() => {
    return mediumFiltered.filter((p) => {
      if (activePlacement !== 'All' && p.placement !== activePlacement) return false
      if (activeMotifs.size > 0) {
        for (const m of activeMotifs) {
          if (!p.motifs.includes(m)) return false
        }
      }
      return true
    })
  }, [mediumFiltered, activePlacement, activeMotifs])

  const toggleMotif = (motif: string) => {
    setActiveMotifs((prev) => {
      const next = new Set(prev)
      if (next.has(motif)) next.delete(motif)
      else next.add(motif)
      return next
    })
  }

  return (
    <section aria-labelledby="grid-heading">
      <h2 id="grid-heading" className={styles.visuallyHidden}>
        Pieces
      </h2>

      {/* Medium filter */}
      <div className={styles.filters} role="group" aria-label="Filter by medium">
        {MEDIUMS.map((m) => (
          <button
            key={m}
            className={`${styles.filter} ${activeMedium === m ? styles.filterActive : ''}`}
            onClick={() => {
              setActiveMedium(m)
              setActivePlacement('All')
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Placement filter — only when filtered set includes tattoos */}
      {hasTattoos && (
        <div className={styles.filters} role="group" aria-label="Filter by placement">
          {allPlacements.map((p) => (
            <button
              key={p}
              className={`${styles.filter} ${activePlacement === p ? styles.filterActive : ''}`}
              onClick={() => setActivePlacement(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Motif filter — always visible */}
      <div className={styles.motifRow} role="group" aria-label="Filter by motif">
        {allMotifs.map((m) => (
          <button
            key={m}
            className={`${styles.motif} ${activeMotifs.has(m) ? styles.motifActive : ''}`}
            onClick={() => toggleMotif(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className={styles.grid} key={`${activeMedium}-${activePlacement}-${Array.from(activeMotifs).sort().join(',')}`}>
          {filtered.map((piece, i) => (
            <Link
              key={piece.slug}
              href={`/portfolio/${piece.slug}`}
              className={styles.card}
              style={{ '--i': i } as React.CSSProperties}
            >
              <div className={styles.cardImageWrap}>
                <Image
                  src={imagePath(piece.medium, piece.image)}
                  alt={piece.title}
                  width={825}
                  height={1032}
                  className={styles.cardImage}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.cardTitle}>{piece.title}</span>
                {piece.medium === 'tattoo' && piece.placement && (
                  <span className={styles.cardPlacement}>{piece.placement}</span>
                )}
                {piece.motifs.length > 0 && (
                  <span className={styles.cardMotifs}>{piece.motifs.slice(0, 3).join(', ')}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.empty} role="status">
          <p className={styles.emptyText}>
            Nothing matches that combination. Try a different filter.
          </p>
          <a href="/consulting" className={styles.emptyCta}>
            Start a conversation
          </a>
        </div>
      )}
    </section>
  )
}
