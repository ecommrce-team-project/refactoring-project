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
        const response = await fetch('http://localhost:3001/api/estates/getall');
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
      if (!userId) {
        alert('Please log in to make a payment');
        return;
      }

      if (!selectedEstate) {
        alert('No estate selected');
        return;
      }

      console.log('Initiating payment with:', { userId, estateId: selectedEstate.id });

      const response = await fetch('http://localhost:3001/api/down-payments/initiate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ 
          userId: parseInt(userId), // Ensure userId is a number
          estateId: parseInt(selectedEstate.id) // Ensure estateId is a number
        })
      });

      const data = await response.json();
      console.log('Payment response:', data);
      
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to start payment');
      }

      if (data.payment_url) {
        // Store the downPaymentId in localStorage for verification
        localStorage.setItem('currentDownPaymentId', data.downPaymentId);
        window.location.href = data.payment_url;
      } else {
        throw new Error('No payment URL received');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert(err.message || 'Something went wrong! Please try again.');
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
