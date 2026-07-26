import Link from 'next/link'
import styles from './footer.module.css'

const NAV_ITEMS = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Sanctuary', href: '/sanctuary' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

const LEGAL_ITEMS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
] as const

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav aria-label="Footer" className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.ctaLine}>
          <Link href="/consulting" className={styles.ctaLink}>
            Start a conversation
          </Link>
        </div>

        <p className={styles.closing}>
          Your story deserves to be worn.
        </p>

        <p className={styles.location}>
          Kharghar, Navi Mumbai
        </p>

        <div className={styles.bottom}>
          <div className={styles.legal}>
            {LEGAL_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className={styles.legalLink}>
                {item.label}
              </Link>
            ))}
          </div>
          <a href="mailto:prerna@meetprerna.com" className={styles.email}>
            prerna@meetprerna.com
          </a>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '919820012345'}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsapp}
          >
            Message on WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}
