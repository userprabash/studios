import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'brandimg',
  title: 'Brandimg',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Brand Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'url',
      title: 'Brand Website',
      type: 'url',
    }),
  ],
})
