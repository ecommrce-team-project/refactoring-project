"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  BarChart2,
  FileText,
  Users,
  ShoppingBag,
  Settings,
  Bell,
  Menu,
  X
} from "lucide-react"

export default function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { path: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { path: "/dashboard/products", icon: <ShoppingBag size={20} />, label: "Products" },
    { path: "/dashboard/customers", icon: <Users size={20} />, label: "Customers" },
    { path: "/dashboard/orders", icon: <FileText size={20} />, label: "Orders" },
    { path: "/dashboard/settings", icon: <Settings size={20} />, label: "Settings" },
  ]

  return (
    <div className={`dashboard-wrapper ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <h2>EstatePro</h2>
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`sidebar-nav-item ${pathname === item.path ? "active" : ""}`}
            >
              {item.icon}
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <nav className="navbar">
          <div className="navbar-left">
            <button 
              className="navbar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu size={20} />
            </button>
          </div>
          <div className="navbar-right">
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            <div className="user-profile">
              <img src="/avatar.jpg" alt="User" className="user-avatar" />
              <div className="user-info">
                <span className="user-name">Admin</span>
                <span className="user-role">Administrator</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        {children}
      </div>
    </div>
  )
} 