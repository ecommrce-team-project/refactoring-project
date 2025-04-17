'use client';

import { useState,useEffect } from 'react';
import Link from 'next/link';
import { Edit, Trash, PlusCircle, UserCog,Loader } from 'lucide-react';

export default function Customers() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/users/all-users');
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter((customer) => customer.id !== customerId));
      alert('Customer deleted successfully!');
    }
  };

  // const handleUpdateCustomer = (customerId) => {
  //   const customer = customers.find((c) => c.id === customerId);
  //   if (customer) {
  //     const newStatus = customer.status === 'Active' ? 'Inactive' : 'Active';
  //     setCustomers(customers.map((c) => (c.id === customerId ? { ...c, status: newStatus } : c)));
  //     alert(`Customer status updated to ${newStatus}`);
  //   }
  // };
  const handleUpdateCustomer = async (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) return;

    try {
      const newStatus = customer.status === 'Active' ? 'Inactive' : 'Active';
      const response = await fetch(`http://localhost:3000/api/users/update/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update customer');

      setCustomers(customers.map((c) => 
        c.id === customerId ? { ...c, status: newStatus } : c
      ));
      alert(`Customer status updated to ${newStatus}`);
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update customer: ' + err.message);
    }
  };
  if (loading) {
    return (
      <div className="loading-container">
        <Loader className="loading-spinner" />
        <p>Loading customers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={fetchCustomers} className="btn-retry">
          Retry
        </button>
      </div>
    );
  }
  return (
    <div className="section-content">
            <h1 className="dashboard-title">Customers</h1>
            <div className="section-card">
              <div className="section-header">
                <h5>Customer List</h5>
                <div className="section-actions">

                </div>
              </div>
              <div className="section-body">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td>
                          <div className="user-info">
                            <img src="/placeholder.svg?height=40&width=40" alt="User" />
                            <span>{customer.name}</span>
                          </div>
                        </td>
                        <td>{customer.email}</td>
                        <td>
                          <span className={`status-badge ${customer.status.toLowerCase()}`}>
                            {customer.status}
                          </span>
                        </td>
                        <td>{customer.joined}</td>
                        <td>
                          <div className="actions">
                            <button 
                              className="action-btn edit"
                              onClick={() => handleUpdateCustomer(customer.id)}
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              className="action-btn delete"
                              onClick={() => handleDeleteCustomer(customer.id)}
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
  );
}