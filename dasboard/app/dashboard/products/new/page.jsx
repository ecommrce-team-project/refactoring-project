'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

export default function NewProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    status: 'In Stock',
    quantity: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Placeholder for API call
      alert('Product added successfully!');
      router.push('/dashboard/products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="section-content">
      <h1 className="dashboard-title">Add New Product</h1>
      <div className="section-card">
        <div className="section-header">
          <h5>Product Information</h5>
        </div>
        <div className="section-body">
          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="form-group full-width">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={product.status} onChange={handleChange}>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                min="0"
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Product Image</label>
              <div className="file-upload">
                <button type="button" className="btn-upload">
                  <Upload size={16} /> Upload Image
                </button>
                <span className="file-info">No file selected</span>
              </div>
            </div>
            <div className="form-actions full-width">
              <Link href="/dashboard/products" className="btn-cancel">
                Cancel
              </Link>
              <button type="submit" className="btn-submit">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}