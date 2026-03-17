'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PORTFOLIO_ITEMS } from '@/lib/constants';

/**
 * Portfolio Preview Section Component
 * Asymmetric grid showcasing 5 featured tattoo pieces
 */
export function PortfolioPreview() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Get first 5 items for preview
  const previewItems = PORTFOLIO_ITEMS.slice(0, 5);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/6">
      <div className="max-w-[1920px] mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-start mb-12 md:mb-16">
          <div>
            <p className="text-green text-xs uppercase tracking-[0.2em] mb-4">
              Selected Work
            </p>
            <h2 className="text-section font-serif text-ivory">
              Stories etched <br /> in skin
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden md:flex items-center gap-2 text-ivory/80 hover:text-green transition-colors group"
            data-cursor="hover"
          >
            <span className="text-sm uppercase tracking-wide">
              View Full Portfolio
            </span>
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Left Column - Spans 2 Rows */}
          <div className="md:col-span-1 md:row-span-2 relative group overflow-hidden">
            <Link href="/portfolio" className="block h-full">
              <div
                className="relative h-full min-h-[600px]"
                onMouseEnter={() => setHoveredId(previewItems[0]?.id || null)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Image
                  src={previewItems[0]?.src || '/assets/tattoo-01-wolf-red.jpg'}
                  alt={previewItems[0]?.alt || 'Tattoo by Prerna, Navi Mumbai'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-107"
                />
                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-black/60 flex flex-col justify-end p-6 transition-opacity duration-300 ${
                    hoveredId === previewItems[0]?.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span className="text-green text-xs uppercase tracking-wide mb-2">
                    {previewItems[0]?.tag}
                  </span>
                  <h3 className="text-xl font-serif text-ivory">
                    {previewItems[0]?.title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Column - 2x2 Grid */}
          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            {previewItems.slice(1).map((item, index) => (
              <Link
                key={item.id}
                href="/portfolio"
                className="relative group overflow-hidden"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-107"
                  />
                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/60 flex flex-col justify-end p-4 transition-opacity duration-300 ${
                      hoveredId === item.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <span className="text-green text-xs uppercase tracking-wide mb-2">
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-serif text-ivory">{item.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden mt-8">
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-ivory/80 hover:text-green transition-colors"
            data-cursor="hover"
          >
            <span className="text-sm uppercase tracking-wide">
              View Full Portfolio
            </span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
