'use client'

import styles from './TestimonialQuote.module.css'

interface TestimonialQuoteProps {
  name: string
  text: string
}

export function TestimonialQuote({ name, text }: TestimonialQuoteProps) {
  return (
    <blockquote className={styles.quote}>
      <p className={styles.text}>{text}</p>
      <footer className={styles.footer}>
        <cite className={styles.name}>{name}</cite>
      </footer>
    </blockquote>
  )
}