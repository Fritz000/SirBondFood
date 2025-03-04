import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ShieldBan } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/OrderDetails.css";
import logo from "../assets/logo.png";
import Rectangle4205 from "../assets/Rectangle4205.png";

const OrderDetails = ({ onClose }) => {
  const navigate = useNavigate(); // Define navigate

  return (
    <div className="Orderways">
      <div className="Orderdetails">
        <div className="ordericons">
          <div className="orderdetailsicons">
            <button className="orderdetails-back-btn1" onClick={() => navigate(-1)}>  
              <ChevronLeft />
            </button>
          </div>
          <h2 className="order100">Order Details</h2>
        </div>
        <div className="lineorder">
          <hr />
        </div>
      </div>

      <div className="order-container">
        <p className="orderno"><strong>Order No: #19555674</strong></p>
        <p className="order1">1 item</p>
        <p className="order2">Placed on 28 Mar, 2024</p>
        <p className="total-amount">Total: ₦3,999</p>

        <h3 className="items100">Items in your order</h3>

        <div className="section">
          
          <div className="item">
            <img src={Rectangle4205} alt="Party jollof rice and stewed beef" className="item-image" />
            <div>
              <div className="rab1">
              <span className="status">Ongoing</span>
              <span className="date">March 14, 2025</span>
              </div>
              <div className="rab2">
              <p className="item-name">Party jollof rice and stewed beef</p>
              <p className="qty">Qty: 1</p>
              <p className="price">₦3,999</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pi">
        <h3>Payment Information</h3>
        </div>
        <div className="section">
          <div className="pm">
          <p className="paymentmet"><strong>Payment Method</strong></p>
          <p className="paywithpay"> Pay with Paystack or on delivery</p>
          </div>
          <div className="lineorder1">
          <hr />
          </div>
          <p className="paymentdet"><strong>Payment Details</strong></p>
          <p className="paywithpay1">Items total: ₦3,999</p>
          <p className="paywithpay1">Delivery Fee: ₦1,000</p>
          <p className="total-amount1">Total: ₦4,999</p>
        </div>
        <div className="pi">
        <h3>Delivery Information</h3>
        </div>
        <div className="section">
        <div className="pm">
          <p className="paymentmet"><strong>Delivery Method</strong></p>
          <p className="paywithpay"> Home delivery delivery</p>
          </div>
          <div className="lineorder1">
          <hr />
        </div>
        <p className="deliveryadd"><strong>Delivery Address</strong></p>
          <p className="addy">No. 5 Atekong street, Kingston estate, House 3</p>
          <p className="tobe">To be delivered on the 28th of March 2024</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
