import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import "./FoodAndGrocery.css";
import {useNavigate} from "react-router-dom"
import freshproduce from "../assets/freshproduce.svg"
import chicken from "../assets/chicken.svg"
import eggs from "../assets/eggs.svg"
import beverages from "../assets/beverages.svg"
import bakery from "../assets/bakery.svg"
import pantry from "../assets/pantry.svg"


const categories = [
  { name: "Fresh Produces", icon: freshproduce, path: "/FoodGrocery" },
  { name: "Pantry & Stable", icon: pantry, path: "/PantryStable" },
  { name: "Meat & Seafood", icon: chicken, path: "/MeatSeafood" },
  { name: "Dairy & Eggs", icon: eggs, path: "/DairyEggs" },
  { name: "Bakery", icon: bakery, path: "/BakeryItems" },
  { name: "Beverages", icon: beverages, path: "/Beverages" },
];


const FoodAndGrocery = () => {
    const navigate = useNavigate();
  return (
    <div className="food-grocery-container">
  {/* Header & Search in One Container */}
  <div className="ffgheader">
    <header className="food-grocery-header">
      <button className="back-button105" onClick={() => navigate(-1)}>
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
    <div 
      key={index} 
      className="category-item" 
      onClick={() => category.path && navigate(category.path)}
    >
      <div className="icon-container">
        <img src={category.icon} alt={category.name} className="category-icon" />
      </div>
      <span className="category-name105">{category.name}</span>
      <button className="arrow-button">
        <ChevronRight size={28} />
      </button>
    </div>
  ))}
</div>

    </div>
  );
};

export default FoodAndGrocery;
