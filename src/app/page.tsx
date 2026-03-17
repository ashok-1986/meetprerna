import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Intro } from '@/components/sections/Intro';
import { Process } from '@/components/sections/Process';
import { PortfolioPreview } from '@/components/sections/PortfolioPreview';
import { Philosophy } from '@/components/sections/Philosophy';
import { VideoSection } from '@/components/sections/VideoSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBand } from '@/components/sections/CtaBand';

// ============================================
// METADATA
// ============================================
export const metadata: Metadata = {
  title: 'Custom Tattoo Artist in Mumbai & Navi Mumbai | Prerna',
  description:
    'Meet Prerna is a female custom tattoo artist based in Navi Mumbai, specializing in story-driven, fine line, and geometric tattoo designs. By appointment only.',
  keywords: [
    'tattoo artist',
    'Navi Mumbai',
    'Mumbai',
    'custom tattoo',
    'female tattoo artist',
    'fine line tattoo',
    'geometric tattoo',
  ],
  openGraph: {
    title: 'Custom Tattoo Artist in Mumbai & Navi Mumbai | Prerna',
    description:
      'Female custom tattoo artist specializing in meaningful, story-driven designs. Based in Navi Mumbai, by appointment only.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://meetprerna.com',
  },
};

// ============================================
// HOMEPAGE
// ============================================
export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <Intro />
      <Process />
      <PortfolioPreview />
      <Philosophy />
      <VideoSection />
      <Testimonials />
      <CtaBand />
    </main>
  );
}
