import React from 'react'
import { Link } from "react-router-dom";
import '../pages/Home.css'
import { Gift, ShoppingCart, Package, Soup } from "lucide-react";

const Home = () => {
  return (
    <div className="container">
      <section class="ads">Mini Ads</section>
      <h1 className="heading">What services would you like to access</h1>
      <div className="services-grid">
        {/* Service Cards */}
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
          <p className="promo-text">
            Earn residual income as people eat all over Nigeria
          </p>
        </div>
        <Link to="/Signup"><button className="register-button">Register</button></Link>
      </div>

      <div className="profile-card">
        <h2>Profile & Notifications</h2>
        <div className="profile-details">
          <div className="profile-left">
            <p>Rank: <strong>[Mastermind]</strong></p>
            <p>Connection Code: <strong>[XY6NM82W]</strong></p>
            <a href="https://sirbond.page.link/XY6NM82W">https://sirbond.page.link/XY6NM82W</a>
            <p>Level 1 connections: <strong>[250]</strong></p>
            <p>Level 2 connections: <strong>[115]</strong></p>
            <p>Level 3 connections: <strong>[100]</strong></p>
          </div>
          <div className="profile-right">
            <p>Total Residual Earnings: <strong>[4,000,000]</strong></p>
            <p>Breakdown of Earnings</p>
            <p>Available Balance: <strong>[12,000,000]</strong></p>
            <button className="withdraw-button">Withdraw</button>
          </div>
        </div>
      </div>

      <div className="activity-card">
        <h2>Activity</h2>
        <ul>
          <li>Connect 100 masterminds to become a CEO.</li>
          <li>Order meals at least 3 times this week to activate your Bond Force Membership.</li>
          <li>Enter your bank account in your wallet to encash your earnings.</li>
        </ul>
      </div>
    
    </div>
  )
}

export default Home