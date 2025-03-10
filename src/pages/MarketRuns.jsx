import React, { useState, useEffect } from "react";
import "./MarketRuns.css";
import { FaStar } from "react-icons/fa";
import Vector1 from "../assets/Vector1.png";
import seafoods from "../assets/fresh-bass-with-white-background1.png";
import stunning from "../assets/stunning-impasto-painting-white-hen1.png";
import grain from "../assets/412951555_bbc2c779-25c0-4851-adc1-c922a7d4c5b71.png";
import singleredapple from "../assets/single-red-apple-with-green-leaf-water-droplets.png";
import seeds from "../assets/single-red-apple-with-green-leaf-water-droplets2.png";
import vegetables from "../assets/138792826_4acbcb31-951d-404f-ae4d-fd34a21218761.png";
import glassmilkbottle from "../assets/glass-milk-bottle-fresh-milk1.png";
import tangerine from "../assets/tangerine.png";
import avocado from "../assets/avocado.png";
import agbalumo from "../assets/agbalumo.png";
import souvenir from "../assets/souvenir.png";
import pineapple from "../assets/pineapple.png";
import Group from "../assets/group.png";
import { ChevronRight } from "lucide-react";
import Star from "../assets/STAR.png"
import rev from "../assets/rev.png"

const categories = [
  { name: "Trending", image: Vector1 },
  { name: "Sea Foods", image: seafoods },
  { name: "Farm Animals", image: stunning },
  { name: "Grains", image: grain },
  { name: "Fruits", image: singleredapple },
  { name: "Vegetables", image: vegetables },
  { name: "Dairy Products", image: glassmilkbottle },
  { name: "Feed and Seeds", image: seeds },
];

const trendingItems = [
  { id: 1, name: "Red Apple", price: 500, image: singleredapple, description: "Fresh red apple with juicy taste." },
  { id: 2, name: "Avocado", price: 500, image: avocado, description: "Rich and creamy avocado, great for salads." },
  { id: 3, name: "Tangerine", price: 500, image: tangerine, description: "Sweet and tangy tangerine packed with vitamins." },
  { id: 4, name: "Agbalumo", price: 200, image: agbalumo, description: "Nigerian cherry, also known as Udara." },
  { id: 5, name: "Souvenir Fruitpacks", price: 500, image: souvenir, description: "This package contains 6 fresh fruits. It contains, banana, apple, pineapple, pears, orange and grapes. Kindly note that it can be delivered and packed based on your fruits preferences." },
  { id: 6, name: "Pineapple", price: 500, image: pineapple, description: "Tropical pineapple, rich in vitamin C." },
];

const MarketRuns = () => {
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  return (
    <div className="container">
      <div className="dropdowns">
        <select className="dropdown">
          <option>Location</option>
        </select>
        <select className="dropdown">
          <option>Market</option>
        </select>
      </div>

      <div className="grid-container">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">Trending</h2>
      <div className="trending-grid">
        {trendingItems.map((item) => (
          <div key={item.id} className="trending-card" onClick={() => setSelectedItem(item)}>
            <img src={item.image} alt={item.name} className="trending-image" />
            <div className="trending-info">
              <p className="trending-name">{item.name}</p>
              <p className="trending-price">₦ {item.price.toLocaleString()}</p>
            </div>
            <button className="add-to-cart" onClick={(e) => { e.stopPropagation(); addToCart(item); }}>+</button>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>&times;</button>
            <div className="layout-container">
              <div className="layout-container-image">
            <img src={selectedItem.image} alt={selectedItem.name} className="popup-image" />
            </div>
            <div className="popup-title-content">
            <h3 className="popup-title">{selectedItem.name}</h3>
            <p className="popup-price">₦ {selectedItem.price.toLocaleString()}</p>
            </div>
            <div className="chat-icon-button">
            <button className="chat-icon" onClick={() => addToCart(selectedItem)}> <img src={Group} className="groupchat" alt="" /> Chat</button>
            <div className="cart-item-button100">
  <button className="decrement" onClick={() => decrementQuantity(selectedItem)}>-</button>
  <span className="quantity">1</span>
  <button className="increment" onClick={() => incrementQuantity(selectedItem)}>+</button>
</div>

            </div>
            </div>
            <div className="layout-container1">
              <div className="descriptionrole">
              <p className="descriptionof">Description</p>
              <div className="descriptionicons">
            <button className="description-back-btn1" onClick={() => navigate(-1)}>  
              <ChevronRight />
            </button>
        </div>
              </div>
              <hr className="description-line"/>
            <p className="popup-description">{selectedItem.description}</p>
            </div>
            <div className="layout-container2">
            <div className="descriptionrole1">
              <p className="descriptionof1">4.8 (742)</p>
            <div className="star-icon">  
              <img src={Star} alt="" />
              </div>
            </div>
            <hr className="description-line"/>
            <section className="review">
              <h4 className="review-text">Reviews</h4>
            </section>
            <section className="review-image">
              <img src={rev} alt="" />
            </section>
            <hr className="description-line"/>
            
            </div>
            <button className="popup-add-to-cart" onClick={() => addToCart(selectedItem)}>Add to Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketRuns;
