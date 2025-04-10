import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Category.css';

function Category() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/category/getall');
      setCategories(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleViewAllClick = () => {
    navigate('/estate');
  };

  const handleCategoryClick = (id, name) => {
    navigate(`/estate?category=${id}&categoryName=${encodeURIComponent(name)}`);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="category-container">
      <h1 className="category-title">Our Exclusive Sales Listings</h1>
      <button onClick={handleViewAllClick} className="view-all-btn">
        View all properties
      </button>

      <section className="category-grid">
        {categories.map((category) => (
          <div className="category-card" key={category.id || category._id}
               onClick={() => handleCategoryClick(category.id || category._id, category.name)}>
            {category.img && (
              <img
                src={category.img}
                className="category-img"
                alt={category.name}
              />
            )}
            <div className="category-body">
              <h5 className="category-name">
                {category.name}
              </h5>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Category;