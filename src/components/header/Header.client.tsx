'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { NavPill } from './NavPill'
import { MobileMenu } from './MobileMenu'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { recordInteraction } from '@/lib/behaviour'
import styles from './header.module.css'

/* Three discrete states, not a continuous scrub. Thresholds are SCROLL
   DISTANCE, not scroll events — a trackpad fires dozens of events per
   gesture, a wheel fires discrete notches, touch fires continuously,
   so "distance" is the only consistent input across devices.
     0 — full bleed
     1 — halfway in
     2 — settled
   Hysteresis (separate enter/exit thresholds) prevents the header
   flickering between states if the page rests exactly on a boundary. */
const ENTER_1 = 80
const ENTER_2 = 220
const EXIT_1 = 50
const EXIT_2 = 170

export function HeaderClient() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollYRef = useRef(0)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const queued = useRef(false)
  // -1 is not a real state — it guarantees the first setState call
  // (even to 0) actually writes data-nav, instead of being skipped by
  // the "next === current" no-op guard.
  const state = useRef(-1)

  // Scroll-shrink: writes data-nav (0/1/2) to the root element. Each
  // state maps to its own width/height/radius/margin-top in
  // header.module.css, animated by a real CSS transition — the
  // easing lives on the discrete state change, not on the scroll
  // input itself. See header.module.css for why.
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const setState = (next: number) => {
      if (next === state.current) return
      state.current = next
      root.setAttribute('data-nav', String(next))
    }

    const apply = () => {
      queued.current = false

      if (reduceMotion.matches) {
        setState(2)
        return
      }

      const y = window.scrollY

      // Resolve to convergence, not one step. A single scroll event
      // (a fast flick, an anchor jump, an instant scrollTo) can cross
      // more than one threshold at once — stepping only once per call
      // would strand the header a state behind until another scroll
      // event happens to fire.
      let next = state.current
      for (let i = 0; i < 3; i++) {
        let stepped = next
        if (stepped === 0 && y >= ENTER_1) stepped = 1
        else if (stepped === 1 && y >= ENTER_2) stepped = 2
        else if (stepped === 1 && y < EXIT_1) stepped = 0
        else if (stepped === 2 && y < EXIT_2) stepped = 1

        if (stepped === next) break
        next = stepped
      }

      setState(next)
    }

    const onScroll = () => {
      if (queued.current) return
      queued.current = true
      requestAnimationFrame(apply)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    reduceMotion.addEventListener('change', apply)

    // Snap to the correct state on load — never animate through 0/1/2
    // on a refresh that lands mid-page.
    if (reduceMotion.matches) {
      setState(2)
    } else {
      const y = window.scrollY
      setState(y >= ENTER_2 ? 2 : y >= ENTER_1 ? 1 : 0)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      reduceMotion.removeEventListener('change', apply)
    }
  }, [])

  const handleMenuOpen = useCallback(() => {
    scrollYRef.current = window.scrollY
    setMenuOpen(true)
  }, [])

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false)
    requestAnimationFrame(() => {
      menuButtonRef.current?.focus()
    })
  }, [])

  const handleCTAClick = useCallback(() => {
    recordInteraction('cta_tapped', {
      page: window.location.pathname,
      position: 'header',
    })
  }, [])

  return (
    <>
      <header className={styles.headerBand}>
        <div className={styles.frame}>
          <div className={styles.navGrid}>
            <Logo />

            {/* Desktop pill nav — true centre column. Pinned to the
                grid's centre regardless of how wide the logo or the
                right cluster get; only they travel inward. */}
            <NavPill />

            <div className={styles.rightCluster}>
              {/* CTA — desktop: full interactive hover-reveal button.
                  Below 1024px there's no room for the settled pill to
                  hold the full label, so a separate compact icon-only
                  link takes over; only one of the two is ever visible
                  (display: none removes the other from the tab order
                  too), same pattern as .pill vs .menuButton below. */}
              <InteractiveHoverButton
                href="/consulting"
                className={styles.ctaDesktop}
                onClick={handleCTAClick}
              >
                Start a conversation
              </InteractiveHoverButton>

              <Link
                href="/consulting"
                className={styles.ctaMobile}
                aria-label="Start a conversation"
                onClick={handleCTAClick}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Mobile menu button — opens only */}
              <button
                ref={menuButtonRef}
                className={styles.menuButton}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'Close menu' : 'Menu'}
                onClick={handleMenuOpen}
              >
                <svg
                  className={styles.menuIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={handleMenuClose} />
    </>
  )
}
