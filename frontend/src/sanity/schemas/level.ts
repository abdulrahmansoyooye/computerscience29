export default {
    name: 'level',
    title: 'Level',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Level Name',
            type: 'string',
            description: 'e.g. 100 Level',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'number',
            title: 'Level Number',
            type: 'number',
            description: 'e.g. 100',
        },
    ],
}
