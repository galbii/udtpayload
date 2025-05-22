import type { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    // Enable authentication for this collection
    tokenExpiration: 7200, // How many seconds to keep the user logged in (2 hours)
    verify: false, // Require email verification
    maxLoginAttempts: 5, // Lock out after 5 failed attempts
    lockTime: 600 * 1000, // Lock out for 10 minutes (in milliseconds)
    useAPIKey: true, // Enable API key authentication
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // Only authenticated users can read user documents
    read: ({ req: { user } }) => {
      // Users can only read their own document, except admins who can read all
      if (!user) return false
      
      if (['admin', 'developer'].includes(user.role)) return true
      
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    // Only admins can create users in the admin UI
    // Regular users sign up via the API
    create: ({ req: { user } }) => {
      return ['admin', 'developer'].includes(user?.role)
    },
    // Users can update their own document, admins can update any
    update: ({ req: { user }, id }) => {
      if (!user) return false
      
      if (['admin', 'developer'].includes(user.role)) return true
      
      return user?.id === id
    },
    // Only admins can delete users
    delete: ({ req: { user } }) => {
      return ['admin', 'developer'].includes(user?.role)
    },
    // Allow admins, developers, and franchisees to access the admin panel
    admin: ({ req: { user } }) => {
      return Boolean(user?.role && ['admin', 'developer', 'franchisee'].includes(user.role))
    },
  },
  fields: [
    // Email already added by default when auth is enabled
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Franchisee',
          value: 'franchisee',
        },
        {
          label: 'Developer',
          value: 'developer',
        },
      ],
      defaultValue: 'franchisee',
      required: true,
      // Only admins and developers can change user roles
      access: {
        update: ({ req: { user } }) => {
          return ['admin', 'developer'].includes(user?.role)
        },
      },
    },
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'franchiseeDetails',
      type: 'group',
      admin: {
        condition: (data) => data?.role === 'franchisee',
      },
      fields: [
        {
          name: 'branch',
          type: 'relationship',
          relationTo: 'Branch',
          required: true,
          admin: {
            description: 'Select the branch this franchisee belongs to',
          },
          // Ensure the field is stored as a string ID
          hasMany: false,
          // Only admins and developers can change branch assignment
          access: {
            update: ({ req: { user } }) => {
              return ['admin', 'developer'].includes(user?.role)
            },
          },
        },
      ],
    },
  ],
  hooks: {
    // Adding a hook to ensure branch is properly formatted before save
    beforeChange: [
      ({ data }) => {
        // Ensure franchiseeDetails.branch is stored as a string ID
        if (data.franchiseeDetails?.branch && typeof data.franchiseeDetails.branch === 'object') {
          data.franchiseeDetails.branch = data.franchiseeDetails.branch.id || data.franchiseeDetails.branch;
        }
        return data;
      }
    ],
    // Example hook that could be used to perform additional actions after login
    afterLogin: [
      ({ user }) => {
        // You could add code here to perform actions after user login
        // Such as updating last login timestamp, analytics, etc.
        return user
      },
    ],
  },
}

export default Users 
