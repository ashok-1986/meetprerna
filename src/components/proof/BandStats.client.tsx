'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './band-stats.module.css'

gsap.registerPlugin(ScrollTrigger)

export function BandStats() {
  const containerRef = useRef<HTMLElement>(null)
  const bandRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (reduce.matches) {
        gsap.set('.js-band-word', { color: 'var(--color-ivory)' })
        return
      }

      gsap.to('.js-band-word', {
        color: 'var(--color-ivory)',
        stagger: 0.15,
        scrollTrigger: {
          trigger: bandRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 0.6
        }
      })
    }, bandRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.proof} ref={containerRef}>
      <div className={styles.band} ref={bandRef}>
        <div className={styles.visuallyHidden}>
          Custom Tattoos, Fine Art, Illustration, Traveler Artist, Mumbai, Navi Mumbai
        </div>
        <p className={styles.bandLine} aria-hidden="true">
          <span className={`${styles.bandWord} js-band-word`}>Custom&nbsp;Tattoos</span>
          <span className={styles.bandSeparator}>·</span>
          <span className={`${styles.bandWord} js-band-word`}>Fine&nbsp;Art</span>
          <span className={styles.bandSeparator}>·</span>
          <span className={`${styles.bandWord} js-band-word`}>Illustration</span>
          <span className={styles.bandSeparator}>·</span>
          <span className={`${styles.bandWord} js-band-word`} data-accent="true">Traveler&nbsp;Artist</span>
          <span className={styles.bandSeparator}>·</span>
          <span className={`${styles.bandWord} js-band-word`}>Mumbai</span>
          <span className={styles.bandSeparator}>·</span>
          <span className={`${styles.bandWord} js-band-word`}>Navi&nbsp;Mumbai</span>
        </p>
      </div>

      <div className={styles.proofGrid}>
        <div className={styles.proofLeft}>
          <h2 className={styles.proofHeadline}>Ink that goes deeper than skin.</h2>
          <p className={styles.proofBody}>
            Every person carries something they have not said out loud. I listen
            first. Then I translate it into a mark that honours where you have
            been, and where you are going. The conversation usually takes longer
            than the tattoo. That is on purpose.
          </p>
        </div>

        <div className={styles.proofRight}>
          <div className={styles.stat}>
            <p className={styles.statFigure}>500+</p>
            <p className={styles.statLabel}>Tattoos completed</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statFigure}>100+</p>
            <p className={styles.statLabel}>Custom designs</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statFigure}>Since<br />2021</p>
            <p className={styles.statLabel}>Tattooing</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statFigure}>Fine<br />Arts</p>
            <p className={styles.statLabel}>Diploma, JK Academy</p>
          </div>
        </div>
      </div>
    </section>
  )
}
