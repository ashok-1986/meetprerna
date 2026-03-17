'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { STATS } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

/**
 * Intro Section Component
 * Statement heading with animated counter stats
 */
export function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    setHasAnimated(true);

    const counters = statsRef.current?.querySelectorAll('.stat-value');
    if (counters) {
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const suffix = counter.getAttribute('data-suffix') || '';

        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function () {
              counter.textContent = Math.round(counter.textContent) + suffix;
            },
          }
        );
      });
    }
  }, [isInView, hasAnimated]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1920px] mx-auto">
        {/* Eyebrow & Heading */}
        <SectionEyebrow text="Philosophy" />
        <motion.h2
          className="text-section font-serif text-ivory mb-12 md:mb-16 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'power2.out' }}
        >
          Tattooing is a quiet form of meditation and healing.
        </motion.h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left Column - Body Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-muted text-sm md:text-base leading-relaxed space-y-4">
              <span>
                Like meditation, it asks you to be still. Like therapy, it lets
                you feel. In the space between needle and skin, something
                profound happens—a transformation that goes deeper than ink.
              </span>
              <span>
                Every person who sits in my chair carries a story. My role is to
                listen, to understand, and to create a design that honours what
                they&apos;ve been through and where they&apos;re going.
              </span>
            </p>
          </motion.div>

          {/* Right Column - Stats */}
          <div ref={statsRef}>
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="border-l border-white/10 pl-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-serif text-green mb-2">
                    <span
                      className="stat-value"
                      data-target={stat.value}
                      data-suffix={stat.suffix}
                    >
                      0{stat.suffix}
                    </span>
                  </div>
                  <p className="text-muted text-xs uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
