'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

/**
 * Philosophy Section Component
 * Two-column layout with parallax image and blockquote
 */
export function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yPercent = useTransform(scrollYProgress, [0, 1], [0, 12]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 border-t border-white/6">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left Column - Image with Parallax */}
          <motion.div
            ref={imageRef}
            className="relative"
            style={{ yPercent }}
          >
            <div className="relative aspect-[3/4]">
              <Image
                src="/assets/prerna-contemplative.jpg"
                alt="Prerna contemplative by Prerna, Navi Mumbai"
                fill
                className="object-cover"
              />
              {/* Offset Border Frame Effect */}
              <div
                className="absolute inset-0 border border-green/15 pointer-events-none"
                style={{
                  transform: 'translate(-1.5rem, -1.5rem)',
                  zIndex: -1,
                }}
              />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div>
            <SectionEyebrow text="Philosophy" />

            {/* Blockquote */}
            <motion.blockquote
              className="text-[clamp(1.5rem,3vw,2rem)] md:text-[clamp(2rem,3.2vw,3rem)] font-serif italic text-ivory/90 mb-8 leading-tight"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              &ldquo;Like meditation, it asks you to be still. Like therapy, it
              lets you feel.&rdquo;
            </motion.blockquote>

            {/* Body Copy */}
            <motion.p
              className="text-muted text-sm md:text-base leading-relaxed mb-8 max-w-md"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              In the space between needle and skin, transformation happens. Not
              just on the surface, but deep within. Every tattoo is a
              collaboration—a dialogue between artist and client, pain and
              beauty, memory and art.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/about"
                className="inline-block px-6 py-3 border border-ivory/30 text-ivory text-sm hover:border-green hover:text-green transition-colors duration-300"
                data-cursor="hover"
              >
                Meet Prerna →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
