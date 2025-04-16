import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import "./HomeAndLiving.css";
import {useNavigate} from "react-router-dom"
import freshbasswithwhitebackground1 from "../assets/fresh-bass-with-white-background1.png"
import stunningimpastopaintingwhitehen1 from "../assets/stunning-impasto-painting-white-hen1.png"
import dairyeggs from "../assets/412951555_bbc2c779-25c0-4851-adc1-c922a7d4c5b71.png"
import foodbasket from "../assets/138792826_4acbcb31-951d-404f-ae4d-fd34a21218761.png"
import chair from "../assets/chair.svg"
import basket from "../assets/basket.svg"
import bed from "../assets/bed.svg"
import pot from "../assets/pot.svg"
import cotton from "../assets/cotton.svg"


const categories = [
  { name: "Furniture", icon: chair, path: "/Furniture" },
  { name: "Home Decor", icon: cotton, path: "/Homedecor" },
  { name: "Bedding & Linen", icon: bed, path: "/BeddingLinen" },
  { name: "Kitchen & Dining", icon: pot, path: "/KitchenLinen" },
  { name: "House Essentials", icon: basket, path: "/HouseEssentials" },
];

const HomeAndLiving = () => {
    const navigate = useNavigate();
  return (
    <div className="healthandbeauty-container">
  {/* Header & Search in One Container */}
  <div className="healthandbeauty-first-header">
    <header className="healthandbeauty-header">
      <button className="back-button106" onClick={() => navigate(-1)}>
        <ChevronLeft size={32} />
      </button>
      <h2 className="healthandbeauty">Health & Beauty</h2>
    </header>

    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input type="text" placeholder="Search home & living" className="search-bar" />
    </div>
  </div>
<div className="healthandbeauty-category-list">
  {categories.map((category, index) => (
    <div key={index} className="healthandbeauty-category-item" onClick={() => category.path && navigate(category.path)}>
        <div className="healthandbeauty-icon-container">
        <img src={category.icon} alt={category.name} className="healthandbeauty-category-icon" />
      </div>
      <span className="healthandbeauty-category-name">{category.name}</span>
      <button className="healthandbeauty-arrow-button">
        <ChevronRight size={28} /> {/* Increased size */}
      </button>
    </div>
  ))}
</div>
    </div>
  );
};

export default HomeAndLiving;
