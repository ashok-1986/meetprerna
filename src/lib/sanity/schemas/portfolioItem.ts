/**
 * Sanity schema — portfolioItem.
 * The single most important schema. Drives /tattoos, /paintings, /sketches.
 * Reference: docs/content.md §14.
 */

import { defineField, defineType } from 'sanity';

export const portfolioItem = defineType({
  name: 'portfolioItem',
  title: 'Portfolio item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          { title: 'Tattoo', value: 'tattoo' },
          { title: 'Painting', value: 'painting' },
          { title: 'Sketch', value: 'sketch' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(2010).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'styles',
      title: 'Style tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Line', value: 'line' },
          { title: 'Blackwork', value: 'blackwork' },
          { title: 'Flora', value: 'flora' },
          { title: 'Geometry', value: 'geometry' },
          { title: 'Abstract', value: 'abstract' },
        ],
        layout: 'tags',
      },
      hidden: ({ document }) => document?.kind !== 'tattoo',
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          if (ctx.document?.kind === 'tattoo' && (!value || value.length === 0)) {
            return 'Tattoo items need at least one style tag.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'bodyArea',
      title: 'Body area',
      type: 'string',
      options: {
        list: [
          { title: 'Arm', value: 'arm' },
          { title: 'Back', value: 'back' },
          { title: 'Chest', value: 'chest' },
          { title: 'Leg', value: 'leg' },
          { title: 'Rib', value: 'rib' },
          { title: 'Neck', value: 'neck' },
          { title: 'Hand', value: 'hand' },
          { title: 'Ankle', value: 'ankle' },
          { title: 'Wrist', value: 'wrist' },
        ],
      },
      hidden: ({ document }) => document?.kind !== 'tattoo',
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'For paintings and sketches. e.g., "Acrylic on canvas", "Pencil on paper".',
      hidden: ({ document }) => document?.kind === 'tattoo',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'For paintings. e.g., "60 × 80 cm".',
      hidden: ({ document }) => document?.kind !== 'painting',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'Commission only', value: 'commission' },
          { title: 'Archive', value: 'archive' },
        ],
      },
      hidden: ({ document }) => document?.kind === 'tattoo',
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'reference',
      to: [{ type: 'series' }],
      hidden: ({ document }) => document?.kind === 'tattoo',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt text', type: 'string' },
            { name: 'credit', title: 'Credit', type: 'string' },
            { name: 'isHero', title: 'Use as hero', type: 'boolean', initialValue: false },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(8),
    }),
    defineField({
      name: 'note',
      title: 'Artist note',
      type: 'text',
      rows: 3,
      description: 'Optional. A line of context. 1–2 sentences.',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      description: 'Optional. For tattoos, with permission. e.g., "with consent, 2024".',
      hidden: ({ document }) => document?.kind !== 'tattoo',
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle off to hide from the public site without deleting.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      kind: 'kind',
      year: 'year',
      media: 'images.0',
    },
    prepare({ title, kind, year, media }) {
      return {
        title,
        subtitle: `${kind ?? '—'} · ${year ?? '—'}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Year, newest first',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
