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
  ...STATIC_FALLBACK_TATTOOS.slice(0, 2),
  ...STATIC_FALLBACK_PAINTINGS.slice(0, 2),
  ...STATIC_FALLBACK_SKETCHES.slice(0, 2),
];
