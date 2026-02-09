export default {
    name: 'material',
    title: 'Learning Material',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'course',
            title: 'Course',
            type: 'reference',
            to: [{ type: 'course' }],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'level',
            title: 'Level',
            type: 'reference',
            to: [{ type: 'level' }],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'semester',
            title: 'Semester',
            type: 'reference',
            to: [{ type: 'semester' }],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'file',
            title: 'File (PDF/Document)',
            type: 'file',
        },
        {
            name: 'externalLink',
            title: 'External Link',
            type: 'url',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        },
        {
            name: 'content',
            title: 'Content (Rich Text)',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
                {
                    type: 'code',
                    title: 'Code Snippet',
                },
            ],
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        },
        {
            name: 'isFeatured',
            title: 'Is Featured',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'isPublished',
            title: 'Is Published',
            type: 'boolean',
            initialValue: true,
        },
    ],
    preview: {
        select: {
            title: 'title',
            course: 'course.code',
            media: 'file',
        },
        prepare(selection: any) {
            const { title, course } = selection
            return {
                title: title,
                subtitle: course ? `Course: ${course}` : '',
            }
        },
    },
}
