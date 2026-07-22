import Link from 'next/link';
import { site } from '@/config/site';
import { footerNav } from '@/config/nav';
import Container from './Container';
import { StatusDot } from '@/components/ui/StatusDot';

export default function Footer() {
  return (
    <footer className="w-full border-t border-ink-20 bg-ink-90 pt-16 pb-8">
      <Container>
        <div className="flex flex-col gap-16">
          {/* Top Row */}
          <div className="flex items-center gap-3 text-body-sm text-ivory-dim">
            <StatusDot />
            <span>Bookings open — {site.hours.split(',')[0]}</span>
          </div>

          {/* Middle Row */}
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            <nav aria-label="Footer Primary">
              <ul className="flex flex-col gap-4 md:flex-row md:gap-8">
                {footerNav.primary.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-display text-body-lg text-ivory transition-colors hover:text-inchworm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer Secondary">
              <ul className="flex flex-col gap-4 md:flex-row md:gap-8">
                {footerNav.secondary.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body-sm text-ivory-dim transition-colors hover:text-ivory"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-body-sm text-ivory-dim transition-colors hover:text-ivory"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col justify-between gap-4 border-t border-ink-20 pt-8 text-body-xs text-ivory-dim md:flex-row md:items-center">
            <p>&copy; {new Date().getFullYear()} {site.name} Studio</p>
            <p>Navi Mumbai, India.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
