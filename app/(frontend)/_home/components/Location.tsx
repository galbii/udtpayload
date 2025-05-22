import styles from './Location.module.scss';

interface LocationProps {
  branchName?: string;
  address?: {
    line1: string;
    city: string;
    state: string;
    zipCode: string;
  };
  hours?: {
    opening: {
      hour: string;
      minute: string;
      period: string;
    };
    closing: {
      hour: string;
      minute: string;
      period: string;
    };
  };
  phone?: string;
  email?: string;
}

const Location = ({
  branchName = 'Anaheim Hills',
  address = {
    line1: '160 S. Old Springs Rd, Suite 155',
    city: 'Anaheim Hills',
    state: 'CA',
    zipCode: '92808'
  },
  hours = {
    opening: { hour: '9', minute: '00', period: 'AM' },
    closing: { hour: '8', minute: '00', period: 'PM' }
  },
  phone = '(714) 555-0123',
  email = 'anaheimhills@uniteddefensetactical.com'
}: LocationProps = {}) => {
  const appleMapsUrl = `https://maps.apple.com/?address=${encodeURIComponent(`${address.line1}, ${address.city}, ${address.state} ${address.zipCode}`)}&q=United+Tactical+Defense`;

  return (
    <section id="location" className={styles.locationSection}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2>Our Location</h2>
          <p>Train with us at our state-of-the-art facility in {branchName}</p>
        </header>
        
        <div className={styles.locationContainer}>
          <div className={styles.locationMap}>
            <iframe 
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCGfbYRLodJeshjJKkSHCCBB4B3x4QpSBw&q=${encodeURIComponent(`${address.line1}, ${address.city}, ${address.state} ${address.zipCode}`)}`} 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={`United Defense Tactical ${branchName} location map`}
            ></iframe>
          </div>
          
          <div className={styles.locationDetails}>
            <div className={`${styles.detailCard} ${styles.address}`}>
              <h3>Address</h3>
              <p>{address.line1}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <a href={appleMapsUrl} target="_blank" rel="noopener noreferrer" className={styles.directionsLink}>
                Get Directions
              </a>
            </div>
            
            <div className={`${styles.detailCard} ${styles.hours}`}>
              <h3>Training Hours</h3>
              <p>Monday - Friday: {hours.opening.hour}:{hours.opening.minute} {hours.opening.period} - {hours.closing.hour}:{hours.closing.minute} {hours.closing.period}</p>
              <p>Saturday - Sunday: 8:00 AM - 5:00 PM</p>
            </div>
            
            <div className={`${styles.detailCard} ${styles.contact}`}>
              <h3>Contact</h3>
              <p>Phone: {phone}</p>
              <p>Email: {email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location; 