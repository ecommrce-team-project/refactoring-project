import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>DARNA</h3>
            <p>Find your perfect home with us.</p>
          </div>
          <div className={styles.section}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/estate">Properties</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className={styles.section}>
            <h4>Contact</h4>
            <p>Email: info@darna.com</p>
            <p>Phone: +1234567890</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; 2024 DARNA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;