import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import "./BabiesAndGames.css";
import {useNavigate} from "react-router-dom"
import babyessentails from "../assets/babyessentails.svg"
import toysandgames from "../assets/toysandgames.svg"
import childrenfurniture from "../assets/childrenfurniture.svg"
import kidsaccessories from "../assets/kidsaccessories.svg"

const categories = [
  { name: "Baby Essentials", icon: babyessentails, path: "/Babyessentials" },
  { name: "Toys & Games", icon: toysandgames, path: "/Toys" },
  { name: "Children Furniture", icon: childrenfurniture, path: "/ChildrenFurniture" },
  { name: "Kids' Accessories", icon: kidsaccessories, path: "/Kidsaccessories" },
];

const BabiesAndGames = () => {
    const navigate = useNavigate();
  return (
    <div className="babiesandgames-container">
  {/* Header & Search in One Container */}
  <div className="babiesandgames-first-header">
    <header className="babiesandgames-header">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ChevronLeft size={32} />
      </button>
      <h2 className="babiesandgames">Babies & Games</h2>
    </header>

    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input type="text" placeholder="Search Babies & Games" className="search-bar" />
    </div>
  </div>
<div className="babiesandgames-category-list">
  {categories.map((category, index) => (
    <div key={index} className="babiesandgames-category-item" onClick={() => category.path && navigate(category.path)}>
        <div className="babiesandgames-icon-container">
        <img src={category.icon} alt={category.name} className="babiesandgames-category-icon" />
      </div>
      <span className="babiesandgames-category-name">{category.name}</span>
      <button className="babiesandgames-arrow-button">
        <ChevronRight size={28} /> {/* Increased size */}
      </button>
    </div>
  ))}
</div>
    </div>
  );
};

export default BabiesAndGames;
