'use client';

import { useRef, useState } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/constants';

/**
 * Testimonials Section Component
 * Horizontally scrollable card track with prev/next navigation
 */
export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    const newScrollLeft =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    animate(container.scrollLeft, newScrollLeft, {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1], // power2.inOut equivalent bezier
      onUpdate: (value) => {
        container.scrollLeft = value;
        setScrollProgress(
          container.scrollLeft / (container.scrollWidth - container.clientWidth)
        );
      },
    });
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/6">
      <div className="max-w-[1920px] mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-green text-xs uppercase tracking-[0.2em] mb-4">
            Testimonials
          </p>
          <h2 className="text-section font-serif text-ivory">
            Words from the <br /> healed
          </h2>
        </div>

        {/* Scrollable Track Container */}
        <div className="relative">
          {/* Testimonials Track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={(e) => {
              const container = e.currentTarget;
              setScrollProgress(
                container.scrollLeft /
                  (container.scrollWidth - container.clientWidth)
              );
            }}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[85vw] md:w-[32vw] min-w-[300px] snap-start"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="h-full border border-white/6 p-8 md:p-10">
                  {/* Quote Mark */}
                  <span className="block text-6xl md:text-7xl font-serif text-green/30 mb-6">
                    &ldquo;
                  </span>

                  {/* Testimonial Text */}
                  <p className="text-ivory/90 text-sm md:text-base leading-relaxed mb-8">
                    {testimonial.text}
                  </p>

                  {/* Client Name */}
                  <p className="text-green text-xs uppercase tracking-[0.15em]">
                    {testimonial.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 border border-white/20 hover:border-green hover:text-green transition-colors disabled:opacity-30"
              disabled={scrollProgress <= 0}
              aria-label="Previous testimonials"
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
              onClick={() => handleScroll('right')}
              className="p-3 border border-white/20 hover:border-green hover:text-green transition-colors disabled:opacity-30"
              disabled={scrollProgress >= 0.99}
              aria-label="Next testimonials"
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
      </div>
    </section>
  );
}
