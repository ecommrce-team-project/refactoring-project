'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OneEstate from './onestate/oneEstate';
import Image from 'next/image';
import styles from './estate.module.css';

const EstatePage = () => {
  const [estates, setEstates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEstates, setFilteredEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEstates = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/estate/getAll`);
        if (!response.ok) {
          throw new Error('Failed to fetch estates');
        }
        const data = await response.json();
        setEstates(data);
        setFilteredEstates(data);
      } catch (error) {
        console.error('Error fetching estates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstates();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = estates.filter(estate => 
      estate.title?.toLowerCase().includes(term) ||
      estate.location?.toLowerCase().includes(term) ||
      estate.price?.toString().includes(term)
    );
    setFilteredEstates(filtered);
  };

  const handleEstateClick = (id) => {
    router.push(`/estate/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.introSection}>
        <h1 className={styles.mainTitle}>
          Discover Your Perfect Home
        </h1>
        <p className={styles.subtitle}>
          Welcome to our curated collection of exceptional properties. Each home tells its own story, 
          offering unique features and modern comforts. Whether you're seeking a cozy apartment or 
          a luxurious villa, your dream home awaits.
        </p>
      </div>

      <div className={styles.searchContainer}>
        <input 
          type="text"
          placeholder="Search by title, location or price..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.grid}>
        {filteredEstates.map((estate) => (
          <OneEstate 
            key={estate.id} 
            estate={estate}
            onClick={() => handleEstateClick(estate.id)}
          />
        ))}
      </div>
      {filteredEstates.length === 0 && (
        <div className={styles.noResults}>
          No estates found matching your search.
        </div>
      )}
    </div>
  );
};

export default EstatePage;