const express = require("express");
const morgan = require("morgan");
require ("dotenv").config({ path: "./utils/.env" });
require("./database/index.js");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const createError = require("http-errors");

var path= require('path');


const app = express();
 app.use(morgan("dev"));
const port = process.env.SERVER_PORT || 3000;
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))


const userRoutes = require("./routes/User.routes.js");
const authRoutes = require("./routes/Auth.routes.js");
const paymentRouter = require("./routes/payment.routes.js");
const categoryRoutes = require("./routes/Category.routes.js");
const contactRoutes = require("./routes/Contact.routes.js");
const estateRoutes = require("./routes/Estate.routes.js");
const dashboardRoute = require("./routes/dashboard.route");


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3001", "http://localhost:3005"],// your frontend's origin
  credentials: true, // allow cookies to be sent
}));



app.use("/api/payment", paymentRouter)
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/estate", estateRoutes);
app.use("/api/dashboard", dashboardRoute);
app.use((req, res, next) => {
  next(createError.NotFound());
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`app listening on http://127.0.0.1:${port}`);
});

module.exports= app;


















// "use client"

// import { useState, useEffect } from "react"
// import {
//   LayoutDashboard,
//   BarChart2,
//   FileText,
//   Users,
//   ShoppingBag,
//   UserPlus,
//   UserCheck,
//   PackagePlus,
//   Clipboard,
//   Settings,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   Bell,
//   Moon,
//   Sun,
//   Package,
//   DollarSign,
//   CreditCard,
//   Edit,
//   Trash,
//   Loader,
//   PlusCircle,
//   Filter,
//   Download,
//   Upload,
//   UserCog,
//   BarChart,
//   PieChart,
//   LineChart,
// } from "lucide-react"

// export default function Dashboard() {
//   // State for sidebar collapse
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
//   // State for dark mode
//   const [darkMode, setDarkMode] = useState(true)
//   // State for notifications
//   const [notificationsOpen, setNotificationsOpen] = useState(false)
//   // State for chart data
//   const [chartData, setChartData] = useState([1500, 2500, 1800, 3000, 2000, 4500, 3800, 4800, 3500, 5000, 4200, 4800])
//   // State for products data
//   const [products, setProducts] = useState([])
//   // State for loading
//   const [loading, setLoading] = useState(true)
//   // State for error
//   const [error, setError] = useState(null)
//   // State for active sidebar item
//   const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard")
//   // State for user settings
//   const [userSettings, setUserSettings] = useState({
//     name: "Admin User",
//     email: "admin@example.com",
//     password: "",
//   })
//   // State for sidebar position
//   const [sidebarPosition, setSidebarPosition] = useState("left")

//   // Toggle sidebar
//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed)
//   }

//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode)
//     // Toggle class on body
//     if (darkMode) {
//       document.body.classList.remove("dark-mode")
//       document.body.classList.add("light-mode")
//     } else {
//       document.body.classList.remove("light-mode")
//       document.body.classList.add("dark-mode")
//     }
//   }

//   // Toggle notifications
//   const toggleNotifications = () => {
//     setNotificationsOpen(!notificationsOpen)
//   }

//   // Fetch products data
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true)
//         // Use the local API endpoint instead of a separate server
//         const response = await fetch("http://localhost:3000/api/estate/getall")

//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`)
//         }

//         const data = await response.json()
//         setProducts(data)
//         setError(null)
//       } catch (err) {
//         console.error("Error fetching products:", err)
//         setError("Failed to load products. Using fallback data.")
//         // Fallback data in case the API is not available
//         setProducts([
//           {
//             id: 1,
//             name: "Wireless Headphones",
//             description: "High-quality noise-canceling wireless headphones.",
//             price: "$99.99",
//             status: "In Stock",
//             rating: 4.5,
//             image: "/placeholder.svg?height=50&width=50",
//           },
//           {
//             id: 2,
//             name: "Smart Watch",
//             description: "Feature-rich smartwatch with health tracking.",
//             price: "$149.99",
//             status: "In Stock",
//             rating: 4.2,
//             image: "/placeholder.svg?height=50&width=50",
//           },
//         ])
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [])

