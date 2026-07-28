'use client'

import { useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './index.module.css'

gsap.registerPlugin(CustomEase, ScrollTrigger)

const indexRows = [
  { label: "01 Tattoos (48)", href: "/portfolio?medium=tattoo" },
  { label: "02 Paintings (12)", href: "/portfolio?medium=painting" },
  { label: "03 Sketches (30)", href: "/portfolio?medium=sketch" },
  { label: "04 The Practice", href: "/sanctuary" }
]

export function IndexBlock() {
  const containerRef = useRef<HTMLElement>(null)
  
  useLayoutEffect(() => {
    let mm: gsap.MatchMedia
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray('.reveal-row')
      mm = gsap.matchMedia()
      
      // Initialize state
      gsap.set(rows, { y: 12, autoAlpha: 0 })
      
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(rows, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: CustomEase.create('custom', '0.23, 1, 0.32, 1'),
          stagger: 0.040,
        })
      })
      
      // Strictly disable all animations
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(rows, { y: 0, autoAlpha: 1 })
      })
      
    }, containerRef)
    
    return () => {
      mm?.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={containerRef} className={styles.indexSection}>
      {indexRows.map((row, i) => (
        <Link key={i} href={row.href} className={`${styles.row} reveal-row`}>
          <h2 className={styles.rowText}>{row.label}</h2>
        </Link>
      ))}
    </section>
  )
}
