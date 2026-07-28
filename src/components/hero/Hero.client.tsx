'use client'

import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './hero.module.css'

gsap.registerPlugin(ScrollTrigger)

const headline = "Beyond Ink: Your Story, Translated into Abstract Art"
const headlineWords = headline.split(' ')

const subhead = "Custom tattoos, original paintings and sketches: made in conversation, never in a rush."
const subheadWords = subhead.split(' ')

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.reveal-word')
      const cta = ctaRef.current
      const mm = gsap.matchMedia()
    
      gsap.set([words, cta], { y: 40, autoAlpha: 0 })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            pin: pinRef.current,
            pinSpacing: true
          }
        })

        heroTl
          .to(words, {
            y: 0,
            autoAlpha: 1,
            ease: 'none',
            stagger: 0.04,
            duration: 1
          }, 4.3)
          .to(cta, {
            y: 0,
            autoAlpha: 1,
            ease: 'none',
            duration: 0.2
          }, "-=0.1")
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([words, cta], { y: 0, autoAlpha: 1 })
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
          <div className={styles.heroPhoto}>
            <Image
              src="/images/hero/prerna-hero.jpg"
              alt="Prerna, hands resting on her own face, tattoo visible across her chest"
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeadline} aria-label={headline}>
            {headlineWords.map((word, i) => (
              <span key={`hw-${i}`} className="reveal-word" aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                {word}{i < headlineWords.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>
          <p className={styles.heroSub} aria-label={subhead}>
            {subheadWords.map((word, i) => (
              <span key={`sw-${i}`} className="reveal-word" aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                {word}{i < subheadWords.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
          <Link ref={ctaRef} href="/consulting" className={styles.heroCta}>
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  )
}
