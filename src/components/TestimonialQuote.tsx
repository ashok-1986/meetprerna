import type { Testimonial } from '@/content/testimonials'
import styles from './testimonial-quote.module.css'

interface TestimonialQuoteProps {
  testimonial: Testimonial;
}

export function TestimonialQuote({ testimonial }: TestimonialQuoteProps) {
  return (
    <figure className={styles.figure}>
      <blockquote className={styles.quote}>
        {testimonial.text}
      </blockquote>
      <figcaption className={styles.name}>{testimonial.name}</figcaption>
    </figure>
  );
}
