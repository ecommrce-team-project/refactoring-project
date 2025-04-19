import { Edit, PlusCircle, Search, Trash, Loader } from "lucide-react"
import { useState, useEffect } from "react"
import styles from './Products.module.css';

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
  const [editProduct, setEditProduct] = useState(null)  // Add a state to handle editing

  useEffect(() => {
    setProducts(products || [])
  }, [products])

  const confirmDelete = (id) => {
    setProductToDelete(id)
    setShowConfirm(true)
  }

  const handleDeleteConfirmed = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/estates/remov/${productToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
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

  const handleEditClick = (product) => {
    setEditProduct(product)  // open modal and pass the selected product
  }

  const handleEditSubmit = async (updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:3001/api/estates/update/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updatedProduct),
      })

      if (!response.ok) {
        throw new Error('Failed to update product')
      }

      const updatedProducts = localProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
      setProducts(updatedProducts)
      setEditProduct(null)  // Close the modal after update
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Failed to update product. Please try again.')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <h1 className="dashboard-title">Products</h1>
        <div className={styles.section_card}>
          <div className={styles.section_header}>
            <h5 className={styles.section_title}>Product List</h5>
            <div className={styles.actions}>
              <div className="search-mini">
                <Search size={16} />
                <input type="text" placeholder="Search products..." />
              </div>
              <button className={styles.btn_action} onClick={handleAddProduct}>
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
                      <td colSpan="5" className="text-center">No products found</td>
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
                        <td><span className="status-badge">Active</span></td>
                        <td>{product.Category?.name || "Uncategorized"}</td>
                        <td>
                          <div className="actions">
                            <button 
                              className="action-btn edit" 
                              onClick={() => handleEditClick(product)}
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              className="action-btn delete" 
                              onClick={() => confirmDelete(product.id)}
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

        {/* Edit Product Modal */}
        {editProduct && (
          <div className={styles.modal_overlay}>
            <div className={styles.modal_box}>
              <h2 className={styles.modal_title}>Edit Product</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleEditSubmit(editProduct) // Submit the updated product details
                }}
                className={styles.form}
              >
                <div className={styles.form_group}>
                  <label className={styles.form_label}>Product Title</label>
                  <input
                    className={styles.form_input}
                    type="text"
                    value={editProduct.title}
                    onChange={(e) =>
                      setEditProduct((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                </div>
                <div className={styles.form_group}>
                  <label className={styles.form_label}>Price</label>
                  <input
                    className={styles.form_input}
                    type="number"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct((prev) => ({ ...prev, price: e.target.value }))
                    }
                  />
                </div>
                <div className={styles.form_group}>
                  <label className={styles.form_label}>Category</label>
                  <select
                    className={styles.form_input}
                    value={editProduct.categoryId || ""}
                    onChange={(e) =>
                      setEditProduct((prev) => ({ ...prev, categoryId: e.target.value }))
                    }
                  >
                    <option value="">Select Category</option>
                    {/* Add your categories dynamically here */}
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                  </select>
                </div>
                <div className={styles.form_group}>
                  <label className={styles.form_label}>Product Image URL</label>
                  <input
                    className={styles.form_input}
                    type="text"
                    value={editProduct.image_url || ''}
                    onChange={(e) =>
                      setEditProduct((prev) => ({ ...prev, image_url: e.target.value }))
                    }
                  />
                </div>
                {/* Show image preview */}
                <div>
                  {editProduct.image_url && (
                    <img
                      src={editProduct.image_url}
                      alt="Product Preview"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  )}
                </div>
                <button type="submit" className="btn-primary">Update Product</button>
                <button
                  type="button"
                  onClick={() => setEditProduct(null)} // Close modal
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

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
    </div>
  )
}
