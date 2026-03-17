'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

/**
 * Video Section Component
 * Full-width video showcase with Framer Motion scale reveal
 */
export function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 border-t border-white/6">
      <div className="max-w-[1920px] mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <SectionEyebrow text="Behind The Needle" />
          <h2 className="text-section font-serif text-ivory">
            The artist in motion
          </h2>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: 'power2.out' }}
          className="relative w-full"
          style={{ maxHeight: '80vh' }}
        >
          <video
            ref={videoRef}
            src="/assets/intro-video.mp4"
            poster="/assets/prerna-bw-studio.jpg"
            muted
            autoPlay
            loop
            playsInline
            preload="none"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
