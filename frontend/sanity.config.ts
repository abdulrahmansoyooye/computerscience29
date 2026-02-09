import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
    name: 'default',
    title: 'CSC29 Learning Portal Admin',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

    basePath: '/admin',

    plugins: [deskTool(), visionTool(), codeInput()],

    schema: {
        types: schemaTypes,
    },
})
