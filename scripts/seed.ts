import { getPayload } from 'payload'

async function seed() {
  // Initialize Payload with the config
  const payload = await getPayload({
    // Pass the config object directly
    config: require('../payload.config.ts').default,
  })

  // Check if users already exist
  const { docs, totalDocs } = await payload.find({
    collection: 'users',
    limit: 0, // We only need the count
  })

  // Only create if no users exist
  if (totalDocs === 0) {
    try {
      const admin = await payload.create({
        collection: 'users',
        data: {
          email: 'admin@example.com',
          password: 'Password123!', // You should use a secure password
          role: 'admin',
          firstName: 'Admin',
          lastName: 'User',
        },
      })
      
      console.log('Created admin user:', admin.id)
    } catch (error) {
      console.error('Error creating admin user:', error)
    }
  } else {
    console.log('Users already exist, skipping seed')
  }

  // Exit the process
  process.exit(0)
}

seed() 