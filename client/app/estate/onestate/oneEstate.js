'use client';

import { useRouter } from 'next/navigation';
import styles from './oneEstate.module.css';

const OneEstate = ({ estate }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/estate/oneEstate/${estate.id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={estate.image_url}
          alt={estate.title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{estate.title}</h3>
        <p className={styles.location}>{estate.location}</p>
        <div className={styles.specs}>
          <div className={styles.spec}>
            <span className={styles.specValue}>{estate.area}m²</span>
            <span className={styles.specLabel}>Area</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specValue}>{estate.rooms}</span>
            <span className={styles.specLabel}>Rooms</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specValue}>{estate.floor}</span>
            <span className={styles.specLabel}>Floor</span>
          </div>
        </div>
        <div className={styles.priceSection}>
          <div className={styles.price}>
            {estate.price} €
          </div>
          <button 
            onClick={handleClick}
            className={styles.viewButton}
          >
            buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneEstate;
