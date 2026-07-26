'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './header.module.css'

const NAV_ITEMS = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Sanctuary', href: '/sanctuary' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

function ActiveUnderline() {
  return (
    <svg
      width="100%"
      height="3"
      viewBox="0 0 100 3"
      preserveAspectRatio="none"
      className={styles.activeUnderline}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0,1.5 C10,0.8 20,2.2 30,1.2 C40,0.5 50,2.5 60,1.8 C70,0.9 80,2.0 90,1.3 L100,1.5"
        stroke="var(--color-inchworm)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        className={styles.underlinePath}
      />
    </svg>
  )
}

export function NavPill() {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className={styles.pill}>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={styles.navItem}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
            {isActive && <ActiveUnderline />}
          </Link>
        )
      })}
    </nav>
  )
}
