import React, { useState } from 'react';
import './Order.css';

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState('Ongoing');

  const tabs = ['Ongoing', 'Processed', 'Delivered', 'Completed'];

  return (
    <div className="order-container">
        <div className='orders'>
            <p>Orders</p>
            <div className="line2">
                <hr />
            </div>
        </div>
      <div className="order-header">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`order-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="order-content">
        <div className="order-empty">
          <img
            src="https://via.placeholder.com/150"
            alt="Empty Orders"
            className="order-image"
          />
          <p className="order-text">We're waiting for your first order.</p>
          <button className="order-button">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;