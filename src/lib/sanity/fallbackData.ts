import { type PortfolioItem } from '@/types/content';

export const STATIC_FALLBACK_TATTOOS: PortfolioItem[] = Array.from({ length: 6 }).map((_, i) => ({
  _id: `tattoo-${i}`,
  title: `Tattoo Project ${i + 1}`,
  slug: { current: `tattoo-${i}` },
  kind: 'tattoo',
  year: 2024,
  styles: [['Blackwork', 'Flora'], ['Line', 'Flora'], ['Geometry', 'Abstract'], ['Blackwork'], ['Line', 'Geometry'], ['Abstract', 'Flora']][i],
  bodyArea: ['Forearm', 'Back', 'Shoulder', 'Wrist', 'Calf', 'Ribs'][i],
  images: [],
  published: true,
}));

export const STATIC_FALLBACK_PAINTINGS: PortfolioItem[] = Array.from({ length: 6 }).map((_, i) => ({
  _id: `painting-${i}`,
  title: `Abstract Study ${i + 1}`,
  slug: { current: `painting-${i}` },
  kind: 'painting',
  year: 2023,
  medium: 'Acrylic on Canvas',
  dimensions: '36 x 48 in',
  status: 'available',
  series: { name: 'Silence', year: 2023 },
  images: [],
  published: true,
}));

export const STATIC_FALLBACK_SKETCHES: PortfolioItem[] = Array.from({ length: 6 }).map((_, i) => ({
  _id: `sketch-${i}`,
  title: `Figure Study ${i + 1}`,
  slug: { current: `sketch-${i}` },
  kind: 'sketch',
  year: 2024,
  medium: 'Graphite on Paper',
  dimensions: '11 x 14 in',
  status: 'archive',
  series: { name: 'Anatomy', year: 2024 },
  images: [],
  published: true,
}));

export const STATIC_FALLBACK_FEATURED: PortfolioItem[] = [
  {
    _id: 'fallback-featured-1',
    title: 'Floral Sleeve',
    slug: { current: 'floral-sleeve' },
    kind: 'tattoo',
    year: 2024,
    styles: ['line', 'flora'],
    images: [],
    published: true,
  },
  {
    _id: 'fallback-featured-2',
    title: 'Abstract Form',
    slug: { current: 'abstract-form' },
    kind: 'painting',
    year: 2023,
    styles: ['abstract'],
    images: [],
    published: true,
  },
  {
    _id: 'fallback-featured-3',
    title: 'Geometric Back',
    slug: { current: 'geometric-back' },
    kind: 'tattoo',
    year: 2024,
    styles: ['geometry', 'line'],
    images: [],
    published: true,
  },
];

export const STATIC_FALLBACK_TESTIMONIALS = [
  {
    _id: 'fallback-1',
    quote: 'The space itself is calm. Prerna listened more than she spoke. The tattoo healed clean and the line work is exactly what I wanted.',
    attribution: '— Client, Mumbai',
    kind: 'tattoo',
  },
  {
    _id: 'fallback-2',
    quote: 'Her abstract pieces carry so much emotion. I bought two paintings for my studio and they completely change the energy of the room.',
    attribution: '— Collector, Delhi',
    kind: 'painting',
  },
  {
    _id: 'fallback-3',
    quote: 'This was the most calm and considered tattoo experience I have ever had. Prerna creates a truly safe space.',
    attribution: '— Client, Bangalore',
    kind: 'tattoo',
  }
];
