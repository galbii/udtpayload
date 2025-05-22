import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

// Import components from home directory
import Header from '../../_home/components/Header';
import Hero from '../../_home/components/Hero';
import TrustBadges from '../../_home/components/TrustBadges';
import VideoSection from '../../_home/components/VideoSection';
import Programs from '../../_home/components/Programs';
import Instructors from '../../_home/components/Instructors';
import Testimonials from '../../_home/components/Testimonials';
import CallToAction from '../../_home/components/CallToAction';
import Location from '../../_home/components/Location';
import Footer from '../../_components/common/Footer';
import styles from '../../_home/styles/landing.module.scss';

// Type for Branch data
type Branch = {
  id: string;
  branch_name: string;
  slug: string;
  layout: Array<{
    blockType: string;
    [key: string]: any;
  }>;
};

// Type for Payload API response
type PayloadResponse<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

// Type for a Block in the Branch layout
type BlockComponent = {
  blockType: string;
  [key: string]: any;
};

// More specific type for Program data
type ProgramFeature = {
  feature: string;
  id?: string;
};

type BranchProgram = {
  id: string;
  program_title: string;
  program_description: string;
  program_image?: {
    url: string;
    alt?: string;
    id: string;
  };
  features: ProgramFeature[];
};

// Type for Testimonial data
type TestimonialDate = {
  month: number;
  day: number;
  year: number;
};

type TestimonialProfile = {
  customer_name: string;
  customer_city: string;
  customer_state: string;
  testimonial_date: TestimonialDate;
};

type BranchTestimonial = {
  id: string;
  testimonial_text: string;
  profile: TestimonialProfile;
};

// Type for Instructor data
type InstructorSpecialty = {
  specialty: string;
  id?: string;
};

type InstructorImage = {
  id: string;
  filename: string;
  url: string;
  alt?: string;
};

type BranchInstructor = {
  instructor_name: string;
  instructor_description: string;
  bio: string;
  specialties: InstructorSpecialty[];
  instructor_image?: InstructorImage | {
    id: string;
    relationTo: string;
    value?: InstructorImage;
  };
};

// Loading fallback component
const LoadingFallback = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.loadingSpinner}></div>
    <p>Loading...</p>
  </div>
);

// Generate metadata for the page
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  
  // Fetch branch data by slug
  const branchData = await getBranchDataBySlug(slug);
  
  if (!branchData) {
    return {
      title: 'Branch Not Found',
      description: 'The requested branch location could not be found.',
    };
  }
  
  return {
    title: `${branchData.branch_name} - United Defense Tactical`,
    description: `Visit our ${branchData.branch_name} location for professional firearms training and tactical education programs.`,
    openGraph: {
      title: `${branchData.branch_name} - United Defense Tactical`,
      description: `Visit our ${branchData.branch_name} location for professional firearms training and tactical education programs.`,
      type: 'website',
      locale: 'en_US',
    },
  };
}