//   // Initialize dark mode class on body
//   useEffect(() => {
//     document.body.classList.add("dark-mode")
//   }, [])

//   // Handle sidebar navigation
//   const handleSidebarNavigation = (item) => {
//     setActiveSidebarItem(item)
//     // On mobile, collapse sidebar after navigation
//     if (window.innerWidth <= 768) {
//       setSidebarCollapsed(true)
//     }
//   }

//   // Handle setting change
//   const handleSettingChange = (e) => {
//     const { name, value } = e.target
//     setUserSettings((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   // Handle sidebar position change
//   const handleSidebarPositionChange = (e) => {
//     setSidebarPosition(e.target.value)
//   }

//   // Handle save settings
//   const handleSaveSettings = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/users/update', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userSettings),
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update settings');
//       }

//       const data = await response.json();
//       alert('Settings updated successfully!');
//     } catch (error) {
//       console.error('Error updating settings:', error);
//       alert('Failed to update settings. Please try again.');
//     }
//   };

//   // Sample data
//   const metrics = [
//     {
//       title: "Total Products",
//       value: products.length || "0",
//       increase: "25%",
//       icon: <Package size={24} />,
//       color: "primary",
//     },
//     {
//       title: "Total Paid Orders",
//       value: "$16,000",
//       increase: "12%",
//       icon: <DollarSign size={24} />,
//       color: "info",
//     },
//     {
//       title: "Total Customers",
//       value: "15,400k",
//       increase: "15%",
//       icon: <Users size={24} />,
//       color: "success",
//     },
//     {
//       title: "Sales",
//       value: "12,340",
//       increase: "19%",
//       icon: <CreditCard size={24} />,
//       color: "warning",
//     },
//   ]

//   const recentSales = [
//     {
//       id: 1,
//       name: "Olivia Martin",
//       email: "olivia.martin@email.com",
//       amount: "$1500",
//     },
//     {
//       id: 2,
//       name: "James Smith",
//       email: "james.smith@email.com",
//       amount: "$2000",
//     },
//     {
//       id: 3,
//       name: "Sophia Brown",
//       email: "sophia.brown@email.com",
//       amount: "$4000",
//     },
//     {
//       id: 4,
//       name: "Noah Wilson",
//       email: "noah.wilson@email.com",
//       amount: "$3000",
//     },
//   ]

//   // Handle product edit
//   const handleEditProduct = (productId) => {
//     alert(`Editing product ${productId}`)
//   }

//   // Handle product delete
//   const handleDeleteProduct = (productId) => {
//     if (confirm(`Are you sure you want to delete product ${productId}?`)) {
//       // In a real app, you would make an API call to delete the product
//       // For now, we'll just filter it out from the state
//       setProducts(products.filter((product) => product.id !== productId))
//       alert(`Product ${productId} deleted`)
//     }
//   }

//   // Generate random chart data
//   const regenerateChartData = () => {
//     const newData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 5000) + 1000)
//     setChartData(newData)
//   }

//   // Sidebar navigation items
//   const sidebarItems = [
//     {
//       section: "Dashboard",
//       items: [
//         { id: "dashboard", name: "Dashboard", icon: <LayoutDashboard size={18} /> },
//         { id: "analytics", name: "Analytics", icon: <BarChart2 size={18} /> },
//         { id: "reports", name: "Reports", icon: <FileText size={18} /> },
//       ],
//     },
//     {
//       section: "Customers",
//       items: [
//         { id: "customers", name: "Customers", icon: <Users size={18} /> },
//         { id: "new-customer", name: "New customer", icon: <UserPlus size={18} /> },
//         { id: "verify", name: "Verify", icon: <UserCheck size={18} /> },
//       ],
//     },
//     {
//       section: "Products",
//       items: [
//         { id: "products", name: "Products", icon: <ShoppingBag size={18} /> },
//         { id: "new-product", name: "New product", icon: <PackagePlus size={18} /> },
//         { id: "inventory", name: "Inventory", icon: <Clipboard size={18} /> },
//       ],
//     },
//     {
//       section: "Settings",
//       items: [{ id: "settings", name: "Settings", icon: <Settings size={18} /> }],
//     },
//   ]

