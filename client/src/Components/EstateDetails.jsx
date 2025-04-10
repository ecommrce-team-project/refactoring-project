import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/EstateDetails.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function EstateDetails() {
  const { id } = useParams();
  const [estate, setEstate] = useState(null);

  useEffect(() => {
    const fetchEstateDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/estate/get/${id}`);
        setEstate(response.data);
      } catch (error) {
        console.error('Error fetching estate details:', error);
      }
    };

    fetchEstateDetails();
  }, [id]);

  if (!estate) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="estate-details-container">
      <div className="estate-image-section">
        <img src={estate.image_url} alt={estate.title} className="estate-image" />
      </div>
      
      <div className="estate-header-section">
        <div className="estate-badges">
          <span className="price-badge">{estate.price.toLocaleString()} DT</span>
          <span className="type-badge">Appartement</span>
        </div>
        
        <h1 className="estate-title">
          {estate.title}
          <div className="estate-location">
            <i className="fas fa-map-marker-alt"></i> {estate.location}
          </div>
        </h1>

        <div className="property-types">
          <div className="property-type">Appartment</div>
          <div className="property-type">Building</div>
          <div className="property-type">Ground</div>
        </div>

        <div className="estate-specs">
          <div className="spec-item">
            <i className="fas fa-expand"></i>
            <div className="spec-details">
              <span className="spec-value">{estate.area} m²</span>
              <span className="spec-label">Area</span>
            </div>
          </div>

          <div className="spec-item">
            <i className="fas fa-bed"></i>
            <div className="spec-details">
              <span className="spec-value">{estate.bedrooms}</span>
              <span className="spec-label">Bedrooms</span>
            </div>
          </div>

          <div className="spec-item">
            <i className="fas fa-bath"></i>
            <div className="spec-details">
              <span className="spec-value">{estate.bathrooms || '-'}</span>
              <span className="spec-label">Bathrooms</span>
            </div>
          </div>
        </div>

        <div className="estate-info-grid">
          <div className="info-item">
            <span className="info-label">Reference:</span>
            <span className="info-value">Ref{estate.id}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Type:</span>
            <span className="info-value">Appartement</span>
          </div>
          <div className="info-item">
            <span className="info-label">Vocation:</span>
            <span className="info-value">Location</span>
          </div>
          <div className="info-item">
            <span className="info-label">Area:</span>
            <span className="info-value">{estate.area} m²</span>
          </div>
        </div>

        <div className="estate-description">
          <h3>Description</h3>
          <p>{estate.description}</p>
        </div>
      </div>
    </div>
  );
}

export default EstateDetails;