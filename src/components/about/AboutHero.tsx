'use client'

import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './AboutHero.module.css'

gsap.registerPlugin(ScrollTrigger)

// Single named reference for the portrait — swap the asset later by
// changing this one path, nothing else in this file needs to move.
const PORTRAIT_SRC = '/images/about/prerna_fg.png'
const PORTRAIT_ALT =
  'Grayscale-toned portrait cutout of Prerna in a black blazer, making direct eye contact with the camera.'

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const cameraRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=100%',
            pin: cameraRef.current,
            scrub: 0.6,
          },
        })

        // Portrait scrubs down from an oversized bleed to its settled
        // scale across the first ~45% of the scroll range.
        tl.fromTo(
          imageRef.current,
          { scale: 1.35 },
          { scale: 1, ease: 'none', duration: 0.45 },
          0
        )

        // Headline + CTA fade in once the portrait has mostly settled.
        // Duration brings the timeline's total to 1, so scroll progress
        // maps 1:1 onto timeline time and the 0.45 mark above lands at
        // exactly 45% of the scroll range, not some fraction of it.
        tl.fromTo(
          [headlineRef.current, ctaRef.current],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, ease: 'none', duration: 0.55 },
          0.45
        )
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(imageRef.current, { scale: 1 })
        gsap.set([headlineRef.current, ctaRef.current], { opacity: 1, y: 0 })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={`${styles.section} gs-about-hero-track`}>
      <div ref={cameraRef} className={`${styles.camera} gs-about-hero-camera`}>
        <div className={styles.card}>
          <div ref={imageRef} className={styles.imageWrap}>
            <Image
              src={PORTRAIT_SRC}
              alt={PORTRAIT_ALT}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 1200px"
              className={styles.portraitImage}
            />
          </div>

          <div className={styles.contentOverlay}>
            <h1 ref={headlineRef} className={styles.headline}>
              I am Prerna. An artist first.
            </h1>
            <div ref={ctaRef} className={styles.ctaWrap}>
              <Link href="/consulting" className={styles.ctaPrimary}>
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
