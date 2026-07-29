'use client'

import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './hero.module.css'

gsap.registerPlugin(CustomEase, ScrollTrigger)

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)


  useLayoutEffect(() => {
    let mm: gsap.MatchMedia
    const ctx = gsap.context(() => {
      const subheadElWords = gsap.utils.toArray('.reveal-subhead')
      const cta = ctaRef.current
      mm = gsap.matchMedia()
      
      if (photoRef.current) {
        gsap.set(photoRef.current, { scale: 1.15 })
        const initVal = 'radial-gradient(circle 0% at 50% 50%, black 100%, transparent 100%)'
        photoRef.current.style.maskImage = initVal
        photoRef.current.style.webkitMaskImage = initVal
      }

      gsap.set(subheadElWords, { 
        y: 12, 
        autoAlpha: 0,
        clipPath: 'inset(0% 0% 100% 0%)'
      })
      gsap.set(cta, { y: 12, autoAlpha: 0 })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const maskProxy = { spread: 0 }
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=50%",
            scrub: 1,
          }
        })

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

        // Native Text Splitting Logic
        if (headlineRef.current) {
          const text = headlineRef.current.textContent || ''
          const words = text.split(' ')
          headlineRef.current.innerHTML = ''
          
          words.forEach((word, wordIdx) => {
            const wordSpan = document.createElement('span')
            wordSpan.className = 'word'
            
            const chars = word.split('')
            chars.forEach((char) => {
              const charSpan = document.createElement('span')
              charSpan.className = 'char'
              charSpan.textContent = char
              wordSpan.appendChild(charSpan)
            })
            
            headlineRef.current!.appendChild(wordSpan)

            // Add standard breaking space span so inline-blocks can wrap
            if (wordIdx < words.length - 1) {
              const spaceSpan = document.createElement('span')
              spaceSpan.textContent = ' '
              headlineRef.current!.appendChild(spaceSpan)
            }
          })
        }

        // Add text reveal and subhead fade to the scrub timeline
        const chars = headlineRef.current ? Array.from(headlineRef.current.querySelectorAll('.char')) : []
        
        heroTl
          .to(chars, 
            { y: '0%', stagger: 0.02, ease: 'power3.out', duration: 1 },
            0
          )
          .to(['.gs-subhead', '.gs-cta'], 
            { opacity: 1, y: 0, stagger: 0.2, ease: 'power3.out', duration: 1 },
            "<0.2"
          )

        // Target the inner sticky wrapper to scale down
        gsap.to('.gs-hero-camera', {
          scale: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current, // The 150svh wrapper
            start: "center top", // Starts halfway down the scroll track
            end: "bottom top",   // Ends when the Hero leaves the viewport
            scrub: true,
          }
        });

        // Fade in the black dimmer overlay at the same time
        gsap.to('.gs-hero-dimmer', {
          opacity: 0.6, // Dims the section by 60%
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current, 
            start: "center top", 
            end: "bottom top", 
            scrub: true,
          }
        });
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const chars = headlineRef.current ? Array.from(headlineRef.current.querySelectorAll('.char')) : []
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
      mm?.revert()
      ctx.revert()
    }
  }, [])




  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={`${styles.heroCamera} gs-hero-camera`}>

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
        
        {/* Dimmer overlay for exit animation */}
        <div className="gs-hero-dimmer absolute inset-0 bg-black opacity-0 z-10 pointer-events-none"></div>

        {/* OUTER WRAPPER: This dictates the 100svh height and pushes its child to the bottom */}
        <div 
          className="absolute inset-0 w-full h-[100svh] flex flex-col justify-end z-20 pointer-events-none pb-[max(2rem,env(safe-area-inset-bottom))]"
        >
          
          {/* INNER CLUSTER WRAPPER: This groups the 3 items tightly together. DO NOT remove this div. */}
          <div className="pointer-events-auto flex flex-col items-start gap-4 w-full">
            
            {/* 1. Subhead */}
            <p className="gs-subhead text-left w-full max-w-md text-white px-4 md:px-6">
              Tattoos look striking when fresh, but I design for the decades. Custom ink crafted for your unique contours, made in quiet conversation, and never in a rush.
            </p>
            
            {/* 2. Headline */}
            <h1 ref={headlineRef} className={`${styles.heroHeadline} w-full text-left text-white font-serif tracking-tighter leading-[0.8] text-[clamp(3.25rem,12vw,15rem)] m-0 p-0`}>
              Art That Ages Beautifully.
            </h1>
            
            {/* 3. CTA */}
            <div className="gs-cta px-4 md:px-6 pt-2 m-0">
              <Link href="/consulting" className="text-white border border-white rounded-full px-6 py-2 inline-block hover:bg-white hover:text-black transition-colors duration-300">
                Start a conversation
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