// Function to fetch branch data from Payload by slug
async function getBranchDataBySlug(slug: string): Promise<Branch | null> {
  try {
    // Get the base URL from environment variable or use default
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
    
    // Create properly encoded URL for the API request
    // Using exact match query for slug field
    const url = new URL(`${baseUrl}/api/Branch`);
    url.searchParams.append('where[slug][equals]', slug);
    url.searchParams.append('depth', '2'); // Get related data up to depth 2
    
    // Option 1: Basic fetch without authentication (works if public read is enabled)
    const response = await fetch(url.toString(), {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      console.error(`Error fetching branch data: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data: PayloadResponse<Branch> = await response.json();
    
    if (!data.docs || data.docs.length === 0) {
      console.log(`No branch found with slug: ${slug}`);
      return null;
    }
    
    return data.docs[0];
  } catch (error) {
    console.error('Error fetching branch data:', error);
    return null;
  }
}

// Keep the original function for backward compatibility or internal use
async function getBranchData(branchName: string): Promise<Branch | null> {
  try {
    // Get the base URL from environment variable or use default
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
    
    // Create properly encoded URL for the API request
    // Using exact match query for branch_name field
    const url = new URL(`${baseUrl}/api/Branch`);
    url.searchParams.append('where[branch_name][equals]', branchName);
    url.searchParams.append('depth', '2'); // Get related data up to depth 2
    
    const response = await fetch(url.toString(), {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      console.error(`Error fetching branch data: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data: PayloadResponse<Branch> = await response.json();
    
    if (!data.docs || data.docs.length === 0) {
      console.log(`No branch found with name: ${branchName}`);
      return null;
    }
    
    return data.docs[0];
  } catch (error) {
    console.error('Error fetching branch data:', error);
    return null;
  }
}

// Generate static paths for all branches using slugs
export async function generateStaticParams() {
  try {
    // Get the base URL from environment variable or use default
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
    
    // Create URL for API request
    const url = new URL(`${baseUrl}/api/Branch`);
    url.searchParams.append('limit', '100'); // Get up to 100 branches
    url.searchParams.append('sort', 'branch_name'); // Sort by branch name
    
    const response = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });
    
    if (!response.ok) {
      console.error(`Error fetching branches: ${response.status} ${response.statusText}`);
      return [];
    }
    
    const data: PayloadResponse<Branch> = await response.json();
    
    if (!data.docs || data.docs.length === 0) {
      return [];
    }
    
    // Return an array of objects with slug parameter
    return data.docs.map((branch) => ({
      branch: branch.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Branch location page component
export default async function BranchPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const branchData = await getBranchDataBySlug(slug);
  
  // If branch not found, show 404
  if (!branchData) {
    notFound();
  }
  
  // Extract blocks by type
  const findBlock = (type: string): BlockComponent | undefined => {
    return branchData.layout.find(block => block.blockType === type);
  };
  
  // Get specific blocks
  const heroBlock = findBlock('hero');
  const programsBlock = findBlock('programs');
  const instructorBlock = findBlock('instructor');
  const testimonialsBlock = findBlock('testimonials');
  const contactBlock = findBlock('contact');
  
  // Log data for debugging
  console.log('Found programs block:', JSON.stringify(programsBlock, null, 2));
  console.log('Found testimonials block:', JSON.stringify(testimonialsBlock, null, 2));
  console.log('Found instructor block:', JSON.stringify(instructorBlock, null, 2));
  
  // Handle the image relationship properly for each program
  if (programsBlock && programsBlock.programs) {
    programsBlock.programs.forEach((program: BranchProgram) => {
      if (program.program_image) {
        console.log(`Image for ${program.program_title}:`, JSON.stringify(program.program_image, null, 2));
      }
    });
  }
  
  return (
    <main className={styles.landingPage}>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        {/* Hero Section */}
        <Hero />
        
        {/* Trust Badges */}
        <TrustBadges />
        
        {/* Video Section */}
        <VideoSection />
        
        {/* Programs Section - Pass branch program data to the component */}
        {programsBlock && (
          <Programs 
            title={`Programs at ${branchData.branch_name}`}
            branchPrograms={programsBlock.programs}
          />
        )}
        
        {/* If no programs block is found, render default Programs component */}
        {!programsBlock && (
          <Programs 
            title={`Programs at ${branchData.branch_name}`}
          />
        )}
        
        {/* Instructors Section - Pass branch instructor data to the component */}
        {instructorBlock && (
          <Instructors 
            branchInstructor={{
              instructor_name: instructorBlock.instructor_name,
              instructor_description: instructorBlock.instructor_description,
              bio: instructorBlock.bio,
              specialties: instructorBlock.specialties || [],
              instructor_image: instructorBlock.instructor_image
            }}
          />
        )}
        
        {/* If no instructor block is found, render default Instructors component */}
        {!instructorBlock && (
          <Instructors />
        )}
        
        {/* Testimonials Section - Pass branch testimonial data to the component */}
        {testimonialsBlock && (
          <Testimonials 
            branchTestimonials={testimonialsBlock.testimonials}
          />
        )}
        
        {/* If no testimonials block is found, render default Testimonials component */}
        {!testimonialsBlock && (
          <Testimonials />
        )}
        
        {/* Call To Action */}
        <CallToAction />
        
        {/* Location Section - Use branch data */}
        {contactBlock && (
          <Location 
            branchName={branchData.branch_name}
            address={{
              line1: contactBlock.address_line_1 || '',
              city: contactBlock.city || '',
              state: contactBlock.state || '',
              zipCode: contactBlock.zip_code || ''
            }}
            hours={{
              opening: {
                hour: contactBlock.hours?.time_group?.opening_hour || '9',
                minute: contactBlock.hours?.time_group?.opening_minute || '00',
                period: contactBlock.hours?.time_group?.opening_period || 'AM'
              },
              closing: {
                hour: contactBlock.hours?.time_group?.closing_hour || '6',
                minute: contactBlock.hours?.time_group?.closing_minute || '00',
                period: contactBlock.hours?.time_group?.closing_period || 'PM'
              }
            }}
            phone={contactBlock.phone || ''}
            email={contactBlock.email || ''}
          />
        )}
      </Suspense>
      <Footer />
    </main>
  );
} 