'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

/**
 * CTA Band Section Component
 * Giant ghost "INK" text with parallax, heading, and dual CTAs
 */
export function CtaBand() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 px-6 md:px-12 border-t border-white/6 overflow-hidden"
    >
      {/* Giant Ghost "INK" Text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y: yParallax }}
      >
        <span
          className="text-[18rem] md:text-[28rem] font-serif text-ivory/20"
          style={{ lineHeight: 0.8, letterSpacing: '-0.05em' }}
        >
          INK
        </span>
      </motion.div>

      <div className="max-w-[1920px] mx-auto relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionEyebrow text="Ready to Begin?" />
          </motion.div>

          {/* Heading - Split Across 3 Lines */}
          <motion.h2
            className="text-section font-serif text-ivory mb-6 md:mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="block">Your story</span>
            <span className="block">deserves</span>
            <span className="block italic text-green">to be worn.</span>
          </motion.h2>

          {/* Sub Copy */}
          <motion.p
            className="text-muted text-sm md:text-base max-w-md mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Book your free consultation today. Let&apos;s create something
            meaningful together.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/consultation"
              className="px-6 py-3 bg-green text-black text-sm font-medium hover:bg-yellow transition-colors duration-300"
              data-cursor="hover"
            >
              Book Free Consultation →
            </Link>
            <Link
              href="/portfolio"
              className="px-6 py-3 border border-ivory/30 text-ivory text-sm hover:border-green hover:text-green transition-colors duration-300"
              data-cursor="hover"
            >
              Explore Portfolio
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
