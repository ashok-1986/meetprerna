import Image from 'next/image'
import originImage from '@/../public/images/hero/origin.jpeg'
import styles from './hero.module.css'

const headlineLines = [
  { i: 0, text: 'Beyond Ink:' },
  { i: 1, text: 'Your Story, Translated' },
  { i: 2, text: 'into Abstract Art' },
]

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.imageWrap}>
        <Image
          src={originImage}
          alt="Prerna, tattoo artist, hands framing her face"
          priority
          sizes="100vw"
          className={styles.image}
          placeholder="blur"
        />
      </div>

      <div className={styles.gradient} aria-hidden="true" />

      <div className={styles.content}>
        <h1
          aria-label="Beyond Ink: Your Story, Translated into Abstract Art"
          className={styles.headline}
        >
          {headlineLines.map((line) => (
            <span
              key={line.i}
              className={styles.line}
              style={{ '--i': line.i } as React.CSSProperties}
              aria-hidden="true"
            >
              {line.text}
            </span>
          ))}
        </h1>

        <p className={styles.subtitle}>
          Custom tattoos, original paintings and sketches:{' '}
          made in conversation, never in a rush.
        </p>

        <div className={styles.scrollCue}>
          <span className={styles.scrollLine} aria-hidden="true" />
          <span className={styles.scrollText}>SCROLL</span>
        </div>
      </div>
    </section>
  )
}
