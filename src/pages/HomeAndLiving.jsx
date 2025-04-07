import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import "./HomeAndLiving.css";
import {useNavigate} from "react-router-dom"
import freshbasswithwhitebackground1 from "../assets/fresh-bass-with-white-background1.png"
import stunningimpastopaintingwhitehen1 from "../assets/stunning-impasto-painting-white-hen1.png"
import dairyeggs from "../assets/412951555_bbc2c779-25c0-4851-adc1-c922a7d4c5b71.png"
import foodbasket from "../assets/138792826_4acbcb31-951d-404f-ae4d-fd34a21218761.png"


const categories = [
  { name: "Furniture", icon: freshbasswithwhitebackground1, path: "/Furniture" },
  { name: "Home Decor", icon: freshbasswithwhitebackground1, path: "/HomeDecor" },
  { name: "Kitchen & Dining", icon: stunningimpastopaintingwhitehen1, path: "/KitchenandDining" },
  { name: "House Essentials", icon: dairyeggs, path: "/HouseEssentials" },
  { name: "Bedding & Linen", icon: foodbasket, path: "/BeddingandLinen" },
  { name: "Cameras & Photograph", icon: glassmilkbottlefreshmilk1, path: "/CamerasPhotograph" },
  { name: "Gaming", icon: glassmilkbottlefreshmilk1, path: "/Gaming" },
  { name: "Wearable Technology", icon: glassmilkbottlefreshmilk1, path: "/Wearable" },
];

const HomeAndLiving = () => {
    const navigate = useNavigate();
  return (
    <div className="homeandliving-container">
  {/* Header & Search in One Container */}
  <div className="homeandliving-first-header">
    <header className="homeandliving-header">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ChevronLeft size={32} />
      </button>
      <h2 className="homeandliving">Home & Living</h2>
    </header>

    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input type="text" placeholder="Search home & living" className="search-bar" />
    </div>
  </div>
<div className="homeandliving-category-list">
  {categories.map((category, index) => (
    <div key={index} className="homeandliving-category-item">
        <div className="homeandliving-icon-container">
        <img src={category.icon} alt={category.name} className="homeandliving-category-icon" />
      </div>
      <span className="homeandliving-category-name">{category.name}</span>
      <button className="homeandliving-arrow-button">
        <ChevronRight size={28} /> {/* Increased size */}
      </button>
    </div>
  ))}
</div>
    </div>
  );
};

export default HomeAndLiving;
