'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import OneEstate from '../onestate/oneEstate';
import Image from 'next/image';
import styles from './estate.module.css';

const EstatePage = () => {
  const [estates, setEstates] = useState([]);
  const [filteredEstates, setFilteredEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstate, setSelectedEstate] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
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

  const handleEstateClick = async (estateId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/estate/get/${estateId}`);
      const data = await res.json();
      setSelectedEstate(data);
      setShowDetails(true);
    } catch (error) {
      console.error('Error fetching estate details:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (showDetails && selectedEstate) {
    return (
      <div className={styles.detailsView}>
        <button 
          className={styles.backButton}
          onClick={() => setShowDetails(false)}
        >
          ← Back to Listings
        </button>
        <div className={styles.estateDetailsContainer}>
          <div className={styles.estateImageSection}>
            <Image 
              src={selectedEstate.image_url} 
              alt={selectedEstate.title} 
              className={styles.estateImage}
              width={1200}
              height={600}
            />
          </div>
          {/* ...rest of the estate details content... */}
        </div>
      </div>
    );
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

// Directory structure:
// app/
//   page.js
//   estate/
//     page.js      // This will be your /estate route
//     [id]/        // For dynamic routes
//       page.js    // This will handle individual estate pages
