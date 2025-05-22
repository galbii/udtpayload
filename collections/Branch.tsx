import type { CollectionConfig } from 'payload'
import { heroBlock, programsBlock, instructorBlock, testimonialsBlock, contactBlock } from './blocks'

const Branch: CollectionConfig = {
  slug: 'Branch',
  admin: {
    useAsTitle: 'branch_name',
    preview: ({ branch_name }) => `http://localhost:3000/${branch_name}`,
  },
  access: {
    // Read access varies by user role
    read: async ({ req: { user, payload } }) => {
      // Public read access for frontend rendering
      if (!user) return true
      
      // Admin and developer can see all branches
      if (['admin', 'developer'].includes(user.role)) return true
      
      // For franchisees, filter to only show their affiliated branch
      if (user.role === 'franchisee') {
        try {
          // Get the user with their franchisee details
          const userWithDetails = await payload.findByID({
            collection: 'users',
            id: user.id,
            depth: 1,
          })
          
          // Filter to only show their affiliated branch
          if (userWithDetails?.franchiseeDetails?.branch) {
            // Ensure we're comparing with a string ID
            const branchId = typeof userWithDetails.franchiseeDetails.branch === 'object' 
              ? userWithDetails.franchiseeDetails.branch.id 
              : userWithDetails.franchiseeDetails.branch;
              
            return {
              id: {
                equals: branchId
              }
            }
          }
          
          // If franchisee has no branch assigned, show nothing
          return false
        } catch (error) {
          console.error('Error retrieving user details:', error);
          return false;
        }
      }
      
      // Default to allowing read access for other scenarios
      return true
    },
    // For create operations, only admin and developer roles can create branches
    create: ({ req: { user } }) => {
      if (!user) return false
      return ['admin', 'developer'].includes(user.role)
    },
    // For update operations, admins can update any branch, franchisees only their own
    update: async ({ req: { user, payload } }) => {
      // If no user, deny access
      if (!user) return false
      
      // Admin and developer can update any branch
      if (['admin', 'developer'].includes(user.role)) return true
      
      // For franchisees, check if they're affiliated with this branch
      if (user.role === 'franchisee') {
        try {
          // Get the user with their franchisee details
          const userWithDetails = await payload.findByID({
            collection: 'users',
            id: user.id,
            depth: 1,
          })
          
          // Check if the branch ID matches their affiliated branch
          if (userWithDetails?.franchiseeDetails?.branch) {
            // Ensure we're comparing with a string ID
            const branchId = typeof userWithDetails.franchiseeDetails.branch === 'object' 
              ? userWithDetails.franchiseeDetails.branch.id 
              : userWithDetails.franchiseeDetails.branch;
              
            return {
              id: {
                equals: branchId
              }
            }
          }
        } catch (error) {
          console.error('Error retrieving user details:', error);
          return false;
        }
      }
      
      // Deny by default
      return false
    },
    // For delete operations, only admin and developer roles can delete branches
    delete: ({ req: { user } }) => {
      if (!user) return false
      return ['admin', 'developer'].includes(user.role)
    },
  },
  fields: [
    {
	name: 'branch_name',
	type: 'text',
	required: true,
	unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Auto-generated URL-friendly identifier',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            // Auto-generate slug from branch_name
            if (data && typeof data === 'object' && 'branch_name' in data && data.branch_name) {
              // Convert to lowercase and replace spaces with underscores
              return data.branch_name.toLowerCase().replace(/\s+/g, '_');
            }
            return undefined;
          },
        ],
      },
      unique: true,
    },
	{
	name: 'layout',
	type: 'blocks',
	required: true,
	defaultValue: [
		{
			blockType: 'hero',
		},
		{
			blockType: 'programs',
			programs: [
				{
					program_title: 'Default Program',
					program_description: 'Please update this with your program details.',
					features: [
						{
							feature: 'Default Feature'
						}
					]
				}
			]
		},
		{
			blockType: 'instructor',
			instructor_name: 'Default Instructor',
			instructor_description: 'Lead instructor for this branch.',
			specialties: [
				{
					specialty: 'Teaching'
				}
			],
			bio: 'Please update with instructor bio information.'
		},
		{
			blockType: 'testimonials',
			testimonials: [
				{
					testimonial_text: 'This is a sample testimonial. Please replace with actual customer feedback.',
					profile: {
						customer_name: 'John Doe',
						customer_city: 'Anytown',
						customer_state: 'CA',
						testimonial_date: {
							month: 1,
							day: 1,
							year: 2023
						}
					}
				}
			]
		},
		{
			blockType: 'contact',
			address_line_1: '123 Main Street',
			city: 'Anytown',
			state: 'CA',
			zip_code: '12345',
			hours: {
				time_group: {
					opening_hour: '9',
					opening_minute: '00',
					opening_period: 'AM',
					closing_hour: '6',
					closing_minute: '00',
					closing_period: 'PM'
				}
			},
			phone: '(555) 123-4567',
			email: 'contact@yourdomain.com'
		}
	],
	blocks: [
		heroBlock,
		programsBlock,
		instructorBlock,
		testimonialsBlock,
		contactBlock
	]
	}
  ],
  hooks: {
    // Add a hook to handle any potential reference issues
    afterRead: [
      ({ doc }) => {
        // Make sure any related fields are correctly formatted
        return doc;
      }
    ]
  }
}

export default Branch;
