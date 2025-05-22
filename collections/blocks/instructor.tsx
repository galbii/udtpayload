import type { Block } from 'payload'

const instructorBlock: Block = {
  slug: 'instructor',
  fields: [
    {
      name: 'instructor_name',
      type: 'text',
      required: true,
      label: 'Instructor Name',
    },
    {
      name: 'instructor_description',
      type: 'textarea',
      required: true,
      label: 'Instructor Description',
    },
    {
      name: 'instructor_image',
      type: 'upload',
      relationTo: 'images',
      required: false,
      label: 'Instructor Image',
    },
    {
      name: 'specialties',
      type: 'array',
      label: 'Specialties',
      minRows: 1,
      labels: {
        singular: 'Specialty',
        plural: 'Specialties',
      },
      fields: [
        {
          name: 'specialty',
          type: 'text',
          required: true,
          label: 'Specialty',
        },
      ],
    },
    {
      name: 'bio',
      type: 'text',
      required: true,
      label: 'Instructor Bio',
    },
  ],
}

export default instructorBlock; 