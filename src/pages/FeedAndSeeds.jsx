import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import "./FeedAndSeeds.css";
import {useNavigate} from "react-router-dom"
import freshbasswithwhitebackground1 from "../assets/fresh-bass-with-white-background1.png"
import stunningimpastopaintingwhitehen1 from "../assets/stunning-impasto-painting-white-hen1.png"


const categories = [
  { name: "Animal Seeds", icon: freshbasswithwhitebackground1 },
  { name: "Pet Feeds", icon: freshbasswithwhitebackground1 },
  { name: "Plant Seeds", icon: stunningimpastopaintingwhitehen1 },
];

const FeedAndSeeds = () => {
    const navigate = useNavigate();
  return (
    <div className="feedandseeds-container">
  {/* Header & Search in One Container */}
  <div className="feedandseeds-first-header">
    <header className="feedandseeds-header">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ChevronLeft size={32} />
      </button>
      <h2 className="feedandseeds">Electronics</h2>
    </header>

    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input type="text" placeholder="Search electronics" className="search-bar" />
    </div>
  </div>
<div className="feedandseeds-category-list">
  {categories.map((category, index) => (
    <div key={index} className="feedandseeds-category-item">
        <div className="feedandseeds-icon-container">
        <img src={category.icon} alt={category.name} className="feedandseeds-category-icon" />
      </div>
      <span className="feedandseeds-category-name">{category.name}</span>
      <button className="feedandseeds-arrow-button">
        <ChevronRight size={28} /> {/* Increased size */}
      </button>
    </div>
  ))}
</div>
    </div>
  );
};

export default FeedAndSeeds;
