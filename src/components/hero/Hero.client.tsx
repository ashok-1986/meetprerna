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
      const headlineElWords = gsap.utils.toArray('.reveal-headline')
      const subheadElWords = gsap.utils.toArray('.reveal-subhead')
      const cta = ctaRef.current
      const mm = gsap.matchMedia()
    
      gsap.set([headlineElWords, subheadElWords, cta], { 
        y: 40, 
        autoAlpha: 0,
        clipPath: 'inset(100% 0 0 0)'
      })

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
          .to(headlineElWords, {
            y: 0,
            autoAlpha: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            stagger: 0.08,
            duration: 1
          }, 0)
          .to(subheadElWords, {
            y: 0,
            autoAlpha: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            stagger: 0.08,
            duration: 1
          }, ">") // start immediately after headline
          .to(cta, {
            y: 0,
            autoAlpha: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            duration: 0.2
          }, ">") // start immediately after subhead
          .set({}, {}, "+=2") // Pad timeline to map reveal to 0-50% of scroll
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([headlineElWords, subheadElWords, cta], { y: 0, autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' })
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
              <span key={`hw-${i}`} className="reveal-headline" aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                {word}{i < headlineWords.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>
          <p className={styles.heroSub} aria-label={subhead}>
            {subheadWords.map((word, i) => (
              <span key={`sw-${i}`} className="reveal-subhead" aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
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
