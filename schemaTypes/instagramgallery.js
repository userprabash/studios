export default {
  name: 'instagramGallery',
  title: 'Instagram Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      description: 'Optional title for this Instagram gallery (not required for frontend).',
    },
    {
      name: 'images',
      title: 'Instagram Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Accessibility text for the image',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).max(12),
    },
  ],
}
