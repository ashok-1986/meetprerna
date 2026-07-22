/**
 * Site-wide constants. The single place to change brand-wide info.
 * Reference: docs/content.md §2.1.
 */
export const site = {
  name: 'MeetPrerna',
  shortName: 'MeetPrerna',
  tagline: 'Ink as language. Studio as a slow room.',
  description:
    'A Navi Mumbai-based creative studio by Prerna — custom tattoos, abstract paintings, and sketches. Each piece is a slow, personal conversation.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://meetprerna.com',
  locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en',
  timezone: process.env.NEXT_PUBLIC_TIMEZONE ?? 'Asia/Kolkata',
  email: 'studio@meetprerna.com',
  phone: '+91 98200 00000',
  address: {
    line1: 'Studio 4, Lane 7',
    line2: 'Vashi, Navi Mumbai 400703',
    country: 'India',
  },
  hours: 'Tuesday – Saturday, 11:00 – 19:00 IST, by appointment only',
  social: {
    instagram: 'https://instagram.com/meetprerna',
    arena: 'https://are.na/meetprerna',
  },
  booking: {
    responseWindow: '48 hours',
    deposit: 3000,
    depositCurrency: 'INR',
  },
  features: {
    shaders: process.env.NEXT_PUBLIC_ENABLE_SHADERS !== 'false',
    respectReducedMotion: process.env.NEXT_PUBLIC_ENABLE_REDUCED_MOTION_RESPECT !== 'false',
  },
} as const;

export type SiteConfig = typeof site;