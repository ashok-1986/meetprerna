'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'
import { NavPill } from './NavPill'
import { MobileMenu } from './MobileMenu'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { recordInteraction } from '@/lib/behaviour'
import { site } from '@/content/site'
import styles from './header.module.css'

gsap.registerPlugin(ScrollTrigger)



export function HeaderClient() {
  const _pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollYRef = useRef(0)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  // Continuous progress from 0 to 1
  const _state = useRef<number | null>(null)

  // Scroll-shrink: adds the 'scrolled' class to the header element.
  const headerRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: () => `top -${window.innerHeight * 0.9}px`,
      onToggle: (self) => {
        setIsScrolled(self.isActive)
      },
    })

    return () => {
      st.kill()
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
    recordInteraction('whatsapp_cta_clicked', {
      page: window.location.pathname,
      source: 'header',
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
              <a
                href={`https://wa.me/${site.whatsapp}?text=Hello,%20I%20have%20a%20query%20regarding%20tattoo`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaDesktop}
                onClick={handleCTAClick}
              >
                Start a conversation
              </a>

              <a
                href={`https://wa.me/${site.whatsapp}?text=Hello,%20I%20have%20a%20query%20regarding%20tattoo`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaMobile}
                onClick={handleCTAClick}
                aria-label="Start a conversation"
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
                </a>

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
