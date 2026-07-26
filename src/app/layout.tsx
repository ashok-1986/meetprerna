import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter, JetBrains_Mono, Geist } from 'next/font/google'

import '@/styles/tokens.css'
import { Analytics } from '@vercel/analytics/react'
import { cn } from "@/lib/utils";
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
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
    'https://www.instagram.com/prerna.tattoos/',
    'https://wa.me/919820012345',
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
    servicePhone: '+919820012345',
    servicePostalCode: '400001',
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
  themeColor: '#1A1A1A',
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
      className={cn(cormorant.variable, inter.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.add("js")',
          }}
        />
      </head>
      <body
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          background: 'var(--color-ink)',
          color: 'var(--color-ivory)',
          margin: 0,
        }}
      >
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
