/**
 * Sanity schema — service offering (tattoo, painting, sketch).
 */
import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      options: {
        list: [
          { title: 'Custom tattoo', value: 'Custom tattoo' },
          { title: 'Painting', value: 'Painting' },
          { title: 'Sketch', value: 'Sketch' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'One-line summary',
      type: 'string',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'description',
      title: 'Long description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'startingPrice',
      title: 'Starting price (text)',
      type: 'string',
      description: 'e.g., "₹6,000 for small line pieces."',
    }),
    defineField({
      name: 'duration',
      title: 'Typical duration',
      type: 'string',
      description: 'e.g., "1–4 hours per session, 1–4 sessions."',
    }),
    defineField({
      name: 'image',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
});
