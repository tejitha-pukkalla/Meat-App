import React, { useState } from 'react';
import ProductsDashboard from './Dashboard'; 
import '../App.css';

const Icons = {
  Dashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  ),
  Products: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  ),
  Orders: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  Analytics: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="20" x2="12" y2="10"></line>
      <line x1="18" y1="20" x2="18" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M12 1v6m0 6v6m-9-9h6m6 0h6m-1.22-6.36l-4.24 4.24m0 6l4.24 4.24M4.22 4.22l4.24 4.24m6 0l4.24-4.24"></path>
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  Logout: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  )
};

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [productsExpanded, setProductsExpanded] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
    { 
      id: 'products', 
      label: 'Products', 
      icon: Icons.Products,
      subItems: [
        { id: 'products-list', label: 'Product List' },
      ]
    },
    { id: 'orders', label: 'Orders', icon: Icons.Orders },
    { id: 'users', label: 'Users', icon: Icons.Users },
    { id: 'analytics', label: 'Analytics', icon: Icons.Analytics },
    { id: 'settings', label: 'Settings', icon: Icons.Settings }
  ];

  const toggleProducts = () => {
    setProductsExpanded(!productsExpanded);
  };

  const renderContent = () => {
    switch(activeMenu) {
      case 'products-list':
        return <ProductsDashboard />;
case 'dashboard':
        return (
          <div className="dashboardContent">
            <h1 className="pageTitle">Dashboard Overview</h1>
            <div className="statsGrid">
              <div className="statCard">
                <div className="statIcon" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                  <Icons.Products />
                </div>
                <div className="statInfo">
                  <p className="statLabel">Total Products</p>
                  <h2 className="statValue">156</h2>
                  <p className="statChange positive">+12% from last month</p>
                </div>
              </div>
              <div className="statCard">
                <div className="statIcon" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
                  <Icons.Orders />
                </div>
                <div className="statInfo">
                  <p className="statLabel">Total Orders</p>
                  <h2 className="statValue">1,234</h2>
                  <p className="statChange positive">+8% from last month</p>
                </div>
              </div>
              <div className="statCard">
                <div className="statIcon" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
                  <Icons.Users />
                </div>
                <div className="statInfo">
                  <p className="statLabel">Total Users</p>
                  <h2 className="statValue">892</h2>
                  <p className="statChange positive">+15% from last month</p>
                </div>
              </div>
              <div className="statCard">
                <div className="statIcon" style={{background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
                  <Icons.Analytics />
                </div>
                <div className="statInfo">
                  <p className="statLabel">Revenue</p>
                  <h2 className="statValue">R 45,678</h2>
                  <p className="statChange positive">+23% from last month</p>
                </div>
              </div>
            </div>
            <div className="recentActivity">
              <h2 className="sectionTitle">Recent Activity</h2>
              <div className="activityList">
                <div className="activityItem">
                  <div className="activityIcon"><Icons.Orders /></div>
                  <div className="activityDetails">
                    <p className="activityText">New order #1234 received</p>
                    <p className="activityTime">2 minutes ago</p>
                  </div>
                </div>
                <div className="activityItem">
                  <div className="activityIcon"><Icons.Products /></div>
                  <div className="activityDetails">
                    <p className="activityText">Product "MUTTON Breast" updated</p>
                    <p className="activityTime">15 minutes ago</p>
                  </div>
                </div>
                <div className="activityItem">
                  <div className="activityIcon"><Icons.Users /></div>
                  <div className="activityDetails">
                    <p className="activityText">New user registered</p>
                    <p className="activityTime">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="dashboardContent">
            <h1 className="pageTitle">Orders Management</h1>
            <p className="pageDescription">Manage all your orders here</p>
          </div>
        );
      case 'users':
        return (
          <div className="dashboardContent">
            <h1 className="pageTitle">Users Management</h1>
            <p className="pageDescription">Manage all users here</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="dashboardContent">
            <h1 className="pageTitle">Analytics</h1>
            <p className="pageDescription">View detailed analytics and reports</p>
          </div>
        );
      case 'settings':
        return (
          <div className="dashboardContent">
            <h1 className="pageTitle">Settings</h1>
            <p className="pageDescription">Configure your application settings</p>
          </div>
        );
      default:
        return (
          <div className="dashboardContent">
            <h1 className="pageTitle">Coming Soon</h1>
            <p className="pageDescription">This feature is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="adminContainer">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebarHeader">
          <div className="logoContainer">
            <div className="logo">MM</div>
            {sidebarOpen && <h2 className="brandName">Meat Mart</h2>}
          </div>
        </div>

        <nav className="sidebarNav">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.subItems ? (
                <>
                  <div 
                    className={`navItem ${productsExpanded ? 'expanded' : ''}`}
                    onClick={toggleProducts}
                  >
                    <div className="navItemContent">
                      <item.icon />
                      {sidebarOpen && <span>{item.label}</span>}
                    </div>
                    {sidebarOpen && (
                      <div className={`chevron ${productsExpanded ? 'rotated' : ''}`}>
                        <Icons.ChevronDown />
                      </div>
                    )}
                  </div>
                  {sidebarOpen && productsExpanded && (
                    <div className="subMenu">
                      {item.subItems.map((subItem) => (
                        <div
                          key={subItem.id}
                          className={`subMenuItem ${activeMenu === subItem.id ? 'active' : ''}`}
                          onClick={() => setActiveMenu(subItem.id)}
                        >
                          {subItem.label}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div
                  className={`navItem ${activeMenu === item.id ? 'active' : ''}`}
                  onClick={() => setActiveMenu(item.id)}
                >
                  <div className="navItemContent">
                    <item.icon />
                    {sidebarOpen && <span>{item.label}</span>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebarFooter">
          <div className="navItem logout">
            <div className="navItemContent">
              <Icons.Logout />
              {sidebarOpen && <span>Logout</span>}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="mainContainer">
        {/* Top Bar */}
        <header className="topBar">
          <button 
            className="menuToggle" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Icons.Menu />
          </button>
          <div className="topBarRight">
            <div className="userProfile">
              <div className="userAvatar">A</div>
              <span className="userName">Admin User</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="contentArea">
          {renderContent()}
        </main>
      </div>``
    </div>
  );
};

export default AdminDashboard;
