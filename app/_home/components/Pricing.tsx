'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Pricing.module.scss';

interface TrainingPackage {
  id: number;
  name: string;
  perMonth: string;
  perYear: string;
  features: string[];
  popular: boolean;
}

const trainingPackages: TrainingPackage[] = [
  {
    id: 1,
    name: "BASE+",
    perMonth: "2 trainings per month",
    perYear: "26 per year",
    features: [
      "2 simulator trainings per month",
      "2 self-defense classes per month",
      "2 seminar/workshop per month",
      "4 combat conditioning per month",
      "4 UDT range experiences per year"
    ],
    popular: false
  },
  {
    id: 2,
    name: "CORE",
    perMonth: "4 trainings per month",
    perYear: "52 per year",
    features: [
      "4 simulator trainings per month",
      "Unlimited self-defense per month",
      "Unlimited seminars/workshops per month",
      "Unlimited combat conditioning",
      "6 UDT range experiences per year"
    ],
    popular: true
  },
  {
    id: 3,
    name: "CORE+",
    perMonth: "6 trainings per month",
    perYear: "78 per year",
    features: [
      "6 simulator trainings per month",
      "Unlimited self-defense classes",
      "Unlimited seminars/workshops",
      "Unlimited combat conditioning",
      "10 UDT range experiences per year"
    ],
    popular: false
  }
];

const Pricing = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with CORE (index 1) as default
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number, y: number } | null>(null);
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Minimum swipe distance in pixels to trigger card change
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Store both X and Y coordinates
    setTouchStart({ 
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
    setIsHorizontalSwipe(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart) return;
    
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    
    // Calculate movement in both directions
    const xDiff = touchStart.x - currentX;
    const yDiff = touchStart.y - currentY;

    // Update current touch position
    setTouchEnd({ x: currentX, y: currentY });
    
    // If horizontal movement is more significant than vertical, 
    // it's likely a horizontal swipe
    if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 20) {
      setIsHorizontalSwipe(true);
      // Prevent default to avoid scrolling when clearly swiping horizontally
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    // Only process as a card swipe if it was identified as a horizontal swipe
    if (isHorizontalSwipe) {
      const distance = touchStart.x - touchEnd.x;
      const isSwipe = Math.abs(distance) > minSwipeDistance;
      
      if (isSwipe) {
        if (distance > 0) {
          // Swipe left - go to next card
          handleNext();
        } else {
          // Swipe right - go to previous card
          handlePrevious();
        }
      }
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
    setIsHorizontalSwipe(false);
  };

  const openFreeClassModal = () => {
    const element = document.getElementById('free-class');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? trainingPackages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === trainingPackages.length - 1 ? 0 : prev + 1));
  };

  const getPackagePosition = (index: number) => {
    if (!isMobile) {
      // On desktop, all cards are visible in a grid
      return 'center';
    }
    
    // Mobile carousel logic
    const diff = index - currentIndex;
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -2) return 'right';
    if (diff === -1 || diff === 2) return 'left';
    return 'hidden';
  };

  return (
    <section id="pricing" className={styles.pricingSection}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2>Training Packages</h2>
          <p>Elevate your tactical defense skills with our premium training programs</p>
        </header>
        
        <div className={styles.packagesContainer}>
          {isMobile && (
            <button 
              className={`${styles.navButton} ${styles.prev}`}
              onClick={handlePrevious}
              aria-label="Previous package"
            >
              ‹
            </button>
          )}
          
          <div 
            className={styles.packageCards}
            ref={cardsRef}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchMove={isMobile ? handleTouchMove : undefined}
            onTouchEnd={isMobile ? handleTouchEnd : undefined}
          >
            {trainingPackages.map((pkg, index) => (
              <div 
                key={pkg.id} 
                className={`${styles.packageCard} 
                  ${pkg.popular ? styles.popular : ''} 
                  ${styles[`position${getPackagePosition(index)}`]}`}
              >
                {pkg.popular && <div className={styles.popularBadge}>Most Popular</div>}
                
                <div className={styles.cardHeader}>
                  <h3 className={styles.packageName}>{pkg.name}</h3>
                </div>
                
                <div className={styles.trainingQuantity}>
                  <div className={styles.trainingQuantityValue}>{pkg.perMonth}</div>
                  <div className={styles.trainingQuantityCaption}>{pkg.perYear}</div>
                </div>
                
                <div className={styles.cardBody}>
                  <ul className={styles.featureList}>
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex}>
                        <span className={styles.checkIcon}>✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.cardFooter}>
                  <button 
                    onClick={openFreeClassModal} 
                    className={styles.btnPrimary}
                  >
                    Claim free class
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {isMobile && (
            <button 
              className={`${styles.navButton} ${styles.next}`}
              onClick={handleNext}
              aria-label="Next package"
            >
              ›
            </button>
          )}
        </div>
        
        {isMobile && (
          <div className={styles.swipeIndicator}>
            <span>Swipe to view more</span>
          </div>
        )}
        
        <div className={styles.packagesNote}>
          <p>All plans include access to our state-of-the-art training facilities and certified instructors</p>
          <p>Start with a free assessment and our experts will help you choose the right program for your needs</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 