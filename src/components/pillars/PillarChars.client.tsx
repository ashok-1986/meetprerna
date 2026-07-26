'use client'

import { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './PillarChars.module.css'

gsap.registerPlugin(ScrollTrigger)

interface PillarCharsProps {
  text: string
  className?: string
}

export function PillarChars({ text, className = '' }: PillarCharsProps) {
  const ref = useRef<HTMLDivElement>(null)

  const words = useMemo(() => {
    const parts = text.match(/\S+\s*/g) || []
    return parts.map((w) => w)
  }, [text])

  const order = useMemo(() => {
    const arr = Array.from({ length: words.length }, (_, i) => i)
    let seed = words.length * 7
    for (let i = arr.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280
      const j = Math.floor((seed / 233280) * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [words])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const section = el.closest('section')
    if (!section) return

    const wordEls = el.querySelectorAll<HTMLElement>('[data-word]')
    if (!wordEls.length) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'bottom 35%',
          scrub: 1.5,
        },
      })

      order.forEach((wordIndex, step) => {
        const w = wordEls[wordIndex]
        if (!w) return
        const out = w.querySelector<HTMLElement>('[data-out]')
        const inn = w.querySelector<HTMLElement>('[data-in]')
        if (!out || !inn) return

        const t = step / Math.max(order.length - 1, 1)
        tl.to(out, { x: 16, opacity: 0, duration: 0.12, ease: 'power2.inOut' }, t)
        tl.fromTo(inn, { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.12, ease: 'power2.inOut' }, t)
      })
    }, el)

    return () => ctx.revert()
  }, [order])

  return (
    <div ref={ref} className={className} role="group" aria-label={text}>
      {words.map((word, i) => (
        <span key={i} data-word className={styles.wrap} aria-hidden="true">
          <span data-out className={styles.out}>{word}</span>
          <span data-in className={styles.in}>{word}</span>
        </span>
      ))}
    </div>
  )
}
