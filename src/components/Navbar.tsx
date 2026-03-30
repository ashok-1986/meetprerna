"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#1A1A1A]/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <Image
            src="/logo/meetprerna_logo_100525_1@2x.png"
            alt="meet prerna"
            width={160}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-lato text-[#FDFFE9] text-base hover:text-[#C4FF61] transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C4FF61] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden relative z-50">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="text-[#FDFFE9] hover:text-[#C4FF61] transition-colors"
              >
                <Menu size={28} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full h-full bg-[#1A1A1A] border-none p-0"
            >
              <MobileMenu links={navLinks} onClose={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}

function MobileMenu({
  links,
  onClose,
}: {
  links: typeof navLinks;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <AnimatePresence>
        {links.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="font-lato text-3xl text-[#FDFFE9] hover:text-[#C4FF61] transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-[#C4FF61] transition-all duration-300 group-hover:w-full" />
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
