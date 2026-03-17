'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { TIMELINE_CHAPTERS, TESTIMONIALS } from '@/lib/constants';

const TRAIT_PILLS = [
  'Resilient',
  'Creative',
  'Detail-Oriented',
  'Empathetic',
  'Patient',
  'Intuitive',
  'Story-Driven',
  'Hygiene-First',
];

/**
 * About Page Component
 * Full biography with hero, intro split, timeline, and testimonials
 */
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <main className="relative">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-end overflow-hidden"
      >
        {/* Full Bleed Image with Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: yParallax }}
        >
          <Image
            src="/assets/prerna-bw-studio.jpg"
            alt="Prerna studio by Prerna, Navi Mumbai"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, var(--color-black) 100%)',
            }}
          />
        </motion.div>

        {/* Text Overlay */}
        <div className="relative z-10 px-6 md:px-12 pb-24 md:pb-32">
          <SectionEyebrow text="About" />
          <h1 className="text-section font-serif text-ivory mb-4">
            Meet <span className="italic text-green">Prerna</span>
          </h1>
          <p className="text-muted text-sm md:text-base max-w-md">
            Custom tattoo artist. Navi Mumbai.
          </p>
        </div>
      </section>

      {/* Intro Split Section */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left - Image */}
            <motion.div
              className="relative aspect-[3/4]"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/assets/prerna-sunglasses.jpg"
                alt="Prerna with sunglasses by Prerna, Navi Mumbai"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <SectionEyebrow text="Introduction" />
              <h2 className="text-3xl md:text-4xl font-serif text-ivory mb-6 leading-tight">
                I create tattoos that honour your story with intention and care.
              </h2>
              <div className="space-y-4 text-muted text-sm md:text-base leading-relaxed">
                <p>
                  Every tattoo begins with a conversation. I listen—not just to
                  what you want, but why you want it. Because the most
                  meaningful designs come from understanding the story behind the
                  vision.
                </p>
                <p>
                  My approach blends fine line precision with geometric
                  sensitivity, always tailored to your unique narrative. Whether
                  it&apos;s your first piece or your tenth, I treat every
                  session as a collaboration—a shared act of creation.
                </p>
              </div>

              {/* Trait Pills */}
              <div className="flex flex-wrap gap-2 mt-8">
                {TRAIT_PILLS.map((trait, index) => (
                  <motion.span
                    key={trait}
                    className="px-3 py-1.5 border border-white/10 text-ivory/60 text-xs uppercase tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/6">
        <div className="max-w-[1920px] mx-auto">
          <SectionEyebrow text="Journey" />
          <h2 className="text-section font-serif text-ivory mb-16 md:mb-24">
            The path <br /> that brought me here
          </h2>

          {/* Timeline Chapters */}
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10" />

            <div className="space-y-16 md:space-y-24">
              {TIMELINE_CHAPTERS.map((chapter, index) => (
                <motion.div
                  key={chapter.number}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                >
                  {/* Number Dot */}
                  <div className="absolute left-4 md:left-1/2 top-0 w-3 h-3 -translate-x-1/2 bg-green rounded-full z-10" />

                  {/* Image Column */}
                  <div
                    className={`relative aspect-[4/3] ${
                      index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                    }`}
                  >
                    <Image
                      src={chapter.image}
                      alt={`${chapter.title} by Prerna, Navi Mumbai`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content Column */}
                  <div
                    className={`${
                      index % 2 === 0 ? 'md:order-1 md:pr-20 md:text-right' : 'md:order-2 md:pl-20'
                    }`}
                  >
                    <span className="text-green text-xs uppercase tracking-[0.2em] mb-2 block">
                      {chapter.label}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif text-ivory mb-4">
                      {chapter.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {chapter.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/6">
        <div className="max-w-[1920px] mx-auto">
          <SectionEyebrow text="Testimonials" />
          <h2 className="text-section font-serif text-ivory mb-16">
            Words from the <br /> healed
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={index}
                className="border border-white/6 p-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <span className="block text-5xl font-serif text-green/30 mb-4">
                  &ldquo;
                </span>
                <p className="text-ivory/90 text-sm leading-relaxed mb-6">
                  {testimonial.text}
                </p>
                <p className="text-green text-xs uppercase tracking-[0.15em]">
                  {testimonial.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-section font-serif text-ivory mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to begin <br /> your story?
          </motion.h2>
          <motion.p
            className="text-muted text-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Book your free consultation. Let&apos;s create something meaningful
            together.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/consultation"
              className="px-6 py-3 bg-green text-black text-sm font-medium hover:bg-yellow transition-colors duration-300"
              data-cursor="hover"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-ivory/30 text-ivory text-sm hover:border-green hover:text-green transition-colors duration-300"
              data-cursor="hover"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
