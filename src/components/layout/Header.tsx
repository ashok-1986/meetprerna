'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/utils/cn';
import { site } from '@/config/site';
import MobileMenu from './MobileMenu';
import { useGsapContext } from '@/hooks/useGsapContext';
import { gsap } from '@/lib/gsap';
import { getLenis } from '@/lib/masterTicker';
import type Lenis from 'lenis';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface HeaderProps {
  variant?: 'default' | 'overlay';
}

export default function Header({ variant }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const effectiveVariant = variant || (isHome ? 'overlay' : 'default');
  const headerRef = useRef<HTMLElement>(null);
  
  const reduce = usePrefersReducedMotion();

  useGsapContext(() => {
    if (reduce || !headerRef.current) return;

    // Create a quickTo for yPercent instead of y so it handles height automatically
    const yTo = gsap.quickTo(headerRef.current, 'yPercent', {
      duration: 0.24,
      ease: 'power2.inOut',
    });

    let lastScrollY = 0;
    let isHidden = false;

    const onScroll = (e: Lenis) => {
      const scrollY = e.animatedScroll || 0;
      
      // If we're at the top, always show
      if (scrollY < 100) {
        if (isHidden) {
          yTo(0);
          isHidden = false;
        }
      } else if (scrollY > lastScrollY && !isHidden) {
        // Scrolling down
        yTo(-100);
        isHidden = true;
      } else if (scrollY < lastScrollY && isHidden) {
        // Scrolling up
        yTo(0);
        isHidden = false;
      }
      
      lastScrollY = scrollY;
    };

    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', onScroll);
    }

    return () => {
      if (lenis) {
        lenis.off('scroll', onScroll);
      }
    };
  }, [reduce]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed inset-x-0 top-0 z-header h-header',
          effectiveVariant === 'overlay'
            ? 'bg-transparent text-ivory'
            : 'bg-ink/90 backdrop-blur-sm text-ivory'
        )}
      >
        <div className="mx-auto flex h-full max-w-[var(--content-wide)] items-center justify-between px-gutter">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Image 
              src="/images/logo.png" 
              alt={site.shortName} 
              width={140} 
              height={40} 
              className="object-contain w-auto h-8 lg:h-10" 
              style={{ filter: 'invert(86%) sepia(23%) saturate(1054%) hue-rotate(33deg) brightness(103%) contrast(102%)' }}
              priority
            />
            <span className="sr-only">{site.shortName}</span>
          </Link>

          {/* Social Icons instead of Primary Nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-inchworm hover:text-inchworm-deep transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="text-inchworm hover:text-inchworm-deep transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
            </a>
            <a href="#" className="text-inchworm hover:text-inchworm-deep transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10 md:hidden text-inchworm"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <MobileMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </>
  );
}
