import React, { useState, useEffect } from "react";
import "./MarketRuns.css";
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

const categories = [
  { name: "Trending", image: Vector1 },
  { name: "Sea Foods", image: seafoods },
  { name: "Farm Animals", image: stunning },
  { name: "Grains", image: grain },
  { name: "Fruits", image: singleredapple },
  { name: "Vegetables", image: vegetables },
  { name: "Dairy Products", image: glassmilkbottle },
  { name: "Feed and Seeds", image: seeds }
];

const trendingItems = [
  { id: 1, name: "Red Apple", price: 500, image: singleredapple }, 
  { id: 2, name: "Avocado", price: 500, image: avocado },
  { id: 3, name: "Tangerine", price: 500, image: tangerine },
  { id: 4, name: "Agbalumo", price: 200, image: agbalumo },
  { id: 5, name: "Souvenir Fruitpacks", price: 500, image: souvenir },
  { id: 6, name: "Pineapple", price: 500, image: pineapple }
];

const MarketRuns = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => [
      ...prevCart, 
      { ...item, price: Number(item.price), quantity: 1 } // Ensure price is stored as a number
    ]);
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
            <div className="category-image-wrapper">
              <img src={category.image} alt={category.name} className="category-image" />
            </div>
            <p className="category-name">{category.name}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">Trending</h2>
      <div className="trending-grid">
        {trendingItems.map((item) => (
          <div key={item.id} className="trending-card">
            <img src={item.image} alt={item.name} className="trending-image" />
            <div className="trending-info">
              <p className="trending-name">{item.name}</p>
              <p className="trending-price">₦ {item.price.toLocaleString()}</p>
            </div>
            <button className="add-to-cart" onClick={() => addToCart(item)}>+</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketRuns;
