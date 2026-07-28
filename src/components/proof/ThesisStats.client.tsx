'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './thesis-stats.module.css'

gsap.registerPlugin(ScrollTrigger)

export function ThesisStats() {
  const containerRef = useRef<HTMLElement>(null)
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (reduce.matches) {
        gsap.set('.js-reveal', { opacity: 1, y: 0 })
        return
      }

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
    }, containerRef)

    return () => ctx.revert()
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
