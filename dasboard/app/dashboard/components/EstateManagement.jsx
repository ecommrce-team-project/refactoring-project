"use client";

import { useState, useEffect } from "react";
import { Edit, Trash } from "lucide-react";
import styles from "./EstateManagement.module.css";

const EstateManagement = ({ darkMode }) => {
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    bathrooms: "",
    bedrooms: "",
    area: "",
    category_id: "",
    image_url: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchEstates = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/estates/getall");
      if (!response.ok) throw new Error("Failed to fetch estates");
      const data = await response.json();
      setEstates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstates();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/estates/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add estate');
      }

      alert('Estate added successfully!');
      // Reset form or redirect
    } catch (error) {
      console.error('Error adding estate:', error);
      alert('Failed to add estate. Please try again.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/estates/update/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update estate');
      }

      alert('Estate updated successfully!');
      // Reset form or redirect
    } catch (error) {
      console.error('Error updating estate:', error);
      alert('Failed to update estate. Please try again.');
    }
  };

  const handleEdit = (estate) => {
    setIsEditing(true);
    setEditingId(estate.id);
    setFormData({
      title: estate.title,
      description: estate.description,
      price: estate.price,
      location: estate.location,
      bathrooms: estate.bathrooms,
      bedrooms: estate.bedrooms,
      area: estate.area,
      category_id: estate.category_id,
      image_url: estate.image_url
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this estate?")) return;

    try {
      const response = await fetch(
       `http://localhost:3001/api/estates/remov/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) throw new Error("Failed to delete estate");

      await fetchEstates();
      alert("Estate deleted successfully!");
    } catch (err) {
      setError(err.message);
      alert("Error deleting estate. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      location: "",
      bathrooms: "",
      bedrooms: "",
      area: "",
      category_id: "",
      image_url: ""
    });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.estateManagement}>
        <form onSubmit={handleSubmit} className={styles.formSection}>
          <h2 className={styles.formTitle}>
            {isEditing ? "Edit Estate" : "Add New Estate"}
          </h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Area</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Category ID</label>
            <input
              type="number"
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Image URL</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.buttonPrimary}>
              {isEditing ? "Update Estate" : "Add Estate"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className={styles.buttonSecondary}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <table className={styles.table}>
          </table>
        )}
      </div>
    </div>
  );
};

export default EstateManagement;