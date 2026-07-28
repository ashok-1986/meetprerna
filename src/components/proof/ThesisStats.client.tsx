'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './thesis-stats.module.css'

gsap.registerPlugin(ScrollTrigger)

export function ThesisStats() {
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
          ease: 'power3.out',
          stagger: 0.04,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
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
      <div className={styles.leftAnchor}>
        <h2 className={`${styles.thesis} js-reveal`}>
          Ink that goes deeper than skin.
        </h2>
      </div>
      
      <div className={styles.rightAnchor}>
        <div className={styles.statsGrid}>
          <div className={`${styles.statItem} js-reveal`}>
            <p className={styles.statFigure}>500+</p>
            <p className={styles.statLabel}>Tattoos completed</p>
          </div>
          <div className={`${styles.statItem} js-reveal`}>
            <p className={styles.statFigure}>100+</p>
            <p className={styles.statLabel}>Custom designs</p>
          </div>
          <div className={`${styles.statItem} js-reveal`}>
            <p className={styles.statFigure}><span>Since<br/>2021</span></p>
            <p className={styles.statLabel}>Tattooing</p>
          </div>
          <div className={`${styles.statItem} js-reveal`}>
            <p className={styles.statFigure}><span>Fine<br/>Arts</span></p>
            <p className={styles.statLabel}>Diploma, JK Academy</p>
          </div>
        </div>
      </div>
    </section>
  )
}
