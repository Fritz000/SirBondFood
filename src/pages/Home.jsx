import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import '../pages/Home.css';
import { BsBag } from "react-icons/bs";
import emojionepotoffood from "../assets/emojionepotoffood.png";
import fluentemojiflatpackage from "../assets/fluentemojiflatpackage.png";
import notoshoppingbags from "../assets/notoshoppingbags.png";
import twemojishoppingcart from "../assets/twemojishoppingcart.png";
import notowrappedgift from "../assets/notowrappedgift.png";

import { Gift, ShoppingCart, Package, Soup, Copy } from "lucide-react";
import MarketRuns from './MarketRuns';

const Home = ({ user }) => {
  const location = useLocation();
  const referralCode = user?.referralCode || "XY6NM82W"; 
  const referralLink = `https://sirbond.page.link/${referralCode}`;

  // Function to copy referral link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  // Capture referral code from URL if present
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const refCode = queryParams.get('ref');

    if (refCode) {
      console.log(`Referred by: ${refCode}`);
      // Here you can store refCode in state or send to backend
    }
  }, [location]);

  return (
    <div className="container">
      <section className="ads">Mini Ads</section>
      <h1 className="heading">What services would you like to access</h1>

      <div className="services-grid">
      <div className="card card-green">
        <img src={emojionepotoffood} alt="Order meals" className="icon icon-green" />
        <p className="card-title">Order meals</p>
      </div>

      <div className="card card-yellow">
        <Link to="/MarketRuns"><img src={twemojishoppingcart} alt="Market runs" className="icon icon-yellow" />
        <p className="card-title">Market runs</p></Link>
      </div>

      <div className="card card-teal">
        <img src={notoshoppingbags} alt="Bulk foodstuffs order" className="icon icon-teal" />
        <p className="card-title">Bulk foodstuffs order</p>
      </div>

      <div className="card card-pink">
        <img src={fluentemojiflatpackage} alt="Diaspora orders" className="icon icon-pink" />
        <p className="card-title">Diaspora orders</p>
      </div>

      </div>

      {/* Promo Section */}
      <div className="promo">
        <div className="promo-content">
          <img src={notowrappedgift} className="icon icon-red" alt="" />
          <p className="promo-text">
            Earn residual income as people eat all over Nigeria
          </p>
        </div>
        <Link to="/Signup">
          <button className="register-button">Register</button>
        </Link>
      </div>

      {/* Profile Section */}
      <div className="profile-card">
        <h2 className='pandn'>Profile & Notifications</h2>
        <div className="profile-details">
          <div className="profile-left">
            <p>Rank: <strong>Mastermind</strong></p>
            <p>Connection Code: <strong>{referralCode}</strong></p>
            <div className="referral-section">
              <a href={referralLink}>{referralLink}</a>
              <button onClick={copyToClipboard} className="copy-button">
                <Copy size={16} /> Copy Link
              </button>
            </div>
            <p>Level 1 connections: <strong>250</strong></p>
            <p>Level 2 connections: <strong>115</strong></p>
            <p>Level 3 connections: <strong>100</strong></p>
          </div>
          <div className="profile-right">
            <p>Total Residual Earnings: <strong>4,000,000</strong></p>
            <p>Breakdown of Earnings</p>
            <p>Available Balance: <strong>12,000,000</strong></p>
            <button className="withdraw-button">Withdraw</button>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="activity-card">
        <h2>Activity</h2>
        <ul>
          <li>Connect 100 masterminds to become a CEO.</li>
          <li>Order meals at least 3 times this week to activate your Bond Force Membership.</li>
          <li>Enter your bank account in your wallet to encash your earnings.</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
