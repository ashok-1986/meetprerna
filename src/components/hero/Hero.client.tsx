'use client'

import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './hero.module.css'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const photo = photoRef.current
      const content = contentRef.current
      const mm = gsap.matchMedia()
    
      gsap.set(content, { opacity: 0 })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
            pin: pinRef.current,
            pinSpacing: false
          }
        })

        heroTl
          .to(photo, {
            scale: 0.62,
            borderRadius: '24px',
            ease: 'none',
            duration: 0.45
          }, 0)
          .to(content, {
            opacity: 1,
            ease: 'none',
            duration: 0.55
          }, 0.45)
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(photo, { scale: 0.62, borderRadius: '24px' })
        gsap.set(content, { opacity: 1 })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <section ref={containerRef} className={styles.hero}>
      <div ref={pinRef} className={styles.heroPin}>
        <div className={styles.heroPhotoWrap}>
          <div ref={photoRef} className={styles.heroPhoto}>
            <Image
              src="/images/hero/prerna-hero.jpeg"
              alt="Prerna, hands resting on her own face, tattoo visible across her chest"
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div ref={contentRef} className={styles.heroContent}>
          <h1 className={styles.heroHeadline}>
            Trained in fine art.<br />Fluent in skin.
          </h1>
          <p className={styles.heroSub}>
            Custom tattoos, paintings, and sketches, made in conversation, never in a rush.
          </p>
          <Link href="/consulting" className={styles.heroCta}>
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  )
}
