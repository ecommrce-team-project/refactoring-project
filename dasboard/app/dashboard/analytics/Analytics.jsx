"use client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BarChart2, LineChart, TrendingUp } from "lucide-react"
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const chartSetting = {
  yAxis: [
    {
      label: 'Customers',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const dataset = [
  { month: 'Jan', customers: 30 },
  { month: 'Feb', customers: 45 },
  { month: 'Mar', customers: 55 },
  { month: 'Apr', customers: 70 },
  { month: 'May', customers: 85 },
  { month: 'Jun', customers: 100 },
];

export default function Analytics({ 
  salesData, 
  revenueData, 
  customerData, 
  productData 
}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories/getall');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        
        // Transform the data for the pie chart
        const pieData = data.map((category, index) => ({
          id: index,
          value: 1, // You'll need to add a count or value field in your category model
          label: category.name
        }));
        
        setCategories(pieData);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
            <h3>Customer Growth</h3>
            <TrendingUp size={24} />
          </div>
          <div className="analytics-chart">
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
              series={[
                { dataKey: 'customers', label: 'Customers', valueFormatter: (value) => `${value}` }
              ]}
              {...chartSetting}
            />
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-header">
            <h3>Product Distribution</h3>
          </div>
          <div className="analytics-chart">
            {loading ? (
              <div>Loading categories...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <PieChart
                series={[
                  {
                    data: categories,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30 },
                  },
                ]}
                width={600}
                height={200}
              />
            )}
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
          <h4>Top Product</h4>
          <p className="summary-value">{productData?.top || "N/A"}</p>
          <p className="summary-change positive">+20% sales increase</p>
        </div>
      </div>
    </div>
  )
}