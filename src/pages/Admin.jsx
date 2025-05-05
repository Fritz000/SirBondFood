import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  ShoppingBag,
  BarChart2,
  Wallet,
  Users,
  DollarSign,
  Megaphone,
  MessageSquare,
  UserPlus
} from "lucide-react";
import "./Admin.css";
import Button from "../Components/ui/Button";

const Admin = () => {
  const navigate = useNavigate();
  const [activeDropdowns, setActiveDropdowns] = useState({
    marketRuns: false,
    promotions: false,
  });

  const toggleDropdown = (dropdown) => {
    setActiveDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleLogout = () => {
    navigate("/admin/login");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <button onClick={() => navigateTo("/Dashboard")} className="sidebar-link">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo("/adminorders")} className="sidebar-link">
                <ShoppingBag size={18} />
                <span>Orders</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => toggleDropdown("marketRuns")}
                className={`sidebar-link dropdown-trigger ${activeDropdowns.marketRuns ? "active" : ""}`}
              >
                <BarChart2 size={18} />
                <span>Market Runs Categories</span>
                <ChevronDown size={16} className={`dropdown-icon ${activeDropdowns.marketRuns ? "rotate" : ""}`} />
              </button>
              {activeDropdowns.marketRuns && (
                <ul className="dropdown-menu1">
                  <li><button onClick={() => navigateTo("/admin/market-runs/category1")}>Category 1</button></li>
                  <li><button onClick={() => navigateTo("/admin/market-runs/category2")}>Category 2</button></li>
                  <li><button onClick={() => navigateTo("/admin/market-runs/category3")}>Category 3</button></li>
                  <li><button onClick={() => navigateTo("/admin/market-runs/category4")}>Category 4</button></li>
                  <li><button onClick={() => navigateTo("/admin/market-runs/category5")}>Category 5</button></li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => navigateTo("/admin/wallets")} className="sidebar-link">
                <Wallet size={18} />
                <span>Wallets</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo("/admin/customers")} className="sidebar-link">
                <Users size={18} />
                <span>Customers/Users</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo("/admin/earnings")} className="sidebar-link">
                <DollarSign size={18} />
                <span>Earnings/Payouts</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => toggleDropdown("promotions")}
                className={`sidebar-link dropdown-trigger ${activeDropdowns.promotions ? "active" : ""}`}
              >
                <Megaphone size={18} />
                <span>Promotions</span>
                <ChevronDown size={16} className={`dropdown-icon ${activeDropdowns.promotions ? "rotate" : ""}`} />
              </button>
              {activeDropdowns.promotions && (
                <ul className="dropdown-menu">
                  <li><button onClick={() => navigateTo("/admin/promotions/flash-sales")}>Flash Sales</button></li>
                  <li><button onClick={() => navigateTo("/admin/promotions/banners")}>Banners/Slides</button></li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={() => navigateTo("/admin/messages")} className="sidebar-link">
                <MessageSquare size={18} />
                <span>Messages/Notifications</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo("/StaffManagement")} className="sidebar-link">
                <UserPlus size={18} />
                <span>Staff/Admin Management</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <Button onClick={handleLogout} variant="outline" className="logout-button">
            Logout
          </Button>
        </div>
      </aside>
      <main className="admin-content">
        <div className="admin-topbar">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span>Admin User</span>
          </div>
        </div>
        <div className="admin-main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Admin;