import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/OneEstate.css';

const OneEstate = ({ estate }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/estate/${estate.id}`); // Navigate to the EstateDetails page with the estate ID
  };

  return (
    <div className="estate-card" onClick={handleCardClick}>
      <div className="estate-image">
        <img src={estate.image_url} alt={estate.title} />
        <div className="location-badge">{estate.title}</div>
      </div>
      <div className="estate-details">
        <div className="estate-header">
          <h3 className="project-name">{estate.title}</h3>
          <p className="address">{estate.location}</p>
        </div>
        <div className="estate-specs">
          <div className="spec-item">
            <span className="spec-label">m²</span>
            <span className="spec-value">{estate.area}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Étage</span>
            <span className="spec-value">{estate.floor}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Pièces</span>
            <span className="spec-value">{estate.rooms}</span>
          </div>
        </div>
        <div className="estate-price">
          <span className="price-value">{estate.price.toLocaleString()} €</span>
        </div>
      </div>
    </div>
  );
};

export default OneEstate;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../css/OneEstate.css';

// const OneEstate = ({ estate }) => {
//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     navigate(`/estate/${estate.id}`); // Navigate to the EstateDetails page with the estate ID
//   };

//   const fallbackImage = 'https://via.placeholder.com/400x250.png?text=Image+Not+Available';

//   return (
//     <div className="estate-card" onClick={handleCardClick}>
//       <div className="estate-image">
//         <img
//           src={estate.image_url || fallbackImage}
//           alt={estate.title}
//           onError={(e) => (e.target.src = fallbackImage)} // Fallback if the image fails to load
//         />
//         <div className="location-badge">Location +</div>
//       </div>
//       <div className="estate-details">
//         <h3 className="estate-title">{estate.title}</h3> {/* Add the title here */}
//         <div className="estate-header">
//           <p className="address">{estate.location}</p>
//         </div>
//         <div className="estate-specs">
//           <div className="spec-item">
//             <span className="spec-label">m²</span>
//             <span className="spec-value">{estate.area}</span>
//           </div>
//           <div className="spec-item">
//             <span className="spec-label">Étage</span>
//             <span className="spec-value">{estate.floor || '-'}</span>
//           </div>
//           <div className="spec-item">
//             <span className="spec-label">Pièces</span>
//             <span className="spec-value">{estate.rooms || '-'}</span>
//           </div>
//         </div>
//         <div className="estate-price">
//           <span className="price-value">{estate.price.toLocaleString()} €</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OneEstate;