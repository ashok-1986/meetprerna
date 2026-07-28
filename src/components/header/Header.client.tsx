'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Logo } from './Logo'
import { NavPill } from './NavPill'
import { MobileMenu } from './MobileMenu'
import { recordInteraction } from '@/lib/behaviour'
import styles from './header.module.css'



export function HeaderClient() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollYRef = useRef(0)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const queued = useRef(false)
  // Continuous progress from 0 to 1
  const state = useRef<number | null>(null)

  // Scroll-shrink: writes --scroll-progress and data-scrolled to the root element.
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const applyProgress = (p: number) => {
      if (p === state.current) return
      state.current = p
      root.style.setProperty('--scroll-progress', p.toString())
      root.setAttribute('data-scrolled', p === 1 ? 'true' : 'false')
    }

    const apply = () => {
      queued.current = false

      if (reduceMotion.matches) {
        applyProgress(1)
        return
      }

      const y = window.scrollY
      const isHome = pathname === '/'
      const thresholdStart = isHome ? window.innerHeight * 1.5 : 0
      const thresholdEnd = thresholdStart + 250

      if (y >= thresholdEnd) {
        applyProgress(1)
      } else if (y <= thresholdStart) {
        applyProgress(0)
      } else {
        applyProgress(Number(((y - thresholdStart) / 250).toFixed(3)))
      }
    }

    const onScroll = () => {
      if (queued.current) return
      queued.current = true
      requestAnimationFrame(apply)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    reduceMotion.addEventListener('change', apply)

    if (reduceMotion.matches) {
      applyProgress(1)
    } else {
      const y = window.scrollY
      const isHome = pathname === '/'
      const thresholdStart = isHome ? window.innerHeight * 1.5 : 0
      const thresholdEnd = thresholdStart + 250
      applyProgress(y >= thresholdEnd ? 1 : y <= thresholdStart ? 0 : Number(((y - thresholdStart) / 250).toFixed(3)))
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      reduceMotion.removeEventListener('change', apply)
    }
  }, [pathname])

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
          <div className={styles.headerInner}>
            <Logo />

            <NavPill />

            <div className={styles.rightCluster}>
              <Link
                href="/consulting"
                className={styles.ctaDesktop}
                onClick={handleCTAClick}
              >
                Start a conversation
              </Link>

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
