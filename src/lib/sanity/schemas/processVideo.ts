import { defineField, defineType } from 'sanity';

export const processVideo = defineType({
  name: 'processVideo',
  title: 'Process Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'vimeoId',
      title: 'Vimeo Video ID',
      description: 'The numeric ID of the Vimeo video (e.g. 123456789 from vimeo.com/123456789)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'step',
      title: 'Process Step',
      description: 'Which process step this video belongs to (e.g. 1, 2, 3)',
      type: 'number',
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      description: 'Optional poster image to show before the video loads (defaults to Vimeo thumbnail if not provided)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'vimeoId',
      media: 'poster',
    },
  },
});
