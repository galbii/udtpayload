import type { Block } from 'payload'

const contactBlock: Block = {
  slug: 'contact',
  fields: [
    {
      name: 'address_line_1',
      type: 'text',
      required: true,
      label: 'Address Line 1',
    },
    {
      name: 'address_line_2',
      type: 'text',
      required: false,
      label: 'Address Line 2',
    },
    {
      name: 'suite',
      type: 'text',
      required: false,
      label: 'Suite/Unit',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      label: 'City',
    },
    {
      name: 'state',
      type: 'text',
      required: true,
      label: 'State',
    },
    {
      name: 'zip_code',
      type: 'text',
      required: true,
      label: 'ZIP Code',
    },
    {
      name: 'hours',
      type: 'group',
      label: 'Business Hours',
      fields: [
        {
          name: 'time_group',
          type: 'group',
          label: false,
          admin: {
            style: {
              border: 'none',
              margin: 0,
              padding: 0,
            }
          },
          fields: [
            {
              name: 'opening_hour',
              type: 'select',
              required: true,
              label: 'Opening Hour',
              admin: {
                width: '30%',
                style: {
                  display: 'inline-block',
                },
              },
              options: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '10', value: '10' },
                { label: '11', value: '11' },
                { label: '12', value: '12' },
              ]
            },
            {
              name: 'opening_minute',
              type: 'select',
              required: true,
              label: 'Min',
              admin: {
                width: '30%',
                style: {
                  display: 'inline-block',
                },
              },
              options: [
                { label: '00', value: '00' },
                { label: '15', value: '15' },
                { label: '30', value: '30' },
                { label: '45', value: '45' },
              ]
            },
            {
              name: 'opening_period',
              type: 'select',
              required: true,
              label: 'AM/PM',
              admin: {
                width: '30%',
                style: {
                  display: 'inline-block',
                },
              },
              options: [
                { label: 'AM', value: 'AM' },
                { label: 'PM', value: 'PM' },
              ]
            },
            {
              name: 'closing_hour',
              type: 'select',
              required: true,
              label: 'Closing Hour',
              admin: {
                width: '30%',
                style: {
                  display: 'inline-block',
                  marginTop: '10px',
                },
              },
              options: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '10', value: '10' },
                { label: '11', value: '11' },
                { label: '12', value: '12' },
              ]
            },
            {
              name: 'closing_minute',
              type: 'select',
              required: true,
              label: 'Min',
              admin: {
                width: '30%',
                style: {
                  display: 'inline-block',
                  marginTop: '10px',
                },
              },
              options: [
                { label: '00', value: '00' },
                { label: '15', value: '15' },
                { label: '30', value: '30' },
                { label: '45', value: '45' },
              ]
            },
            {
              name: 'closing_period',
              type: 'select',
              required: true,
              label: 'AM/PM',
              admin: {
                width: '30%',
                style: {
                  display: 'inline-block',
                  marginTop: '10px',
                },
              },
              options: [
                { label: 'AM', value: 'AM' },
                { label: 'PM', value: 'PM' },
              ]
            },
          ]
        }
      ],
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
  ],
}

export default contactBlock; 