//   // Render content based on active sidebar item
//   const renderContent = () => {
//     switch (activeSidebarItem) {
//       case "dashboard":
//         return (
//           <>
//             <h1 className="dashboard-title">Dashboard</h1>

//             {/* Metrics Cards */}
//             <div className="metrics-row">
//               {metrics.map((metric, index) => (
//                 <div key={index} className="metric-card">
//                   <div className="metric-card-content">
//                     <div className="metric-icon" data-color={metric.color}>
//                       {metric.icon}
//                     </div>
//                     <div className="metric-details">
//                       <div className="metric-title">{metric.title}</div>
//                       <div className="metric-value">{metric.value}</div>
//                       <div className="metric-increase" data-color={metric.color}>
//                         <span>↑</span> {metric.increase}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Charts and Sales */}
//             <div className="charts-row">
//               <div className="chart-container">
//                 <div className="chart-card">
//                   <div className="chart-header">
//                     <h5>Overview</h5>
//                     <button className="btn-refresh" onClick={regenerateChartData}>
//                       Refresh Data
//                     </button>
//                   </div>
//                   <div className="chart-body">
//                     <div className="chart-placeholder">
//                       <div className="interactive-chart">
//                         {chartData.map((value, index) => (
//                           <div
//                             key={index}
//                             className="chart-bar"
//                             style={{
//                               height: `${(value / 5000) * 100}%`,
//                               width: `${100 / chartData.length - 2}%`,
//                             }}
//                             title={`${value}`}
//                           ></div>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="chart-labels">
//                       <span>Jan</span>
//                       <span>Feb</span>
//                       <span>Mar</span>
//                       <span>Apr</span>
//                       <span>May</span>
//                       <span>Jun</span>
//                       <span>Jul</span>
//                       <span>Aug</span>
//                       <span>Sep</span>
//                       <span>Oct</span>
//                       <span>Nov</span>
//                       <span>Dec</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="recent-sales-container">
//                 <div className="recent-sales-card">
//                   <div className="recent-sales-header">
//                     <h5>Recent Sales</h5>
//                   </div>
//                   <div className="recent-sales-body">
//                     <ul className="recent-sales-list">
//                       {recentSales.map((sale) => (
//                         <li key={sale.id} className="recent-sales-item">
//                           <div className="sale-user">
//                             <div className="sale-avatar">
//                               <img src="/placeholder.svg?height=40&width=40" alt={sale.name} />
//                             </div>
//                             <div className="sale-user-info">
//                               <div className="sale-user-name">{sale.name}</div>
//                               <div className="sale-user-email">{sale.email}</div>
//                             </div>
//                           </div>
//                           <div className="sale-amount">{sale.amount}</div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Products Table */}
//             <div className="products-table-container">
//               <div className="products-card">
//                 <div className="products-header">
//                   <h5>Top Products</h5>
//                   {error && <div className="error-badge">{error}</div>}
//                 </div>
//                 <div className="products-body">
//                   {loading ? (
//                     <div className="loading-container">
//                       <Loader className="loading-spinner" />
//                       <p>Loading products...</p>
//                     </div>
//                   ) : (
//                     <table className="products-table">
//                       <thead>
//                         <tr>
//                           <th>#</th>
//                           <th>Product</th>
//                           <th>Price</th>
//                           <th>Status</th>
//                           <th>Rating</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {products.length === 0 ? (
//                           <tr>
//                             <td colSpan="6" className="text-center">
//                               No products found
//                             </td>
//                           </tr>
//                         ) : (
//                           products.map((product) => (
//                             <tr key={product.id}>
//                               <td>{product.id}</td>
//                               <td>
//                                 <div className="product-info">
//                                   <div className="product-image">
//                                     <img
//                                       src={product.image_url || "/placeholder.svg?height=50&width=50"}
//                                       alt={product.name}
//                                     />
//                                   </div>
//                                   <div className="product-details">
//                                     <div className="product-name">{product.name}</div>
//                                     <div className="product-description">{product.description}</div>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td>{product.price}</td>
//                               <td>
//                                 <span className="status-badge">{product.status}</span>
//                               </td>
//                               <td>
//                                 <div className="rating">
//                                   <span className="star">★</span> {product.rating}
//                                 </div>
//                               </td>
//                               <td>
//                                 <div className="actions">
//                                   <button className="action-btn edit" onClick={() => handleEditProduct(product.id)}>
//                                     <Edit size={16} />
//                                   </button>
//                                   <button className="action-btn delete" onClick={() => handleDeleteProduct(product.id)}>
//                                     <Trash size={16} />
//                                   </button>
//                                 </div>
//                               </td>
//                             </tr>
//                           ))
//                         )}
//                       </tbody>
//                     </table>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )

