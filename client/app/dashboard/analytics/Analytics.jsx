"use client"

import { BarChart2, LineChart, PieChart, TrendingUp } from "lucide-react"

export default function Analytics({ 
  salesData, 
  revenueData, 
  customerData, 
  productData 
}) {
  return (
    <div className="section-content">
      <h1 className="dashboard-title">Analytics</h1>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-header">
            <h3>Sales Overview</h3>
            <BarChart2 size={24} />
          </div>
          <div className="analytics-chart">
            {/* Sales chart will be implemented here */}
            <div className="chart-placeholder">
              <BarChart2 size={48} />
              <p>Sales chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-header">
            <h3>Revenue Trends</h3>
            <LineChart size={24} />
          </div>
          <div className="analytics-chart">
            {/* Revenue chart will be implemented here */}
            <div className="chart-placeholder">
              <LineChart size={48} />
              <p>Revenue chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-header">
            <h3>Customer Growth</h3>
            <TrendingUp size={24} />
          </div>
          <div className="analytics-chart">
            {/* Customer growth chart will be implemented here */}
            <div className="chart-placeholder">
              <TrendingUp size={48} />
              <p>Customer growth chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-header">
            <h3>Product Distribution</h3>
            <PieChart size={24} />
          </div>
          <div className="analytics-chart">
            {/* Product distribution chart will be implemented here */}
            <div className="chart-placeholder">
              <PieChart size={48} />
              <p>Product distribution chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-summary">
        <div className="summary-card">
          <h4>Total Sales</h4>
          <p className="summary-value">${salesData?.total || 0}</p>
          <p className="summary-change positive">+12% from last month</p>
        </div>
        <div className="summary-card">
          <h4>Total Revenue</h4>
          <p className="summary-value">${revenueData?.total || 0}</p>
          <p className="summary-change positive">+8% from last month</p>
        </div>
        <div className="summary-card">
          <h4>New Customers</h4>
          <p className="summary-value">{customerData?.new || 0}</p>
          <p className="summary-change positive">+15% from last month</p>
        </div>
        <div className="summary-card">
          <h4>Top Product</h4>
          <p className="summary-value">{productData?.top || "N/A"}</p>
          <p className="summary-change positive">+20% sales increase</p>
        </div>
      </div>
    </div>
  )
} 