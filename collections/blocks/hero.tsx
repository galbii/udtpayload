import type { Block } from 'payload'

const heroBlock: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'logo', 
      type: 'upload',
      relationTo: 'images',
    },
    {
      name: 'background-video',
      type: 'upload',
      relationTo: 'videos',
    },
  ],
}

export default heroBlock; 
