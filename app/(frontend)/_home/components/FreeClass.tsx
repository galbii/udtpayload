'use client';

import Image from 'next/image';
import styles from './FreeClass.module.scss';
import { FreeLessonTrigger } from '@/app/(frontend)/_components/forms';

const FreeClass = () => {
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
              <FreeLessonTrigger buttonClassName={styles.btnPrimary} />
            </div>
          </div>
          
          <div className={styles.contentImage}>
            <Image
              src="/images/schedule.jpeg"
              alt="Training session schedule"
              width={600}
              height={400}
              style={{ width: '100%', height: 'auto' }}
              className={styles.image}
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeClass; 