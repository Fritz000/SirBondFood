import React from "react";
import "../pages/Emptycart.css";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";

const EmptyCart = () => {
  return (
    <div className="empty-cart-container">
      <div className="cartitems">
        <p className="cart0">Cart (0)</p>
        <div className="delete">
          <div className="selectall-container">
            <input type="radio" id="selectAll" name="cartSelect" className="radio-button" />
            <label htmlFor="selectAll" className="selectall">Select all items</label>
          </div>
          <p className="deleteselected">Delete selected items</p>
        </div>
      </div>
      <div className="empty-cart-box">
        <button className="icon-button"><TiShoppingCart size={100} /></button>
        <h2 className="empty-cart-title">Empty cart!</h2>
        <p className="empty-cart-text">
          You currently don't have anything in your cart. When you add items to your cart, you'll see them here.
        </p>
        <Link to="/shop" className="add-item-button">
          Add Item
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
