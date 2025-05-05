import React, { useState } from 'react';
import { ShoppingCart, User, Minus, Plus } from 'lucide-react';
import './Checkout.css';
import { useSelector } from "react-redux"; // Use Redux to access user data

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const { user } = useSelector((state) => state.auth); // Fetch user data from Redux store
  const firstName = user?.first_name
    ? user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)
    : '';

  const lastName = user?.last_name
    ? user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1)
    : '';
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Product items data
  const items = [
    {
      id: 1,
      name: 'Portable Stereo Speaker',
      price: 230.99,
      quantity: 1,
      image: '/lovable-uploads/ce0ab99f-160b-465a-8fe8-0cd468adbf06.png'
    },
    {
      id: 2,
      name: '3-Type Instant Camera',
      price: 430.20,
      quantity: 2,
      image: '/lovable-uploads/ce0ab99f-160b-465a-8fe8-0cd468adbf06.png'
    },
    {
      id: 3,
      name: 'Positive Vibration 4RC',
      price: 130.00,
      quantity: 3,
      image: '/lovable-uploads/ce0ab99f-160b-465a-8fe8-0cd468adbf06.png'
    }
  ];

   // Calculate totals
   const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
   const shippingFee = cartItems.length > 0 ? 1500 : 0;
   const total = subtotal + shippingFee;

  // Format number for price display
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  return (
    <div className="bg-[#f3f3f2] min-h-screen flex flex-col">
      {/* Checkout Content */}
      <div className="checkout-content">
        {/* Delivery Information Section */}
        <div className="delivery-information">
          <h2 className="section-title">Delivery Information</h2>
          
          <form className="delivery-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" className="form-control" placeholder="" defaultValue={firstName} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" className="form-control" placeholder="" defaultValue={firstName} readOnly />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" className="form-control" placeholder="" defaultValue={user?.email} readOnly />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" className="form-control" placeholder="+234 000 0000 000" />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <input type="text" id="address" className="form-control" placeholder="Street, City, State" />
            </div>
            
            <div className="form-group">
              <label>Delivery Date</label>
              <div className="calendar-section">
                <div className="calendar-header">
                  <button className="calendar-nav">
                    ←
                  </button>
                  <span className="calendar-month">May 2025</span>
                  <button className="calendar-nav">
                    →
                  </button>
                </div>
                
                <div className="calendar-weekdays">
                  <div className="calendar-weekday">Sun</div>
                  <div className="calendar-weekday">Mon</div>
                  <div className="calendar-weekday">Tue</div>
                  <div className="calendar-weekday">Wed</div>
                  <div className="calendar-weekday">Thu</div>
                  <div className="calendar-weekday">Fri</div>
                  <div className="calendar-weekday">Sat</div>
                </div>
                
                <div className="calendar-days">
                  {Array.from({ length: 30 }, (_, i) => (
                    <button 
                      key={i + 1} 
                      className={`calendar-day ${i + 1 === selectedDate.getDate() ? 'selected' : ''}`}
                      onClick={() => handleDateSelect(new Date(2025, 5, i + 1))}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="switch-row">
              <span className="switch-label">Express Delivery</span>
              <div className={`custom-switch ${true ? 'active' : ''}`}>
                <div className="switch-toggle"></div>
              </div>
            </div>
            
            <div className="form-group">
              <label>Selected Date</label>
              <div className="dates-display">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            <div className="form-group">
              <h3 className="payment-title">Payment Method</h3>
              
              <div className="payment-options">
                <div 
                  className={`payment-option ${paymentMethod === 'credit' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodChange('credit')}
                >
                  <div className="radio-circle">
                    {paymentMethod === 'credit' && <div className="radio-inner"></div>}
                  </div>
                  <span className="payment-option-label">Pay Online</span>
                </div>
                
                <div 
                  className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodChange('cash')}
                >
                  <div className="radio-circle">
                    {paymentMethod === 'cash' && <div className="radio-inner"></div>}
                  </div>
                  <span className="payment-option-label">Cash On Delivery</span>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        {/* Order Summary Section */}
        <div className="order-summary">
          <h2 className="section-title">Summary</h2>
          
          <div className="summary-details">
          <div className="summary-item">
            <span>Subtotal</span>
            <span>₦ {formatNumber(subtotal)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping fee</span>
            <span>₦ {formatNumber(shippingFee)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>₦ {formatNumber(total)}</span>
          </div>
        </div>
          
          <button className="confirm-order-btn">
            Confirm Order 
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;