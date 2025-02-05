import React, { useState, useEffect } from "react";
import "../pages/Home.css";
import { Gift, ShoppingCart, Package, Soup } from "lucide-react";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="container">
      <section className="ads">Mini Ads</section>
      <h1 className="heading">What services would you like to access</h1>
      <div className="services-grid">
        <div className="card card-green">
          <Soup size={80} className="icon icon-green" />
          <p className="card-title">Order meals</p>
        </div>
        <div className="card card-yellow">
          <ShoppingCart size={80} className="icon icon-yellow" />
          <p className="card-title">Market runs</p>
        </div>
        <div className="card card-teal">
          <Package size={80} className="icon icon-teal" />
          <p className="card-title">Bulk foodstuffs order</p>
        </div>
        <div className="card card-pink">
          <Package size={80} className="icon icon-pink" />
          <p className="card-title">Diaspora orders</p>
        </div>
      </div>

      {/* Promo Section */}
      <div className="promo">
        <div className="promo-content">
          <Gift size={40} className="icon icon-red" />
          <p className="promo-text">Earn residual income as people eat all over Nigeria</p>
        </div>
        {/* Change 'Register' to User's First Name */}
        <button className="register-button">
          {user ? user.firstName : "Register"}
        </button>
      </div>

      <div className="profile-card">
        <h2>Profile & Notifications</h2>
        <div className="profile-details">
          <div className="profile-left">
            <p>Rank: <strong>[Mastermind]</strong></p>
            <p>Connection Code: <strong>[XY6NM82W]</strong></p>
            <p>Level 1 connections: <strong>[250]</strong></p>
          </div>
          <div className="profile-right">
            <p>Total Residual Earnings: <strong>[4,000,000]</strong></p>
            <button className="withdraw-button">Withdraw</button>
          </div>
        </div>
      </div>

      <div className="activity-card">
        <h2>Activity</h2>
        <ul>
          <li>Connect 100 masterminds to become a CEO.</li>
          <li>Order meals at least 3 times this week to activate your Bond Force Membership.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;