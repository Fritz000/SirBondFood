import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import "./FoodAndGrocery.css";
import {useNavigate} from "react-router-dom"
import freshbasswithwhitebackground1 from "../assets/fresh-bass-with-white-background1.png"
import stunningimpastopaintingwhitehen1 from "../assets/stunning-impasto-painting-white-hen1.png"
import dairyeggs from "../assets/412951555_bbc2c779-25c0-4851-adc1-c922a7d4c5b71.png"
import foodbasket from "../assets/138792826_4acbcb31-951d-404f-ae4d-fd34a21218761.png"
import glassmilkbottlefreshmilk1 from "../assets/glass-milk-bottle-fresh-milk1.png"


const categories = [
  { name: "Fresh Produces", icon: freshbasswithwhitebackground1 },
  { name: "Pantry & Stable", icon: freshbasswithwhitebackground1 },
  { name: "Meat & Seafood", icon: stunningimpastopaintingwhitehen1 },
  { name: "Dairy & Eggs", icon: dairyeggs },
  { name: "Bakery", icon: foodbasket },
  { name: "Beverages", icon: glassmilkbottlefreshmilk1 },
];

const FoodAndGrocery = () => {
    const navigate = useNavigate();
  return (
    <div className="food-grocery-container">
  {/* Header & Search in One Container */}
  <div className="ffgheader">
    <header className="food-grocery-header">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ChevronLeft size={32} />
      </button>
      <h2 className="ffg">Food & Grocery</h2>
    </header>

    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input type="text" placeholder="Search food & grocery" className="search-bar" />
    </div>
  </div>
<div className="category-list">
  {categories.map((category, index) => (
    <div key={index} className="category-item">
        <div className="icon-container">
        <img src={category.icon} alt={category.name} className="category-icon" />
      </div>
      <span className="category-name">{category.name}</span>
      <button className="arrow-button">
        <ChevronRight size={28} /> {/* Increased size */}
      </button>
    </div>
  ))}
</div>
    </div>
  );
};

export default FoodAndGrocery;
