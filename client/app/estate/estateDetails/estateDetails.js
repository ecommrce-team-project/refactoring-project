'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './estateDetails.module.css';

export default function EstateDetails({ isHomePage }) {
  const router = useRouter();

  const handleViewProperties = () => {
    router.push('/estate'); // Update this line (remove /estate from the end)
  };

  return (
    <div className={`${styles.homePage}`}>
      <div className={styles.heroSection}>
        
        <div className={styles.heroContent}>
          <h1>Find Your Dream Home</h1>
          <p>Discover exceptional properties that match your lifestyle. From modern apartments to luxury villas, we have the perfect home waiting for you.</p>
          <button 
            className={styles.viewPropertiesBtn}
            onClick={handleViewProperties}
          >
            View All Properties
          </button>
        </div>
      </div>

      <div className={styles.featuresSection}>
        <h2>Why Choose Us</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3>Premium Locations</h3>
            <p>Find properties in the most sought-after locations</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Quality Assurance</h3>
            <p>All properties meet our high standards</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Expert Support</h3>
            <p>Professional guidance throughout your journey</p>
          </div>
        </div>
      </div>
    </div>
  );
}