//       case "analytics":
//         return (
//           <div className="section-content">
//             <h1 className="dashboard-title">Analytics</h1>
//             <div className="section-card">
//               <div className="section-header">
//                 <h5>Performance Metrics</h5>
//                 <div className="section-actions">
//                   <button className="btn-action">
//                     <Filter size={16} /> Filter
//                   </button>
//                   <button className="btn-action">
//                     <Download size={16} /> Export
//                   </button>
//                 </div>
//               </div>
//               <div className="section-body">
//                 <div className="analytics-grid">
//                   <div className="analytics-card">
//                     <div className="analytics-icon">
//                       <BarChart size={24} />
//                     </div>
//                     <div className="analytics-content">
//                       <h6>Revenue Growth</h6>
//                       <div className="analytics-value">+24.5%</div>
//                       <div className="analytics-description">Compared to last month</div>
//                     </div>
//                   </div>
//                   <div className="analytics-card">
//                     <div className="analytics-icon">
//                       <LineChart size={24} />
//                     </div>
//                     <div className="analytics-content">
//                       <h6>User Engagement</h6>
//                       <div className="analytics-value">+12.3%</div>
//                       <div className="analytics-description">Active users increased</div>
//                     </div>
//                   </div>
//                   <div className="analytics-card">
//                     <div className="analytics-icon">
//                       <PieChart size={24} />
//                     </div>
//                     <div className="analytics-content">
//                       <h6>Conversion Rate</h6>
//                       <div className="analytics-value">3.2%</div>
//                       <div className="analytics-description">From visits to purchases</div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="analytics-chart-placeholder">
//                   <div className="chart-message">Interactive analytics charts will appear here</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case "reports":
//         return (
//           <div className="section-content">
//             <h1 className="dashboard-title">Reports</h1>
//             <div className="section-card">
//               <div className="section-header">
//                 <h5>Available Reports</h5>
//                 <div className="section-actions">
//                   <button className="btn-action">
//                     <PlusCircle size={16} /> New Report
//                   </button>
//                 </div>
//               </div>
//               <div className="section-body">
//                 <div className="reports-list">
//                   <div className="report-item">
//                     <div className="report-icon">
//                       <FileText size={24} />
//                     </div>
//                     <div className="report-content">
//                       <h6>Monthly Sales Report</h6>
//                       <div className="report-description">Summary of sales performance for the current month</div>
//                     </div>
//                     <div className="report-actions">
//                       <button className="btn-sm">View</button>
//                       <button className="btn-sm">Download</button>
//                     </div>
//                   </div>
//                   <div className="report-item">
//                     <div className="report-icon">
//                       <FileText size={24} />
//                     </div>
//                     <div className="report-content">
//                       <h6>Customer Acquisition Report</h6>
//                       <div className="report-description">Analysis of new customer acquisition channels</div>
//                     </div>
//                     <div className="report-actions">
//                       <button className="btn-sm">View</button>
//                       <button className="btn-sm">Download</button>
//                     </div>
//                   </div>
//                   <div className="report-item">
//                     <div className="report-icon">
//                       <FileText size={24} />
//                     </div>
//                     <div className="report-content">
//                       <h6>Inventory Status Report</h6>
//                       <div className="report-description">Current inventory levels and restock recommendations</div>
//                     </div>
//                     <div className="report-actions">
//                       <button className="btn-sm">View</button>
//                       <button className="btn-sm">Download</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case "customers":
//         return (
//           <div className="section-content">
//             <h1 className="dashboard-title">Customers</h1>
//             <div className="section-card">
//               <div className="section-header">
//                 <h5>Customer List</h5>
//                 <div className="section-actions">
//                   <div className="search-mini">
//                     <Search size={16} />
//                     <input type="text" placeholder="Search customers..." />
//                   </div>
//                   <button className="btn-action">
//                     <PlusCircle size={16} /> Add Customer
//                   </button>
//                 </div>
//               </div>
//               <div className="section-body">
//                 <table className="data-table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Status</th>
//                       <th>Joined</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>
//                         <div className="user-info">
//                           <img src="/placeholder.svg?height=40&width=40" alt="User" />
//                           <span>John Doe</span>
//                         </div>
//                       </td>
//                       <td>john.doe@example.com</td>
//                       <td>
//                         <span className="status-badge">Active</span>
//                       </td>
//                       <td>Jan 15, 2023</td>
//                       <td>
//                         <div className="actions">
//                           <button className="action-btn edit">
//                             <Edit size={16} />
//                           </button>
//                           <button className="action-btn delete">
//                             <Trash size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <div className="user-info">
//                           <img src="/placeholder.svg?height=40&width=40" alt="User" />
//                           <span>Jane Smith</span>
//                         </div>
//                       </td>
//                       <td>jane.smith@example.com</td>
//                       <td>
//                         <span className="status-badge">Active</span>
//                       </td>
//                       <td>Feb 22, 2023</td>
//                       <td>
//                         <div className="actions">
//                           <button className="action-btn edit">
//                             <Edit size={16} />
//                           </button>
//                           <button className="action-btn delete">
//                             <Trash size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )

