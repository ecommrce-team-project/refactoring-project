'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function VerifyCustomers() {
  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: 1,
      name: 'Amine',
      email: 'amine@gmail.com',
      status: 'pending',
      documents: ['ID Document', 'Proof of Address'],
    },
    {
      id: 2,
      name: 'Yazid',
      email: 'yazid@gmail.com',
      status: 'pending',
      documents: ['ID Document'],
    },
  ]);

  const handleApprove = (userId) => {
    setPendingVerifications((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, status: 'approved' } : user))
    );
    alert('User approved successfully!');
  };

  const handleReject = (userId) => {
    if (window.confirm('Are you sure you want to reject this user?')) {
      setPendingVerifications((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, status: 'rejected' } : user))
      );
      alert('User rejected successfully!');
    }
  };

  return (
    <div className="section-content">
      <h1 className="dashboard-title">Verify Customers</h1>
      <div className="section-card">
        <div className="section-header">
          <h5>Pending Verification</h5>
          <div className="section-actions">
            <Link href="/dashboard/customers" className="btn-action">
              Back to Customers
            </Link>
          </div>
        </div>
        <div className="section-body">
          <div className="verification-list">
            {pendingVerifications
              .filter((user) => user.status === 'pending')
              .map((user) => (
                <div key={user.id} className="verification-item">
                  <div className="verification-user">
                    <img src="/placeholder.svg?height=50&width=50" alt="User" />
                    <div className="verification-user-info">
                      <h6>{user.name}</h6>
                      <div className="verification-user-email">{user.email}</div>
                    </div>
                  </div>
                  <div className="verification-documents">
                    {user.documents.map((doc, index) => (
                      <div key={index} className="verification-document">
                        <FileText size={16} />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="verification-actions">
                    <button className="btn-approve" onClick={() => handleApprove(user.id)}>
                      Approve
                    </button>
                    <button className="btn-reject" onClick={() => handleReject(user.id)}>
                      Reject
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}