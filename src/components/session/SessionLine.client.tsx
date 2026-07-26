'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SessionLine.module.css'

gsap.registerPlugin(ScrollTrigger)

export function SessionLine() {
  const pathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const path = pathRef.current
    const svg = svgRef.current
    if (!path || !svg) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: svg,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
    }, svg)

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      className={styles.line}
      viewBox="0 0 100 5000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        className={styles.path}
        d="M 50 0 C 50 200, 70 400, 50 600 C 30 800, 50 1000, 60 1200 C 70 1400, 40 1600, 50 1800 C 60 2000, 40 2200, 50 2400 C 60 2600, 40 2800, 50 3000 C 60 3200, 40 3400, 50 3600 C 60 3800, 40 4000, 50 4200 C 60 4400, 50 4600, 50 4800 L 50 4970 L 40 4970"
      />
    </svg>
  )
}
