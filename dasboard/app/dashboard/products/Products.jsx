"use client"

import { Edit, PlusCircle, Search, Trash, Loader } from "lucide-react"

export default function Products({ 
  products, 
  loading, 
  error, 
  handleAddProduct, 
  handleEditProduct, 
  handleDeleteProduct 
}) {
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
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
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
                            onClick={() => handleDeleteProduct(product.id)}
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
    </div>
  )
}