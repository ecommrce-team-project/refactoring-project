import React from 'react'

const newCustomer = () => {
  return (
    <div>
       <div className="section-content">
            <h1 className="dashboard-title">Add New Customer</h1>
            <div className="section-card">
              <div className="section-header">
                <h5>Customer Information</h5>
              </div>
              <div className="section-body">
                <form onSubmit={handleNewCustomer} className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newCustomer.name}
                      onChange={handleNewCustomerChange}
                      placeholder="Enter customer name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newCustomer.email}
                      onChange={handleNewCustomerChange}
                      placeholder="Enter customer email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={newCustomer.status}
                      onChange={handleNewCustomerChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={() => setActiveSidebarItem("customers")}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                      Add Customer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
    </div>
  )
}
export default newCustomer

