'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './M3Reveal.module.css'

interface M3RevealProps {
  children: React.ReactNode
  className?: string
}

export function M3Reveal({ children, className = '' }: M3RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'idle' | 'hidden' | 'visible'>('idle')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setState('visible')
      return
    }

    // Check if element is already in the viewport
    const rect = el.getBoundingClientRect()
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0
    if (inViewport) {
      // Already visible — reveal immediately, skip the hide-then-show flash
      setState('visible')
      return
    }

    // Not yet visible — hide it and set up observer
    setState('hidden')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px', threshold: 0.05 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const revealClass =
    state === 'hidden'
      ? `${styles.reveal} ${styles.hidden}`
      : state === 'visible'
        ? `${styles.reveal} ${styles.visible}`
        : '' // 'idle' — no opacity class, renders naturally

  return (
    <div ref={ref} className={`${className} ${revealClass}`}>
      {children}
    </div>
  )
}
