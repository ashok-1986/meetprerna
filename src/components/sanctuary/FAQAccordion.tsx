'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import styles from './FAQAccordion.module.css'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  // Handle Escape key to close open panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openId) {
        setOpenId(null)
        const trigger = triggerRefs.current.get(openId)
        trigger?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [openId])

  const handleTriggerClick = useCallback((id: string) => {
    setOpenId(openId === id ? null : id)
  }, [openId])

  const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpenId(openId === id ? null : id)
    }
  }, [openId])

  return (
    <dl className={styles.accordion}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <dt>
            <button
              ref={(el) => { if (el) triggerRefs.current.set(item.id, el) }}
              type="button"
              className={`${styles.trigger} ${openId === item.id ? styles.open : ''}`}
              aria-expanded={openId === item.id}
              aria-controls={`faq-panel-${item.id}`}
              id={`faq-trigger-${item.id}`}
              onClick={() => handleTriggerClick(item.id)}
              onKeyDown={(e) => handleTriggerKeyDown(e, item.id)}
            >
              <span className={styles.questionText}>{item.question}</span>
              <span className={styles.icon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 10 13 14 9"></polyline>
                </svg>
              </span>
            </button>
          </dt>
          {openId === item.id && (
            <dd
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-trigger-${item.id}`}
              className={styles.panelWrapper}
              tabIndex={0}
              data-open="true"
            >
              <div className={styles.panel}>
                <div className={styles.answer}>
                  <p>{item.answer}</p>
                </div>
              </div>
            </dd>
          )}
        </div>
      ))}
    </dl>
  )
}