//       case "new-customer":
//         return (
//           <div className="section-content">
//             <h1 className="dashboard-title">Add New Customer</h1>
//             <div className="section-card">
//               <div className="section-header">
//                 <h5>Customer Information</h5>
//               </div>
//               <div className="section-body">
//                 <form className="form-grid">
//                   <div className="form-group">
//                     <label>First Name</label>
//                     <input type="text" placeholder="Enter first name" />
//                   </div>
//                   <div className="form-group">
//                     <label>Last Name</label>
//                     <input type="text" placeholder="Enter last name" />
//                   </div>
//                   <div className="form-group">
//                     <label>Email</label>
//                     <input type="email" placeholder="Enter email address" />
//                   </div>
//                   <div className="form-group">
//                     <label>Phone</label>
//                     <input type="tel" placeholder="Enter phone number" />
//                   </div>
//                   <div className="form-group full-width">
//                     <label>Address</label>
//                     <input type="text" placeholder="Enter address" />
//                   </div>
//                   <div className="form-group">
//                     <label>City</label>
//                     <input type="text" placeholder="Enter city" />
//                   </div>
//                   <div className="form-group">
//                     <label>Country</label>
//                     <select>
//                       <option value="">Select country</option>
//                       <option value="us">United States</option>
//                       <option value="ca">Canada</option>
//                       <option value="uk">United Kingdom</option>
//                     </select>
//                   </div>
//                   <div className="form-actions full-width">
//                     <button type="button" className="btn-cancel">
//                       Cancel
//                     </button>
//                     <button type="button" className="btn-submit">
//                       Add Customer
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )

