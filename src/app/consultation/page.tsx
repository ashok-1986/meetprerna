'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { FilloutEmbed } from '@/components/ui/FilloutEmbed';
import { TRUST_SIGNALS, TESTIMONIALS } from '@/lib/constants';

const EXPECT_STEPS = [
  {
    number: '01',
    title: 'Share Your Idea',
    description: 'Tell me about your vision, placement, size, and any reference images you have.',
  },
  {
    number: '02',
    title: 'Design Review',
    description: 'I\'ll create a custom design and we\'ll refine it until it feels perfect.',
  },
  {
    number: '03',
    title: 'Book Session',
    description: 'Once the design is approved, we\'ll schedule your tattoo session.',
  },
  {
    number: '04',
    title: 'Aftercare Support',
    description: 'I\'ll guide you through healing to ensure your tattoo ages beautifully.',
  },
];

/**
 * Consultation Page Component
 * Full consultation booking page with form embed and trust signals
 */
export default function ConsultationPage() {
  return (
    <main className="relative pt-24">
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <SectionEyebrow text="Consultation" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-ivory mb-6 leading-tight">
            Get your <span className="italic text-green">free</span> <br />
            consultation now
          </h1>
          <p className="text-muted text-sm md:text-base max-w-md mx-auto">
            No obligation. Just a conversation about your vision and how we can
            bring it to life.
          </p>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="px-6 md:px-12 py-8 border-y border-white/6">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {TRUST_SIGNALS.map((signal, index) => (
              <motion.div
                key={signal.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-serif text-green mb-1">
                  {signal.label}
                </div>
                <div className="text-muted text-xs uppercase tracking-wide">
                  {signal.sublabel}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-[1920px] mx-auto">
          <SectionEyebrow text="Process" />
          <h2 className="text-3xl md:text-4xl font-serif text-ivory mb-12 md:mb-16">
            What to expect
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {EXPECT_STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Ghost Number */}
                <span className="absolute -top-6 -left-2 text-[80px] font-serif text-ivory/5 pointer-events-none select-none">
                  {step.number}
                </span>

                <div className="pt-8 pb-6 px-6 border border-white/6">
                  <h3 className="text-xl font-serif text-ivory mb-3">
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

      {/* Form Section */}
      <section className="px-6 md:px-12 py-12 border-t border-white/6">
        <div className="max-w-3xl mx-auto">
          <SectionEyebrow text="Book Now" />
          <h2 className="text-3xl md:text-4xl font-serif text-ivory mb-4">
            Let&apos;s begin
          </h2>
          <p className="text-muted text-sm mb-12">
            Fill out the form below and I&apos;ll get back to you within 48
            hours.
          </p>

          {/* Fillout Embed */}
          <FilloutEmbed height={800} />
        </div>
      </section>

      {/* Testimonial Strip */}
      <section className="px-6 md:px-12 py-24 border-t border-white/6">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Heading */}
            <div>
              <SectionEyebrow text="Testimonials" />
              <h2 className="text-3xl md:text-4xl font-serif text-ivory">
                Trusted by <br /> many
              </h2>
            </div>

            {/* Mini Testimonials */}
            <div className="space-y-6">
              {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="border-l border-white/10 pl-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <p className="text-ivory/80 text-sm italic mb-3">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <p className="text-green text-xs uppercase tracking-wide">
                    {testimonial.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="px-6 md:px-12 py-24 border-t border-white/6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-ivory mb-6">
            Have questions?
          </h2>
          <p className="text-muted text-sm mb-8">
            Reach out directly or explore the portfolio for inspiration.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 border border-ivory/30 text-ivory text-sm hover:border-green hover:text-green transition-colors duration-300"
              data-cursor="hover"
            >
              Contact Me
            </Link>
            <Link
              href="/portfolio"
              className="px-6 py-3 bg-green text-black text-sm font-medium hover:bg-yellow transition-colors duration-300"
              data-cursor="hover"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
