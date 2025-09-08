import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure' // default structure tool
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {DeleteProduct} from './schemaTypes/DeleteProduct'

export default defineConfig({
  name: 'default',
  title: 'Bluestar Surgical House',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,

  plugins: [
    structureTool(), // default structure without custom overrides
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, {schemaType}) => {
      return prev.map((Action) => {
        if (Action.name === 'delete' && schemaType === 'product') {
          return DeleteProduct
        }
        return Action
      })
    },
  },
})