//       case "verify":
//         return (
//           <div className="section-content">
//             <h1 className="dashboard-title">Verify Customers</h1>
//             <div className="section-card">
//               <div className="section-header">
//                 <h5>Pending Verification</h5>
//                 <div className="section-actions">
//                   <button className="btn-action">
//                     <UserCog size={16} /> Verification Settings
//                   </button>
//                 </div>
//               </div>
//               <div className="section-body">
//                 <div className="verification-list">
//                   <div className="verification-item">
//                     <div className="verification-user">
//                       <img src="/placeholder.svg?height=50&width=50" alt="User" />
//                       <div className="verification-user-info">
//                         <h6>Michael Johnson</h6>
//                         <div className="verification-user-email">michael.johnson@example.com</div>
//                       </div>
//                     </div>
//                     <div className="verification-documents">
//                       <div className="verification-document">
//                         <FileText size={16} />
//                         <span>ID Document</span>
//                       </div>
//                       <div className="verification-document">
//                         <FileText size={16} />
//                         <span>Proof of Address</span>
//                       </div>
//                     </div>
//                     <div className="verification-actions">
//                       <button className="btn-approve">Approve</button>
//                       <button className="btn-reject">Reject</button>
//                     </div>
//                   </div>
//                   <div className="verification-item">
//                     <div className="verification-user">
//                       <img src="/placeholder.svg?height=50&width=50" alt="User" />
//                       <div className="verification-user-info">
//                         <h6>Sarah Williams</h6>
//                         <div className="verification-user-email">sarah.williams@example.com</div>
//                       </div>
//                     </div>
//                     <div className="verification-documents">
//                       <div className="verification-document">
//                         <FileText size={16} />
//                         <span>ID Document</span>
//                       </div>
//                     </div>
//                     <div className="verification-actions">
//                       <button className="btn-approve">Approve</button>
//                       <button className="btn-reject">Reject</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       case "products":
//         return (
//           <div className="section-content">
//             <h1 className="dashboard-title">Products</h1>
//             <div className="section-card">
//               <div className="section-header">
//                 <h5>Product List</h5>
//                 <div className="section-actions">
//                   <div className="search-mini">
//                     <Search size={16} />
//                     <input type="text" placeholder="Search products..." />
//                   </div>
//                   <button className="btn-action">
//                     <PlusCircle size={16} /> Add Product
//                   </button>
//                 </div>
//               </div>
//               <div className="section-body">
//                 {loading ? (
//                   <div className="loading-container">
//                     <Loader className="loading-spinner" />
//                     <p>Loading products...</p>
//                   </div>
//                 ) : (
//                   <table className="data-table">
//                     <thead>
//                       <tr>
//                         <th>Product</th>
//                         <th>Price</th>
//                         <th>Status</th>
//                         <th>Category</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {products.map((product) => (
//                         <tr key={product.id}>
//                           <td>
//                             <div className="product-info">
//                               <div className="product-image">
//                                 <img src={product.image_url || "/placeholder.svg?height=50&width=50"} alt={product.name} />
//                               </div>
//                               <div className="product-details">
//                                 <div className="product-name">{product.name}</div>
//                                 <div className="product-description">{product.description}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td>{product.price}</td>
//                           <td>
//                             <span className="status-badge">{product.status}</span>
//                           </td>
//                           <td>Electronics</td>
//                           <td>
//                             <div className="actions">
//                               <button className="action-btn edit" onClick={() => handleEditProduct(product.id)}>
//                                 <Edit size={16} />
//                               </button>
//                               <button className="action-btn delete" onClick={() => handleDeleteProduct(product.id)}>
//                                 <Trash size={16} />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             </div>
//           </div>
//         )

