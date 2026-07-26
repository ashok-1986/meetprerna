'use client'

import { FilloutStandardEmbed } from '@fillout/react'
import styles from './book-embed.module.css'

interface BookEmbedProps {
  source: string
}

export function BookEmbed({ source }: BookEmbedProps) {
  return (
    <div className={styles.wrapper}>
      <FilloutStandardEmbed
        filloutId="gvnCVtzfz2us"
        dynamicResize
        inheritParameters
        parameters={{ source }}
      />
    </div>
  )
}
