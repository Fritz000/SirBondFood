import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import "./SportAndOutdoors.css";
import {useNavigate} from "react-router-dom"
import bicycle from "../assets/bicycle.svg"
import clock from "../assets/clock.svg"
import skateboard from "../assets/skateboard.svg"


const categories = [
  { name: "Fitness & Equipment", icon: skateboard, path: "/FitnessEquipment" },
  { name: "Outdoor & Camping", icon: bicycle, path: "/OutdoorCamping" },
  { name: "Bikes & Accessories", icon: clock, path: "/BikesAccessories" },
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
      <h2 className="sportandoutdoors">Sport & Outdoors</h2>
    </header>

    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input type="text" placeholder="Search Sport & Outdoors" className="search-bar" />
    </div>
  </div>
<div className="sportandoutdoors-category-list">
  {categories.map((category, index) => (
    <div key={index} className="sportandoutdoors-category-item" onClick={() => category.path && navigate(category.path)}>
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