//       case "new-product":
//         return (
//           <div className="section-content">
//             <h1 className="dashboard-title">Add New Product</h1>
//             <div className="section-card">
//               <div className="section-header">
//                 <h5>Product Information</h5>
//               </div>
//               <div className="section-body">
//                 <form className="form-grid">
//                   <div className="form-group full-width">
//                     <label>Product Name</label>
//                     <input type="text" placeholder="Enter product name" />
//                   </div>
//                   <div className="form-group full-width">
//                     <label>Description</label>
//                     <textarea placeholder="Enter product description" rows="3"></textarea>
//                   </div>
//                   <div className="form-group">
//                     <label>Price</label>
//                     <input type="text" placeholder="Enter price" />
//                   </div>
//                   <div className="form-group">
//                     <label>Category</label>
//                     <select>
//                       <option value="">Select category</option>
//                       <option value="electronics">Electronics</option>
//                       <option value="clothing">Clothing</option>
//                       <option value="home">Home & Kitchen</option>
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Status</label>
//                     <select>
//                       <option value="in-stock">In Stock</option>
//                       <option value="low-stock">Low Stock</option>
//                       <option value="out-of-stock">Out of Stock</option>
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Quantity</label>
//                     <input type="number" placeholder="Enter quantity" min="0" />
//                   </div>
//                   <div className="form-group full-width">
//                     <label>Product Image</label>
//                     <div className="file-upload">
//                       <button type="button" className="btn-upload">
//                         <Upload size={16} /> Upload Image
//                       </button>
//                       <span className="file-info">No file selected</span>
//                     </div>
//                   </div>
//                   <div className="form-actions full-width">
//                     <button type="button" className="btn-cancel">
//                       Cancel
//                     </button>
//                     <button type="button" className="btn-submit">
//                       Add Product
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )

//       case "inventory":
//         return (
//           <div className="section-content">
//             <h1 className="dashboard-title">Inventory Management</h1>
//             <div className="section-card">
//               <div className="section-header">
//                 <h5>Inventory Status</h5>
//                 <div className="section-actions">
//                   <button className="btn-action">
//                     <Download size={16} /> Export
//                   </button>
//                   <button className="btn-action">
//                     <Upload size={16} /> Import
//                   </button>
//                 </div>
//               </div>
//               <div className="section-body">
//                 <div className="inventory-summary">
//                   <div className="inventory-stat">
//                     <div className="inventory-stat-label">Total Products</div>
//                     <div className="inventory-stat-value">{products.length}</div>
//                   </div>
//                   <div className="inventory-stat">
//                     <div className="inventory-stat-label">In Stock</div>
//                     <div className="inventory-stat-value">{products.filter((p) => p.status === "In Stock").length}</div>
//                   </div>
//                   <div className="inventory-stat">
//                     <div className="inventory-stat-label">Low Stock</div>
//                     <div className="inventory-stat-value">
//                       {products.filter((p) => p.status === "Low Stock").length}
//                     </div>
//                   </div>
//                   <div className="inventory-stat">
//                     <div className="inventory-stat-label">Out of Stock</div>
//                     <div className="inventory-stat-value">
//                       {products.filter((p) => p.status === "Out of Stock").length}
//                     </div>
//                   </div>
//                 </div>
//                 <table className="data-table">
//                   <thead>
//                     <tr>
//                       <th>Product</th>
//                       <th>SKU</th>
//                       <th>Status</th>
//                       <th>Quantity</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {products.map((product, index) => (
//                       <tr key={product.id}>
//                         <td>
//                           <div className="product-info">
//                             <div className="product-image">
//                               <img src={product.image_url || "/placeholder.svg?height=50&width=50"} alt={product.name} />
//                             </div>
//                             <div className="product-name">{product.name}</div>
//                           </div>
//                         </td>
//                         <td>SKU-{1000 + index}</td>
//                         <td>
//                           <span className="status-badge">{product.status}</span>
//                         </td>
//                         <td>{Math.floor(Math.random() * 100) + 1}</td>
//                         <td>
//                           <button className="btn-sm">Update Stock</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )

