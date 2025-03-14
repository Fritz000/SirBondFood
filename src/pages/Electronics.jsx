import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import "./Electronics.css";
import {useNavigate} from "react-router-dom"
import freshbasswithwhitebackground1 from "../assets/fresh-bass-with-white-background1.png"
import stunningimpastopaintingwhitehen1 from "../assets/stunning-impasto-painting-white-hen1.png"
import dairyeggs from "../assets/412951555_bbc2c779-25c0-4851-adc1-c922a7d4c5b71.png"
import foodbasket from "../assets/138792826_4acbcb31-951d-404f-ae4d-fd34a21218761.png"
import glassmilkbottlefreshmilk1 from "../assets/glass-milk-bottle-fresh-milk1.png"


const categories = [
  { name: "Computers & TV", icon: freshbasswithwhitebackground1 },
  { name: "Phone Accessories", icon: freshbasswithwhitebackground1 },
  { name: "Computer Accessories", icon: stunningimpastopaintingwhitehen1 },
  { name: "Home Appliances", icon: dairyeggs },
  { name: "Audio & Musical", icon: foodbasket },
  { name: "Cameras & Photograph", icon: glassmilkbottlefreshmilk1 },
  { name: "Gaming", icon: glassmilkbottlefreshmilk1 },
  { name: "Wearable Technology", icon: glassmilkbottlefreshmilk1 },
];

const Electronics = () => {
    const navigate = useNavigate();
  return (
    <div className="electronics-container">
  {/* Header & Search in One Container */}
  <div className="electronics-first-header">
    <header className="electronics-header">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ChevronLeft size={32} />
      </button>
      <h2 className="electronics">Electronics</h2>
    </header>

    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input type="text" placeholder="Search electronics" className="search-bar" />
    </div>
  </div>
<div className="electronics-category-list">
  {categories.map((category, index) => (
    <div key={index} className="electronics-category-item">
        <div className="electronics-icon-container">
        <img src={category.icon} alt={category.name} className="electronics-category-icon" />
      </div>
      <span className="electronics-category-name">{category.name}</span>
      <button className="electronics-arrow-button">
        <ChevronRight size={28} /> {/* Increased size */}
      </button>
    </div>
  ))}
</div>
    </div>
  );
};

export default Electronics;
