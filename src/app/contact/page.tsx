'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { FilloutEmbed } from '@/components/ui/FilloutEmbed';
import { CONTACT_DETAILS, SOCIAL_LINKS } from '@/lib/constants';

/**
 * Contact Page Component
 * Two-column sticky layout with contact info and booking form
 */
export default function ContactPage() {
  return (
    <main className="relative">
      {/* Two Column Sticky Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Column - Contact Info (Sticky) */}
        <motion.aside
          className="relative min-h-screen md:sticky md:top-0 bg-black/50 p-6 md:p-12 md:h-screen flex flex-col justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-md">
            <SectionEyebrow text="Contact" />
            <h1 className="text-4xl md:text-5xl font-serif text-ivory mb-6 leading-tight">
              Come as you are. <br />
              <span className="italic text-green">Leave with art.</span>
            </h1>
            <p className="text-muted text-sm mb-12 leading-relaxed">
              Ready to begin your tattoo journey? Reach out to discuss your
              ideas, or book a free consultation directly.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-12">
              <div>
                <h3 className="text-ivory text-sm font-medium mb-1">Phone</h3>
                <a
                  href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, '')}`}
                  className="text-muted text-sm hover:text-green transition-colors"
                >
                  {CONTACT_DETAILS.phone}
                </a>
              </div>
              <div>
                <h3 className="text-ivory text-sm font-medium mb-1">Email</h3>
                <a
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  className="text-muted text-sm hover:text-green transition-colors"
                >
                  {CONTACT_DETAILS.email}
                </a>
              </div>
              <div>
                <h3 className="text-ivory text-sm font-medium mb-1">Location</h3>
                <p className="text-muted text-sm">{CONTACT_DETAILS.location}</p>
              </div>
              <div>
                <h3 className="text-ivory text-sm font-medium mb-1">Hours</h3>
                <p className="text-muted text-sm">{CONTACT_DETAILS.hours}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/60 hover:text-green transition-colors text-sm uppercase tracking-wide"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* Right Column - Form (Scrollable) */}
        <section className="min-h-screen p-6 md:p-12 md:py-24">
          <div className="max-w-xl mx-auto">
            <SectionEyebrow text="Book Now" />
            <h2 className="text-3xl md:text-4xl font-serif text-ivory mb-4">
              Your story starts here
            </h2>
            <p className="text-muted text-sm mb-12">
              Fill out the form below to book your free consultation. I&apos;ll
              get back to you within 48 hours.
            </p>

            {/* Fillout Embed */}
            <FilloutEmbed height={750} />
          </div>
        </section>
      </div>

      {/* Bottom Info Bar */}
      <div className="border-t border-white/6 py-8 px-6 md:px-12">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h4 className="text-green text-xs uppercase tracking-wide mb-1">
                Response Time
              </h4>
              <p className="text-muted text-sm">Within 48 hours</p>
            </div>
            <div>
              <h4 className="text-green text-xs uppercase tracking-wide mb-1">
                Location
              </h4>
              <p className="text-muted text-sm">Navi Mumbai, Maharashtra</p>
            </div>
            <div>
              <h4 className="text-green text-xs uppercase tracking-wide mb-1">
                Consultation
              </h4>
              <p className="text-muted text-sm">Free & No Obligation</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
