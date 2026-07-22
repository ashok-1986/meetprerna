export interface PortfolioItem {
  _id: string;
  title: string;
  slug: { current: string };
  kind: 'tattoo' | 'painting' | 'sketch';
  year: number;
  styles?: string[];
  bodyArea?: string;
  medium?: string;
  dimensions?: string;
  status?: 'available' | 'sold' | 'commission' | 'archive';
  series?: { name: string; year: number };
  images: SanityImage[];
  note?: string;
  client?: string;
  published: boolean;
}

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata?: { lqip: string; dimensions: { width: number; height: number } };
  };
  alt?: string;
  credit?: string;
  isHero?: boolean;
}
