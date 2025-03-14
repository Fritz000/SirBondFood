import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import "./SportAndOutdoors.css";
import {useNavigate} from "react-router-dom"
import freshbasswithwhitebackground1 from "../assets/fresh-bass-with-white-background1.png"
import stunningimpastopaintingwhitehen1 from "../assets/stunning-impasto-painting-white-hen1.png"


const categories = [
  { name: "Fitness & Equipment", icon: freshbasswithwhitebackground1 },
  { name: "Outdoor & Camping", icon: freshbasswithwhitebackground1 },
  { name: "Bikes & Accessories", icon: stunningimpastopaintingwhitehen1 },
];

const SportAndOutdoors = () => {
    const navigate = useNavigate();
  return (
    <div className="sportandoutdoors-container">
  {/* Header & Search in One Container */}
  <div className="sportandoutdoors-first-header">
    <header className="sportandoutdoors-header">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ChevronLeft size={32} />
      </button>
      <h2 className="sportandoutdoors">Electronics</h2>
    </header>

    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input type="text" placeholder="Search electronics" className="search-bar" />
    </div>
  </div>
<div className="sportandoutdoors-category-list">
  {categories.map((category, index) => (
    <div key={index} className="sportandoutdoors-category-item">
        <div className="sportandoutdoors-icon-container">
        <img src={category.icon} alt={category.name} className="sportandoutdoors-category-icon" />
      </div>
      <span className="sportandoutdoors-category-name">{category.name}</span>
      <button className="sportandoutdoors-arrow-button">
        <ChevronRight size={28} /> {/* Increased size */}
      </button>
    </div>
  ))}
</div>
    </div>
  );
};

export default SportAndOutdoors;
