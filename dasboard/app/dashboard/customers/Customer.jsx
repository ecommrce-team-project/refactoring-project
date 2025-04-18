'use client';

import { useState, useEffect } from 'react';
import { Edit, Trash, Loader } from 'lucide-react';
import styles from "./Customer.module.css"

// Fake user data
const fakeUsers = [
  {
    id: 1,
    name: "Amine Rh",
    email: "amine@gmail.com",
    status: "Active",
    joined: "2025-01-15",
    avatar: "https://ui-avatars.com/api/?name=John+Doe"
  },
  {
    id: 2,
    name: "yazid tz",
    email: "yazid@gmail.com",
    status: "Inactive",
    joined: "2025-02-20",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith"
  },
  {
    id: 3,
    name: "abdou ",
    email: "abdou@gmail.com",
    status: "Active",
    joined: "2025-03-10",
    avatar: "https://ui-avatars.com/api/?name=Bob+Johnson"
  },
  {
    id: 4,
    name: "mouin bn",
    email: "mouin@gmail.com",
    status: "Active",
    joined: "2025-03-15",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Williams"
  },
  {
    id: 5,
    name: "sirine",
    email: "sirine@hotmail.com",
    status: "Inactive",
    joined: "2025-04-01",
    avatar: "https://ui-avatars.com/api/?name=Michael+Brown"
  }
];

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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use fake data instead of API call
      setCustomers(fakeUsers);
      setError(null);
      
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== customerId));
      alert('Customer deleted successfully!');
    }
  };

  const handleUpdateCustomer = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      const newStatus = customer.status === 'Active' ? 'Inactive' : 'Active';
      setCustomers(customers.map(c => 
        c.id === customerId ? { ...c, status: newStatus } : c
      ));
      alert(`Customer status updated to ${newStatus}`);
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
          <h5>Customer List ({customers.length})</h5>
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
                    <div className={styles.user_info}>
                   
                      <div>
                        <div className={styles.user_name}>{customer.name}</div>
                        <div className={styles.user_email}>{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{customer.email}</td>
                  <td>
                    <span className={`status-badge ${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>{new Date(customer.joined).toLocaleDateString()}</td>
                  <td>
                    <div className="actions">
                      <button 
                        className="action-btn edit"
                        onClick={() => handleUpdateCustomer(customer.id)}
                        title="Toggle status"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDeleteCustomer(customer.id)}
                        title="Delete customer"
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