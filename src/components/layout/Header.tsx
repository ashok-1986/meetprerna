'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/utils/cn';
import { site } from '@/config/site';
import { primaryNav, type NavItem } from '@/config/nav';
import MobileMenu from './MobileMenu';
import { useGsapContext } from '@/hooks/useGsapContext';
import { gsap, getLenis } from '@/lib/gsap';
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

    const onScroll = (e: any) => {
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
    lenis.on('scroll', onScroll);

    return () => {
      lenis.off('scroll', onScroll);
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
              priority
            />
            <span className="sr-only">{site.shortName}</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {primaryNav.map((item: NavItem) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'text-body-sm tracking-wider transition-colors duration-180',
                        isActive ? 'text-inchworm' : 'text-ivory-dim hover:text-ivory'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10 md:hidden"
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
