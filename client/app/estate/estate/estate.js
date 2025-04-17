'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import OneEstate from '../onestate/oneEstate';
import styles from './estate.module.css';

const EstatePage = () => {
  const [estates, setEstates] = useState([]);
  const [filteredEstates, setFilteredEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const categoryName = searchParams.get('categoryName');

  useEffect(() => {
    const fetchEstates = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/estate/getAll`);
        const data = await res.json();
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

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = estates.filter(estate => 
      estate.title.toLowerCase().includes(term) ||
      estate.location.toLowerCase().includes(term) ||
      estate.price.toString().includes(term)
    );
    setFilteredEstates(filtered);
  };

  if (loading) return <div>Loading...</div>;

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

      <div className={styles.searchContainer}> search for your dream home
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
