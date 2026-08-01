import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Urbanist, JetBrains_Mono, Libre_Baskerville } from 'next/font/google'

import '@/styles/tokens.css'
import { Analytics } from '@vercel/analytics/react'
import { cn } from "@/lib/utils";
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { site } from '@/content/site'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-accent',
  display: 'swap',
})

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Prerna',
  alternateName: 'Alza',
  description: 'Tattoo artist, painter and sketch artist working across Mumbai, Navi Mumbai and travelling.',
  url: 'https://meetprerna.com/',
  sameAs: [
    'https://www.instagram.com/meetprerna.tattoos/',
    `https://wa.me/${site.whatsapp}`,
  ],
  knowsAbout: [
    'Tattoo art',
    'Fine line tattoo',
    'Abstract tattoo',
    'Painting',
    'Sketch art',
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'Mumbai',
    },
    {
      '@type': 'City',
      name: 'Navi Mumbai',
    },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Custom tattoo, painting and sketch consultations',
  description: 'Slow consultation, hand-drawn design, single-use kit. Start a conversation.',
  provider: {
    '@type': 'Person',
    name: 'Prerna',
    alternateName: 'Alza',
    url: 'https://meetprerna.com/',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Mumbai',
    },
    {
      '@type': 'City',
      name: 'Navi Mumbai',
    },
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://meetprerna.com/consulting',
    servicePhone: `+${site.whatsapp}`,
    servicePostalCode: site.pincode,
    availableLanguage: ['English', 'Hindi', 'Marathi'],
  },
}

export const metadata: Metadata = {
  title: {
    default: 'MeetPrerna — Custom Tattoo Artist in Mumbai & Navi Mumbai',
    template: '%s — MeetPrerna',
  },
  description:
    'Custom tattoos, paintings and sketches by Prerna. Slow consultation, hand-drawn design, single-use kit. Start a conversation.',
  other: {
    'script:ld+json': [JSON.stringify(personSchema), JSON.stringify(serviceSchema)],
  },
}

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn(cormorant.variable, urbanist.variable, jetbrainsMono.variable, libreBaskerville.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.add("js")',
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
