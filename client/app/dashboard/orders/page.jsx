'use client';

import { useState } from 'react';

export default function Orders() {
  const [orders] = useState([
    {
      id: 1,
      name: 'Amine Rahali',
      email: 'amine.rahali@gmail.com',
      amount: '$1500',
      date: '2023-10-01',
    },
    {
      id: 2,
      name: 'Mouin ben Ali',
      email: 'mouin.benali@gmail.com',
      amount: '$2000',
      date: '2023-10-02',
    },
    {
      id: 3,
      name: 'yazid',
      email: 'yazid@gmail.com',
      amount: '$4000',
      date: '2023-10-03',
    },
    {
      id: 4,
      name: 'majid',
      email: 'majid@gmail.com',
      amount: '$3000',
      date: '2023-10-04',
    },
  ]);

  return (
    <div className="section-content">
      <h1 className="dashboard-title">Orders</h1>
      <div className="section-card">
        <div className="section-header">
          <h5>Order List</h5>
          <div className="section-actions">
            <button className="btn-action">Filter Orders</button>
          </div>
        </div>
        <div className="section-body">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <div className="user-info">
                      <img src="/placeholder.svg?height=40&width=40" alt="User" />
                      <span>{order.name}</span>
                    </div>
                  </td>
                  <td>{order.email}</td>
                  <td>{order.amount}</td>
                  <td>{order.date}</td>
                  <td>
                    <div className="actions">
                      <button className="action-btn edit">
                        <span>View</span>
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