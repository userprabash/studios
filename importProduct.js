import {createClient} from '@sanity/client'
import fs from 'fs'
import 'dotenv/config'

// Setup Sanity client
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  useCdn: false,
  token: process.env.SANITY_STUDIO_API_TOKEN,
  apiVersion: '2025-08-30',
})

// Read JSON
const rawData = JSON.parse(fs.readFileSync('../DATA/products.json', 'utf-8'))
const categoriesData = rawData.categories

async function deleteAll() {
  try {
    // Delete all documents of these types
    await client.delete({query: '*[_type in ["product","brand","subcategory","category"]]'})
    console.log('✅ All products, brands, subcategories, and categories deleted!')
  } catch (err) {
    console.error('❌ Error deleting documents:', err)
  }
}
// yes yes
async function importData() {
  for (const categoryEntry of categoriesData) {
    // Create Category
    const category = await client.createIfNotExists({
      _id: `category-${categoryEntry.slug}`,
      _type: 'category',
      title: categoryEntry.name,
      slug: {_type: 'slug', current: categoryEntry.slug},
    })

    // Top-level brands
    for (const brandEntry of categoryEntry.brands ?? []) {
      const brand = await client.createIfNotExists({
        _id: `brand-${categoryEntry.slug}-${brandEntry.slug}`,
        _type: 'brand',
        title: brandEntry.name,
        slug: {_type: 'slug', current: brandEntry.slug},
        parentCategory: {_type: 'reference', _ref: category._id},
      })

      for (const productEntry of brandEntry.products ?? []) {
        await client.createIfNotExists({
          _id: `product-${categoryEntry.slug}-${brandEntry.slug}-${productEntry.slug}`,
          _type: 'product',
          title: productEntry.name,
          slug: {_type: 'slug', current: productEntry.slug},
          brand: {_type: 'reference', _ref: brand._id},
        })
      }
    }

    // Subcategories
    for (const subEntry of categoryEntry.subcategories ?? []) {
      const subcategory = await client.createIfNotExists({
        _id: `subcategory-${categoryEntry.slug}-${subEntry.slug}`,
        _type: 'subcategory',
        title: subEntry.name,
        slug: {_type: 'slug', current: subEntry.slug},
        parentCategory: {_type: 'reference', _ref: category._id},
      })

      for (const brandEntry of subEntry.brands ?? []) {
        const brand = await client.createIfNotExists({
          _id: `brand-${categoryEntry.slug}-${subEntry.slug}-${brandEntry.slug}`,
          _type: 'brand',
          title: brandEntry.name,
          slug: {_type: 'slug', current: brandEntry.slug},
          parentCategory: {_type: 'reference', _ref: category._id},
          parentSubcategory: {_type: 'reference', _ref: subcategory._id},
        })

        for (const productEntry of brandEntry.products ?? []) {
          await client.createIfNotExists({
            _id: `product-${categoryEntry.slug}-${subEntry.slug}-${brandEntry.slug}-${productEntry.slug}`,
            _type: 'product',
            title: productEntry.name,
            slug: {_type: 'slug', current: productEntry.slug},
            brand: {_type: 'reference', _ref: brand._id},
          })
        }
      }
    }
  }

  console.log('✅ Import complete!')
}

async function main() {
  await deleteAll()
  await importData()
}

main().catch(console.error)
