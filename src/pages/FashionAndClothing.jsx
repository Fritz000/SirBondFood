import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import "./FashionAndClothing.css";
import {useNavigate} from "react-router-dom"
import freshbasswithwhitebackground1 from "../assets/fresh-bass-with-white-background1.png"
import stunningimpastopaintingwhitehen1 from "../assets/stunning-impasto-painting-white-hen1.png"
import dairyeggs from "../assets/412951555_bbc2c779-25c0-4851-adc1-c922a7d4c5b71.png"
import foodbasket from "../assets/138792826_4acbcb31-951d-404f-ae4d-fd34a21218761.png"
import glassmilkbottlefreshmilk1 from "../assets/glass-milk-bottle-fresh-milk1.png"


const categories = [
  { name: "Women's Fashion", icon: freshbasswithwhitebackground1 },
  { name: "Men's Fashion", icon: freshbasswithwhitebackground1 },
  { name: "Kid's Clothing", icon: stunningimpastopaintingwhitehen1 },
  { name: "Footwear", icon: dairyeggs },
  { name: "Jewelries", icon: foodbasket },
  { name: "Bags", icon: glassmilkbottlefreshmilk1 },
  { name: "Clothing & Accessories", icon: glassmilkbottlefreshmilk1 },
];

const FashionAndClothing = () => {
    const navigate = useNavigate();
  return (
    <div className="fashionandclothing-container">
  {/* Header & Search in One Container */}
  <div className="fashionandclothing-first-header">
    <header className="fashionandclothing-header">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ChevronLeft size={32} />
      </button>
      <h2 className="fashionandclothing">Fashion & Clothing</h2>
    </header>

    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input type="text" placeholder="Search Fashion & Clothing" className="search-bar" />
    </div>
  </div>
<div className="fashionandclothing-category-list">
  {categories.map((category, index) => (
    <div key={index} className="fashionandclothing-category-item">
        <div className="fashionandclothing-icon-container">
        <img src={category.icon} alt={category.name} className="fashionandclothing-category-icon" />
      </div>
      <span className="fashionandclothing-category-name">{category.name}</span>
      <button className="fashionandclothing-arrow-button">
        <ChevronRight size={28} /> {/* Increased size */}
      </button>
    </div>
  ))}
</div>
    </div>
  );
};

export default FashionAndClothing;
