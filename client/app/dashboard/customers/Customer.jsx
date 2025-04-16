'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash, PlusCircle, UserCog } from 'lucide-react';

export default function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      status: 'Active',
      joined: 'Jan 15, 2023',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      status: 'Active',
      joined: 'Feb 22, 2023',
    },
  ]);

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter((customer) => customer.id !== customerId));
      alert('Customer deleted successfully!');
    }
  };

  const handleUpdateCustomer = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    if (customer) {
      const newStatus = customer.status === 'Active' ? 'Inactive' : 'Active';
      setCustomers(customers.map((c) => (c.id === customerId ? { ...c, status: newStatus } : c)));
      alert(`Customer status updated to ${newStatus}`);
    }
  };

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