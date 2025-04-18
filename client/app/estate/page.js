'use client';

import React, { useState, useEffect , useContext} from 'react';
import { useRouter } from 'next/navigation';
import OneEstate from './onestate/oneEstate';
import BuyModal from './paymentEstate/BuyModal';
import styles from './estate.module.css';
import { useAuth } from '@/app/Context/AuthContext.js';

const EstatePage = () => {
  const [estates, setEstates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEstates, setFilteredEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEstate, setSelectedEstate] = useState(null);
  const router = useRouter();

  const { user } = useAuth();


  useEffect(() => {
    const fetchEstates = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/estates/getall');
        if (!response.ok) throw new Error('Failed to fetch estates');
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

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = estates.filter((estate) =>
      estate.title?.toLowerCase().includes(term) ||
      estate.location?.toLowerCase().includes(term) ||
      estate.price?.toString().includes(term)
    );
    setFilteredEstates(filtered);
  };

  const handleBuyClick = (estate) => {
    setSelectedEstate(estate);
  };

  const handleConfirmPayment = async () => {
    try {
      const userId = user?.id; 
      const response = await fetch('http://localhost:3000/api/down-payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, estateId: selectedEstate.id })
      });

      const data = await response.json();
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert('Failed to start payment');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Something went wrong!');
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.introSection}>
        <h1 className={styles.mainTitle}>Discover Your Perfect Home</h1>
        <p className={styles.subtitle}>
          Welcome to our curated collection of exceptional properties. Whether you're seeking a cozy apartment or a luxurious villa, your dream home awaits.
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
            onBuy={() => handleBuyClick(estate)}
          />
        ))}
      </div>

      {filteredEstates.length === 0 && (
        <div className={styles.noResults}>No estates found matching your search.</div>
      )}

      <BuyModal
        estate={selectedEstate}
        onClose={() => setSelectedEstate(null)}
        onConfirm={handleConfirmPayment}
      />
    </div>
  );
};

export default EstatePage;
