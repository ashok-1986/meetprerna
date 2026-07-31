'use client'

import { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './PillarChars.module.css'

gsap.registerPlugin(ScrollTrigger)

interface PillarScrubProps {
  pillars: readonly { title: string; body: string }[]
}

export function PillarScrub({ pillars }: PillarScrubProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const wordData = useMemo(() => {
    return pillars.map((pillar) => {
      const parts = pillar.body.match(/\S+\s*/g) || []
      const order = (() => {
        const arr = Array.from({ length: parts.length }, (_, i) => i)
        let seed = parts.length * 7
        for (let i = arr.length - 1; i > 0; i--) {
          seed = (seed * 9301 + 49297) % 233280
          const j = Math.floor((seed / 233280) * (i + 1))
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
      })()
      return { words: parts, order }
    })
  }, [pillars])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const wordEls = section.querySelectorAll<HTMLElement>('[data-word]')
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

      let step = 0
      const total = wordEls.length

      wordData.forEach(({ order }) => {
        order.forEach((wordIndex) => {
          const w = wordEls[wordIndex + step]
          if (!w) return
          const out = w.querySelector<HTMLElement>('[data-out]')
          const inn = w.querySelector<HTMLElement>('[data-in]')
          if (!out || !inn) return

          const t = step / Math.max(total - 1, 1)
          tl.to(out, { x: 16, opacity: 0, duration: 0.12, ease: 'power2.inOut' }, t)
          tl.fromTo(inn, { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.12, ease: 'power2.inOut' }, t)
        })
        step += order.length
      })
    }, section)

    return () => ctx.revert()
  }, [wordData])

  return (
    <section ref={sectionRef} className={styles.section}>
      <span className={styles.sectionLabel}>THE PRACTICE</span>
      {pillars.map((pillar, pi) => (
        <div key={pillar.title} className={styles.pillar}>
          <p className={styles.pillarTitle}>{pillar.title}</p>
          <p className={styles.pillarBody} role="group" aria-label={pillar.body}>
            {wordData[pi]?.words.map((word, wi) => (
              <span key={wi} data-word className={styles.wrap} aria-hidden="true">
                <span data-out className={styles.out}>{word}</span>
                <span data-in className={styles.in}>{word}</span>
              </span>
            ))}
          </p>
        </div>
      ))}
    </section>
  )
}
