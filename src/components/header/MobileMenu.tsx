'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { site } from '@/content/site'
import styles from './mobile-menu.module.css'

const NAV_ITEMS = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Sanctuary', href: '/sanctuary' },
  { label: 'About', href: '/about' },
  { label: 'Consulting', href: '/consulting' },
] as const

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const scrollYRef = useRef(0)
  const pathname = usePathname()

  // Open: sync isOpen prop to showModal
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) {
      scrollYRef.current = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollYRef.current}px`
      document.body.style.width = '100%'
      dialog.showModal()
    }
  }, [isOpen])

  // Cleanup: restore scroll and body styles
  const cleanupDialog = useCallback(() => {
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    window.scrollTo(0, scrollYRef.current)
  }, [])

  // The single source of truth for dismissal notification
  const handleNativeClose = useCallback(() => {
    cleanupDialog()
    onClose()
  }, [cleanupDialog, onClose])

  // Imperative dismissal triggered by UI (buttons, links, route change)
  const handleDismiss = useCallback(() => {
    const dialog = dialogRef.current
    if (dialog?.open) {
      // Trigger the native close event, which will call handleNativeClose
      dialog.close()
    } else {
      // Fallback if dialog isn't open but we need to cleanup
      handleNativeClose()
    }
  }, [handleNativeClose])

  // Close on route change (browser back/forward)
  useEffect(() => {
    if (isOpen) {
      handleDismiss()
    }
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <dialog
      onCancel={(e) => {
        e.preventDefault()
        handleDismiss()
      }}
      onClose={handleNativeClose}
      ref={dialogRef}
      id="mobile-menu"
      className={styles.menu}
      aria-label="Navigation menu"
    >
      <div className={styles.content}>
        {/* Close button — top-right, 44px */}
        <button
          className={styles.closeButton}
          onClick={handleDismiss}
          aria-label="Close menu"
          type="button"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
            focusable="false"
          >
            <line x1="2" y1="2" x2="16" y2="16" />
            <line x1="16" y1="2" x2="2" y2="16" />
          </svg>
        </button>

        {/* Nav items — stacked, left-aligned */}
        <div className={styles.navRegion}>
          <nav aria-label="Main">
            <ul className={styles.navList}>
              {NAV_ITEMS.map((item, index) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={styles.menuItem}
                      style={{ '--i': index } as React.CSSProperties}
                      data-active={isActive || undefined}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={handleDismiss}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Bottom edge — CTA */}
        <div className={styles.bottomSection}>
          <InteractiveHoverButton
            href={`https://wa.me/${site.whatsapp}?text=Hello,%20I%20have%20a%20query%20regarding%20tattoo`}
            onClick={handleDismiss}
            trackingSource="mobile_menu"
            trackingPage={pathname || 'header'}
          >
            Start a conversation
          </InteractiveHoverButton>
        </div>
      </div>
    </dialog>
  )
}
