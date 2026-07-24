/**
 * Static portfolio content.
 *
 * MeetPrerna is a single-artist studio with no need for a CMS dashboard.
 * Portfolio items, testimonials, and process videos are hardcoded here.
 * To add or update content, edit this file directly.
 *
 * Images are inline SVG placeholders until real photography is supplied —
 * see README in public/images/ for where to drop real assets.
 */
import { type PortfolioItem } from '@/types/content';

function placeholderImage(kind: string, index: number): string {
  const label = `${kind.charAt(0).toUpperCase()}${kind.slice(1)} ${index + 1}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect fill="#2a2a2a" width="400" height="500"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#545454" font-family="system-ui" font-size="16">${label}</text></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export const TATTOOS: PortfolioItem[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `tattoo-${i}`,
  title: `Tattoo Project ${i + 1}`,
  slug: `tattoo-${i}`,
  kind: 'tattoo',
  year: 2024,
  styles: [['Blackwork', 'Flora'], ['Line', 'Flora'], ['Geometry', 'Abstract'], ['Blackwork'], ['Line', 'Geometry'], ['Abstract', 'Flora']][i],
  bodyArea: ['Forearm', 'Back', 'Shoulder', 'Wrist', 'Calf', 'Ribs'][i],
  images: [placeholderImage('tattoo', i)],
  published: true,
}));

export const PAINTINGS: PortfolioItem[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `painting-${i}`,
  title: `Abstract Study ${i + 1}`,
  slug: `painting-${i}`,
  kind: 'painting',
  year: 2023,
  medium: 'Acrylic on Canvas',
  dimensions: '36 x 48 in',
  status: 'available',
  series: { name: 'Silence', year: 2023 },
  images: [placeholderImage('painting', i)],
  published: true,
}));

export const SKETCHES: PortfolioItem[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `sketch-${i}`,
  title: `Figure Study ${i + 1}`,
  slug: `sketch-${i}`,
  kind: 'sketch',
  year: 2024,
  medium: 'Graphite on Paper',
  dimensions: '11 x 14 in',
  status: 'archive',
  series: { name: 'Anatomy', year: 2024 },
  images: [placeholderImage('sketch', i)],
  published: true,
}));

export const FEATURED_ITEMS: PortfolioItem[] = [
  {
    id: 'featured-1',
    title: 'Floral Sleeve',
    slug: 'floral-sleeve',
    kind: 'tattoo',
    year: 2024,
    styles: ['line', 'flora'],
    images: [placeholderImage('tattoo', 0)],
    published: true,
  },
  {
    id: 'featured-2',
    title: 'Abstract Form',
    slug: 'abstract-form',
    kind: 'painting',
    year: 2023,
    styles: ['abstract'],
    images: [placeholderImage('painting', 0)],
    published: true,
  },
  {
    id: 'featured-3',
    title: 'Geometric Back',
    slug: 'geometric-back',
    kind: 'tattoo',
    year: 2024,
    styles: ['geometry', 'line'],
    images: [placeholderImage('tattoo', 1)],
    published: true,
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  attribution: string;
  kind: 'tattoo' | 'painting' | 'sketch';
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'The space itself is calm. Prerna listened more than she spoke. The tattoo healed clean and the line work is exactly what I wanted.',
    attribution: '— Client, Mumbai',
    kind: 'tattoo',
  },
  {
    id: 'testimonial-2',
    quote: 'Her abstract pieces carry so much emotion. I bought two paintings for my studio and they completely change the energy of the room.',
    attribution: '— Collector, Delhi',
    kind: 'painting',
  },
  {
    id: 'testimonial-3',
    quote: 'This was the most calm and considered tattoo experience I have ever had. Prerna creates a truly safe space.',
    attribution: '— Client, Bangalore',
    kind: 'tattoo',
  },
];

export interface ProcessVideo {
  id: string;
  title: string;
  vimeoId: string;
  step: number;
  poster?: string;
}

// No real footage exists yet. ProcessClient renders a "Video Poster"
// placeholder for any step with no matching entry here — add real Vimeo
// IDs as they become available rather than inventing placeholder ones.
export const PROCESS_VIDEOS: ProcessVideo[] = [];
