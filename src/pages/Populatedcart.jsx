import React, { useState, useEffect } from "react";
import "../pages/PopulatedCart.css";

const PopulatedCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Ensure price & quantity are properly formatted
    const cleanedCart = storedCart.map(item => ({
      ...item,
      price: parseFloat(item.price) || 0, // Convert to number & avoid NaN
      quantity: parseInt(item.quantity) || 1 // Ensure valid quantity
    }));

    setCartItems(cleanedCart);
  }, []);

  // Save cart to localStorage whenever cart updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle item selection
  const handleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle "Select All"
  const handleSelectAll = (event) => {
    setSelectedItems(event.target.checked ? cartItems.map((item) => item.id) : []);
  };

  // Update quantity
  const handleQuantityChange = (id, increment) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + increment) }
          : item
      )
    );
  };

  // Delete selected items
  const handleDeleteSelected = () => {
    setCartItems(cartItems.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]); // Clear selected items
  };

  // Format number for price display
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  // Debugging: Check if price is available in items
  console.log("Cart Items:", cartItems);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingFee = cartItems.length > 0 ? 1500 : 0;
  const total = subtotal + shippingFee;

  return (
    <div className="populated-cart-container">
      {/* Left Container: Cart Items */}
      <div className="cart-items-section">
        <p className="cart10">Cart ({cartItems.length})</p>
        <div className="cart-header">
          <div className="select-all-container">
            <input
              type="checkbox"
              className="select-all-checkbox"
              onChange={handleSelectAll}
              checked={selectedItems.length === cartItems.length && cartItems.length > 0}
            />
            <label>Select all items</label>
          </div>
          <button className="delete-selected-button" onClick={handleDeleteSelected} disabled={selectedItems.length === 0}>
            Delete selected items
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <input
                type="checkbox"
                className="select-checkbox"
                onChange={() => handleSelectItem(item.id)}
                checked={selectedItems.includes(item.id)}
              />
              <img src={item.image} alt={item.name} className="item-image10" />
              <div className="item-details10">
                <p className="item-name10">{item.name}</p>
                <p className="item-location10">{item.location}</p>
                <p className="available10">Available</p>
              </div>
              <div className="item-price-container10">
                <p className="item-price10">₦ {formatNumber(item.price)}</p>
                <div className="quantity-controls10">
                  <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity === 1}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right Container: Summary */}
      <div className="cart-summary-section">
        <h2>Summary</h2>
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
        <button className="make-payment-button" disabled={cartItems.length === 0}>
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default PopulatedCart;
