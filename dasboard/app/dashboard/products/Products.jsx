"use client"

import { Edit, PlusCircle, Search, Trash, Loader } from "lucide-react"
import { useState, useEffect } from "react"

export default function Products({ 
  products, 
  loading, 
  error, 
  handleAddProduct, 
  handleEditProduct 
}) {
  const [localProducts, setProducts] = useState([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  useEffect(() => {
    setProducts(products || [])
  }, [products])

  const confirmDelete = (id) => {
    setProductToDelete(id)
    setShowConfirm(true)
  }

  const handleDeleteConfirmed = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/estate/remov/${productToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      const updatedProducts = localProducts.filter(product => product.id !== productToDelete)
      setProducts(updatedProducts)

      setShowConfirm(false)
      setProductToDelete(null)

    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product. Please try again.')
    }
  }

  return (
    <div className="section-content">
      <h1 className="dashboard-title">Products</h1>
      <div className="section-card">
        <div className="section-header">
          <h5>Product List</h5>
          <div className="section-actions">
            <div className="search-mini">
              <Search size={16} />
              <input type="text" placeholder="Search products..." />
            </div>
            <button 
              className="btn-action"
              onClick={handleAddProduct}
            >
              <PlusCircle size={16} /> Add Product
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
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {localProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No products found
                    </td>
                  </tr>
                ) : (
                  localProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="product-info">
                          <div className="product-image">
                            <img 
                              src={product.image_url || "/placeholder.svg?height=50&width=50"} 
                              alt={product.title || "Product image"} 
                            />
                          </div>
                          <div className="product-details">
                            <div className="product-name">{product.title}</div>
                            <div className="product-description">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td>${product.price}</td>
                      <td>
                        <span className="status-badge">Active</span>
                      </td>
                      <td>{product.Category?.name || "Uncategorized"}</td>
                      <td>
                        <div className="actions">
                          <button 
                            className="action-btn edit" 
                            onClick={() => handleEditProduct(product.id)}
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="action-btn delete" 
                            onClick={() => confirmDelete(product.id)}
                            title="Delete product"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Are you sure you want to delete this product?</h2>
            <div className="modal-actions">
              <button onClick={handleDeleteConfirmed} className="btn-danger">Yes, Delete</button>
              <button onClick={() => setShowConfirm(false)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
