'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Download, Upload, X, Loader } from 'lucide-react';

// Add this helper function at the top of your file, outside the component
const getStockStatus = (quantity) => {
  if (quantity <= 0) return 'Out of Stock';
  if (quantity <= 5) return 'Low Stock';
  return 'In Stock';
};

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdateStockModalOpen, setIsUpdateStockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockQuantity, setStockQuantity] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/estates/getall');
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Using fallback data.');
        setProducts([
          {
            id: 1,
            name: 'Wireless Headphones',
            description: 'High-quality noise-canceling wireless headphones.',
            price: '$99.99',
            status: 'In Stock',
            rating: 4.5,
            image: '/placeholder.svg?height=50&width=50',
          },
          {
            id: 2,
            name: 'Smart Watch',
            description: 'Feature-rich smartwatch with health tracking.',
            price: '$149.99',
            status: 'In Stock',
            rating: 4.2,
            image: '/placeholder.svg?height=50&width=50',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleUpdateStock = (product) => {
    setSelectedProduct(product);
    setStockQuantity(product.quantity || '');
    setIsUpdateStockModalOpen(true);
  };

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    try {
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...p, quantity: parseInt(stockQuantity) } : p
        )
      );
      setIsUpdateStockModalOpen(false);
      setSelectedProduct(null);
      setStockQuantity('');
      alert('Stock updated successfully!');
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock. Please try again.');
    }
  };

  return (
    <>
      <div className="section-content">
        <h1 className="dashboard-title">Inventory Management</h1>
        <div className="section-card">
          <div className="section-header">
            <h5>Inventory Status</h5>
            <div className="section-actions">
              <button className="btn-action">
                <Download size={16} /> Export
              </button>
              <button className="btn-action">
                <Upload size={16} /> Import
              </button>
            </div>
          </div>
          <div className="section-body">
            {loading ? (
              <div className="loading-container">
                <Loader className="loading-spinner" />
                <p>Loading products...</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p className="error-message">{error}</p>
              </div>
            ) : (
              <>
                <div className="inventory-summary">
                  <div className="inventory-stat">
                    <div className="inventory-stat-label">Total Products</div>
                    <div className="inventory-stat-value">{products.length}</div>
                  </div>
                  <div className="inventory-stat">
                    <div className="inventory-stat-label">In Stock</div>
                    <div className="inventory-stat-value">
                      {products.filter((p) => p.quantity > 5).length}
                    </div>
                  </div>
                  <div className="inventory-stat">
                    <div className="inventory-stat-label">Low Stock</div>
                    <div className="inventory-stat-value">
                      {products.filter((p) => p.quantity > 0 && p.quantity <= 5).length}
                    </div>
                  </div>
                  <div className="inventory-stat">
                    <div className="inventory-stat-label">Out of Stock</div>
                    <div className="inventory-stat-value">
                      {products.filter((p) => p.quantity === 0).length}
                    </div>
                  </div>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>SKU</th>
                      <th>Status</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product.id}>
                        <td>
                          <div className="product-info">
                            <div className="product-image">
                              <img
                                src={product.image_url || '/placeholder.svg?height=50&width=50'}
                                alt={product.name}
                              />
                            </div>
                            <div className="product-name">{product.name}</div>
                          </div>
                        </td>
                        <td>SKU-{1000 + index}</td>
                        <td>
                          <span className={`status-badge ${getStockStatus(product.quantity).toLowerCase().replace(' ', '-')}`}>
                            {getStockStatus(product.quantity)}
                          </span>
                        </td>
                        <td>
                          <div className="quantity-controls">
                            <button
                              className="btn-sm"
                              onClick={() =>
                                setProducts(
                                  products.map((p) =>
                                    p.id === product.id
                                      ? { ...p, quantity: Math.max(0, (p.quantity || 0) - 1) }
                                      : p
                                  )
                                )
                              }
                            >
                              -
                            </button>
                            <span>{product.quantity || 0}</span>
                            <button
                              className="btn-sm"
                              onClick={() =>
                                setProducts(
                                  products.map((p) =>
                                    p.id === product.id
                                      ? { ...p, quantity: (p.quantity || 0) + 1 }
                                      : p
                                  )
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>

      {isUpdateStockModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Update Stock</h3>
              <button
                className="modal-close"
                onClick={() => {
                  setIsUpdateStockModalOpen(false);
                  setSelectedProduct(null);
                  setStockQuantity('');
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleStockSubmit}>
                <div className="form-group">
                  <label>Product</label>
                  <input
                    type="text"
                    value={selectedProduct?.name || ''}
                    disabled
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Current Stock</label>
                  <input
                    type="text"
                    value={selectedProduct?.quantity || 0}
                    disabled
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>New Stock Quantity</label>
                  <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="form-control"
                    min="0"
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => {
                      setIsUpdateStockModalOpen(false);
                      setSelectedProduct(null);
                      setStockQuantity('');
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Update Stock
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}