'use client'

import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './AboutHero.module.css'

gsap.registerPlugin(ScrollTrigger)

// Single named reference for the background plate — swap the background
// later (e.g. the studio-floor alternative under evaluation) by changing
// this one path, nothing else in this file or its layout needs to move.
const BACKGROUND_SRC = '/images/about/prerna_bg_bw.png'
const BACKGROUND_ALT =
  'Grayscale photo of a garden courtyard: a paved stone path bordered by hedges leads past low bungalow buildings under tall trees.'

const FOREGROUND_SRC = '/images/about/prerna_fg_bw.png'
const FOREGROUND_ALT =
  'Grayscale full-body portrait of Prerna standing in profile, glancing back over her shoulder.'

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const scrollConfig = {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        }

        // Background: further away, moves least (~16 total yPercent).
        gsap.fromTo(
          bgRef.current,
          { yPercent: -8 },
          { yPercent: 8, ease: 'none', scrollTrigger: scrollConfig }
        )

        // Foreground: closer to the viewer, moves closer to 1:1 with
        // scroll (~40 total yPercent) so it reads as nearer than the
        // background as the section scrolls past.
        gsap.fromTo(
          fgRef.current,
          { yPercent: -20 },
          { yPercent: 20, ease: 'none', scrollTrigger: scrollConfig }
        )
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([bgRef.current, fgRef.current], { yPercent: 0 })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.section} aria-hidden="false">
      <div ref={bgRef} className={styles.bgWrap}>
        <Image
          src={BACKGROUND_SRC}
          alt={BACKGROUND_ALT}
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />
      </div>

      <div ref={fgRef} className={styles.fgWrap}>
        <div className={styles.fgImageWrap}>
          <Image
            src={FOREGROUND_SRC}
            alt={FOREGROUND_ALT}
            fill
            priority
            sizes="(max-width: 767px) 72vw, 460px"
            className={styles.fgImage}
          />
        </div>
      </div>
    </section>
  )
}

export default AboutHero
