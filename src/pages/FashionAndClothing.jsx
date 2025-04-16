import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import "./FashionAndClothing.css";
import {useNavigate} from "react-router-dom"
import womencloth from "../assets/womencloth.svg"
import mencloth from "../assets/mencloth.svg"
import kidscloth from "../assets/kidscloth.svg"
import footwear from "../assets/footwear.svg"
import jewelries from "../assets/jewelries.svg"
import bags from "../assets/bags.svg"
import hat from "../assets/hat.svg"


const categories = [
  { name: "Women's Fashion", icon: womencloth, path: "/Women" },
  { name: "Men's Fashion", icon: mencloth, path: "/Men" },
  { name: "Kid's Clothing", icon: kidscloth, path: "/Kids" },
  { name: "Footwear", icon: footwear, path: "/Footwear" },
  { name: "Jewelries", icon: jewelries, path: "/Jewelries" },
  { name: "Bags", icon: bags, path: "/Bags" },
  { name: "Clothing & Accessories", icon: hat, path: "/Clothingaccessories" },
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
    <div key={index} className="fashionandclothing-category-item" onClick={() => category.path && navigate(category.path)}>
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
