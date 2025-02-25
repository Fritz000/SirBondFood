import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ShieldBan } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/Wallet.css";
import Rectangle4221 from "../assets/Rectangle4221.png";
import Rectangle4219 from "../assets/Rectangle4219.png";
import Rectangle4222 from "../assets/Rectangle4222.png";
import group18265 from "../assets/Group18265.png";
import group18266 from "../assets/Group18266.png";

const Wallet = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('Ongoing');
    
    const tabs = ['All', 'Loaded Funds', 'Referral Earnings', 'Withdraws'];

  return (
    <div className="Walletcontainer">
        <div className="Walletdetails">
          <h2 className="Wallet100">Wallet</h2>
        </div>
        <div className="image-container-wallet">
        <div
      className="wallet-image"
      style={{
        backgroundImage: `url(${Rectangle4219})`,
      }}
    >
      <div className="wallet-content">
        <div
      className="wallet-image2"
      style={{
        backgroundImage: `url(${Rectangle4221})`,
      }}
    >
        <div className="wallet-content2">
            <p className="wallet-balance1">Balance</p>
            <p className="wallet-amount1">₦50,000.00</p>
        </div>
        </div>
        <div className="wallet509">
        <div className="wallet-content3">
        <div
      className="wallet-image3"
      style={{
        backgroundImage: `url(${group18266})`,
      }}
    >
        <p className="top">Top Up</p>
        </div>
    </div>

    <div className="wallet-content1">
        <div
      className="wallet-image3"
      style={{
        backgroundImage: `url(${group18265})`,
      }}
    >
        <p className="withdraw">Withdraw</p>
        </div>
        </div>
    </div>
      </div>
    </div>
        </div>

        <div className="transaction-header">
  <span className="title">Transaction History</span>
  <a href="#" class="see-all">See all</a>
</div>

<div className="wallet-container1">
      <div className="wallet-header">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`wallet-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Wallet;
