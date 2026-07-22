/**
 * Sanity schema — sitePage.
 * Used for the long-form essays on /studio, /process, /about.
 * Reference: docs/content.md §2.3–2.5.
 */
import { defineField, defineType } from 'sanity';

export const sitePage = defineType({
  name: 'sitePage',
  title: 'Site page (long-form)',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'lead',
      title: 'Lead paragraph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body (Portable Text)',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Page images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
});
