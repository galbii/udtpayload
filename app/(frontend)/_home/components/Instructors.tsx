'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Instructors.module.scss';

// Updated interfaces to match the Branch collection data structure
interface InstructorSpecialty {
  specialty: string;
  id?: string;
}

interface InstructorImage {
  id: string;
  filename: string;
  url: string;
  alt?: string;
}

interface BranchInstructor {
  instructor_name: string;
  instructor_description: string;
  bio: string;
  specialties: InstructorSpecialty[];
  instructor_image?: InstructorImage | {
    id: string;
    relationTo: string;
    value?: InstructorImage;
  };
}

interface InstructorsProps {
  branchInstructor?: BranchInstructor;
}

// Default instructor data for the component
interface DefaultInstructor {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  specialties: string[];
  experience: string;
}

// Helper function to extract image URL from instructor_image relation
const getImageUrl = (instructorImage: any): string | undefined => {
  if (!instructorImage) return undefined;
  
  // If the image is directly an object with a url property
  if (instructorImage.url) return instructorImage.url;
  
  // If the image is a relation object with a value property containing the image
  if (instructorImage.value && instructorImage.value.url) return instructorImage.value.url;
  
  // If the default data structure is used
  if (instructorImage.relationTo === 'images' && instructorImage.value && instructorImage.value.url) {
    return instructorImage.value.url;
  }
  
  return undefined;
};

// Default instructors data as fallback if no branch data is provided
const defaultInstructorsData: DefaultInstructor[] = [
  {
    id: 1,
    name: "Chris Wiles",
    title: "Chief Instructor",
    image: "/images/chris.jpg",
    bio: "Chris served over 22 years in the US Army as a Lieutenant Colonel. He also served as the S3 Operations Officer for a military police task force, overseeing training and mission planning with a primary focus on detainee operations. His expertise extended to lethal and non-lethal weapons handling, escalation of force training, and tactical operations, providing invaluable instruction in critical decision-making and force application. Since 2020, Chris has also been a NRA-certified small arms instructor, further solidifying his credentials in civilian firearms instruction. His ability to translate military training principles into practical, effective teaching methods makes him a valuable asset to any team.",
    specialties: ["Tactical Firearms"],
    experience: "22 Years Lieutenant Colonel, NRA-Certified Pistol Instructor"
  },
  {
    id: 2,
    name: "Lamar Keeble",
    title: "Instructor",
    image: "/images/lamar.jpg",
    bio: "With over 15 years of law enforcement experience, Lamar Keeble is a highly skilled firearms instructor dedicated to training individuals in firearm safety, tactical proficiency, and situational awareness. His expertise extends beyond marksmanship, emphasizing real-world application under high-stress conditions. Throughout his law-enforcement career, Lamar has extensive experience in civil disturbance management, where he has navigated large-scale protests and volatile scenarios with precision and control. His ability to de-escalate tensions and enforce public safety measures makes him a valuable asset in both training and operational roles.",
    specialties: ["Tactical Firearms", "Women's Self-Defense", "Legal Use of Force", "Tactical Medicine", "Brazilian Jiu Jitsu", "CCW Certification", "Krav Maga", "Boxing"],
    experience: "15 Years Law Enforcement, NRA-Certified Pistol Instructor, Active Shooter Response, Counter-Terrorism Response Team"
  },
  {
    id: 3,
    name: "Mike Avery",
    title: "Instructor",
    image: "/images/mike.jpg",
    bio: "Mike brings an incredible wealth of experience to our team. With 25 years as a professional stuntman, he's no stranger to high-adrenaline situations. His background includes serving as an EMT and first responder with the National Ski Patrol in Big Bear, CA, along with 10+ years in Executive Protection for high-profile clientele. Mike is a Certified Protection Specialist and an NRA-Certified Pistol Instructor, making him an exceptional asset for training and safety.",
    specialties: ["Tactical Firearms", "Women's Self-Defense", "Tactical Medicine"],
    experience: "NRA-Certified Pistol Instructor, EMT and First-Responder"
  },
  {
    id: 4,
    name: "Katie Davis",
    title: "Instructor",
    image: "/images/katie.jpg",
    bio: "Katie brings a wealth of experience in law enforcement, emergency medicine, and firearms instruction. She served as a Police Volunteer with Orange PD for over 4 years, specializing in both the K-9 and Gang Unit, gaining valuable hands-on experience in tactical operations. She also worked as a Deputy Sheriff Trainee, focusing on the CCW sector, further enhancing her expertise in concealed carry regulations and training. In addition to her law enforcement background, Katie has an impressive 6-year career as an EMT, providing critical care in high-pressure environments. She also spent 5 years as a Firearms Instructor at Artemis, where she trained civilians and professionals in defensive shooting and firearms safety. As a certified NRA Pistol Instructor, she is passionate about firearm education and skill development.",
    specialties: ["Tactical Firearms", "Women's Self-Defense", "Tactical Medicine", "CCW Education"],
    experience: "Law Enforcement Volunteer work, EMT, NRA-certified pistol instructor"
  }
];

