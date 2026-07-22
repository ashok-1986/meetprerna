/**
 * Sanity schema — testimonial.
 */
import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      description: 'e.g., "Aanya R., Mumbai"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Practice',
      type: 'string',
      options: {
        list: [
          { title: 'Tattoo', value: 'tattoo' },
          { title: 'Painting', value: 'painting' },
          { title: 'Sketch', value: 'sketch' },
        ],
      },
    }),
    defineField({
      name: 'permission',
      title: 'Permission to publish',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required().custom((v) => v === true || 'Permission must be granted.'),
    }),
  ],
  preview: {
    select: { title: 'attribution', subtitle: 'quote' },
  },
});
