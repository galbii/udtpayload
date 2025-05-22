'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Testimonials.module.scss';

// Updated interface to match the Branch collection data structure
interface TestimonialDate {
  month: number;
  day: number;
  year: number;
}

interface TestimonialProfile {
  customer_name: string;
  customer_city: string;
  customer_state: string;
  testimonial_date: TestimonialDate;
}

interface BranchTestimonial {
  id: string; // Payload CMS ID
  testimonial_text: string;
  profile: TestimonialProfile;
}

interface TestimonialsProps {
  branchTestimonials?: BranchTestimonial[];
}

// Default testimonials data structure for the component
interface DefaultTestimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
  date: string;
  photoInfo?: string;
}

// Convert date from Payload CMS format to display format
const formatDate = (date: TestimonialDate): string => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return `${monthNames[date.month - 1]} ${date.day}, ${date.year}`;
};

// Default testimonials data as fallback if no branch data is provided
const defaultTestimonials: DefaultTestimonial[] = [
  {
    id: 1,
    name: 'Sherry M.',
    location: 'Orange, CA',
    image: '/images/social/testimonial1.jpg',
    quote: 'There is five of us who joined and wanted to experience this together. We are enjoying our classes and learning so much. The staff is always friendly and helpful. The instructor\'s have all been great and they are educated and very competent. Chris has taught us how to safely and correctly handle a gun. Lamar, has taught us great self defense techniques for women. You always learn something new when you go to a class. We only joined six weeks ago and it has been one of the best things we have done for ourselves.',
    rating: 5,
    date: 'Feb 13, 2025'
  },
  {
    id: 2,
    name: 'Reb T.',
    location: 'Yorba Linda, CA',
    image: '/images/social/testimonial2.jpg',
    quote: 'Chris, Lamar, Katie are amazing. They\'re patient and offer guidance. I feel very comfortable and empowered. Thank you. Great place to go.',
    rating: 5,
    date: 'Mar 25, 2025'
  },
  {
    id: 3,
    name: 'Joanna V.',
    location: 'Placentia, CA',
    image: '/images/social/testimonial3.jpg',
    quote: 'My friend and I have been taking classes here since they opened last summer. We really enjoyed the instructors. Their expertise, professionalism and patience make learning new information about firearms, tactical training, scenarios, hands on and self defense not only helpful, but fun. Learn about firearm laws and safety protocol with other people of similar interests. My friend and I take the classes together, which makes it more fun. We find there are a lot of classes available. The new workshops and other additional classes that have been added, really add to the value of the monthly fee.',
    rating: 5,
    date: 'Mar 19, 2025',
    photoInfo: '1 photo'
  },
  {
    id: 4,
    name: 'George B.',
    location: 'Corona, CA',
    image: '/images/social/testimonial4.jpg',
    quote: 'I absolutely love to train here. The instructors are all amazing and will bring something different for you to learn. Me and my spouse just moved up to the Green Team...LeT\'s Go!!!',
    rating: 5,
    date: 'Mar 22, 2025',
    photoInfo: '1 photo'
  },
  {
    id: 5,
    name: 'Dave W.',
    location: 'Anaheim, CA',
    image: '/images/social/testimonial5.jpg',
    quote: 'My first experience at UDT was extremely eye-opening. The demo helped me realize how much more training I needed. Every staff member is super friendly and welcoming. The place has such a cool vibe and atmosphere. I have learned so much since starting there, and it\'s been an awesome experience. UDT should be a required prerequisite for CCW. I cannot recommend this place enough. 10 stars!',
    rating: 5,
    date: 'Jan 13, 2025'
  },
  {
    id: 6,
    name: 'Melody L.',
    location: 'Ontario, CA',
    image: '/images/social/testimonial6.jpg',
    quote: 'As a survivor of Route 91, a road rage incident that lead to a broken window, and a witness to a shooting I needed a safe environment that I could build my confidence, learn safety skills, not flinch or panic with loud noises or explosions, and be able to react if God forbid I ever experienced another tragic event. UDT Anaheim has been a blessing. My first day (trial) I cried. No joke! But I signed up. I\'ve been attending since Dec 2024 and 2-3 times a week. In 2 short months, I\'ve been able to build my confidence, learned life saving skills, and excited about attending my classes. All the instructors are patient, compassionate, knowledgeable and most importantly supportive. No matter your reason for considering UDT, definitely attend the free trial. I think you\'ll see why I joined and many others have too. :)',
    rating: 5,
    date: 'Mar 19, 2025'
  },
  {
    id: 7,
    name: 'David H.',
    location: 'Chino Hills, CA',
    image: '/images/social/testimonial7.jpg',
    quote: 'My wife and I joined their firearms training membership. It was one of our best decisions/investment we have ever made. Their training programs are extensive. All their instructors have military and/or law enforcement background. They are knowledgeable, patient and personable. We have learn so much since we started the program and can\'t wait to reach the next level.',
    rating: 5,
    date: 'Feb 23, 2025'
  }
];

