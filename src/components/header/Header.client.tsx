'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'
import { NavPill } from './NavPill'
import { MobileMenu } from './MobileMenu'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { StartConversationCTA } from '@/components/ui/StartConversationCTA'
import styles from './header.module.css'

gsap.registerPlugin(ScrollTrigger)



export function HeaderClient() {
  const pathname = usePathname()
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
              <StartConversationCTA
                className={styles.ctaDesktop}
                trackingSource="header"
                trackingPage={pathname || 'header'}
              >
                Start a conversation
              </StartConversationCTA>

              <StartConversationCTA
                className={styles.ctaMobile}
                trackingSource="header"
                trackingPage={pathname || 'header'}
                ariaLabel="Start a conversation"
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
              </StartConversationCTA>

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
