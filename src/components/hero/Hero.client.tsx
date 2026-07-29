'use client'

import { useRef, useLayoutEffect, useState } from 'react'
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
  const [isLoaded, setIsLoaded] = useState(false)

  useLayoutEffect(() => {
    let isMounted = true
    let mm: gsap.MatchMedia
    const ctx = gsap.context(() => {
      const headlineElWords = gsap.utils.toArray('.reveal-headline')
      const subheadElWords = gsap.utils.toArray('.reveal-subhead')
      const cta = ctaRef.current
      mm = gsap.matchMedia()
      
      if (photoRef.current) {
        gsap.set(photoRef.current, { scale: 1.15 })
        const initVal = 'radial-gradient(circle 0% at 50% 50%, black 100%, transparent 100%)'
        photoRef.current.style.maskImage = initVal
        photoRef.current.style.webkitMaskImage = initVal
      }

      gsap.set([headlineElWords, subheadElWords], { 
        y: 12, 
        autoAlpha: 0,
        clipPath: 'inset(0% 0% 100% 0%)'
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

        // Stagger logic: apply transition-delay via inline styles to each .char
        const chars = containerRef.current?.querySelectorAll('.reveal-headline .char')
        chars?.forEach((char, index) => {
          (char as HTMLElement).style.transitionDelay = `${index * 0.03}s`
        })

        // Safe Font Ready + Fallback Timeout
        const triggerAnimation = () => {
          if (isMounted) {
            setIsLoaded(true)
            heroTl.play()
          }
        }
        
        if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
          document.fonts.ready.then(triggerAnimation)
          setTimeout(triggerAnimation, 1000) 
        } else {
          triggerAnimation()
        }

        // M22 Fly-Through has been removed.
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const chars = containerRef.current!.querySelectorAll('.reveal-headline .char')
        gsap.set(chars, { y: 0 })
        gsap.set(subheadElWords, { y: 0, autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(cta, { y: 0, autoAlpha: 1 })
        if (photoRef.current) {
          gsap.set(photoRef.current, { scale: 1.0 })
          photoRef.current.style.maskImage = 'none'
          photoRef.current.style.webkitMaskImage = 'none'
        }
      })
    }, containerRef)

    return () => {
      isMounted = false
      mm?.revert()
      ctx.revert()
    }
  }, [])

  // True Edge-to-Edge Typography Measurement
  useLayoutEffect(() => {
    if (typeof document === 'undefined') return

    const measureAndApply = () => {
      const headline = containerRef.current?.querySelector(`.${styles.heroHeadline}`) as HTMLElement
      if (!headline) return

      const lines = headline.querySelectorAll('.reveal-headline') as NodeListOf<HTMLElement>
      
      lines.forEach(line => {
        // Create clone to measure natural width accurately without layout constraints
        const clone = document.createElement('span')
        clone.textContent = line.textContent
        clone.style.fontFamily = 'var(--font-cormorant), serif'
        clone.style.fontWeight = '300'
        clone.style.fontSize = '1000px'
        clone.style.letterSpacing = '-0.02em'
        clone.style.position = 'absolute'
        clone.style.visibility = 'hidden'
        clone.style.whiteSpace = 'nowrap'
        document.body.appendChild(clone)
        
        const naturalWidth = clone.getBoundingClientRect().width
        document.body.removeChild(clone)

        // Calculate the cqi needed for this specific line to hit 100% width
        const factor = (1000 / naturalWidth) * 100
        
        // Wrap it in the established clamp to respect the layout bounds
        line.style.fontSize = `clamp(2rem, min(${factor}cqi, 22svh), 15rem)`
        line.style.whiteSpace = 'nowrap'
        line.style.display = 'block'
      })
    }

    if (document.fonts) {
      document.fonts.ready.then(measureAndApply)
    } else {
      measureAndApply()
    }
  }, [])


  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={styles.heroCamera}>

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
        <div className={`${styles.heroContent} ${isLoaded ? styles.isLoaded : ''}`}>
          <div className={styles.heroContentInner}>
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
              <span key={`hl-${i}`} className="reveal-headline line" aria-hidden="true" style={{ display: 'block', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {line.split('').map((char, charIndex) => (
                  <span key={`char-${charIndex}`} className="char" style={{ display: 'inline-block', transform: 'translate3d(0, 120%, 0)' }}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            ))}
          </h1>
            <div className={styles.heroCtaWrap}>
              <Link ref={ctaRef} href="/consulting" className={styles.heroCta}>
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
