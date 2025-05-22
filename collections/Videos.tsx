import type { CollectionConfig } from 'payload'

const Videos: CollectionConfig = {
  slug: 'videos',
  upload: {
    staticDir: '../public/videos',
    mimeTypes: ['video/mp4', 'video/webm', 'video/ogg'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Duration (seconds)',
    }
  ],
}

export default Videos; 