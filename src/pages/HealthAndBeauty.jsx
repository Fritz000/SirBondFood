import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import "./HealthAndBeauty.css";
import {useNavigate} from "react-router-dom"
import cream from "../assets/cream.svg"
import perf from "../assets/perf.svg"
import makeup from "../assets/makeup.svg"
import niv from "../assets/niv.svg"
import firstaid from "../assets/firstaid.svg"


const categories = [
  { name: "Skincare", icon: cream, path: "/SkinCare" },
  { name: "Haircare", icon: perf, path: "/HairCare" },
  { name: "Make-up", icon: makeup, path: "/Makeup" },
  { name: "Personal care", icon: niv, path: "/Personalcare" },
  { name: "Health & Wellness", icon: firstaid, path: "/Healthwellness" },
];

const HealthAndBeauty = () => {
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

export default HealthAndBeauty;
