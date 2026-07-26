export type Piece = {
  slug: string;
  title: string;
  medium: 'tattoo' | 'painting' | 'sketch';
  year?: number;
  image: string;
  healed?: string;
  motifs: string[];
  placement?: string;
  sessions?: number;
  dimensions?: string;
  available?: boolean;
  story?: string;
};

const pieces: Piece[] = [
  // ── Tattoos (13) ──
  {
    slug: 'brushstroke-butterfly',
    title: 'TODO(prerna): real title — Brushstroke Butterfly',
    medium: 'tattoo',
    image: 'brushstroke-butterfly.jpg',
    placement: 'Upper back',
    motifs: ['butterfly', 'abstract', 'brushwork', 'minimal'],
  },
  {
    slug: 'peony-back',
    title: 'TODO(prerna): real title — Peony',
    medium: 'tattoo',
    image: 'peony-back.jpg',
    placement: 'Back',
    motifs: ['peony', 'floral', 'fine line', 'black and grey'],
  },
  {
    slug: 'buddha-lotus',
    title: 'TODO(prerna): real title — Buddha and Lotus',
    medium: 'tattoo',
    image: 'buddha-lotus.jpg',
    placement: 'Upper arm',
    motifs: ['buddha', 'lotus', 'realism', 'black and grey'],
  },
  {
    slug: 'lion-and-birds',
    title: 'TODO(prerna): real title — Lion and Birds',
    medium: 'tattoo',
    image: 'lion-and-birds.jpg',
    placement: 'Upper arm',
    motifs: ['lion', 'birds', 'realism', 'black and grey'],
  },
  {
    slug: 'wolf-red-geometric',
    title: 'TODO(prerna): real title — Wolf, Red and Geometric',
    medium: 'tattoo',
    image: 'wolf-red-geometric.jpg',
    placement: 'Forearm',
    motifs: ['wolf', 'geometric', 'trash polka', 'colour'],
  },
  {
    slug: 'geometric-wolf',
    title: 'TODO(prerna): real title — Geometric Wolf',
    medium: 'tattoo',
    image: 'geometric-wolf.jpg',
    placement: 'Upper arm',
    motifs: ['wolf', 'geometric', 'linework', 'black and grey'],
  },
  {
    slug: 'knight',
    title: 'TODO(prerna): real title — Knight',
    medium: 'tattoo',
    image: 'knight.jpg',
    placement: 'Forearm',
    motifs: ['knight', 'armour', 'realism', 'black and grey'],
  },
  {
    slug: 'memento-vivere',
    title: 'TODO(prerna): real title — Memento Vivere',
    medium: 'tattoo',
    image: 'memento-vivere.jpg',
    placement: 'Upper arm',
    motifs: ['lettering', 'column', 'geometric', 'black and grey'],
  },
  {
    slug: 'shaded-butterfly',
    title: 'TODO(prerna): real title — Shaded Butterfly',
    medium: 'tattoo',
    image: 'shaded-butterfly.jpg',
    placement: 'Shoulder blade',
    motifs: ['butterfly', 'shading', 'black and grey'],
  },
  {
    slug: 'one-day-at-a-time',
    title: 'TODO(prerna): real title — One Day At A Time',
    medium: 'tattoo',
    image: 'one-day-at-a-time.jpg',
    placement: 'Collarbone',
    motifs: ['lettering', 'butterfly', 'fine line'],
  },
  {
    slug: 'rudolf',
    title: 'TODO(prerna): real title — Rudolf',
    medium: 'tattoo',
    image: 'rudolf.jpg',
    placement: 'Ribs',
    motifs: ['floral', 'lettering', 'colour'],
  },
  {
    slug: 'red-blossom',
    title: 'TODO(prerna): real title — Red Blossom',
    medium: 'tattoo',
    image: 'red-blossom.jpg',
    placement: 'Shoulder blade',
    motifs: ['floral', 'colour'],
  },
  {
    slug: 'orchid-watercolour',
    title: 'TODO(prerna): real title — Orchid',
    medium: 'tattoo',
    image: 'orchid-watercolour.jpg',
    placement: 'Thigh',
    motifs: ['orchid', 'floral', 'watercolour', 'colour'],
  },

  // ── Paintings (4) ──
  {
    slug: 'tidal',
    title: 'TODO(prerna): real title — Tidal',
    medium: 'painting',
    image: 'tidal.jpg',
    motifs: ['abstract', 'textured', 'blue', 'gold'],
    dimensions: 'TODO(prerna): dimensions',
  },
  {
    slug: 'night-bloom',
    title: 'TODO(prerna): real title — Night Bloom',
    medium: 'painting',
    image: 'night-bloom.jpeg',
    motifs: ['abstract', 'impasto', 'red', 'yellow'],
    dimensions: 'TODO(prerna): dimensions',
  },
  {
    slug: 'the-room',
    title: 'TODO(prerna): real title — The Room',
    medium: 'painting',
    image: 'the-room.jpg',
    motifs: ['figurative', 'interior', 'gouache'],
    dimensions: 'TODO(prerna): dimensions',
  },
  {
    slug: 'shoreline',
    title: 'TODO(prerna): real title — Shoreline',
    medium: 'painting',
    image: 'shoreline.jpg',
    motifs: ['abstract', 'collage', 'paper-cut', 'blue'],
    dimensions: 'TODO(prerna): dimensions',
  },

  // ── Sketch (1) ──
  {
    slug: 'still-life-study',
    title: 'TODO(prerna): real title — Still Life Study',
    medium: 'sketch',
    image: 'still-life-study.jpg',
    motifs: ['still life', 'pencil', 'watercolour', 'study'],
    dimensions: 'TODO(prerna): dimensions',
  },
]

export const portfolio: Piece[] = pieces

export function imagePath(medium: Piece['medium'], filename: string): string {
  return `/images/portfolio/${filename}`
}

export function getPiece(slug: string): Piece | undefined {
  return pieces.find((p) => p.slug === slug)
}

export function getPiecesByMedium(medium: Piece['medium'] | 'all'): Piece[] {
  if (medium === 'all') return pieces
  return pieces.filter((p) => p.medium === medium)
}
