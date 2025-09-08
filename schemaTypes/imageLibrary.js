import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'imageLibrary',
  title: 'Image Library',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A descriptive name for this image (e.g., About Page Banner)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // allows cropping/focusing
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title', // automatically generates slug from title
        maxLength: 50,
      },
      validation: (Rule) => Rule.required(),
      description: 'Unique identifier for referencing this image in the frontend',
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Accessibility text for the image',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
