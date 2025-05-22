import styles from './CallToAction.module.scss';

const CallToAction = () => {
  return (
    <section id="cta" className={styles.ctaSection}>
      <div className={styles.ctaOverlay}></div>
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <h2>Ready to Join Elite Tactical Training?</h2>
          <p>
            Take the first step towards tactical excellence. Join our community of professionals
            and enthusiasts committed to the highest standards of training and preparedness.
          </p>
          <div className={styles.ctaButtons}>
            <a href="#assessment" className={styles.btnPrimary}>
              Take the Assessment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 