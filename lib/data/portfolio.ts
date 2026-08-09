export type Medium = 'Tattoo' | 'Painting' | 'Sketch';

export interface PortfolioItem {
  slug: string;
  title: string;
  medium: Medium;
  motif: string;
  placement?: string; // Only for Tattoo
  size?: string; // Only for Painting/Sketch
  description: string;
  coverImage: string;
  galleryImages: string[];
}

const IMAGE_HOST = process.env.NEXT_PUBLIC_IMAGE_HOST || "";

const rawPortfolioData = [
  {
    slug: 'memento-vivere',
    title: 'Memento Vivere',
    medium: 'Tattoo',
    motif: 'Neo-traditional Floral & Skull',
    placement: 'Full Back',
    description: 'A study in impermanence. The skull serves not as a grim reminder of death, but as a striking prompt to live fully. Surrounded by blossoming florals, this piece contrasts the fragility of life with the enduring permanence of ink.',
    coverImage: '/images/tattoo-neotraditional-2024-memento-vivere-main.jpg',
    galleryImages: ['/images/tattoo-neotraditional-2024-memento-vivere-main.jpg']
  },
  {
    slug: 'peony-back',
    title: 'The Peony Sweep',
    medium: 'Tattoo',
    motif: 'Botanical Illustration',
    placement: 'Upper Back & Shoulder',
    description: 'Designed to flow organically with the natural curvature of the spine and shoulder blade. The peony, a symbol of prosperity and honor, is rendered in delicate fine-lines with soft, deliberate shading to mimic charcoal on paper.',
    coverImage: '/images/tattoo-botanical-2024-peony-sweep-main.jpg',
    galleryImages: ['/images/tattoo-botanical-2024-peony-sweep-main.jpg']
  },
  {
    slug: 'buddha-lotus',
    title: 'Enlightenment in Oils',
    medium: 'Painting',
    motif: 'Abstract Spiritual',
    size: '36" x 48" Canvas',
    description: 'An exploration of serenity amidst chaos. Thick impasto techniques were used to give the lotus physical depth, grounding the ethereal imagery of the Buddha in tangible, heavy texture.',
    coverImage: '/images/canvas-abstract-2023-buddha-lotus-main.jpg',
    galleryImages: ['/images/canvas-abstract-2023-buddha-lotus-main.jpg']
  },
  {
    slug: 'category-canvas',
    title: 'Midnight Bloom',
    medium: 'Painting',
    motif: 'Abstract Floral',
    size: '24" x 36" Canvas',
    description: 'A visceral, moody approach to traditional floral motifs. Painted entirely during the monsoon, capturing the heavy, humid atmosphere of Mumbai nights.',
    coverImage: '/images/canvas-floral-2023-midnight-bloom-main.jpg',
    galleryImages: ['/images/canvas-floral-2023-midnight-bloom-main.jpg']
  },
  {
    slug: 'orchid-watercolour',
    title: 'Orchid Study #04',
    medium: 'Sketch',
    motif: 'Botanical Watercolor',
    size: 'A3 Cold-pressed Paper',
    description: 'A preparatory sketch that evolved into a standalone piece. Watercolors behave unpredictably, requiring a surrender of control—a philosophy that heavily influences my approach to tattooing.',
    coverImage: '/images/sketch-botanical-2022-orchid-study-04-main.jpg',
    galleryImages: ['/images/sketch-botanical-2022-orchid-study-04-main.jpg']
  },
  {
    slug: 'brushstroke-butterfly',
    title: 'Ephemeral Wings',
    medium: 'Sketch',
    motif: 'Ink Wash & Charcoal',
    size: 'A4 Sketchbook',
    description: 'Captured in three continuous brush strokes. This piece emphasizes movement and brevity over detailed realism, serving as the foundational concept for a later collarbone piece.',
    coverImage: '/images/sketch-inkwash-2022-ephemeral-wings-main.jpg',
    galleryImages: ['/images/sketch-inkwash-2022-ephemeral-wings-main.jpg']
  }
];

export const portfolioData: PortfolioItem[] = rawPortfolioData.map(item => ({
  ...item,
  medium: item.medium as Medium,
  coverImage: `${IMAGE_HOST}${item.coverImage}`,
  galleryImages: item.galleryImages.map(img => `${IMAGE_HOST}${img}`)
}));

export function getPortfolioItems(medium?: Medium | 'All'): PortfolioItem[] {
  if (!medium || medium === 'All') return portfolioData;
  return portfolioData.filter(item => item.medium === medium);
}

export function getPortfolioItemBySlug(slug: string): PortfolioItem | undefined {
  return portfolioData.find(item => item.slug === slug);
}
