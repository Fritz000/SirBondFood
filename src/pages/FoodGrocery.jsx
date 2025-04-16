import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FoodGrocery.css";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import seafoods from "../assets/fresh-bass-with-white-background1.png";
import singleredapple from "../assets/single-red-apple-with-green-leaf-water-droplets.png";
import tangerine from "../assets/tangerine.png";
import avocado from "../assets/avocado.png";
import agbalumo from "../assets/agbalumo.png";
import souvenir from "../assets/souvenir.png";
import pineapple from "../assets/pineapple.png";
import Group from "../assets/Group.png";
import mage from "../assets/mage_filter.png";

const categories = [
  { name: "Fruits", image: singleredapple },
  { name: "Vegetable", image: seafoods },
  { name: "Spice", image: singleredapple },
];

// Hardcoded trending items
const trendingItems = [
  { id: 1, name: "Red Apple", price: 500, image: singleredapple, description: "Fresh red apple with juicy taste." },
  { id: 2, name: "Avocado", price: 500, image: avocado, description: "Rich and creamy avocado, great for salads." },
  { id: 3, name: "Tangerine", price: 500, image: tangerine, description: "Sweet and tangy tangerine packed with vitamins." },
  { id: 4, name: "Agbalumo", price: 200, image: agbalumo, description: "Nigerian cherry, also known as Udara." },
  { id: 5, name: "Souvenir Fruitpacks", price: 500, image: souvenir, description: "A mix of 6 fresh fruits." },
  { id: 6, name: "Pineapple", price: 500, image: pineapple, description: "Tropical pineapple, rich in vitamin C." },
];

const locationMarkets = {
  "Cross River State": ["Marian Market", "Watt Market"],
  "Rivers State": ["Mile 1 Market", "Oil Mill Market"],
  "Delta State": ["Ogbeogonogo Market"],
  "Lagos State": ["Balogun Market", "Computer Village"],
  "Akwa Ibom State": ["Itam Market"],
  "Abia State": ["Ariaria Market"],
  "Edo State": ["Oba Market"],
};


const comments = [
  { id: 1, name: "Kilomon", date: "Feb 9, 2025", verified: true, rating: 5, comment: "Fruit was fresh and lovely product packaging" },
  { id: 2, name: "Jack", date: "Feb 9, 2025", verified: true, rating: 4, comment: "Fruit was fresh, also bigger than I expected and lovely product packaging" },
];

const FoodGrocery = () => {
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]); // Holds admin-added items + trending
  const [quantity, setQuantity] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [availableMarkets, setAvailableMarkets] = useState([]);


  useEffect(() => {
    // Fetch items from "foodGroceryItems" instead of "marketItems"
    const storedItems = JSON.parse(localStorage.getItem("foodGroceryItems")) || [];
    setItems([...trendingItems, ...storedItems]); // Combine trending + admin items
  }, []);

  useEffect(() => {
      const fetchItems = () => {
        const storedItems = JSON.parse(localStorage.getItem("foodGroceryItems")) || [];
        setItems(storedItems);
      };
    
      fetchItems(); // Fetch initially
    
      const handleStorageChange = (event) => {
        if (event.key === "marketItems") {
          fetchItems(); // Update state when localStorage changes
        }
      };
    
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

  useEffect(() => {
    // Save cart to localStorage when updated
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const getQuantity = (id) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ChevronLeft size={32} />
      </button>
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input type="text" placeholder="Search food & grocery" className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
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
        <select className="dropdown" onChange={(e) => setSelectedLocation(e.target.value)}>
          <option value="" disabled selected>Location</option>
          <optgroup label="Available Region">
            {Object.keys(locationMarkets).map((location) => (
              <option 
                key={location} 
                value={location} 
                disabled={!(location === "Cross River State" || location === "Rivers State")}
              >
                {location}
              </option>
            ))}
          </optgroup>
        </select>

        {/* Market Dropdown (Only enabled for Cross River and Rivers State) */}
        <select 
          className="dropdown" 
          onChange={(e) => setSelectedMarket(e.target.value)} 
          disabled={availableMarkets.length === 0}
        >
          <option value="" disabled selected>Select Market</option>
          {availableMarkets.map((market) => (
            <option key={market} value={market}>{market}</option>
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
          onClick={(e) => { e.stopPropagation(); addToCart(item); }}
          disabled={!item.approved}
        >+ Add
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
              <button className="chat-icon"><img src={Group} alt="" /> Chat</button>
              <div className="cart-item-button100">
                <button className="decrement" onClick={decrementQuantity}>-</button>
                <span className="quantity">{getQuantity(selectedItem.id)}</span>
                <button className="increment" onClick={() => addToCart(selectedItem)}>+</button>
              </div>
            </div>
            <p className="popup-description">{selectedItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodGrocery;
