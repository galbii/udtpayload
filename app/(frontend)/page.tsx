import { Suspense } from 'react';
import { Metadata } from 'next';

// Import the migrated components from _home directory
import Header from './_home/components/Header';
import Hero from './_home/components/Hero';
import TrustBadges from './_home/components/TrustBadges';
import VideoSection from './_home/components/VideoSection';
import Programs from './_home/components/Programs';
import AssessmentForm from './_home/components/AssessmentForm';
import Instructors from './_home/components/Instructors';
import Testimonials from './_home/components/Testimonials';
import TrainingPath from './_home/components/TrainingPath';
import OODASection from './_home/components/OODASection';
import Pricing from './_home/components/Pricing';
import FreeClass from './_home/components/FreeClass';
import CallToAction from './_home/components/CallToAction';
import FAQ from './_home/components/FAQ';
import Location from './_home/components/Location';
import Footer from './_components/common/Footer';
import styles from './_home/styles/landing.module.scss';

export const metadata: Metadata = {
  title: 'United Defense Tactical - Professional Firearms Training',
  description: 'Join our firearms training and tactical education programs at United Defense Tactical. Professional instructors, flexible courses, and personalized tactical readiness assessment.',
  keywords: 'firearms training, tactical training, self-defense, shooting classes, firearms education',
  openGraph: {
    title: 'United Defense Tactical - Professional Firearms Training',
    description: 'Join our firearms training and tactical education programs at United Defense Tactical. Professional instructors, flexible courses, and personalized tactical readiness assessment.',
    type: 'website',
    locale: 'en_US',
  },
};

// Loading fallback component
const LoadingFallback = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.loadingSpinner}></div>
    <p>Loading...</p>
  </div>
);

export default function Home() {
  return (
    <main className={styles.landingPage}>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
        <TrustBadges />
        <VideoSection />
        <Testimonials />
        <TrainingPath />
        <OODASection />
        <CallToAction />
        <div id="assessment" className={styles.tacticalReadinessSection}>
          <AssessmentForm />
        </div>
        <FAQ />
      </Suspense>
      <Footer />
    </main>
  );
}
