'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { NavPill } from './NavPill'
import { MobileMenu } from './MobileMenu'
import { recordInteraction } from '@/lib/behaviour'
import styles from './header.module.css'

/* Scroll distance over which the header settles into its pill shape.
   120px, not further down the page — the shape should have finished
   moving before the hero content has scrolled past. */
const SHRINK_RANGE = 120

export function HeaderClient() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollYRef = useRef(0)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const queued = useRef(false)
  const lastProgress = useRef(-1)

  // Scroll-shrink: writes --header-progress (0–1) to the root element.
  // Only property driving the pill's shape; see header.module.css.
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const apply = () => {
      queued.current = false

      if (reduceMotion.matches) {
        root.style.setProperty('--header-progress', '1')
        return
      }

      let progress = window.scrollY / SHRINK_RANGE
      progress = progress < 0 ? 0 : progress > 1 ? 1 : progress

      // Round to 3dp so the variable doesn't change every frame by an
      // invisible amount and force a style recalc for nothing.
      progress = Math.round(progress * 1000) / 1000
      if (progress === lastProgress.current) return

      lastProgress.current = progress
      root.style.setProperty('--header-progress', String(progress))
    }

    const onScroll = () => {
      if (queued.current) return
      queued.current = true
      requestAnimationFrame(apply)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    reduceMotion.addEventListener('change', apply)

    // Snap to the correct progress on load — never animate 0 to 1 on
    // a refresh that lands mid-page.
    apply()

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

            <div className={styles.navCluster}>
              {/* Desktop pill nav */}
              <NavPill />

              <div className={styles.rightCluster}>
                {/* CTA */}
                <Link
                  href="/consulting"
                  className={styles.cta}
                  aria-label="Start a conversation"
                  onClick={handleCTAClick}
                >
                  <span className={styles.ctaLabel}>Start a conversation</span>
                  <svg
                    className={styles.ctaIconMobile}
                    width="24"
                    height="24"
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
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={handleMenuClose} />
    </>
  )
}
