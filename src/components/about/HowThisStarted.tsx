'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HowThisStarted.module.css';

gsap.registerPlugin(ScrollTrigger);

const PARAGRAPHS = [
  `Art found me before I could explain it. As a child I was quiet, almost too quiet, but performing let me be seen without needing the right words for it. That feeling never left.`,
  `Then came the part where I tried to be sensible. I chose commerce because it felt safe, and for a while I told myself that was enough. It wasn't. A friend who chose their passion over comfort was the mirror I needed. I saw myself in what she was brave enough to do, and I understood I'd been ignoring my own calling for a long time.`,
  `So I left. I moved to Mumbai chasing that feeling, and a month later the world shut down. Lockdown could have ended it right there. Instead I picked up fine art seriously for the first time, not for a certificate, but because it was the one thing that kept me steady when everything else had stopped.`,
  // TODO(owner): tattooing start year unconfirmed — bio source says Sept
  // 2022, homepage stats say "Since 2021," needs Prerna's confirmation
  // before either is treated as correct. Year intentionally omitted below.
  `Painting came first. Abstract work, mostly on paper, mostly for myself. I started on someone else's studio floor, and years later the work is under my own name.`,
  `At some point a canvas on a wall stopped being enough. People don't want to look at their life transitions from across a room. They want to carry them. Grief, a decision, something that finally went right, those things want a place to live, and skin turned out to be the place. So I brought the brush with me. The way I think about weight, and where a line thickens or thins, comes from painting, not from a tattoo apprenticeship. That's why my work looks the way it does.`,
  `Tattooing found me almost by accident, needles and all, which still makes me laugh given where I ended up. But the material I actually work with was never ink. It's people's stories. Someone tells me something they haven't said out loud, and I try to give it a shape they can carry.`,
  `I've always been drawn to people, listening, understanding what someone's carrying before they've fully said it. That's shaped my art more than any single teacher. But the actual making, the sketch, the linework, needs to happen alone. Quiet is where the ideas finish.`,
  `I still don't have it all figured out, and I've stopped pretending I do. Every mistake still teaches me something, one piece at a time.`,
]

export function HowThisStarted() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.gs-howstarted-reveal', { opacity: 1, y: 0 })
      })

      // Reuses the homepage stat grid's ACTUAL shipped scroll-reveal
      // values (src/components/stats/StatsGrid.tsx), not HOME-PRD.md's
      // written spec for it — the two disagree (see HOME-PRD.md Block 03
      // note). StatsGrid.tsx is the source of truth.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.gs-howstarted-reveal',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
            },
          }
        )
      })
    }, sectionRef)

    return () => {
      mm?.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="how-started-heading">
      <div className={styles.left}>
        <h2 id="how-started-heading" className={styles.heading}>
          How this started
        </h2>
      </div>
      <div className={styles.right}>
        {PARAGRAPHS.map((text, i) => (
          <p key={i} className={`${styles.bodyText} gs-howstarted-reveal`}>
            {text}
          </p>
        ))}
      </div>
    </section>
  )
}

export default HowThisStarted
