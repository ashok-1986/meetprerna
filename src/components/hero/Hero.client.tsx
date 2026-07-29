'use client'

import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site } from '@/content/site'
import styles from './hero.module.css'

gsap.registerPlugin(CustomEase, ScrollTrigger)

/**
 * Native text splitter — wraps each word in a .word span,
 * each character inside in a .char span.
 * CSS rules on .word (overflow:hidden) and .char (translateY:120%)
 * guarantee the text is invisible the instant these spans exist in the DOM.
 */
function splitText(el: HTMLElement) {
  const text = el.textContent || ''
  el.innerHTML = ''
  text.split(/(\s+)/).forEach(token => {
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(token))
      return
    }
    const wordSpan = document.createElement('span')
    wordSpan.className = 'word'
    wordSpan.setAttribute('aria-hidden', 'true')
    token.split('').forEach(char => {
      const charSpan = document.createElement('span')
      charSpan.className = 'char'
      charSpan.textContent = char
      wordSpan.appendChild(charSpan)
    })
    el.appendChild(wordSpan)
  })
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- 1. Split headline text into .word/.char spans ---
      // CSS enforces .char { translateY(120%) } and .word { overflow:hidden }
      // so the text is invisible the instant the DOM mutates — before paint.
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.heroHeadline-line')
        lines.forEach(line => splitText(line as HTMLElement))
      }

      // --- 2. FOUC PREP: ensure chars are pushed down, wrappers are styled ---
      gsap.set('.heroHeadline .word', { overflow: 'hidden', verticalAlign: 'bottom', display: 'inline-block' })
      gsap.set('.heroHeadline .char', { y: '120%', display: 'inline-block' })

      // --- 3. Make H1 parent visible (chars remain hidden by word overflow clip) ---
      gsap.set('.heroHeadline', { opacity: 1 })

      // --- 4. Photo mask initial state ---
      if (photoRef.current) {
        gsap.set(photoRef.current, { scale: 1.15 })
        const initVal = 'radial-gradient(circle 0% at 50% 50%, black 100%, transparent 100%)'
        photoRef.current.style.maskImage = initVal
        photoRef.current.style.webkitMaskImage = initVal
      }

      // --- 5. Motion branch ---
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // MASTER TIMELINE WITH PIN
        // GSAP physically locks .gs-hero-camera to the viewport for +=100% of scroll.
        // This bypasses the parent overflow:hidden that breaks CSS sticky.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,   // .gs-hero-track
            start: 'top top',
            end: '+=100%',                   // 100vh of scroll distance
            pin: '.gs-hero-camera',          // GSAP pins the camera
            scrub: true,
          }
        })

        // FIRST HALF (0 → 0.5): Photo reveal + Text reveal
        // Photo mask expansion
        const maskProxy = { spread: 0 }
        tl.to(maskProxy, {
          spread: 150,
          duration: 0.5,
          ease: CustomEase.create('custom', '0.23, 1, 0.32, 1'),
          onUpdate: () => {
            if (photoRef.current) {
              const val = `radial-gradient(circle ${maskProxy.spread}% at 50% 50%, black 100%, transparent 100%)`
              photoRef.current.style.maskImage = val
              photoRef.current.style.webkitMaskImage = val
            }
          }
        }, 0)

        // Photo zoom settle
        tl.to(photoRef.current, {
          scale: 1.0,
          duration: 0.5,
          ease: CustomEase.create('custom2', '0.23, 1, 0.32, 1'),
        }, 0)

        // Characters rise from y:120% to y:0%
        tl.to('.heroHeadline .char', {
          y: '0%',
          stagger: 0.04,
          ease: 'none',
          duration: 0.5,
        }, 0)

        // Subhead + CTA fade in
        tl.fromTo(['.gs-subhead', '.gs-cta'],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, ease: 'none', duration: 0.5 },
          0
        )

        // SECOND HALF (0.5 → 1.0): M23 Scale & Dim exit
        tl.to('.gs-hero-camera', {
          scale: 0.95,
          ease: 'none',
          duration: 0.5,
        }, 0.5)

        tl.to('.gs-hero-dimmer', {
          opacity: 0.6,
          ease: 'none',
          duration: 0.5,
        }, 0.5)
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        // Show everything immediately, no animation, no pinning
        gsap.set('.heroHeadline', { opacity: 1 })
        gsap.set('.heroHeadline .char', { y: '0%' })
        gsap.set('.gs-subhead', { y: 0, opacity: 1 })
        gsap.set(ctaRef.current, { y: 0, opacity: 1 })
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
    <section ref={containerRef} className={`${styles.hero} gs-hero-track`}>
      <noscript>
        <style>{`
          .opacity-0 { opacity: 1 !important; }
          .heroHeadline .char { transform: none !important; }
        `}</style>
      </noscript>

      {/* The Camera — GSAP pin: true locks this to the viewport */}
      <div className={`${styles.heroCamera} gs-hero-camera`}>

        {/* Image Layer */}
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
          {/* Dimmer overlay for M23 exit */}
          <div className="gs-hero-dimmer absolute inset-0 bg-black opacity-0 pointer-events-none"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col justify-end w-full h-full max-w-[1440px] mx-auto px-4 md:px-8 pb-24 md:pb-32">

          {/* Subhead */}
          <p className="gs-subhead opacity-0 text-left w-full max-w-md text-white mb-4">
            {site.hero.subheadLines.map((line, i) => (
              <span key={i} className={`block ${i === 0 ? 'mb-2' : ''}`}>{line}</span>
            ))}
          </p>

          {/* Headline */}
          <h1
            ref={headlineRef}
            aria-label={site.hero.headingAria}
            className={`${styles.heroHeadline} heroHeadline opacity-0 w-full text-left text-white font-serif tracking-tighter leading-[0.8] text-[clamp(3.25rem,12vw,15rem)] m-0 p-0`}
          >
            {site.hero.headingLines.map((line, i) => (
              <span key={i} className="heroHeadline-line block" aria-hidden="true">{line}</span>
            ))}
          </h1>

          {/* CTA */}
          <div className="gs-cta opacity-0 pt-6 m-0">
            <Link
              ref={ctaRef}
              href="/consulting"
              className="text-white border border-white rounded-full px-6 py-2 inline-block hover:bg-white hover:text-black transition-colors duration-300"
            >
              {site.hero.cta}
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
