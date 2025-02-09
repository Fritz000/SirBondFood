import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "../pages/Emptycart.css";
import { TiShoppingCart } from "react-icons/ti";

const EmptyCart = () => {
  const [cartItems, setCartItems] = useState([
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate(); // 

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = () => {
    const remainingItems = cartItems.filter((item) => !selectedItems.includes(item.id));
    setCartItems(remainingItems);
    setSelectedItems([]);

    // Navigate to Empty Cart if all items are deleted
    if (remainingItems.length === 0) {
      navigate("/cart-empty");
    }
  };

  return (
    <div className="empty-cart-container">
      <div className="cartitems">
        <p className="cart0">Cart ({cartItems.length})</p>
        {cartItems.length > 0 && (
          <div className="delete">
            <div className="selectall-container">
              <input
                type="checkbox"
                id="selectAll"
                className="radio-button"
                onChange={handleSelectAll}
                checked={selectedItems.length === cartItems.length && cartItems.length > 0}
              />
              <label htmlFor="selectAll" className="selectall">Select all items</label>
            </div>
            <p className="deleteselected" onClick={handleDeleteSelected}>
              Delete selected items
            </p>
          </div>
        )}
      </div>

      <div className="empty-cart-box">
        <button className="icon-button1"><TiShoppingCart size={100} /></button>
        <h2 className="empty-cart-title">
          {cartItems.length === 0 ? "Empty cart!" : "Empty Cart!"}
        </h2>
        <p className="empty-cart-text">
          {cartItems.length === 0
            ? "You currently don't have anything in your cart. When you add items to your cart, you'll see them here."
            : "You currently don't have anything in your cart. When you add items to your cart, you'll see them here."}
        </p>
        <Link to="/shop" className="add-item-button">
          Add Item
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
