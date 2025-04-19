"use client"

import { useState, useEffect } from "react"
import styles from './dashboard.module.css';
import {
  LayoutDashboard,
  BarChart2,
  FileText,
  Users,
  ShoppingBag,
  UserPlus,
  UserCheck,
  PackagePlus,
  Clipboard,
  Settings,
  Search,
  ChevronLeft,
  ChevronRight,
  Bell,
  Moon,
  Sun,
  Package,
  DollarSign,
  CreditCard,
  Edit,
  Trash,
  Loader,
  PlusCircle,
  Filter,
  Download,
  Upload,
  UserCog,
  BarChart,
  PieChart,
  LineChart,
  X,
  ChevronDown,
} from "lucide-react"
import EstateManagement from "./components/EstateManagement"
import Analitics from "./analytics/Analytics.jsx"
import Customers from "./customers/Customer.jsx"
import Products from "./products/Products"
import Verification from "./verify/Verify.jsx"
import Inventory from "./products/inventory/page"


export default function Dashboard() {
  // State for sidebar collapse
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  // State for dark mode
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })
  // State for notifications
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  // State for chart data
  const [chartData, setChartData] = useState([1500, 2500, 1800, 3000, 2000, 4500, 3800, 4800, 3500, 5000, 4200, 4800])
  // State for estates data
  const [estates, setEstates] = useState([])
  // State for loading
  const [loading, setLoading] = useState(true)
  // State for error
  const [error, setError] = useState(null)
  // State for active sidebar item
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard")
  // State for products data
  const [products, setProducts] = useState([])
  // State for user settings
  const [userSettings, setUserSettings] = useState({
    name: "Admin User",
    email: "admin@example.com",
    password: "",
  })
  // State for sidebar position
  const [sidebarPosition, setSidebarPosition] = useState("left")
  const [isUpdateStockModalOpen, setIsUpdateStockModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [stockQuantity, setStockQuantity] = useState("")
  // Add state for customers
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "Active",
      joined: "Jan 15, 2023",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "Active",
      joined: "Feb 22, 2023",
    },
  ])
  // Add state for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    orderUpdates: true
  });
  // Add state for pending verifications
  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: 1,
      name: "Amine",
      email: "amine@gmail.com",
      status: "pending",
      documents: ["ID Document", "Proof of Address"]
    },
    {
      id: 2,
      name: "yazid ",
      email: "yazid@gmail.com",
      status: "pending",
      documents: ["ID Document"]
    }
  ]);
  // Add state for new customer form
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    status: 'Active',
    joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  });

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Theme toggle function with proper initialization
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Save to localStorage
    try {
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }

    // Update DOM
    document.documentElement.classList.toggle('dark-mode', newDarkMode);
    document.documentElement.style.colorScheme = newDarkMode ? 'dark' : 'light';
  };

  // Notifications toggle with animation
  const toggleNotifications = () => {
    setNotificationsOpen(prev => !prev);
  };

  // Update fetchEstates function
  const fetchEstates = async () => {
    try {
      setLoading(true);
      console.log('Fetching estates...');
      
      const response = await fetch('http://localhost:3001/api/estates/getall');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      console.log('Raw response:', text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('JSON parse error:', e);
        throw new Error('Invalid JSON response from server');
      }
      
      console.log('Estates fetched successfully:', data);
      setEstates(data);
      setError(null);
      
    } catch (error) {
      console.error('Failed to fetch estates:', error);
      setError(error.message);
      setEstates([]);
    } finally {
      setLoading(false);
    }
  };

  // Update fetchProducts function
  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Fetching products...');
      
      const response = await fetch('http://localhost:3001/api/estates/getall');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      console.log('Raw response:', text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('JSON parse error:', e);
        throw new Error('Invalid JSON response from server');
      }
      
      console.log('Products fetched successfully:', data);
      setProducts(data);
      setError(null);
      
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError(error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Add useEffect for initial theme setup
  useEffect(() => {
    // Get saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = savedTheme ? JSON.parse(savedTheme) : prefersDark;

    // Set initial theme
    setDarkMode(initialDarkMode);
    document.documentElement.classList.toggle('dark-mode', initialDarkMode);
    document.documentElement.style.colorScheme = initialDarkMode ? 'dark' : 'light';

    // Cleanup notifications when component unmounts
    return () => {
      setNotificationsOpen(false);
    };
  }, []);

  // Update the useEffect hooks
  useEffect(() => {
    fetchEstates();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Initialize dark mode on component mount
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Handle sidebar navigation
  const handleSidebarNavigation = (item) => {
    setActiveSidebarItem(item)
    // On mobile, collapse sidebar after navigation
    if (window.innerWidth <= 768) {
      setSidebarCollapsed(true)
    }
  }

  // Handle setting change
  const handleSettingChange = (e) => {
    const { name, value } = e.target
    setUserSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle sidebar position change
  const handleSidebarPositionChange = (e) => {
    setSidebarPosition(e.target.value)
  }

  // Handle save settings
  const handleSaveSettings = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userSettings),
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings. Please try again.');
    }
  };

  // Update metrics to use estates data
  const metrics = [
    {
      title: "Total Properties",
      value: estates.length || "0",
      increase: "25%",
      icon: <Package size={24} />,
      color: "primary",
    },
    {
      title: "Total Revenue",
      value: `$${estates.reduce((sum, estate) => sum + (parseFloat(estate.price) || 0), 0).toLocaleString()}`,
      increase: "12%",
      icon: <DollarSign size={24} />,
      color: "info",
    },
    {
      title: "Total Customers",
      value: "15,400k",
      increase: "15%",
      icon: <Users size={24} />,
      color: "success",
    },
    {
      title: "Sales",
      value: "12,340",
      increase: "19%",
      icon: <CreditCard size={24} />,
      color: "warning",
    },
  ]

  const recentSales = [
    {
      id: 1,
      name: "Amine Rahali",
      email: "amine.rahali@gmail.com",
      amount: "$1500",
    },
    {
      id: 2,
      name: "Mouin ben Ali",
      email: "mouin.benali@gmail.com",
      amount: "$2000",
    },
    {
      id: 3,
      name: "yazid ",
      email: "yazid@gmail.com",
      amount: "$4000",
    },
    {
      id: 4,
      name: "majid",
      email: "majid@gmail.com",
      amount: "$3000",
    },
  ]

  // Handle add product
  const handleAddProduct = () => {
    setActiveSidebarItem("new-product");
  };

  // Handle product edit
  const handleEditProduct = (productId) => {
    alert(`Editing product ${productId}`)
  }

  // Handle product delete
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/estates/remov/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        setProducts(products.filter(product => product.id !== productId));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error('Error deleting product:', error);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  // Generate random chart data
  const regenerateChartData = () => {
    const newData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 5000) + 1000)
    setChartData(newData)
  }

  // Sidebar navigation items
  const sidebarItems = [
    {
      section: "Main",
      items: [
        { id: "dashboard", name: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { id: "analytics", name: "Analytics", icon: <BarChart2 size={18} /> },
      ],
    },
    {
      section: "Management",
      items: [
        { id: "products", name: "Products", icon: <ShoppingBag size={18} /> },
        { id: "customers", name: "Customers", icon: <Users size={18} /> },
        { id: "verify", name: "Verify", icon: <UserCheck size={18} /> },
        { id: "new-product", name: "New product", icon: <PackagePlus size={18} /> },
        { id: "inventory", name: "Inventory", icon: <Clipboard size={18} /> },
      ],
    }
  ];

  // Add handleUpdateStock function
  const handleUpdateStock = (product) => {
    setSelectedProduct(product)
    setStockQuantity(product.quantity || "")
    setIsUpdateStockModalOpen(true)
  }

  // Add handleStockSubmit function
  const handleStockSubmit = async (e) => {
    e.preventDefault()
    try {
      // Here you would typically make an API call to update the stock
      console.log('Updating stock for product:', selectedProduct.id, 'New quantity:', stockQuantity)
      
      // For now, we'll just update the local state
      setProducts(products.map(p => 
        p.id === selectedProduct.id 
          ? { ...p, quantity: parseInt(stockQuantity) } 
          : p
      ))
      
      setIsUpdateStockModalOpen(false)
      setSelectedProduct(null)
      setStockQuantity("")
    } catch (error) {
      console.error('Error updating stock:', error)
    }
  }

  // Handle customer delete
  const handleDeleteCustomer = (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter(customer => customer.id !== customerId));
      alert("Customer deleted successfully!");
    }
  };

  // Add handleUpdateCustomer function
  const handleUpdateCustomer = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      const newStatus = customer.status === "Active" ? "Inactive" : "Active";
      setCustomers(customers.map(c => 
        c.id === customerId ? { ...c, status: newStatus } : c
      ));
      alert(`Customer status updated to ${newStatus}`);
    }
  };

  // Add function to toggle notification settings
  const toggleNotificationSetting = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Add handleApprove function
  const handleApprove = (userId) => {
    setPendingVerifications(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: "approved" }
          : user
      )
    );
    alert("User approved successfully!");
  };

  // Add handleReject function
  const handleReject = (userId) => {
    if (window.confirm("Are you sure you want to reject this user?")) {
      setPendingVerifications(prev => 
        prev.map(user => 
          user.id === userId 
            ? { ...user, status: "rejected" }
            : user
        )
      );
      alert("User rejected successfully!");
    }
  };

  // Add handleNewCustomer function
  const handleNewCustomer = async (e) => {
    e.preventDefault();
    try {
      // In a real app, make an API call to add the customer
      const newCustomerId = customers.length + 1;
      const customerToAdd = {
        ...newCustomer,
        id: newCustomerId
      };

      setCustomers([...customers, customerToAdd]);
      
      // Reset form
      setNewCustomer({
        name: '',
        email: '',
        status: 'Active',
        joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      });

      // Show success message
      alert("New customer added successfully!");
      
      // Navigate back to customers list
      setActiveSidebarItem("customers");
    } catch (error) {
      console.error('Error adding customer:', error);
      alert("Failed to add customer. Please try again.");
    }
  };

  // Add handleNewCustomerChange function
  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Render content based on active sidebar item
  const renderContent = () => {
    switch (activeSidebarItem) {
      case "dashboard":
        return (
          <>
            <h1 className="dashboard-title">Dashboard</h1>

            {/* Metrics Cards */}
            <div className="metrics-row">
              {metrics.map((metric, index) => (
                <div key={index} className="metric-card">
                  <div className="metric-card-content">
                    <div className="metric-icon" data-color={metric.color}>
                      {metric.icon}
                    </div>
                    <div className="metric-details">
                      <div className="metric-title">{metric.title}</div>
                      <div className="metric-value">{metric.value}</div>
                      <div className="metric-increase" data-color={metric.color}>
                        <span>↑</span> {metric.increase}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts and Recent Sales */}
            <div className="charts-row">
              <div className="chart-container">
                <div className="chart-card">
                  <div className="chart-header">
                  <button className="btn-refresh" onClick={regenerateChartData}>
                      OverView
                    </button>
                    <button className="btn-refresh" onClick={regenerateChartData}>
                      Refresh Data
                    </button>
                  </div>
                  <div className="chart-body">
                    <div className="chart-placeholder">
                      <div className="interactive-chart">
                        {chartData.map((value, index) => (
                          <div
                            key={index}
                            className="chart-bar"
                            style={{
                              height: `${(value / 5000) * 100}%`,
                              width: `${100 / chartData.length - 2}%`
                            }}
                            title={`${value}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="recent-sales-container">
                <div className="recent-sales-card">
                  <div className="recent-sales-header">
                  <button className="btn-refresh" onClick={(e)=>
                    handleSidebarNavigation("customers")
                  }>
                  Recent Sales
                    </button>
                  </div>
                  <div className="recent-sales-body">
                    <ul className="recent-sales-list">
                      {recentSales.map((sale) => (
                        <li key={sale.id} className="recent-sales-item">
                          <div className="sale-user">
                            <div className="sale-user-info">
                              <div className="sale-user-name">{sale.name}</div>
                              <div className="sale-user-email">{sale.email}</div>
                            </div>
                          </div>
                          <div className="sale-amount">{sale.amount}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "analytics":
        return <Analitics />;

      case "customers":
        return <Customers />;



      case "verify":
        return <Verification 
          pendingVerifications={pendingVerifications}
          handleApprove={handleApprove}
          handleReject={handleReject}
        />;

      case "products":
        return <Products 
          products={products}
          loading={loading}
          error={error}
          handleAddProduct={handleAddProduct}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />;

      case "new-product":
        return <EstateManagement />;

      case "inventory":
        return <Inventory />;

      default:
        return <div>Page not found</div>;
    }
  }

  return (
    <div className={`dashboard-wrapper d-flex ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container d-flex align-items-center">
            <div className="logo me-2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="#4F46E5"/>
                <path d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20C28 24.4183 24.4183 28 20 28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M20 28C17.7909 28 16 26.2091 16 24C16 21.7909 17.7909 20 20 20C22.2091 20 24 21.7909 24 24C24 26.2091 22.2091 28 20 28Z" fill="white"/>
                <path d="M20 12V8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M28 20H32" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M20 32V28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M8 20H12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <h5 className="mb-0 text-white">EstatePro</h5>
          </div>
        </div>

        <div className="sidebar-content">
          {sidebarItems.map((section) => (
            <div className="sidebar-section" key={section.section}>
              <div className="sidebar-section-header">{section.section}</div>
              <ul className="sidebar-nav">
                {section.items.map((item) => (
                  <li className={`sidebar-nav-item ${activeSidebarItem === item.id ? "active" : ""}`} key={item.id}>
                    <a
                      href="#"
                      className="sidebar-nav-link"
                      onClick={(e) => {
                        e.preventDefault()
                        handleSidebarNavigation(item.id)
                      }}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <nav className="navbar">
          <div className="navbar-left">
            <button className="navbar-toggle" onClick={toggleSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              </button>
                </div>
          <div className="navbar-right">
            <div className="navbar-actions">
              <button className="navbar-action-btn notification-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span className="notification-badge">3</span>
                </button>
              </div>
            <div className="navbar-user">
              <img src="/images/avatar.jpg" alt="User" className="user-avatar" />
              <div className="user-info">
                <span className="user-name">Admin</span>
               
            </div>
          </div>
        </div>
        </nav>

        {/* Dashboard Content */}
        <div className="dashboard-content">{renderContent()}</div>
      </div>

      {/* Update Stock Modal */}
      {isUpdateStockModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Update Stock</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setIsUpdateStockModalOpen(false)
                  setSelectedProduct(null)
                  setStockQuantity("")
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleStockSubmit}>
                <div className="form-group">
                  <label>Product</label>
                  <input 
                    type="text" 
                    value={selectedProduct?.name || ""} 
                    disabled 
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Current Stock</label>
                  <input 
                    type="text" 
                    value={selectedProduct?.quantity || 0} 
                    disabled 
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>New Stock Quantity</label>
                  <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="form-control"
                    min="0"
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="btn-cancel"
                    onClick={() => {
                      setIsUpdateStockModalOpen(false)
                      setSelectedProduct(null)
                      setStockQuantity("")
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Update Stock
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