// Index of default testimonial images to use with CMS testimonials
const defaultImageUrls = [
  '/images/social/testimonial1.jpg',
  '/images/social/testimonial2.jpg',
  '/images/social/testimonial3.jpg',
  '/images/social/testimonial4.jpg',
  '/images/social/testimonial5.jpg',
  '/images/social/testimonial6.jpg',
  '/images/social/testimonial7.jpg',
];

const Testimonials = ({ branchTestimonials }: TestimonialsProps) => {
  // Transform branch testimonials to component format when available
  const testimonials = branchTestimonials && branchTestimonials.length > 0
    ? branchTestimonials.map((item, index) => ({
        id: item.id,
        name: item.profile.customer_name,
        location: `${item.profile.customer_city}, ${item.profile.customer_state}`,
        image: defaultImageUrls[index % defaultImageUrls.length], // Use default images in rotation
        quote: item.testimonial_text,
        rating: 5, // Default rating as it's not in the CMS
        date: formatDate(item.profile.testimonial_date),
        photoInfo: undefined // Add photoInfo property to match DefaultTestimonial type
      }))
    : defaultTestimonials;
    
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedQuotes, setExpandedQuotes] = useState<Record<string, boolean>>({});
  const testimonialTrackRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const updateSlidePosition = (index: number) => {
    if (testimonialTrackRef.current) {
      testimonialTrackRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % testimonials.length;
      return newIndex;
    });
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + testimonials.length) % testimonials.length;
      return newIndex;
    });
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const toggleQuoteExpansion = (id: string | number) => {
    setExpandedQuotes(prev => ({
      ...prev,
      [id.toString()]: !prev[id.toString()]
    }));
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => nextSlide(), 8000);
  };

  useEffect(() => {
    updateSlidePosition(activeIndex);
    
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    
    autoplayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [activeIndex]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? styles.starActive : styles.star}>★</span>
      );
    }
    return stars;
  };

  const quoteTruncateLength = 200;

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2>What Our Students Say</h2>
          <p>Hear from our students about their experience with our training programs</p>
          <div className={styles.slideCounter}>
            {activeIndex + 1} / {testimonials.length}
          </div>
        </header>
        
        <div className={styles.testimonialsContainer}>
          <button 
            className={`${styles.testimonialNav} ${styles.prev}`} 
            onClick={prevSlide} 
            aria-label="Previous testimonial"
          >
            <span>‹</span>
          </button>
          
          <div className={styles.testimonialsWrapper}>
            <div className={styles.testimonialsTrack} ref={testimonialTrackRef}>
              {testimonials.map((testimonial) => {
                const isExpanded = expandedQuotes[testimonial.id.toString()] || false;
                const showToggleButton = testimonial.quote.length > quoteTruncateLength;

                return (
                  <div key={testimonial.id} className={styles.testimonialItem}>
                    <div className={styles.testimonialContent}>
                      <div className={`${styles.testimonialQuote} ${!isExpanded && showToggleButton ? styles.truncated : ''}`}>
                        "{testimonial.quote}"
                      </div>
                      {showToggleButton && (
                        <button 
                          onClick={() => toggleQuoteExpansion(testimonial.id)}
                          className={styles.quoteToggleBtn}
                        >
                          {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                      )}
                      <div className={styles.testimonialRating}>
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                    <div className={styles.testimonialAuthor}>
                      <div className={styles.authorImage}>
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          width={60} 
                          height={60}
                        />
                      </div>
                      <div className={styles.authorInfo}>
                        <div className={styles.authorName}>{testimonial.name}</div>
                        <div className={styles.authorLocation}>{testimonial.location}</div>
                        <div className={styles.authorDate}>{testimonial.date}</div>
                        {testimonial.photoInfo && (
                          <div className={styles.authorPhotos}>{testimonial.photoInfo}</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <button 
            className={`${styles.testimonialNav} ${styles.next}`} 
            onClick={nextSlide} 
            aria-label="Next testimonial"
          >
            <span>›</span>
          </button>
        </div>
        
        <div className={styles.testimonialIndicators}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.indicator} ${index === activeIndex ? styles.active : ''}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 