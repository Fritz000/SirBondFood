import React, { useState } from 'react';
import { ShoppingCart, User, Minus, Plus } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('cash');
  
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

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 25.00;
  const total = subtotal + shipping;

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
                <input type="text" id="firstName" className="form-control" placeholder="John" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" className="form-control" placeholder="Doe" />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" className="form-control" placeholder="example@mail.com" />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" className="form-control" placeholder="+1 234 567 890" />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <input type="text" id="address" className="form-control" placeholder="123 Main Street" />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" className="form-control" placeholder="New York" />
              </div>
              
              <div className="form-group state-select">
                <label htmlFor="state">State</label>
                <div className="select-wrapper">
                  <select id="state" className="form-select">
                    <option value="ny">NY</option>
                    <option value="ca">CA</option>
                    <option value="tx">TX</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="zip">ZIP Code</label>
                <input type="text" id="zip" className="form-control" placeholder="10001" />
              </div>
            </div>
            
            <div className="form-group">
              <label>Delivery Date</label>
              <div className="calendar-section">
                <div className="calendar-header">
                  <button className="calendar-nav">
                    ←
                  </button>
                  <span className="calendar-month">June 2023</span>
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
                      onClick={() => handleDateSelect(new Date(2023, 5, i + 1))}
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
          <h2 className="section-title">Order Summary</h2>
          
          <div className="order-items">
            {items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-price">${item.price.toFixed(2)}</div>
                </div>
                <div className="item-quantity">
                  <button className="quantity-btn">
                    <Minus className="quantity-icon" />
                  </button>
                  <span className="quantity-value">{item.quantity.toString().padStart(2, '0')}</span>
                  <button className="quantity-btn">
                    <Plus className="quantity-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-totals">
            <div className="total-row">
              <span className="total-label">Subtotal</span>
              <span className="total-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span className="total-label">Shipping</span>
              <span className="total-value">${shipping.toFixed(2)}</span>
            </div>
            <div className="total-row grand-total">
              <span className="total-label">Total (USD)</span>
              <span className="total-value">${total.toFixed(2)}</span>
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