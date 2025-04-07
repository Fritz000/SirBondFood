import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Wearable.css";
import { Search, ChevronLeft } from "lucide-react";
import seafoods from "../assets/fresh-bass-with-white-background1.png";
import singleredapple from "../assets/single-red-apple-with-green-leaf-water-droplets.png";
import tangerine from "../assets/tangerine.png";
import avocado from "../assets/avocado.png";
import agbalumo from "../assets/agbalumo.png";
import souvenir from "../assets/souvenir.png";
import pineapple from "../assets/pineapple.png";
import Group from "../assets/Group.png";
import { ChevronRight } from "lucide-react";
import Star from "../assets/STAR.png"
import rev from "../assets/rev.png"
import mage from "../assets/mage_filter.png"


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

const Wearable = () => {
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
            <button className="back-button" onClick={() => navigate(-1)}>
                    <ChevronLeft size={32} />
                  </button>
            <div className="search-container">
            <Search className="search-icon" size={20} />
            <input type="text" placeholder="Search food & grocery" className="search-bar" />
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
          <option value="" disabled selected>Location</option>
          <optgroup label="Available Region">
            <option value="Cross River State">Cross River State</option>
            <option value="Rivers State">Rivers State</option>
          </optgroup>
          <optgroup label="Regions Coming Soon">
            <option value="Delta State">Delta State</option>
            <option value="Lagos State">Lagos State</option>
            <option value="Akwa Ibom State">Akwa Ibom State</option>
            <option value="Abia State">Abia State</option>
            <option value="Edo State">Edo State</option>
          </optgroup>
        </select>
            {/* Market Dropdown */}
              <select 
                className="dropdown" 
                onChange={(e) => setSelectedMarket(e.target.value)}
              >
                <option value="" disabled selected>Market</option>
                <optgroup label="Available Region">
                  <option value="Cross River State">Cross River State</option>
                  <option value="Rivers State">Rivers State</option>
                </optgroup>
                <optgroup label="Regions Coming Soon">
                  <option value="Delta State">Delta State</option>
                  <option value="Lagos State">Lagos State</option>
                  <option value="Akwa Ibom State">Akwa Ibom State</option>
                  <option value="Abia State">Abia State</option>
                  <option value="Edo State">Edo State</option>
                </optgroup>
              </select>
            
              {/* Filter Button */}
              <button className="filter-button10">
                <img src={mage} alt="Filter" />
              </button>
            </div>
            
            
            
                  <div className="trending-gridh">
                    {items.map((item) => (
                      <div key={item.id} className="trending-cardh" onClick={() => setSelectedItem(item)}>
                        <div className="trending1-imageh">
                        <img src={item.image} alt={item.name} className="trending-imageh" />
                        </div>
                        <div className="trending-itemh">
              <div className="trending-infoh">
                <p className="trending-nameh">{item.name}</p>
                <p className="trending-priceh">₦ {item.price.toLocaleString()}</p>
              </div>
              <button 
                className="add-to-carth" 
                onClick={(e) => { e.stopPropagation(); addToCart(item); }}
              >
                + Add
              </button>
            </div>
            
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

export default Wearable;
