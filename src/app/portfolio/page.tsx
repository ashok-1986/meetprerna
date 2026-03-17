'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { PORTFOLIO_ITEMS } from '@/lib/constants';

const CATEGORIES = ['All Work', 'Geometric', 'Fine Line', 'Illustrative', 'Minimalist', 'Custom'];

/**
 * Portfolio Page Component
 * Full portfolio with filterable masonry grid and lightbox
 */
export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All Work');
  const [selectedItem, setSelectedItem] = useState<(typeof PORTFOLIO_ITEMS)[0] | null>(null);

  const filteredItems =
    activeCategory === 'All Work'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedItem) return;
    if (e.key === 'Escape') setSelectedItem(null);
    if (e.key === 'ArrowRight') {
      const currentIndex = PORTFOLIO_ITEMS.findIndex((item) => item.id === selectedItem.id);
      const nextItem = PORTFOLIO_ITEMS[(currentIndex + 1) % PORTFOLIO_ITEMS.length];
      setSelectedItem(nextItem);
    }
    if (e.key === 'ArrowLeft') {
      const currentIndex = PORTFOLIO_ITEMS.findIndex((item) => item.id === selectedItem.id);
      const prevItem = PORTFOLIO_ITEMS[(currentIndex - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length];
      setSelectedItem(prevItem);
    }
  };

  useState(() => {
    if (selectedItem) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  });

  return (
    <main className="relative pt-24">
      {/* Page Hero */}
      <section className="px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mb-12">
            <div>
              <SectionEyebrow text="Portfolio" />
              <h1 className="text-section font-serif text-ivory">
                Stories <span className="italic text-green">/</span> etched <br /> in skin
              </h1>
            </div>
            <p className="text-muted text-sm md:text-base max-w-md">
              A collection of custom designs, each telling a unique story. From
              geometric precision to fine line delicacy—explore the journey.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 md:gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm transition-colors duration-300 ${
                  activeCategory === category
                    ? 'bg-green text-black'
                    : 'text-ivory/60 hover:text-ivory border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1920px] mx-auto">
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="break-inside-avoid relative group cursor-pointer"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      loading={index < 5 ? 'eager' : 'lazy'}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-green text-xs uppercase tracking-wide mb-2">
                        {item.tag}
                      </span>
                      <h3 className="text-xl font-serif text-ivory">{item.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="px-6 md:px-12 py-12 border-t border-white/6">
        <div className="max-w-[1920px] mx-auto">
          <div className="relative aspect-video">
            <video
              src="/assets/reel.mp4"
              poster="/assets/tattoo-01-wolf-red.jpg"
              controls
              className="w-full h-full object-cover"
              preload="none"
            />
          </div>
        </div>
      </section>

      {/* CTA Row */}
      <section className="px-6 md:px-12 py-24 border-t border-white/6">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-ivory mb-2">
                Your story is next
              </h2>
              <p className="text-muted text-sm">Ready to begin your journey?</p>
            </div>
            <Link
              href="/consultation"
              className="px-6 py-3 bg-green text-black text-sm font-medium hover:bg-yellow transition-colors duration-300"
              data-cursor="hover"
            >
              Book Your Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-6 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95" />

            {/* Lightbox Content */}
            <motion.div
              className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left - Image */}
              <div className="relative aspect-square md:aspect-auto md:h-[70vh]">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right - Info */}
              <div className="flex flex-col justify-center">
                <span className="text-green text-xs uppercase tracking-[0.2em] mb-4">
                  {selectedItem.tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-ivory mb-6">
                  {selectedItem.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-8">
                  {selectedItem.description}
                </p>
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 text-green hover:text-yellow transition-colors"
                  data-cursor="hover"
                >
                  <span>Begin Your Story</span>
                  <span>→</span>
                </Link>

                {/* Navigation */}
                <div className="flex gap-4 mt-8 pt-8 border-t border-white/10">
                  <button
                    onClick={() => {
                      const currentIndex = PORTFOLIO_ITEMS.findIndex(
                        (item) => item.id === selectedItem.id
                      );
                      const prevItem =
                        PORTFOLIO_ITEMS[
                          (currentIndex - 1 + PORTFOLIO_ITEMS.length) %
                            PORTFOLIO_ITEMS.length
                        ];
                      setSelectedItem(prevItem);
                    }}
                    className="p-2 border border-white/20 hover:border-green hover:text-green transition-colors"
                    aria-label="Previous image"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = PORTFOLIO_ITEMS.findIndex(
                        (item) => item.id === selectedItem.id
                      );
                      const nextItem =
                        PORTFOLIO_ITEMS[
                          (currentIndex + 1) % PORTFOLIO_ITEMS.length
                        ];
                      setSelectedItem(nextItem);
                    }}
                    className="p-2 border border-white/20 hover:border-green hover:text-green transition-colors"
                    aria-label="Next image"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 p-2 text-ivory/60 hover:text-ivory z-20"
                onClick={() => setSelectedItem(null)}
                aria-label="Close lightbox"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
