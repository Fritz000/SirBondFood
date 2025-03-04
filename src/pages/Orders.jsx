import React, { useState } from 'react';
import './Orders.css';
import { Link } from "react-router-dom";
import Rectangle4205 from "../assets/Rectangle4205.png";
import Rectangle4305 from "../assets/Rectangle4305.png";
import Rectangle4405 from "../assets/Rectangle4405.png";
import Rectangle4505 from "../assets/Rectangle4505.png";

const Orders = () => {
  const [activeTab, setActiveTab] = useState('Ongoing');

  const tabs = ['Ongoing', 'Processed', 'Delivered', 'Completed'];

  const orders = [
    {
      img: Rectangle4205,
      name: "Party jollof rice and stewed beef",
      orderNo: "#1955674",
      status: activeTab,
      date: "March 14, 2025",
      leftSideClass: "left-side"
    },
    {
      img: Rectangle4305,
      name: "Vegetable pasta with sauced oyster",
      orderNo: "#1900098",
      status: activeTab,
      date: "March 14, 2025",
      leftSideClass: "left-side1"
    },
    {
      img: Rectangle4405,
      name: "Grilled potatoes and eggs",
      orderNo: "#1976767",
      status: activeTab,
      date: "March 14, 2025",
      leftSideClass: "left-side2"
    },
    {
      img: Rectangle4505,
      name: "Jollof pasta and chicken slice",
      orderNo: "#1932323",
      status: activeTab,
      date: "March 14, 2025",
      leftSideClass: "left-side3"
    }
  ];

  return (
    <div className="order-container1">
      <div className='orders1'>
        <p>Orders</p>
        <div className="line21">
          <hr />
        </div>
      </div>
      <div className="order-header1">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`order-tab1 ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {orders.map((order, index) => (
        <div className="section10" key={index}>
          <div className="item10">
            <img src={order.img} alt={order.name} className="item-image10" />
            <div>
              <div className={order.leftSideClass}>
                <Link to="/Orderdetails"><h4>See details</h4></Link>
              </div>
              <div className="rab20">
                <p className="item-name20">{order.name}</p>
                <p className="orderno20">Order {order.orderNo}</p>
                <span className="status10">{order.status}</span>
                <p className="date20">{order.date}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
