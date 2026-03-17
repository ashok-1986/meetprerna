'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Mobile Drawer Component
 * Full-screen mobile navigation menu with Framer Motion animations
 */
export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 p-2"
              onClick={onClose}
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-ivory"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="text-4xl md:text-5xl font-serif text-ivory/80 hover:text-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.1 + 0.2 }}
            >
              <Link
                href="/consultation"
                onClick={onClose}
                className="px-8 py-3 bg-green text-black text-base font-medium hover:bg-yellow transition-colors"
              >
                Book Consultation
              </Link>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: NAV_LINKS.length * 0.1 + 0.4 }}
            >
              <a
                href="tel:+917738147935"
                className="text-muted hover:text-ivory transition-colors text-sm"
              >
                +91 77381 47935
              </a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
