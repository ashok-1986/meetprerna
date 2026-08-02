'use client'

import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { InteractiveHoverButton } from './interactive-hover-button'
import { TrackingWhatsAppLink } from './TrackingWhatsAppLink'
import styles from './StartConversationCTA.module.css'

interface StartConversationCTAProps {
  children: React.ReactNode
  className?: string
  trackingSource: string
  trackingPage: string
  /** 'hoverButton' reuses InteractiveHoverButton's fill-in hover style.
   *  'button' renders a plain <button> carrying the caller's own className
   *  (for sites that previously used a raw styled <a>). */
  variant?: 'hoverButton' | 'button'
  ariaLabel?: string
  /** Fires when the trigger is clicked, before the dialog opens — e.g.
   *  so a caller-owned overlay (the mobile nav sheet) can dismiss itself
   *  first rather than stack two modal dialogs. */
  onOpen?: () => void
}

export function StartConversationCTA({
  children,
  className,
  trackingSource,
  trackingPage,
  variant = 'button',
  ariaLabel,
  onOpen,
}: StartConversationCTAProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [mounted, setMounted] = useState(false)

  // The dialog is portaled to document.body (see render below) so it can
  // never end up nested inside another overlay's DOM subtree. Nesting it
  // inside e.g. the mobile nav sheet's own <dialog> broke rendering: once
  // that ancestor dialog closes, its default `display: none` hides the
  // whole subtree regardless of the descendant's own [open] state — top
  // layer promotion doesn't exempt an element from an ancestor's display:
  // none. Portaling avoids the ancestor relationship entirely.
  useEffect(() => {
    setMounted(true)
  }, [])

  const open = () => {
    onOpen?.()
    dialogRef.current?.showModal()
  }
  const close = () => dialogRef.current?.close()

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close()
  }

  const dialog = (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Choose how to get in touch"
      onClick={handleBackdropClick}
    >
      <div className={styles.content}>
        <button type="button" className={styles.closeButton} onClick={close} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false">
            <line x1="2" y1="2" x2="16" y2="16" />
            <line x1="16" y1="2" x2="2" y2="16" />
          </svg>
        </button>

        <p className={styles.prompt}>How would you like to start?</p>

        <TrackingWhatsAppLink
          className={styles.option}
          trackingSource={trackingSource}
          trackingPage={trackingPage}
          onClick={close}
        >
          I already know what I want
        </TrackingWhatsAppLink>

        <Link href="/enquiry" className={styles.option} onClick={close}>
          Help me figure it out
        </Link>
      </div>
    </dialog>
  )

  return (
    <>
      {variant === 'hoverButton' ? (
        <InteractiveHoverButton className={className} onClick={open}>
          {children}
        </InteractiveHoverButton>
      ) : (
        <button type="button" className={className} onClick={open} aria-label={ariaLabel}>
          {children}
        </button>
      )}

      {mounted && createPortal(dialog, document.body)}
    </>
  )
}

export default StartConversationCTA
