import Link from 'next/link';
import Image from 'next/image';
import { SOCIAL_LINKS } from '@/lib/constants';

/**
 * Footer Component
 * Site footer with logo, navigation, and social links
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/6 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/assets/logo.png"
                alt="Meet Prerna logo"
                width={120}
                height={32}
                className="object-contain"
                style={{ mixBlendMode: 'lighten' }}
              />
            </Link>
            <p className="text-muted text-sm max-w-sm">
              Custom tattoo artist in Navi Mumbai. Creating meaningful, story-driven
              designs that resonate with your journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-ivory font-serif mb-4">Navigate</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted hover:text-green transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-muted hover:text-green transition-colors text-sm"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted hover:text-green transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted hover:text-green transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-ivory font-serif mb-4">Connect</h4>
            <ul className="space-y-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-green transition-colors text-sm"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/6">
          <p className="text-muted text-xs">
            © {currentYear} Meet Prerna. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted">
            <Link href="#" className="hover:text-green transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-green transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
