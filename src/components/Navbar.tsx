"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* NAV LAYOUT — full navbar: */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "28px 48px",  // 48px from both edges
        // No background — transparent always
      }}>

        {/* LEFT: Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/logo/meetprerna_logo_100525_1@2x.png"
            alt="meet prerna"
            height={36}
            width={120}
            style={{ objectFit: "contain", objectPosition: "left" }}
            priority
          />
        </Link>

        {/* RIGHT: Nav links + CTA — desktop only */}
        <div className="hidden md:flex" style={{
          alignItems: "center",
          gap: "36px",  // 36px between each nav item
        }}>
          {/* Nav links */}
          {[
            { label: "· Work", href: "/work" },
            { label: "· Story", href: "/story" },
            { label: "· Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "rgba(253,255,233,0.6)",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FDFFE9")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,255,233,0.6)")}
            >
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div style={{
            width: "1px",
            height: "16px",
            background: "rgba(253,255,233,0.15)",
          }} />

          {/* Commission CTA */}
          <a
            href="https://meetprerna.fillout.com/book"
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "#C4FF61",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "opacity 0.3s ease",
            }}
            data-cursor="book"
          >
            Commission +
          </a>
        </div>

        {/* MOBILE: Hamburger — hide desktop nav on mobile */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden flex flex-col gap-1.5"
          aria-label="Toggle menu"
          style={{ width: "22px" }}
        >
          <div className="w-full h-0.5 bg-[#FDFFE9]"></div>
          <div className="w-full h-0.5 bg-[#FDFFE9]"></div>
          <div className="w-full h-0.5 bg-[#FDFFE9]"></div>
        </button>
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
                href="/work"
                className="font-serif text-3xl text-[rgba(253,255,233,0.4)] hover:text-[#FDFFE9] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Work
              </Link>
              <Link
                href="/story"
                className="font-serif text-3xl text-[rgba(253,255,233,0.4)] hover:text-[#FDFFE9] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Story
              </Link>
              <Link
                href="/contact"
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
                COMMISSION +
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
