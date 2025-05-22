import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Contact</h3>
            <p>160 S. Old Springs Rd, Suite 155</p>
            <p>Anaheim Hills, CA 92808</p>
            <p>Phone: (714) 555-0123</p>
            <p>Email: anaheimhills@uniteddefensetactical.com</p>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Training Hours</h3>
            <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
            <p>Saturday - Sunday: 8:00 AM - 5:00 PM</p>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Follow Us</h3>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com/UDT_anaheimhills" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://facebook.com/UDT_anaheimhills" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} United Defense Tactical. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 