export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subcategories',
      title: 'Subcategories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'subcategory'}]}],
      description: 'Optional: Add subcategories under this category',
    },
    {
      name: 'brands',
      title: 'Brands',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'brand'}]}],
      description: 'If no subcategories, you can link brands directly under this category',
    },
  ],
}
