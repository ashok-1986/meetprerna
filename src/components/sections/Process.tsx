'use client';

import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '@/lib/constants';

/**
 * Process Section Component
 * 4-column grid showing the tattoo process from consult to aftercare
 */
export function Process() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/6">
      <div className="max-w-[1920px] mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-green text-xs uppercase tracking-[0.2em] mb-4">
            The Journey
          </p>
          <h2 className="text-section font-serif text-ivory">
            How we bring your <br /> vision to life
          </h2>
        </motion.div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {/* Ghost Number Background */}
              <span
                className="absolute -top-8 -left-4 text-[120px] md:text-[160px] font-serif text-ivory/5 pointer-events-none select-none"
                style={{ lineHeight: 0.8, zIndex: 0 }}
              >
                {step.number}
              </span>

              {/* Card Content */}
              <div className="relative z-10 pt-12 pb-8 px-6 border border-white/6 transition-all duration-300 group-hover:border-green/30">
                {/* Animated Bottom Border */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-green to-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ transformOrigin: 'left' }}
                />

                <h3 className="text-xl md:text-2xl font-serif text-ivory mb-4">
                  {step.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
