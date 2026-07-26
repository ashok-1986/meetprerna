'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './M3Reveal.module.css'

interface M3RevealProps {
  children: React.ReactNode
  className?: string
}

export function M3Reveal({ children, className = '' }: M3RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '-100px 0px', threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${className} ${styles.reveal} ${isVisible ? styles.visible : styles.hidden}`}
    >
      {children}
    </div>
  )
}