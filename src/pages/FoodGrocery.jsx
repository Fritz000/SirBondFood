import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FoodGrocery.css";
import { FaStar } from "react-icons/fa";
import Vector1 from "../assets/Vector1.png";
import seafoods from "../assets/fresh-bass-with-white-background1.png";
import stunning from "../assets/stunning-impasto-painting-white-hen1.png";
import grain from "../assets/412951555_bbc2c779-25c0-4851-adc1-c922a7d4c5b71.png";
import singleredapple from "../assets/single-red-apple-with-green-leaf-water-droplets.png";
import seeds from "../assets/single-red-apple-with-green-leaf-water-droplets2.png";
import vegetables from "../assets/138792826_4acbcb31-951d-404f-ae4d-fd34a21218761.png";
import glassmilkbottle from "../assets/glass-milk-bottle-fresh-milk1.png";
import tangerine from "../assets/tangerine.png";
import avocado from "../assets/avocado.png";
import agbalumo from "../assets/agbalumo.png";
import souvenir from "../assets/souvenir.png";
import pineapple from "../assets/pineapple.png";
import Group from "../assets/Group.png";
import { ChevronRight } from "lucide-react";
import Star from "../assets/STAR.png"
import rev from "../assets/rev.png"


const categories = [
  { name: "Fruits", image: singleredapple },
  { name: "Vegetable", image: seafoods  },
  { name: "Spice", image: singleredapple }
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

const comments = [
  {
    id: 1,
    name: "Kilomon",
    date: "Feb 9, 2025",
    verified: true,
    rating: 5,
    comment: "Fruit was fresh and lovely product packaging",
  },
  {
    id: 2,
    name: "Jack",
    date: "Feb 9, 2025",
    verified: true,
    rating: 4,
    comment: "Fruit was fresh, also bigger than I expected and lovely product packaging",
  },
];

const FoodGrocery = () => {
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]); // Holds admin-added items + trending

  useEffect(() => {
    // Fetch items from localStorage (admin-added items)
    const storedItems = JSON.parse(localStorage.getItem("marketItems")) || [];
    setItems([...trendingItems, ...storedItems]); // Combine trending + admin items
  }, []);

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    // Save cart to localStorage when updated
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
  };

  const [popupStep, setPopupStep] = useState("product"); // 'product' or 'description'

// Open product popup
const openPopup = (item) => {
  setSelectedItem(item);
  setPopupStep("product");
};

// Close all popups
const closePopup = () => {
  setSelectedItem(null);
  setPopupStep("product"); // Reset back to product step
};

  const [quantity, setQuantity] = useState(0); // Start with 0
  const incrementQuantity = () => {
    if (quantity === 0) {
      addToCart(selectedItem); // Add item to cart if it's the first click
    }
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
      if (quantity === 1) {
        removeFromCart(selectedItem); // Remove item from cart if 0
      }
    }
  };

  const getQuantity = (id) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");

  const navigate = useNavigate();

const handleCategoryClick = (categoryName) => {
  if (categoryName === "Food & Grocery") {
    navigate("/foodandgrocery");
  }
};
  


  return (
    <div className="container">
      <div className="category-container">
        {categories.map((cat, index) => (
          <div key={index} className="category-item">
          <img src={cat.image} alt={cat.name} className="category-icon" />
          <p>{cat.name}</p>
        </div>
        
        ))}
      </div>
       <div className="dropdowns">
      {/* Location Dropdown */}
      <select 
        className={`dropdown ${selectedLocation ? 'active' : ''}`} 
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="" disabled selected>Location</option>
        <option value="New York">New York</option>
        <option value="Los Angeles">Los Angeles</option>
        <option value="Chicago">Chicago</option>
        <option value="Houston">Houston</option>
        <option value="Miami">Miami</option>
      </select>

      {/* Market Dropdown */}
      <select 
        className={`dropdown ${selectedMarket ? 'active' : ''}`} 
        onChange={(e) => setSelectedMarket(e.target.value)}
      >
        <option value="" disabled selected>Market</option>
        <option value="Stock Market">Stock Market</option>
        <option value="Real Estate">Real Estate</option>
        <option value="Cryptocurrency">Cryptocurrency</option>
        <option value="Retail">Retail</option>
        <option value="Automotive">Automotive</option>
      </select>
    </div>

    <div className="grid-container">
        
      </div>
      <h2 className="section-title">Market Runs</h2>
      
      <div className="trending-grid">
        {items.map((item) => (
          <div key={item.id} className="trending-card" onClick={() => setSelectedItem(item)}>
            <img src={item.image} alt={item.name} className="trending-image" />
            <div className="trending-info">
              <p className="trending-name">{item.name}</p>
              <p className="trending-price">₦ {item.price.toLocaleString()}</p>
            </div>
            <button className="add-to-cart" onClick={(e) => { e.stopPropagation(); addToCart(item); }}>+</button>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="popup-overlay" onClick={closePopup}>
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          <div className="layout-container">
            <div className="layout-container-image">
          <img src={selectedItem.image} alt={selectedItem.name} className="popup-image" />
          </div>
          <div className="popup-title-content">
          <h3 className="popup-title">{selectedItem.name}</h3>
          <p className="popup-price">₦ {selectedItem.price.toLocaleString()}</p>
          </div>
          <div className="chat-icon-button">
          <button className="chat-icon" onClick={() => addToCart(selectedItem)}> <img src={Group} className="groupchat" alt="" /> Chat</button>
          <div className="cart-item-button100">
  <button className="decrement" onClick={decrementQuantity}>-</button>
  <span className="quantity">{getQuantity(selectedItem.id)}</span>
  <button className="increment" onClick={() => addToCart(selectedItem)}>+</button>
</div>


          </div>
          </div>
          {/* Button to open Description */}
          <div className="layout-container1">
            <div className="descriptionrole">
              <p className="descriptionof">Description</p>
              <div className="descriptionicons">
                <button className="description-back-btn1" onClick={() => setPopupStep("description")}>
                  <ChevronRight />
                </button>
              </div>
            </div>
            <hr className="description-line" />
            
          <p className="popup-description">{selectedItem.description}</p>
          </div>
          <div className="layout-container2">
          <div className="descriptionrole1">
            <p className="descriptionof1">4.8 (742)</p>
          <div className="star-icon">  
            <img src={Star} alt="" />
            </div>
          </div>
          <hr className="description-line"/>
          <section className="review">
            <h4 className="review-text">Reviews</h4>
            <button className="review-back-btn1" onClick={() => navigate(-1)}>  
            <h4 className="seeall">See all</h4><ChevronRight />
          </button>
          </section>
          <section className="review-image">
            <img src={rev} alt="" />
          </section>
          <hr className="description-line"/>
          {comments.map((review) => (
        <div key={review.id} className="comment-card">
          <div className="comment-header">
            <div className="comment-avatar">K</div>
            <div className="comment-details">
              <p className="comment-name">{review.name} | <span className="comment-date">{review.date}</span></p>
              {review.verified && <p className="verified">Verified Purchased</p>}
            </div>
          </div>
          <div className="comment-rating">
          <div className="star-icon10">  
            <img src={Star} alt="" />
            </div>
          </div>
          <p className="comment-text">{review.comment}</p>
        </div>
      ))}
    </div>
        </div>  
        </div>
    )}
  </div>
  );
};

export default FoodGrocery;
