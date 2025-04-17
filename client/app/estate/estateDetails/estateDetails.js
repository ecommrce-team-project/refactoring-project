'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './estateDetails.module.css';

export default function EstateDetails({ params }) {
  const [estate, setEstate] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEstate = async () => {
      if (!params?.id) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/estate/get/${params.id}`);
        const data = await res.json();
        setEstate(data);
      } catch (error) {
        console.error('Error fetching estate:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstate();
  }, [params?.id]);

  const handleClick = () => {
    if (params?.id) {
      router.push(`/estate/oneEstate/${params.id}`);  // Updated path
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!estate) return <div>Estate not found</div>;

  return (
    <div className={styles.estateDetailsContainer} onClick={handleClick}>
      <div className={styles.estateImageSection}>
        <Image src={estate.image_url} alt={estate.title} className={styles.estateImage} />
      </div>

      <div className={styles.estateHeaderSection}>
        <div className={styles.estateBadges}>
          <a href="/payment" className={styles.priceBadge}>
            {estate.price.toLocaleString()} DT
          </a>
          <span className={styles.typeBadge}>Appartement</span>
        </div>

        <h1 className={styles.estateTitle}>
          {estate.title}
          <div className={styles.estateLocation}>
            <i className="fas fa-map-marker-alt"></i> {estate.location}
          </div>
        </h1>

        <div className={styles.propertyTypes}>
          <div className={styles.propertyType}>Appartment</div>
          <div className={styles.propertyType}>Building</div>
          <div className={styles.propertyType}>Ground</div>
        </div>

        <div className={styles.estateSpecs}>
          <div className={styles.specItem}>
            <i className="fas fa-expand"></i>
            <div className={styles.specDetails}>
              <span className={styles.specValue}>{estate.area} m²</span>
              <span className={styles.specLabel}>Area</span>
            </div>
          </div>

          <div className={styles.specItem}>
            <i className="fas fa-bed"></i>
            <div className={styles.specDetails}>
              <span className={styles.specValue}>{estate.bedrooms}</span>
              <span className={styles.specLabel}>Bedrooms</span>
            </div>
          </div>

          <div className={styles.specItem}>
            <i className="fas fa-bath"></i>
            <div className={styles.specDetails}>
              <span className={styles.specValue}>{estate.bathrooms || '-'}</span>
              <span className={styles.specLabel}>Bathrooms</span>
            </div>
          </div>
        </div>

        <div className={styles.estateInfoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Reference:</span>
            <span className={styles.infoValue}>Ref{estate.id}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Type:</span>
            <span className={styles.infoValue}>Appartement</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Vocation:</span>
            <span className={styles.infoValue}>Location</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Area:</span>
            <span className={styles.infoValue}>{estate.area} m²</span>
          </div>
        </div>

        <div className={styles.estateDescription}>
          <h3>Description</h3>
          <p>{estate.description}</p>
        </div>
      </div>
    </div>
  );
}
