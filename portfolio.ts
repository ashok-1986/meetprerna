// src/content/portfolio.ts
//
// 13 pieces, all tattoos. Derived from the images supplied 2026-07-26.
//
// WHAT IS FACTUAL HERE: medium, placement, motifs, and the slug/title.
// All of it is read directly off the photographs. Nothing is invented.
//
// WHAT IS MISSING AND MUST COME FROM PRERNA:
//   - year        (omitted entirely rather than guessed — see note below)
//   - sessions    (not visible in a photograph)
//   - story       (her words, 60-120 each, added one at a time)
//   - real titles (the ones below are descriptive labels, not her names
//                  for the work — she may want to rename them)
//
// TYPE CHANGE REQUIRED: `year` must become optional (`year?: number`).
// It was required in the original type. We do not know the years and a
// guessed year on a portfolio piece is a fabricated fact. Omit until
// confirmed; the metadata line renders without it.

export type Piece = {
  slug: string;
  title: string;
  medium: 'tattoo' | 'painting' | 'sketch';
  year?: number;              // CHANGED: now optional
  image: string;
  healed?: string;
  motifs: string[];
  placement?: string;
  sessions?: number;
  dimensions?: string;
  available?: boolean;
  story?: string;
};

export const portfolio: Piece[] = [
  {
    slug: 'brushstroke-butterfly',
    title: 'Brushstroke Butterfly',
    medium: 'tattoo',
    image: 'brushstroke-butterfly.jpg',
    placement: 'Upper back',
    motifs: ['butterfly', 'abstract', 'brushwork', 'minimal'],
    // Closest piece in the set to the painterly positioning on the home
    // page. Strong candidate for the first grid slot.
  },
  {
    slug: 'peony-back',
    title: 'Peony',
    medium: 'tattoo',
    image: 'peony-back.jpg',
    placement: 'Back',
    motifs: ['peony', 'floral', 'fine line', 'black and grey'],
  },
  {
    slug: 'buddha-lotus',
    title: 'Buddha and Lotus',
    medium: 'tattoo',
    image: 'buddha-lotus.jpg',
    placement: 'Upper arm',
    motifs: ['buddha', 'lotus', 'realism', 'black and grey'],
    // NOTE: this image has had its background removed and sits on white.
    // It will look inconsistent beside the other photographs in a grid.
    // Either re-export with the original background or accept the
    // difference deliberately.
  },
  {
    slug: 'lion-and-birds',
    title: 'Lion and Birds',
    medium: 'tattoo',
    image: 'lion-and-birds.jpg',
    placement: 'Upper arm',
    motifs: ['lion', 'birds', 'realism', 'black and grey'],
  },
  {
    slug: 'wolf-red-geometric',
    title: 'Wolf, Red and Geometric',
    medium: 'tattoo',
    image: 'wolf-red-geometric.jpg',
    placement: 'Forearm',
    motifs: ['wolf', 'geometric', 'trash polka', 'colour'],
  },
  {
    slug: 'geometric-wolf',
    title: 'Geometric Wolf',
    medium: 'tattoo',
    image: 'geometric-wolf.jpg',
    placement: 'Upper arm',
    motifs: ['wolf', 'geometric', 'linework', 'black and grey'],
  },
  {
    slug: 'knight',
    title: 'Knight',
    medium: 'tattoo',
    image: 'knight.jpg',
    placement: 'Forearm',
    motifs: ['knight', 'armour', 'realism', 'black and grey'],
  },
  {
    slug: 'memento-vivere',
    title: 'Memento Vivere',
    medium: 'tattoo',
    image: 'memento-vivere.jpg',
    placement: 'Upper arm',
    motifs: ['lettering', 'column', 'geometric', 'black and grey'],
  },
  {
    slug: 'shaded-butterfly',
    title: 'Shaded Butterfly',
    medium: 'tattoo',
    image: 'shaded-butterfly.jpg',
    placement: 'Shoulder blade',
    motifs: ['butterfly', 'shading', 'black and grey'],
  },
  {
    slug: 'one-day-at-a-time',
    title: 'One Day At A Time',
    medium: 'tattoo',
    image: 'one-day-at-a-time.jpg',
    placement: 'Collarbone',
    motifs: ['lettering', 'butterfly', 'fine line'],
  },
  {
    slug: 'rudolf',
    title: 'Rudolf',
    medium: 'tattoo',
    image: 'rudolf.jpg',
    placement: 'Ribs',
    motifs: ['floral', 'lettering', 'colour'],
    // Carries a client's name. Confirm with Prerna that the client is
    // happy for it to be published before this one ships.
  },
  {
    slug: 'red-blossom',
    title: 'Red Blossom',
    medium: 'tattoo',
    image: 'red-blossom.jpg',
    placement: 'Shoulder blade',
    motifs: ['floral', 'colour'],
  },
  {
    slug: 'orchid-watercolour',
    title: 'Orchid',
    medium: 'tattoo',
    image: 'orchid-watercolour.jpg',
    placement: 'Thigh',
    motifs: ['orchid', 'floral', 'watercolour', 'colour'],
    // The only full-colour watercolour piece in the set. Shows a range
    // the rest of the grid does not. Worth placing high.
  },

// ============================================================
// APPEND — paintings and sketches, supplied 2026-07-26.
// The three-medium structure is now real. Restore the medium
// filter on /portfolio and the LIGHT MODE detail pages for
// painting and sketch.
// ============================================================

  {
    slug: 'tidal',
    title: 'Tidal',
    medium: 'painting',
    image: 'tidal.jpg',
    motifs: ['abstract', 'texture', 'ocean', 'impasto'],
    dimensions: 'TODO(prerna): dimensions',
    available: true,
    // The strongest painting in the set and the one that most directly
    // evidences the home page headline. Heavy relief texture, blues and
    // golds. Photographed against a plain wall, so it needs no styling.
  },
  {
    slug: 'night-bloom',
    title: 'Night Bloom',
    medium: 'painting',
    image: 'night-bloom.jpg',
    motifs: ['abstract', 'impasto', 'texture'],
    dimensions: 'TODO(prerna): dimensions',
    available: true,
    // Dark ground, heavy palette-knife work in red, yellow and white.
    // Sits naturally against --color-ink, so it is the one painting that
    // also works on a dark surface if a light detail page is not ready.
  },
  {
    slug: 'the-room',
    title: 'The Room',
    medium: 'painting',
    image: 'the-room.jpg',
    motifs: ['interior', 'figurative', 'gouache', 'colour'],
    dimensions: 'TODO(prerna): dimensions',
    // Figurative interior study. Shows a completely different register
    // from the abstracts and is worth keeping for exactly that reason.
  },
  {
    slug: 'shoreline',
    title: 'Shoreline',
    medium: 'painting',
    image: 'shoreline.jpg',
    motifs: ['collage', 'paper cut', 'mixed media', 'ocean'],
    dimensions: 'TODO(prerna): dimensions',
    // Layered paper-cut collage, not paint. Filed under painting because
    // adding a fourth medium for one piece is not worth a filter option.
    // TODO(prerna): confirm she is happy for this to sit under Paintings.
  },
  {
    slug: 'still-life-study',
    title: 'Still Life Study',
    medium: 'sketch',
    image: 'still-life-study.jpg',
    motifs: ['still life', 'study', 'watercolour', 'pencil'],
    // Two studies of the same objects on one sheet. This is exactly the
    // Sketchbook material described in BLUEPRINT.md §5 — work that shows
    // her thinking rather than a finished commission.
  },
];
