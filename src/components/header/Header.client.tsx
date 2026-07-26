'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { CityLine } from './CityLine'
import { NavPill } from './NavPill'
import { MobileMenu } from './MobileMenu'
import { recordInteraction } from '@/lib/behaviour'
import styles from './header.module.css'

interface HeaderClientProps {
  cityLine: string | null
}

export function HeaderClient({ cityLine }: HeaderClientProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollYRef = useRef(0)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY

        if (currentScrollY <= 0) {
          setIsVisible(true)
          lastScrollY.current = 0
          ticking.current = false
          return
        }

        const delta = currentScrollY - lastScrollY.current

        if (Math.abs(delta) > 80) {
          if (delta > 0) {
            setIsVisible(false)
          } else {
            setIsVisible(true)
          }
          lastScrollY.current = currentScrollY
        }

        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
        className={styles.header}
        data-visible={isVisible}
      >
        <div className={styles.scrim} aria-hidden="true" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Logo />
          <CityLine cityLine={cityLine} />
        </div>

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
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={handleMenuClose}
        cityLine={cityLine}
      />
    </>
  )
}
