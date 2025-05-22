import type { Block } from 'payload'

const programsBlock: Block = {
  slug: 'programs',
  fields: [
    {
      name: 'programs',
      type: 'array',
      label: 'Programs',
      minRows: 1,
      labels: {
        singular: 'Program',
        plural: 'Programs',
      },
      fields: [
        {
          name: 'program_image',
          type: 'upload',
          relationTo: 'images',
          required: false,
          label: 'Program Image',
        },
        {
          name: 'program_title',
          type: 'text',
          required: true,
          label: 'Program Title',
        },
        {
          name: 'program_description',
          type: 'textarea',
          required: true,
          label: 'Program Description',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Program Features',
          minRows: 1,
          labels: {
            singular: 'Feature',
            plural: 'Features',
          },
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
              label: 'Feature',
            },
          ],
        },
      ],
    },
  ],
}

export default programsBlock; 