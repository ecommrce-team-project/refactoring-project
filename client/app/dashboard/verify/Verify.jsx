"use client"

import { FileText, UserCog } from "lucide-react"

export default function Verify({ pendingVerifications, handleApprove, handleReject }) {
  return (
    <div className="section-content">
      <h1 className="dashboard-title">Verify Customers</h1>
      <div className="section-card">
        <div className="section-header">
          <h5>Pending Verification</h5>
          <div className="section-actions">
            <button className="btn-action">
              <UserCog size={16} /> Verification Settings
            </button>
          </div>
        </div>
        <div className="section-body">
          <div className="verification-list">
            {pendingVerifications
              .filter(user => user.status === "pending")
              .map(user => (
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
                    <button 
                      className="btn-approve"
                      onClick={() => handleApprove(user.id)}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={() => handleReject(user.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
} 