const Instructors = ({ branchInstructor }: InstructorsProps) => {
  // If branch instructor data is provided, create a single-entry array with the data
  // Otherwise, use the default instructors data
  const instructorsData = branchInstructor 
    ? [{
        id: 1, // Use a default ID
        name: branchInstructor.instructor_name,
        title: branchInstructor.instructor_description,
        image: getImageUrl(branchInstructor.instructor_image) || '/images/instructor-placeholder.jpg',
        bio: branchInstructor.bio,
        specialties: branchInstructor.specialties.map(spec => spec.specialty),
        experience: branchInstructor.instructor_description // Use description as experience too
      }]
    : defaultInstructorsData;
  
  const [activeInstructor, setActiveInstructor] = useState<number>(0);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  
  useEffect(() => {
    if (!autoScroll) return;
    
    const interval = setInterval(() => {
      setActiveInstructor((prev) => (prev + 1) % instructorsData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoScroll, instructorsData.length]);

  const handleArrowClick = (index: number) => {
    setActiveInstructor(index);
    setAutoScroll(false);
    setTimeout(() => setAutoScroll(true), 15000);
  };

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
        handleArrowClick((activeInstructor - 1 + instructorsData.length) % instructorsData.length);
      } else {
        handleArrowClick((activeInstructor + 1) % instructorsData.length);
      }
    }
    
    setTimeout(() => setAutoScroll(true), 15000);
  };

  const openFreeClassModal = () => {
    const element = document.getElementById('free-class');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="instructors" className={styles.instructorsSection}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <div className={styles.badge}>EXPERT INSTRUCTION</div>
          <h2>Our <span className={styles.highlight}>Instructors</span></h2>
          <p>Learn from experienced professionals with military and law enforcement backgrounds</p>
          <div className={styles.slideCounter}>
            {activeInstructor + 1} / {instructorsData.length}
          </div>
        </header>
        
        <div className={styles.instructorsCarousel}>
          <div 
            className={styles.carouselContainer}
            ref={carouselRef}
          >
            <div 
              className={styles.carouselTrack} 
              style={{ transform: `translateX(-${activeInstructor * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {instructorsData.map((instructor, index) => (
                <div key={instructor.id} className={`${styles.carouselCard} ${index === activeInstructor ? styles.active : ''}`}>
                  <div className={styles.carouselCardImage}>
                    <Image 
                      src={instructor.image} 
                      alt={instructor.name} 
                      width={400}
                      height={500}
                      className={styles.instructorImage}
                      priority={index === 0}
                    />
                    <div className={styles.instructorTitle}>{instructor.title}</div>
                  </div>
                  <div className={styles.carouselCardContent}>
                    <h3>{instructor.name}</h3>
                    <p className={styles.experience}>{instructor.experience}</p>
                    <div className={styles.specialties}>
                      <h4>Specialties</h4>
                      <div className={styles.specialtyTags}>
                        {instructor.specialties.map((specialty, idx) => (
                          <span key={idx} className={styles.specialtyTag}>{specialty}</span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.bioContainer}>
                      <p className={styles.bio}>{instructor.bio}</p>
                    </div>
                    <button onClick={openFreeClassModal} className={styles.btnPrimary}>
                      Train With {instructor.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.carouselControls}>
            <button 
              className={`${styles.carouselControl} ${styles.prev}`}
              onClick={() => handleArrowClick((activeInstructor - 1 + instructorsData.length) % instructorsData.length)}
              aria-label="Previous instructor"
            >
              ‹
            </button>
            <button 
              className={`${styles.carouselControl} ${styles.next}`}
              onClick={() => handleArrowClick((activeInstructor + 1) % instructorsData.length)}
              aria-label="Next instructor"
            >
              ›
            </button>
          </div>
          
          <div className={styles.carouselPagination}>
            {instructorsData.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.paginationDot} ${idx === activeInstructor ? styles.active : ''}`}
                onClick={() => handleArrowClick(idx)}
                aria-label={`Go to instructor ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instructors; 