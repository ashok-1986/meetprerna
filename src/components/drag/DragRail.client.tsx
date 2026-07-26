'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { imagePath, portfolio, type Piece } from '@/content/portfolio'
import styles from './DragRail.module.css'

const RAIL_SLUGS = [
  'brushstroke-butterfly',
  'tidal',
  'peony-back',
  'night-bloom',
  'lion-and-birds',
  'wolf-red-geometric',
  'the-room',
  'memento-vivere',
]

const railPieces: Piece[] = RAIL_SLUGS
  .map((slug) => portfolio.find((p) => p.slug === slug))
  .filter((p): p is Piece => p !== undefined)

export function DragRail() {
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(true)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // State driven by GSAP, read from GSAP getProperty for drag bounds
  const updateArrows = useCallback(() => {
    if (!trackRef.current || !containerRef.current) return
    const x = gsap.getProperty(trackRef.current, 'x') as number
    const trackW = trackRef.current.scrollWidth
    const containerW = containerRef.current.clientWidth
    const minX = -(trackW - containerW)
    setCanScrollLeft(x < -1)
    setCanScrollRight(x > minX + 1)
  }, [])

  const moveBy = useCallback((delta: number) => {
    if (!trackRef.current || !containerRef.current) return
    const x = gsap.getProperty(trackRef.current, 'x') as number
    const trackW = trackRef.current.scrollWidth
    const containerW = containerRef.current.clientWidth
    const minX = -(trackW - containerW)
    const maxX = 0

    // Snap by one card width
    const cardWidth = trackRef.current.querySelector('a')?.offsetWidth ?? 300
    const gap = 16
    const step = cardWidth + gap
    const target = Math.round((x + (delta > 0 ? -step : step)) / step) * step
    const clamped = Math.max(minX, Math.min(maxX, target))

    gsap.to(trackRef.current, {
      x: clamped,
      duration: 0.35,
      ease: 'power3.out',
      onUpdate: updateArrows,
    })
  }, [updateArrows])

  useEffect(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let isDragging = false
    let startX = 0
    let startScrollX = 0
    let velocity = 0
    let lastX = 0
    let lastTime = 0
    let momentumId: number | null = null

    const getBounds = () => {
      const trackW = track.scrollWidth
      const containerW = container.clientWidth
      return { minX: -(trackW - containerW), maxX: 0 }
    }

    const cancelMomentum = () => {
      if (momentumId !== null) {
        cancelAnimationFrame(momentumId)
        momentumId = null
      }
    }

    const onDown = (e: PointerEvent) => {
      cancelMomentum()
      if (prefersReduced) return
      isDragging = true
      startX = e.clientX
      lastX = e.clientX
      lastTime = performance.now()
      startScrollX = gsap.getProperty(track, 'x') as number
      track.setPointerCapture(e.pointerId)
      gsap.killTweensOf(track)
    }

    const onMove = (e: PointerEvent) => {
      if (!isDragging) return
      const bounds = getBounds()
      const dx = e.clientX - startX
      const nx = startScrollX + dx

      // Damping past boundaries
      if (nx > bounds.maxX) {
        const over = nx - bounds.maxX
        gsap.set(track, { x: bounds.maxX + over * 0.3 })
      } else if (nx < bounds.minX) {
        const over = bounds.minX - nx
        gsap.set(track, { x: bounds.minX - over * 0.3 })
      } else {
        gsap.set(track, { x: nx })
      }

      const now = performance.now()
      const dt = now - lastTime
      if (dt > 0) {
        velocity = (e.clientX - lastX) / dt
      }
      lastX = e.clientX
      lastTime = now
      updateArrows()
    }

    const onUp = () => {
      if (!isDragging) return
      isDragging = false
      const bounds = getBounds()
      const x = gsap.getProperty(track, 'x') as number

      if (x > bounds.maxX || x < bounds.minX) {
        gsap.to(track, {
          x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
          duration: 0.3,
          ease: 'power3.out',
          onUpdate: updateArrows,
        })
        return
      }

      // Momentum
      if (Math.abs(velocity) > 0.01) {
        const targetX = x + velocity * 600
        const clamped = Math.max(bounds.minX, Math.min(bounds.maxX, targetX))
        gsap.to(track, {
          x: clamped,
          duration: Math.min(Math.abs(velocity) * 4, 0.8),
          ease: 'power3.out',
          onUpdate: updateArrows,
        })
      }
    }

    container.addEventListener('pointerdown', onDown)
    container.addEventListener('pointermove', onMove)
    container.addEventListener('pointerup', onUp)
    container.addEventListener('pointercancel', onUp)

    updateArrows()

    return () => {
      cancelMomentum()
      container.removeEventListener('pointerdown', onDown)
      container.removeEventListener('pointermove', onMove)
      container.removeEventListener('pointerup', onUp)
      container.removeEventListener('pointercancel', onUp)
    }
  }, [updateArrows])

  return (
    <section aria-labelledby="rail-heading" className={styles.section}>
      <h2 id="rail-heading" className={styles.visuallyHidden}>Featured work</h2>

      <div ref={containerRef} className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          {railPieces.map((piece) => (
            <Link
              key={piece.slug}
              href={`/portfolio/${piece.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={imagePath(piece.medium, piece.image)}
                  alt={piece.title}
                  width={400}
                  height={500}
                  className={styles.image}
                  sizes="(max-width: 768px) 60vw, 25vw"
                />
              </div>
              <div className={styles.caption}>
                <span className={styles.captionLabel}>{piece.placement || piece.medium}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.arrows} role="group" aria-label="Navigate works">
        <button
          className={`${styles.arrow} ${!canScrollLeft ? styles.arrowDisabled : ''}`}
          onClick={() => moveBy(-1)}
          aria-label="Previous work"
          disabled={!canScrollLeft}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className={`${styles.arrow} ${!canScrollRight ? styles.arrowDisabled : ''}`}
          onClick={() => moveBy(1)}
          aria-label="Next work"
          disabled={!canScrollRight}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
