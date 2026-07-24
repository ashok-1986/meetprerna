export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  kind: 'tattoo' | 'painting' | 'sketch';
  year: number;
  styles?: string[];
  bodyArea?: string;
  medium?: string;
  dimensions?: string;
  status?: 'available' | 'sold' | 'commission' | 'archive';
  series?: { name: string; year: number };
  /** Plain image URLs (static asset paths or data URIs). First entry is the hero image. */
  images: string[];
  note?: string;
  client?: string;
  published: boolean;
}
