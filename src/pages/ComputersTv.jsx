import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./General.css";
import { Search, ChevronLeft } from "lucide-react";
import seafoods from "../assets/fresh-bass-with-white-background1.png";
import singleredapple from "../assets/single-red-apple-with-green-leaf-water-droplets.png";
import Group from "../assets/Group.png";
import mage from "../assets/mage_filter.png";

// Categories for UI display
const categories = [
  { name: "Fruits", image: singleredapple },
  { name: "Vegetable", image: seafoods },
  { name: "Spice", image: singleredapple },
];

// Location and Market Data
const locationMarkets = {
  "Cross River State": ["Marian Market", "Watt Market"],
  "Rivers State": ["Mile 1 Market", "Oil Mill Market"],
  "Delta State": ["Ogbeogonogo Market"],
  "Lagos State": ["Balogun Market", "Computer Village"],
  "Akwa Ibom State": ["Itam Market"],
  "Abia State": ["Ariaria Market"],
  "Edo State": ["Oba Market"],
};

const ComputersTv = () => {
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]); // Holds admin-added items + trending
  const [quantity, setQuantity] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [availableMarkets, setAvailableMarkets] = useState([]);

  // Fetch items from localStorage
  const fetchItems = () => {
    const storedItems = JSON.parse(localStorage.getItem("foodGroceryItems")) || [];
    console.log("Fetched Items from localStorage: ", storedItems); // Debugging
    setItems(storedItems); // Update the state with items from localStorage
  };

  // Effect hook to fetch items on initial load and when localStorage changes
  useEffect(() => {
    fetchItems(); // Fetch items initially
    const handleStorageChange = (event) => {
      if (event.key === "foodGroceryItems") {
        fetchItems(); // Update items if there are changes in localStorage
      }
    };
    window.addEventListener("storage", handleStorageChange); // Listen to changes in localStorage
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []); // Empty dependency array to run on initial mount only

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
  };

  // Search filter for items
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding items to localStorage
  const handleAddItem = (newItem) => {
    const updatedItems = [...items, newItem];
    console.log("Adding Item: ", newItem); // Debugging: Check which item is being added
    localStorage.setItem("foodGroceryItems", JSON.stringify(updatedItems)); // Update localStorage
    setItems(updatedItems); // Update state with the new item
  };

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ChevronLeft size={32} />
      </button>
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search Computers and TV"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="category1-container">
        {categories.map((cat, index) => (
          <div key={index} className="category1-item">
            <div className={`category1-icon-wrapper ${index === 0 ? "first-icon" : ""}`}>
              <img src={cat.image} alt={cat.name} className="category1-icon" />
            </div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      <div className="dropdowns">
        {/* Location Dropdown */}
        <select
          className="dropdown"
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="" disabled selected>
            Location
          </option>
          <optgroup label="Available Region">
            {Object.keys(locationMarkets).map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </optgroup>
        </select>

        {/* Market Dropdown */}
        <select
          className="dropdown"
          onChange={(e) => setSelectedMarket(e.target.value)}
        >
          <option value="" disabled selected>
            Select Market
          </option>
          {availableMarkets.length > 0 &&
            availableMarkets.map((market) => (
              <option key={market} value={market}>
                {market}
              </option>
            ))}
        </select>
        <button className="filter-button">
          <img src={mage} alt="Filter" />
        </button>
      </div>

      <div className="trending-grid101">
        {filteredItems.map((item) => (
          <div key={item.id} className="trending-card101" onClick={() => setSelectedItem(item)}>
            <div className="category-image-icon-container101">
              <img src={item.image} alt={item.name} className="trending-image101" />
            </div>
            <div className="trending-info101">
              <p className="trending-name101">{item.name}</p>
              <p className="trending-price101">
                {item.approved ? `₦ ${item.price.toLocaleString()}` : "Pending"}
              </p>
            </div>
            <button
              className="add-to-cart101"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
              }}
              disabled={!item.approved}
            >
              + Add
            </button>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="popup-overlay" onClick={() => setSelectedItem(null)}>
          <div className="popup">
            <div className="layout-container">
              <img src={selectedItem.image} alt={selectedItem.name} className="popup-image" />
              <h3 className="popup-title">{selectedItem.name}</h3>
              <p className="popup-price">₦ {selectedItem.price.toLocaleString()}</p>
              <button className="chat-icon">
                <img src={Group} alt="" /> Chat
              </button>
              <div className="cart-item-button100">
                <button className="decrement" onClick={() => setQuantity(quantity - 1)}>
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button className="increment" onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>
            <p className="popup-description">{selectedItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComputersTv;
