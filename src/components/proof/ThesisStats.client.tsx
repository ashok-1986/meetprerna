'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ThesisStats() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.gs-stat-reveal', { opacity: 1, y: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.gs-stat-reveal', 
          { opacity: 0, y: 16 }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            stagger: 0.12, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
            }
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
    <section ref={sectionRef} className="w-full bg-[#111111] py-24 md:py-32 px-6 md:px-8">
      <div className="flex flex-col md:flex-row justify-between w-full mx-auto max-w-[1800px]">
        
        {/* LEFT ANCHOR: Overline & Thesis */}
        <div className="w-full md:w-[50%] pr-0 md:pr-12 mb-20 md:mb-0 flex flex-col justify-start">
          <div className="gs-stat-reveal opacity-0 w-full max-w-[300px] border-b border-white/10 pb-4 mb-12">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60">
              Credibility
            </span>
          </div>
          <h2 className="gs-stat-reveal opacity-0 font-serif text-[#FDFFE9] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] max-w-[14ch]">
            Ink that goes deeper than skin.
          </h2>
        </div>

        {/* RIGHT ANCHOR: 2x2 Grid */}
        <div className="w-full md:w-[40%] grid grid-cols-2 md:border-l border-white/10">
          
          {/* Cell 1: 500+ */}
          <div className="gs-stat-reveal opacity-0 group border-r border-b border-white/10 p-6 lg:p-10 transition-colors hover:bg-[#FDFFE9]/5">
            <div className="font-serif text-5xl lg:text-[5.5rem] leading-[1] text-[#FDFFE9] mb-8">
              500+
            </div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/60">
              Tattoos completed
            </p>
          </div>

          {/* Cell 2: 100+ */}
          <div className="gs-stat-reveal opacity-0 group border-b border-white/10 p-6 lg:p-10 transition-colors hover:bg-[#FDFFE9]/5">
            <div className="font-serif text-5xl lg:text-[5.5rem] leading-[1] text-[#FDFFE9] mb-8">
              100+
            </div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/60">
              Custom designs
            </p>
          </div>

          {/* Cell 3: Since 2021 */}
          <div className="gs-stat-reveal opacity-0 group border-r border-white/10 p-6 lg:p-10 transition-colors hover:bg-[#FDFFE9]/5">
            <div className="font-serif text-5xl lg:text-[5.5rem] leading-[1.05] text-[#FDFFE9] mb-8">
              Since<br />2021
            </div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/60">
              Tattooing
            </p>
          </div>

          {/* Cell 4: Fine Arts */}
          <div className="gs-stat-reveal opacity-0 group p-6 lg:p-10 transition-colors hover:bg-[#FDFFE9]/5">
            <div className="font-serif text-5xl lg:text-[5.5rem] leading-[1.05] text-[#FDFFE9] mb-8">
              Fine<br />Arts
            </div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/60">
              Diploma, JK Academy
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
