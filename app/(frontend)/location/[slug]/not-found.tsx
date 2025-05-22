import Link from 'next/link';
import styles from '../../_home/styles/not-found.module.scss';
import Header from '../../_home/components/Header';
import Footer from '../../_components/common/Footer';

export default function BranchNotFound() {
  return (
    <main>
      <Header />
      <section className={styles.notFoundSection}>
        <div className={styles.container}>
          <h1>Branch Location Not Found</h1>
          <p>We couldn't find the branch location you're looking for.</p>
          <div className={styles.actionButtons}>
            <Link href="/location" className={styles.primaryButton}>
              View All Locations
            </Link>
            <Link href="/" className={styles.secondaryButton}>
              Return to Homepage
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
} 