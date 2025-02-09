import React, { useState } from "react";
import "../pages/PopulatedCart.css";

const PopulatedCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Party jollof rice and stewed beef",
      location: "Food Court",
      price: 3999,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Grilled chicken peri peri",
      location: "TGA Spicity",
      price: 2850,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "10kg of tomatoes",
      location: "Marian Market",
      price: 6750,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  // Handle the selection of individual item checkboxes
  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        // Remove from selected items if already selected
        return prevSelectedItems.filter((itemId) => itemId !== id);
      } else {
        // Add to selected items if not selected
        return [...prevSelectedItems, id];
      }
    });
  };

  // Handle the "Select All" checkbox
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(cartItems.map((item) => item.id)); // Select all items
    } else {
      setSelectedItems([]); // Deselect all items
    }
  };

  // Update quantity
  const handleQuantityChange = (id, increment) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + increment }
          : item
      )
    );
  };

  // Delete selected items
  const handleDeleteSelected = () => {
    setCartItems(cartItems.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]); // Clear selected items after deletion
  };

  // Helper function to format numbers with commas
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  // Calculations for subtotal and total
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Shipping fee: 0 if no items, 1500 if there are items
  const shippingFee = cartItems.length > 0 ? 1500 : 0;

  const total = subtotal + shippingFee;

  return (
    <div className="populated-cart-container">
      {/* Left Container: Cart Items */}
      <div className="cart-items-section">
        <p className="cart0">Cart ({cartItems.length})</p>
        <div className="cart-header">
          <div className="select-all-container">
            <input
              type="checkbox"
              className="select-all-checkbox"
              onChange={handleSelectAll}
              checked={selectedItems.length === cartItems.length} // Check if all items are selected
            />
            <label>Select all items</label>
          </div>
          <button
            className="delete-selected-button"
            onClick={handleDeleteSelected}
          >
            Delete selected items
          </button>
        </div>

        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <input
              type="checkbox"
              className="select-checkbox"
              onChange={() => handleSelectItem(item.id)} // Select/Deselect individual item
              checked={selectedItems.includes(item.id)} // If item is selected, check the box
            />
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <p className="item-name">{item.name}</p>
              <p className="item-location">{item.location}</p>
              <p className="available">Available</p>
            </div>
            <div className="item-price-container">
              <p className="item-price">₦ {formatNumber(item.price)}</p>
              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
            </div>
          </div>
        ))}
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
        <button className="make-payment-button">Make Payment</button>
      </div>
    </div>
  );
};

export default PopulatedCart;
