// Import sharp conditionally to avoid type error
let sharp: any
try {
  sharp = require('sharp')
} catch (e) {
  // Sharp not installed, will use default image processing
}

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'
import type { CollectionConfig } from 'payload'
import Branch from './collections/Branch'
import Images from './collections/Images'
import Videos from './collections/Videos'
import Users from './collections/Users'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    Branch,
    Images,
    Videos,
    Users,
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Using SQLite adapter instead of MongoDB
  db: sqliteAdapter({
    client: {
      url: 'file:sqlite.db',
    },
  }),
  
  // Configure the admin panel to use the Users collection for authentication
  admin: {
    user: 'users',
  },
  
  // If you want to resize images, crop, set focal point, etc.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
})
