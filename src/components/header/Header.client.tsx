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
  const _pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollYRef = useRef(0)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const queued = useRef(false)
  // Continuous progress from 0 to 1
  const _state = useRef<number | null>(null)

  // Scroll-shrink: adds the 'scrolled' class to the header element.
  const headerRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const apply = () => {
      queued.current = false
      const y = window.scrollY
      // 90% of viewport height
      const threshold = window.innerHeight * 0.9
      const isScrolled = y > threshold

      setIsScrolled(prev => {
        if (prev !== isScrolled) return isScrolled
        return prev
      })
    }

    const onScroll = () => {
      if (queued.current) return
      queued.current = true
      requestAnimationFrame(apply)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    
    // Initial check
    apply()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
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
      <header 
        ref={headerRef} 
        className={`${styles.headerBand} ${menuOpen ? styles.navOpen : ''} ${isScrolled ? styles.scrolled : ''}`}
      >
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
