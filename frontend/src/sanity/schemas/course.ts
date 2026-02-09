export default {
    name: 'course',
    title: 'Course',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Course Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'code',
            title: 'Course Code',
            type: 'string',
            description: 'e.g. CSC 201',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'level',
            title: 'Level',
            type: 'reference',
            to: [{ type: 'level' }],
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
    ],
}
