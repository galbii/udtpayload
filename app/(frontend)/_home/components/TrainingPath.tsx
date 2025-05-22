'use client';

import Image from 'next/image';
import styles from './TrainingPath.module.scss';

const TrainingPath = () => {
  return (
    <section id="training-path" className={styles.trainingPathSection}>
      <div className={styles.container}>
        <div className={styles.trainingPathContent}>
          <div className={styles.badgesImage}>
            <Image 
              src="/images/badges.png" 
              alt="Training level badges" 
              width={600}
              height={400}
              className={styles.badgesImg}
            />
          </div>
          <div className={styles.trainingPathText}>
            <h2>From novice to Navy Seal</h2>
            <p>
              Our 8-level firearms training curriculum covers everyone from new shooters to advanced experts. 
              Track your earned skills while you interact with friends and grow within the global UDT community.
            </p>
            <div className={styles.experienceCta}>
              <p>Experience our training first hand</p>
              <a 
                href="#free-class" 
                className={styles.scheduleLink}
                onClick={(e) => {
                  e.preventDefault();
                  const freeClassSection = document.getElementById('free-class');
                  if (freeClassSection) {
                    freeClassSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Schedule
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingPath; 