'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import OneEstate from '../../onestate/oneEstate';
import styles from '.././../onestate/oneEstate.module.css';

export default function OneEstatePage() {
  const [estate, setEstate] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchEstate = async () => {
      if (!params?.id) return;
      
      try {
        const res = await fetch(`http://localhost:3001/api/estates/get/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!res.ok) throw new Error('Failed to fetch estate');
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

  if (loading) return <div>Loading...</div>;
  if (!estate) return <div>Estate not found</div>;

  return (
    <div className={styles.singleEstateContainer}>
      <OneEstate estate={estate} />
    </div>
  );
}