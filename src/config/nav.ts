/**
 * Navigation. Both header and footer reference this.
 * Reference: docs/content.md §2.6.
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export const primaryNav: NavItem[] = [
  { label: 'Studio', href: '/studio', description: 'The story, the space, the four pillars.' },
  { label: 'Tattoos', href: '/tattoos', description: 'Custom work: line, blackwork, flora, abstract.' },
  { label: 'Paintings', href: '/paintings', description: 'Abstract paintings and originals.' },
  { label: 'Sketches', href: '/sketches', description: 'Pencil and ink studies.' },
  { label: 'Process', href: '/process', description: 'How a piece gets made.' },
  { label: 'About', href: '/about', description: 'Prerna, the artist.' },
  { label: 'Contact', href: '/contact', description: 'Get in touch.' },
];

export const footerNav = {
  primary: primaryNav,
  secondary: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Instagram', href: 'https://instagram.com/meetprerna', external: true },
  ] as NavItem[],
} as const;