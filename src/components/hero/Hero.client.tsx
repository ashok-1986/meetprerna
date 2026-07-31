'use client'

import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
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
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Split headline text into .word/.char spans
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.heroHeadline-line')
        lines.forEach(line => splitText(line as HTMLElement))
      }

      // 2. FOUC PREP: Push chars down BEFORE turning on opacity
      gsap.set('.heroHeadline .word', { overflow: 'hidden', verticalAlign: 'bottom', display: 'inline-block', whiteSpace: 'nowrap' })
      gsap.set('.heroHeadline .char', { y: '120%', display: 'inline-block' })

      // 3. Make parent wrappers visible (text remains hidden by the transform above)
      gsap.set('.heroHeadline', { opacity: 1 })

      // 4. Motion branch
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // MASTER TIMELINE WITH PIN
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.gs-hero-track',
            start: 'top top',
            end: '+=100%',
            pin: '.gs-hero-camera',
            scrub: true,
          }
        })

        // FIRST HALF (0 → 0.5): Text + photo reveal
        tl.to('.heroHeadline .char', {
          y: '0%',
          stagger: 0.04,
          ease: 'none',
          duration: 0.5,
        }, 0)

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
        gsap.set('.heroHeadline', { opacity: 1 })
        gsap.set('.heroHeadline .char', { y: '0%' })
        gsap.set('.gs-subhead', { y: 0, opacity: 1 })
        gsap.set('.gs-cta', { y: 0, opacity: 1 })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className={`${styles.hero} gs-hero-track`}>
      {/* FOUC Guard: Restores visibility if JS is disabled */}
      <noscript>
        <style>{`
          .opacity-0 { opacity: 1 !important; }
          .heroHeadline .char { transform: none !important; }
        `}</style>
      </noscript>

      {/* The Camera — GSAP pin: true locks this to the viewport */}
      <div className={`${styles.heroCamera} gs-hero-camera`}>

        {/* Image & Scrim Layer */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/images/hero/prerna-hero.jpeg"
            alt="Prerna, hands resting on her own face, tattoo visible across her chest"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          {/* Bottom scrim for right-anchor text readability */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[1]"></div>
          {/* M23 dimmer overlay */}
          <div className="gs-hero-dimmer absolute inset-0 bg-black opacity-0 z-[2]"></div>
        </div>

        {/* NEXUM-STYLE TWO-ANCHOR CONTENT LAYER */}
        <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-end w-full h-full px-6 md:px-8 pb-16 md:pb-20">

          {/* LEFT ANCHOR: Headline — flex-none prevents Flexbox from squishing */}
          <div className="flex-none">
            <h1
              ref={headlineRef}
              aria-label={site.hero.headingAria}
              className={`${styles.heroHeadline} heroHeadline opacity-0 text-white font-serif tracking-tighter leading-[0.9] text-[clamp(3rem,9.5vw,10rem)] m-0 whitespace-nowrap`}
            >
              {site.hero.headingLines.map((line, i) => (
                <span key={i} className="heroHeadline-line block" aria-hidden="true">{line}</span>
              ))}
            </h1>
          </div>

          {/* RIGHT ANCHOR: Subhead & CTA */}
          {/* Pushed right by justify-between, but text remains left-aligned internally */}
          <div className="w-full md:max-w-[42ch] flex flex-col items-start text-left mt-8 md:mt-0 md:pb-4">
            <p className="gs-subhead opacity-0 text-white/90 text-[1.125rem] leading-relaxed mb-8">
              {site.hero.subheadLines.join(' ')}
            </p>
            <div className="gs-cta opacity-0">
              <InteractiveHoverButton
                href="https://wa.me/917738147935?text=Hello,%20I%20have%20a%20query%20regarding%20tattoo"
                trackingSource="home_hero"
                trackingPage="home"
              >
                {site.hero.cta}
              </InteractiveHoverButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
