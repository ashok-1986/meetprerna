"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Ashfall-style navbar: fixed, transparent, 4-corner layout */}
      <nav
        className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-0"
        style={{ padding: "24px 32px" }}
      >
        <div className="relative w-full">
          {/* TOP-LEFT: MEET PRERNA text */}
          <Link href="/" className="absolute top-0 left-0">
            <span
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: "rgba(253, 255, 233, 0.6)",
                textTransform: "uppercase",
              }}
            >
              MEET PRERNA
            </span>
          </Link>

          {/* TOP-CENTRE: Stacked navigation (hidden on mobile) */}
          <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 flex-col gap-2.5">
            <Link
              href="#portfolio"
              className="font-lato text-[0.65rem] tracking-[0.2em] text-[rgba(253,255,233,0.4)] hover:text-[#FDFFE9] hover:opacity-100 transition-opacity duration-300"
            >
              <span style={{ opacity: 0.4 }}>· </span>HOME
            </Link>
            <Link
              href="#portfolio"
              className="font-lato text-[0.65rem] tracking-[0.2em] text-[rgba(253,255,233,0.4)] hover:text-[#FDFFE9] hover:opacity-100 transition-opacity duration-300"
            >
              <span style={{ opacity: 0.4 }}>· </span>PORTFOLIO
            </Link>
            <Link
              href="/about"
              className="font-lato text-[0.65rem] tracking-[0.2em] text-[rgba(253,255,233,0.4)] hover:text-[#FDFFE9] hover:opacity-100 transition-opacity duration-300"
            >
              <span style={{ opacity: 0.4 }}>· </span>ABOUT
            </Link>
            <Link
              href="#contact"
              className="font-lato text-[0.65rem] tracking-[0.2em] text-[rgba(253,255,233,0.4)] hover:text-[#FDFFE9] hover:opacity-100 transition-opacity duration-300"
            >
              <span style={{ opacity: 0.4 }}>· </span>CONTACT
            </Link>
          </div>

          {/* TOP-RIGHT: BOOK NOW + (desktop) */}
          <a
            href="https://meetprerna.fillout.com/book"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block absolute top-0 right-0"
          >
            <span
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: "rgba(253, 255, 233, 0.6)",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C4FF61")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253, 255, 233, 0.6)")}
            >
              BOOK NOW +
            </span>
          </a>

          {/* TOP-RIGHT: Hamburger (mobile) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden absolute top-0 right-0 flex flex-col gap-1.5"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-0.5 bg-[rgba(253,255,233,0.6)]"></div>
            <div className="w-5 h-0.5 bg-[rgba(253,255,233,0.6)]"></div>
            <div className="w-5 h-0.5 bg-[rgba(253,255,233,0.6)]"></div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#1A1A1A] z-[100] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-[rgba(253,255,233,0.6)] text-2xl"
              aria-label="Close menu"
            >
              ×
            </button>

            <div className="flex flex-col items-center gap-8">
              <Link
                href="#portfolio"
                className="font-serif text-3xl text-[rgba(253,255,233,0.4)] hover:text-[#FDFFE9] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                className="font-serif text-3xl text-[rgba(253,255,233,0.4)] hover:text-[#FDFFE9] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="font-serif text-3xl text-[rgba(253,255,233,0.4)] hover:text-[#FDFFE9] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {/* CTA Button for mobile */}
              <a
                href="https://meetprerna.fillout.com/book"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#C4FF61] text-[#C4FF61] bg-transparent rounded-full px-6 py-2.5 font-lato font-bold text-xs tracking-[0.1em] transition-all duration-300 hover:bg-[#C4FF61] hover:text-[#1A1A1A] mt-4"
              >
                Book now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
