'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './FreeClass.module.scss';

const FreeClass = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Function to open the free class request modal
  const openModal = () => {
    setIsModalOpen(true);
    // Add a class to the body to prevent scrolling
    document.body.classList.add('modal-open');
  };
  
  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Remove the class from the body to re-enable scrolling
    document.body.classList.remove('modal-open');
  };

  return (
    <section id="free-class" className={styles.freeClassSection}>
      <div className={styles.container}>
        <div className={styles.freeClassContent}>
          <div className={styles.contentText}>
            <h2>Experience Our Training Firsthand</h2>
            <p className={styles.lead}>Claim your complimentary training session to see if our approach is right for you</p>
            
            <div className={styles.benefits}>
              <h3>What to Expect in Your Free Class:</h3>
              <ul>
                <li>Grip, stance, sight picture, trigger control</li>
                <li>Drawing from concealment & commands</li>
                <li>De-escalation & legal considerations</li>
                <li>Real-life threat simulation to test your response under pressure</li>
              </ul>
            </div>
            
            <div className={styles.ctaButton}>
              <button 
                className={styles.btnPrimary} 
                onClick={openModal}
              >
                Schedule Your Free Class
              </button>
            </div>
          </div>
          
          <div className={styles.contentImage}>
            <Image
              src="/images/schedule.jpeg"
              alt="Training session schedule"
              width={600}
              height={400}
              layout="responsive"
              className={styles.image}
              priority={false}
            />
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={closeModal}>×</button>
            
            <div className={styles.modalHeader}>
              <h3>Claim Your Free Class</h3>
              <p>Schedule your complimentary tactical training session</p>
            </div>
            
            <div className={styles.modalBody}>
              <p className={styles.modalMessage}>
                To schedule your free tactical training session, please contact us at <a href="tel:+18005551234">(800) 555-1234</a> or email us at <a href="mailto:training@uniteddefensetactical.com">training@uniteddefensetactical.com</a>.
              </p>
              <p className={styles.modalMessage}>
                One of our training coordinators will contact you within 24 hours to find the perfect time for your free session.
              </p>
              <p className={styles.disclaimer}>
                <strong>Note:</strong> This is a simplified version of the booking form. In a full implementation, this would include a form with fields for name, email, phone, and preferred date/time selection.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FreeClass; 