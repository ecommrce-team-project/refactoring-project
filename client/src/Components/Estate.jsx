import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import OneEstate from './OneEstate.jsx';
import '../css/OneEstate.css';

const Estate = () => {
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get('category');
  const categoryName = searchParams.get('categoryName');

  useEffect(() => {
    const fetchEstates = async () => {
      try {
        setLoading(true);
        console.log('Category ID from URL:', categoryId);
        console.log('Category Name from URL:', categoryName);
        
        let response;
        
        if (categoryId) {
          // Fetch estates by category ID
          console.log(`Fetching estates for category ID: ${categoryId}`);
          response = await axios.get(`http://localhost:3000/api/estate/getByCategory/${categoryId}`);
        } else {
          // Fetch all estates
          console.log('Fetching all estates');
          response = await axios.get('http://localhost:3000/api/estate/getAll');
        }
        
        console.log('Estates fetched:', response.data.length);
        setEstates(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching estates:', error);
        setError(`Failed to load estates: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEstates();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="estates-section">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="estates-section">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="estates-section">
      <h1 className="estates-title">
        {categoryName ? `${categoryName} Properties` : 'Available Estates'}
      </h1>
      {estates.length === 0 ? (
        <div className="no-estates">No properties found in this category.</div>
      ) : (
        <div className="estates-grid">
          {estates.map((estate) => (
            <OneEstate key={estate.id} estate={estate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Estate;