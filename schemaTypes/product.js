export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Name',
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
      name: 'image',
      title: 'Product Image',
      type: 'image',
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{type: 'brand'}],
    },
    {
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'parentSubcategory',
      title: 'Parent Subcategory',
      type: 'reference',
      to: [{type: 'subcategory'}],
    },

    // ✅ Catalog PDF
    {
      name: 'catalogPdf',
      title: 'Catalog PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },

    // ✅ Features Section
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of key features for the product',
    },
  ],
}
