'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Programs.module.scss';

// Updated interface to match the Branch collection data structure
interface ProgramFeature {
  feature: string;
  id?: string;
}

// Interface for related image data returned by Payload CMS
interface ProgramImage {
  id: string;
  filename: string;
  url: string;
  alt?: string;
  // Add any other fields that might be present in the image relation
}

interface BranchProgram {
  id: string;
  program_title: string;
  program_description: string;
  program_image?: ProgramImage | {
    id: string;
    relationTo: string;
    value?: ProgramImage;
  };
  features: ProgramFeature[];
}

interface ProgramsProps {
  title?: string;
  branchPrograms?: BranchProgram[]; // Data from Branch collection
}

// Helper functions to extract image information from program_image
const getImageUrl = (programImage: any): string | undefined => {
  if (!programImage) return undefined;
  
  // If the image is directly an object with a url property
  if (programImage.url) return programImage.url;
  
  // If the image is a relation object with a value property containing the image
  if (programImage.value && programImage.value.url) return programImage.value.url;
  
  // If the default data structure is used
  if (programImage.relationTo === 'images' && programImage.value && programImage.value.url) {
    return programImage.value.url;
  }
  
  return undefined;
};

const getImageAlt = (programImage: any): string | undefined => {
  if (!programImage) return undefined;
  
  // If the image is directly an object with an alt property
  if (programImage.alt) return programImage.alt;
  
  // If the image is a relation object with a value property containing the image
  if (programImage.value && programImage.value.alt) return programImage.value.alt;
  
  return undefined;
};

// Default programs data as fallback if no branch data is provided
const defaultProgramsData = [
  {
    id: '1',
    program_title: "Firearm Simulator Training",
    program_description: "Experience realistic scenarios in our state-of-the-art simulator. Perfect your technique in a controlled environment.",
    features: [
      { feature: "Virtual scenarios from basic to complex", id: '1-1' },
      { feature: "Instant feedback on accuracy and timing", id: '1-2' },
      { feature: "Stress response training", id: '1-3' },
      { feature: "Decision-making under pressure", id: '1-4' }
    ],
    program_image: {
      url: "/images/udt2.jpg",
      alt: "Firearm Simulator Training",
      id: "img-1"
    }
  },
  {
    id: '2',
    program_title: "Self Defense Training",
    program_description: "Learn practical self-defense techniques that work in real-world situations for all skill levels.",
    features: [
      { feature: "Hand-to-hand combat fundamentals", id: '2-1' },
      { feature: "Situational awareness", id: '2-2' },
      { feature: "Threat assessment strategies", id: '2-3' },
      { feature: "Escape and evasion tactics", id: '2-4' }
    ],
    program_image: {
      url: "/images/selfdefense.jpeg",
      alt: "Self Defense Training",
      id: "img-2"
    }
  },
  {
    id: '3',
    program_title: "UDT Indoor Range",
    program_description: "Practice with expert guidance at our state-of-the-art indoor shooting range with multiple lanes and training areas.",
    features: [
      { feature: "Climate-controlled environment", id: '3-1' },
      { feature: "Multiple shooting distances", id: '3-2' },
      { feature: "Target analysis systems", id: '3-3' },
      { feature: "Small group classes available", id: '3-4' }
    ],
    program_image: {
      url: "/images/udtrange.JPG",
      alt: "UDT Indoor Range",
      id: "img-3"
    }
  },
  {
    id: '4',
    program_title: "Workshops",
    program_description: "Specialized training sessions covering various aspects of tactical defense and personal safety.",
    features: [
      { feature: "Tactical Medicine", id: '4-1' },
      { feature: "USCCA Legal Seminars", id: '4-2' },
      { feature: "Vehicle CQB", id: '4-3' },
      { feature: "Women's Urban Threats", id: '4-4' },
      { feature: "Home Defense", id: '4-5' },
      { feature: "Firearm Familiarization", id: '4-6' }
    ],
    program_image: {
      url: "/images/udt1.jpg",
      alt: "Workshops",
      id: "img-4"
    }
  }
];

const Programs = ({ title, branchPrograms }: ProgramsProps) => {
  // Use branch programs if available, otherwise fall back to default programs
  const programsData = branchPrograms && branchPrograms.length > 0 
    ? branchPrograms 
    : defaultProgramsData;
    
  const [activeProgram, setActiveProgram] = useState<number>(0);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  
  // Auto-rotate through programs every 5 seconds if autoScroll is true
  useEffect(() => {
    if (!autoScroll) return;
    
    const interval = setInterval(() => {
      setActiveProgram((prev) => (prev + 1) % programsData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoScroll, programsData.length]);

  // Pause auto-scroll when user interacts with programs
  const handleProgramClick = (index: number) => {
    setActiveProgram(index);
    setAutoScroll(false);
    // Resume auto-scroll after 15 seconds of inactivity
    setTimeout(() => setAutoScroll(true), 15000);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setAutoScroll(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const minSwipeDistance = 50;
    const swipeDistance = touchEndX.current - touchStartX.current;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped right - go to previous
        handleProgramClick((activeProgram - 1 + programsData.length) % programsData.length);
      } else {
        // Swiped left - go to next
        handleProgramClick((activeProgram + 1) % programsData.length);
      }
    }
    
    // Resume auto-scroll after 15 seconds
    setTimeout(() => setAutoScroll(true), 15000);
  };

  const openFreeClassModal = () => {
    const openModalButton = document.getElementById('open-free-class-modal');
    if (openModalButton) {
      openModalButton.click();
    }
  };
  
  return (
    <section id="programs" className={styles.programsSection}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <div className={styles.badge}>SKILL DEVELOPMENT</div>
          <h2>{title || 'Training'} <span className={styles.highlight}>Programs</span></h2>
          <p>Comprehensive training tailored to your experience level and goals</p>
          <div className={styles.slideCounter}>
            {activeProgram + 1} / {programsData.length}
          </div>
        </header>
        
        <div className={styles.programsCarousel}>
          <div 
            className={styles.carouselContainer}
            ref={carouselRef}
          >
            <div 
              className={styles.carouselTrack} 
              style={{ transform: `translateX(-${activeProgram * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {programsData.map((program) => (
                <div key={program.id} className={styles.carouselCard}>
                  <div className={styles.carouselCardImage}>
                    <Image 
                      src={getImageUrl(program.program_image) || '/images/program-placeholder.jpg'} 
                      alt={getImageAlt(program.program_image) || program.program_title} 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                      priority={program.id === programsData[0].id}
                    />
                    <div className={styles.programLevel}>All Levels</div>
                  </div>
                  <div className={styles.carouselCardContent}>
                    <h3>{program.program_title}</h3>
                    <p>{program.program_description}</p>
                    <div className={styles.programFeatures}>
                      <h4>Key Features</h4>
                      <ul>
                        {program.features.map((featureObj, index) => (
                          <li key={featureObj.id || index}>{featureObj.feature}</li>
                        ))}
                      </ul>
                    </div>
                    <button onClick={openFreeClassModal} className={`${styles.btn} ${styles.btnPrimary}`}>
                      Book Free Class
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.carouselControls}>
            <button 
              className={`${styles.carouselControl} ${styles.prev}`}
              onClick={() => handleProgramClick((activeProgram - 1 + programsData.length) % programsData.length)}
              aria-label="Previous program"
            >
              ‹
            </button>
            <button 
              className={`${styles.carouselControl} ${styles.next}`}
              onClick={() => handleProgramClick((activeProgram + 1) % programsData.length)}
              aria-label="Next program"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs; 