//       case "settings":
//         return (
//           <div className="section-content">
//             <h1 className="dashboard-title">Settings</h1>
//             <div className="settings-grid">
//               <div className="section-card">
//                 <div className="section-header">
//                   <h5>Account Settings</h5>
//                 </div>
//                 <div className="section-body">
//                   <div className="settings-form">
//                     <div className="form-group">
//                       <label htmlFor="name">Name</label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={userSettings.name}
//                         onChange={handleSettingChange}
//                         placeholder="Enter your name"
//                         className="form-control"
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="email">Email</label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={userSettings.email}
//                         onChange={handleSettingChange}
//                         placeholder="Enter your email"
//                         className="form-control"
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="password">Password</label>
//                       <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={userSettings.password}
//                         onChange={handleSettingChange}
//                         placeholder="Enter new password"
//                         className="form-control"
//                       />
//                     </div>
//                     <div className="form-actions">
//                       <button 
//                         className="btn btn-primary"
//                         onClick={handleSaveSettings}
//                         type="button"
//                       >
//                         Save Changes
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="section-card">
//                 <div className="section-header">
//                   <h5>Appearance</h5>
//                 </div>
//                 <div className="section-body">
//                   <div className="settings-option">
//                     <div className="settings-option-label">Dark Mode</div>
//                     <div className="settings-option-control">
//                       <button className="toggle-btn" onClick={toggleDarkMode}>
//                         {darkMode ? "Enabled" : "Disabled"}
//                       </button>
//                     </div>
//                   </div>
//                   <div className="settings-option">
//                     <div className="settings-option-label">Sidebar Position</div>
//                     <div className="settings-option-control">
//                       <select
//                         value={sidebarPosition}
//                         onChange={handleSidebarPositionChange}
//                         className="form-select"
//                       >
//                         <option value="left">Left</option>
//                         <option value="right">Right</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="section-card">
//                 <div className="section-header">
//                   <h5>Notifications</h5>
//                 </div>
//                 <div className="section-body">
//                   <div className="settings-option">
//                     <div className="settings-option-label">Email Notifications</div>
//                     <div className="settings-option-control">
//                       <button className="toggle-btn">Enabled</button>
//                     </div>
//                   </div>
//                   <div className="settings-option">
//                     <div className="settings-option-label">Push Notifications</div>
//                     <div className="settings-option-control">
//                       <button className="toggle-btn">Enabled</button>
//                     </div>
//                   </div>
//                   <div className="settings-option">
//                     <div className="settings-option-label">Order Updates</div>
//                     <div className="settings-option-control">
//                       <button className="toggle-btn">Enabled</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       default:
//         return <div>Page not found</div>
//     }
//   }

//   return (
//     <div className={`dashboard-wrapper d-flex ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <div className="logo-container d-flex align-items-center">
//             <div className="logo me-2">
//               <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M10 30L30 10M10 10L30 30" stroke="white" strokeWidth="4" strokeLinecap="round" />
//                 <path d="M5 20H35" stroke="white" strokeWidth="4" strokeLinecap="round" />
//               </svg>
//             </div>
//             <h5 className="mb-0 text-white">Logoipsum</h5>
//           </div>
//         </div>

//         <div className="sidebar-content">
//           {sidebarItems.map((section) => (
//             <div className="sidebar-section" key={section.section}>
//               <div className="sidebar-section-header">{section.section}</div>
//               <ul className="sidebar-nav">
//                 {section.items.map((item) => (
//                   <li className={`sidebar-nav-item ${activeSidebarItem === item.id ? "active" : ""}`} key={item.id}>
//                     <a
//                       href="#"
//                       className="sidebar-nav-link"
//                       onClick={(e) => {
//                         e.preventDefault()
//                         handleSidebarNavigation(item.id)
//                       }}
//                     >
//                       {item.icon}
//                       <span>{item.name}</span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Top Navigation */}
//         <div className="top-nav">
//           <div className="container-fluid">
//             <div className="d-flex align-items-center">
//               <button className="btn-icon" onClick={toggleSidebar}>
//                 {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//               </button>

//               <div className="search-container">
//                 <div className="search-icon">
//                   <Search size={18} />
//                 </div>
//                 <input type="text" className="search-input" placeholder="Search..." />
//               </div>

//               <div className="top-nav-actions">
//                 <button className="btn-icon" onClick={toggleDarkMode}>
//                   {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Dashboard Content */}
//         <div className="dashboard-content">{renderContent()}</div>
//       </div>
//     </div>
//   )
// }
