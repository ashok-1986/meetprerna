'use client'

import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './hero.module.css'

gsap.registerPlugin(CustomEase, ScrollTrigger)

const headlineLines = [
  "Beyond Ink:",
  "Your Story,",
  "Translated",
  "into Abstract Art"
]

const subhead = "Custom tattoos, original paintings and sketches: made in conversation, never in a rush."
const subheadWords = subhead.split(' ')

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const headlineElWords = gsap.utils.toArray('.reveal-headline')
      const subheadElWords = gsap.utils.toArray('.reveal-subhead')
      const cta = ctaRef.current
      const mm = gsap.matchMedia()
      
      if (photoRef.current) {
        gsap.set(photoRef.current, { scale: 1.15 })
        const initVal = 'radial-gradient(circle 0% at 50% 50%, black 100%, transparent 100%)'
        photoRef.current.style.maskImage = initVal
        photoRef.current.style.webkitMaskImage = initVal
      }

      gsap.set([headlineElWords, subheadElWords], { 
        y: 12, 
        autoAlpha: 0,
        clipPath: 'inset(100% 0 0 0)'
      })
      gsap.set(cta, { y: 12, autoAlpha: 0 })
      gsap.set(headlineElWords, { y: 0 }) // Headline doesn't move on y, only sub/cta

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const heroTl = gsap.timeline({ paused: true })
        const maskProxy = { spread: 0 }

        heroTl
          .to(maskProxy, {
            spread: 150,
            duration: 0.8,
            ease: CustomEase.create('custom', '0.23, 1, 0.32, 1'),
            onUpdate: () => {
              if (photoRef.current) {
                const val = `radial-gradient(circle ${maskProxy.spread}% at 50% 50%, black 100%, transparent 100%)`
                photoRef.current.style.maskImage = val
                photoRef.current.style.webkitMaskImage = val
              }
            }
          }, 0)
          .to(photoRef.current, {
            scale: 1.0,
            duration: 0.8,
            ease: CustomEase.create('custom', '0.23, 1, 0.32, 1')
          }, 0)
          .to(headlineElWords, {
            autoAlpha: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: CustomEase.create('custom', '0.23, 1, 0.32, 1'),
            stagger: 0.1,
            duration: 1.5
          }, 0)
          .to(subheadElWords, {
            y: 0,
            autoAlpha: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: CustomEase.create('custom', '0.23, 1, 0.32, 1'),
            stagger: 0.02,
            duration: 1.5
          }, 0) // start at same time as headline

        // CTA reveals on scroll when 30% above bottom (top 70%)
        gsap.to(cta, {
          scrollTrigger: {
            trigger: cta,
            start: "top 70%"
          },
          y: 0,
          autoAlpha: 1,
          duration: 1.0,
          ease: CustomEase.create('custom', '0.23, 1, 0.32, 1')
        })

        // Fire on load
        gsap.delayedCall(0.1, () => {
          heroTl.play()
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([headlineElWords, subheadElWords], { y: 0, autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(cta, { y: 0, autoAlpha: 1 })
        if (photoRef.current) {
          gsap.set(photoRef.current, { scale: 1.0 })
          photoRef.current.style.maskImage = 'none'
          photoRef.current.style.webkitMaskImage = 'none'
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])


  return (
    <section ref={containerRef} className={styles.hero}>
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
      <div className={styles.heroContent}>
        <p className={styles.heroSub}>
          <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>{subhead}</span>
          {subheadWords.map((word, i) => (
            <span key={`sw-${i}`} className="reveal-subhead" aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
              {word}{i < subheadWords.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
        <h1 className={styles.heroHeadline} aria-label={headlineLines.join(' ')}>
          {headlineLines.map((line, i) => (
            <span key={`hl-${i}`} className="reveal-headline" aria-hidden="true" style={{ display: 'block' }}>
              {line}
            </span>
          ))}
        </h1>
        <Link ref={ctaRef} href="/consulting" className={styles.heroCta}>
            Start a conversation
          </Link>
      </div>
    </section>
  )
}
