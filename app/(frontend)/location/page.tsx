import { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import styles from '../_home/styles/location-directory.module.scss';
import Header from '../_home/components/Header';
import Footer from '../_components/common/Footer';

// Type for Branch data
type Branch = {
  id: string;
  branch_name: string;
  slug: string;
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

// Loading fallback component
const LoadingFallback = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.loadingSpinner}></div>
    <p>Loading...</p>
  </div>
);

// Metadata for the page
export const metadata: Metadata = {
  title: 'Our Locations - United Defense Tactical',
  description: 'Find a United Defense Tactical location near you. Professional firearms training and tactical education programs.',
  openGraph: {
    title: 'Our Locations - United Defense Tactical',
    description: 'Find a United Defense Tactical location near you. Professional firearms training and tactical education programs.',
    type: 'website',
    locale: 'en_US',
  },
};

// Function to fetch all branches from Payload
async function getAllBranches(): Promise<Branch[]> {
  try {
    // Get the base URL from environment variable or use default
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
    
    // Create URL for the API request
    const url = new URL(`${baseUrl}/api/Branch`);
    url.searchParams.append('limit', '100'); // Get up to 100 branches
    url.searchParams.append('sort', 'branch_name'); // Sort by branch name
    
    const response = await fetch(url.toString(), {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      console.error(`Error fetching branches: ${response.status} ${response.statusText}`);
      return [];
    }
    
    const data: PayloadResponse<Branch> = await response.json();
    
    if (!data.docs || data.docs.length === 0) {
      return [];
    }
    
    return data.docs;
  } catch (error) {
    console.error('Error fetching branches:', error);
    return [];
  }
}

// Branch locations directory page
export default async function LocationsPage() {
  const branches = await getAllBranches();
  
  return (
    <main>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <section className={styles.locationsSection}>
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <h1>Our Locations</h1>
              <p>Find a United Defense Tactical location near you</p>
            </header>
            
            {branches.length === 0 ? (
              <div className={styles.noBranches}>
                <p>No locations found. Please check back later.</p>
              </div>
            ) : (
              <div className={styles.branchGrid}>
                {branches.map((branch) => (
                  <Link 
                    href={`/location/${branch.slug}`} 
                    key={branch.id}
                    className={styles.branchCard}
                  >
                    <h2>{branch.branch_name}</h2>
                    <p>View location details</p>
                    <span className={styles.viewDetailsButton}>Visit Branch Page</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </Suspense>
      <Footer />
    </main>
  );
} 