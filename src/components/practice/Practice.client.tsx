'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './practice.module.css'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    title: "01 Mapping The Self",
    desc: "Choosing to mark your skin is a decision about who you are becoming. I explore the meaning behind the image before I draw a single line."
  },
  {
    title: "02 Words Before Ink",
    desc: "Every piece begins with a quiet conversation. No pressure, no rushed sketches. I listen to your story until the vision is clear enough to translate."
  },
  {
    title: "03 The Abstract Form",
    desc: "Your story is translated into abstract art, crafted for your unique contours. Custom ink designed to age beautifully over decades, never in a rush."
  },
  {
    title: "04 A Safe Exhale",
    desc: "The studio is a quiet room. A place to pause, to be seen, and to leave a part of your story permanently etched in peace."
  }
]

export function Practice() {
  const containerRef = useRef<HTMLElement>(null)
  
  useLayoutEffect(() => {
    let mm: gsap.MatchMedia
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.js-reveal', { opacity: 1, y: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.js-reveal', { opacity: 0, y: 12 })
        
        gsap.to('.js-reveal', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        })
      })
    }, containerRef)

    return () => {
      mm?.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={containerRef} className={styles.section}>
      {pillars.map((pillar) => (
        <div key={pillar.title} className={`${styles.row} js-reveal`}>
          <div className={styles.leftAnchor}>
            <h2 className={styles.pillarTitle}>{pillar.title}</h2>
          </div>
          <div className={styles.rightAnchor}>
            <p className={styles.pillarDesc}>{pillar.desc}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
