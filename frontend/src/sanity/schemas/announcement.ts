export default {
    name: 'announcement',
    title: 'Announcement',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'content',
            title: 'Content',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'date',
            title: 'Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        },
        {
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            initialValue: true,
        },
        {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Info', value: 'info' },
                    { title: 'Warning', value: 'warning' },
                    { title: 'Success', value: 'success' },
                ],
            },
        },
    ],
}
