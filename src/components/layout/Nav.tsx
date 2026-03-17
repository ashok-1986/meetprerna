'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import { MobileDrawer } from './MobileDrawer';

/**
 * Navigation Component
 * Fixed top navigation with scroll-based styling and mobile drawer
 */
export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set active link based on current path
    setActiveLink(window.location.pathname);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ padding: '1.75rem 0' }}
        animate={{
          padding: isScrolled ? '1rem 0' : '1.75rem 0',
        }}
        style={{
          backgroundColor: isScrolled ? 'rgba(26, 26, 26, 0.9)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(253, 255, 233, 0.06)' : 'none',
        }}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <Image
              src="/assets/logo.png"
              alt="Meet Prerna logo"
              width={120}
              height={32}
              className="object-contain"
              style={{ mixBlendMode: 'lighten' }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-ivory/80 hover:text-ivory transition-colors text-sm tracking-wide"
                onMouseEnter={() => setActiveLink(link.href)}
              >
                {link.label}
                {activeLink === link.href && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-green"
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+917738147935"
              className="text-ivory/60 hover:text-ivory transition-colors text-sm"
            >
              +91 77381 47935
            </a>
            <Link
              href="/consultation"
              className="px-5 py-2.5 bg-green text-black text-sm font-medium hover:bg-yellow transition-colors duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative z-10 flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="w-6 h-[1px] bg-ivory transition-transform" />
            <span className="w-6 h-[1px] bg-ivory transition-transform" />
            <span className="w-6 h-[1px] bg-ivory transition-transform" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
