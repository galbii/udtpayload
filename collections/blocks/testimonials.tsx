import type { Block } from 'payload'

const testimonialsBlock: Block = {
  slug: 'testimonials',
  fields: [
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      labels: {
        singular: 'Testimonial',
        plural: 'Testimonials',
      },
      fields: [
        {
          name: 'testimonial_text',
          type: 'textarea',
          required: true,
          label: 'Testimonial',
        },
        {
          name: 'profile',
          type: 'group',
          label: 'Customer Profile',
          fields: [
            {
              name: 'customer_name',
              type: 'text',
              required: true,
              label: 'Customer Name',
            },
            {
              name: 'customer_city',
              type: 'text',
              required: true,
              label: 'Customer City',
            },
            {
              name: 'customer_state',
              type: 'text',
              required: true,
              label: 'Customer State',
            },
            {
              name: 'testimonial_date',
              type: 'group',
              label: 'Testimonial Date',
              fields: [
                {
                  name: 'month',
                  type: 'number',
                  required: true,
                  label: 'Month',
                  min: 1,
                  max: 12,
                },
                {
                  name: 'day',
                  type: 'number',
                  required: true,
                  label: 'Day',
                  min: 1,
                  max: 31,
                },
                {
                  name: 'year',
                  type: 'number',
                  required: true,
                  label: 'Year',
                  min: 1900,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default testimonialsBlock; 