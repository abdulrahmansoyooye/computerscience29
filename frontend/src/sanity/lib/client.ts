import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-06'

if (!projectId || !dataset) {
    console.error("❌ Sanity Configuration Error: NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET is missing.");
    console.log("Current Environment Variables:", {
        projectId,
        dataset,
        apiVersion
    });
}

export const client = createClient({
    projectId: projectId || 'missing',
    dataset: dataset || 'production',
    apiVersion,
    useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
