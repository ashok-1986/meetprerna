import Link from 'next/link'
import styles from './footer.module.css'

const NAV_ITEMS = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Sanctuary', href: '/sanctuary' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

// Only Instagram is a confirmed, live account. Pinterest / Facebook /
// YouTube are not added until their real handles are confirmed — a
// dead social link is worse than a missing one. Appending another
// entry here is the only change needed to add one later; the row
// doesn't need rebalancing.
const SOCIAL_ITEMS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/meetprerna.tattoos/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
] as const

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.signature}>Your story deserves to be worn.</p>

        <div className={styles.hairline} aria-hidden="true" />

        <div className={styles.grid}>
          <div className={styles.contactCol}>
            <span className={styles.label}>Contact us</span>
            <a href="mailto:prerna@meetprerna.com" className={styles.email}>
              prerna@meetprerna.com
            </a>
          </div>

          <nav aria-label="Footer" className={styles.navCol}>
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.socialCol}>
            <span className={styles.label}>Follow us</span>
            <div className={styles.icons}>
              {SOCIAL_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.hairline} aria-hidden="true" />

        <div className={styles.creditRow}>
          <span className={styles.credit}>Powered by Alchemetryx</span>
        </div>

        {/* Legal row (Privacy / Refund / Terms) lands here as its own
            block once confirmed. Normal top-to-bottom flow with no
            space-between above means appending it needs no other
            change in this file or in footer.module.css. */}
      </div>
    </footer>
  )
}
