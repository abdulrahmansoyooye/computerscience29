export default {
    name: 'semester',
    title: 'Semester',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Semester Name',
            type: 'string',
            description: 'e.g. Harmattan (First Semester)',
            validation: (Rule: any) => Rule.required(),
        },
    ],
}
