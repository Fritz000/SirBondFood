import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import "./Electronics.css";
import {useNavigate} from "react-router-dom"
import gaming from "../assets/gaming.svg"
import wearable from "../assets/wearable.svg"
import computeraccessories from "../assets/computeraccessories.svg"
import computerstv from "../assets/computerstv.svg"
import phoneaccessories from "../assets/phoneaccessories.svg"
import homeappliances from "../assets/homeappliances.svg"
import audiomusical from "../assets/audiomusical.svg"
import cameras from "../assets/cameras.svg"


const categories = [
  { name: "Computers & TV", icon: computerstv, path: "/ComputersTv" },
  { name: "Phone Accessories", icon: phoneaccessories, path: "/PhoneAccessories" },
  { name: "Computer Accessories", icon: computeraccessories, path: "/ComputerAccessories" },
  { name: "Home Appliances", icon: homeappliances, path: "/HomeAppliances" },
  { name: "Audio & Musical", icon: audiomusical, path: "/AudioandMusical" },
  { name: "Cameras & Photograph", icon: cameras, path: "/CamerasPhotograph" },
  { name: "Gaming", icon: gaming, path: "/Gaming" },
  { name: "Wearable Technology", icon: wearable, path: "/Wearable" },
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
    <div 
    key={index} 
    className="electronics-category-item" 
    onClick={() => category.path && navigate(category.path)}
  >
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
