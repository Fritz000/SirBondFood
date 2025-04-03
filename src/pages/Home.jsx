import React, { useEffect, useState } from 'react';
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

// Function to generate a random referral code
const generateReferralCode = () => {
  return Math.random().toString(36).substr(2, 8).toUpperCase(); // Example: 'A1B2C3D4'
};

const getRank = (referrals) => {
  if (referrals >= 51) return "Mastermind";
  if (referrals >= 31) return "Expert";
  if (referrals >= 6) return "Intermediate";
  return "Novice";
};
const Home = ({ user }) => {
  const location = useLocation();
  const [referralCode, setReferralCode] = useState(user?.referralCode || "");
  const referralCount = user?.referrals || 0; // Get the number of referrals
  const rank = getRank(referralCount); // Determine rank

  // Generate code if user has none
  useEffect(() => {
    if (!referralCode) {
      const newCode = generateReferralCode();
      setReferralCode(newCode);
      // Here, you should also send this new code to the backend to save it for the user
    }
  }, [user]);

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
        <div className="card card-yellow">
          <Link to="/MarketRuns">
            <img src={twemojishoppingcart} alt="Market runs" className="icon icon-yellow" />
            <p className="card-title">Market runs</p>
          </Link>
        </div>

        <div className="card card-green coming-soon">
          <img src={emojionepotoffood} alt="Order meals" className="icon icon-green" />
          <div className="overlay">COMING SOON</div>
        </div>

        <div className="card card-teal coming-soon">
          <img src={notoshoppingbags} alt="Bulk foodstuffs order" className="icon icon-teal" />
          <div className="overlay">COMING SOON</div>
        </div>

        <div className="card card-pink coming-soon">
          <img src={fluentemojiflatpackage} alt="Diaspora orders" className="icon icon-pink" />
          <div className="overlay">COMING SOON</div>
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
        <h2 className="pandn">Profile & Notifications</h2>
        <div className="profile-details">
          <div className="profile-left">
            <p>
              Rank: <strong>{rank}</strong>
            </p>
            <p>
              Connection Code: <strong>{referralCode}</strong>
            </p>
            <div className="referral-section">
              <a href={referralLink}>{referralLink}</a>
              <button onClick={copyToClipboard} className="copy-button">
                <Copy size={16} /> Copy Link
              </button>
            </div>
            <p>
              Level 1 connections: <strong>{referralCount}</strong>
            </p>
          </div>
          <div className="profile-right">
            <p>
              Total Residual Earnings: <strong>{user?.earnings || 0}</strong>
            </p>
            <p>
              Available Balance: <strong>{user?.balance || 0}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="activity-card">
        <h2>Activity</h2>
        <ul>
          <li>Connect 100 masterminds to become a CEO.</li>
          <li>
            Order meals at least 3 times this week to activate your Bond Force
            Membership.
          </li>
          <li>Enter your bank account in your wallet to encash your earnings.</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
