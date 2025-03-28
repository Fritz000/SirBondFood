import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MarketRuns.css";
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
import bicycle from "../assets/bicycle.png";
import jacket from "../assets/jacket.png";
import doll from "../assets/doll.png";
import chair from "../assets/chair.png";
import cream from "../assets/cream.png";
import tv from "../assets/tv.png";
import dpp from "../assets/dpp.png";


const categories = [
  { name: "Food & Grocery", image: dpp },
  { name: "Electronics", image: tv },
  { name: "Home & Living", image: chair },
  { name: "Health & Beauty", image: cream },
  { name: "Fashion & Clothing", image: jacket },
  { name: "Babies & Games", image: doll },
  { name: "Sport & Outdoors", image: bicycle },
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

const MarketRuns = () => {
  const [cart, setCart] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [availableMarkets, setAvailableMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]); // Holds admin-added items + trending

  useEffect(() => {
    const fetchItems = () => {
      const storedItems = JSON.parse(localStorage.getItem("marketItems")) || [];
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
    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    // Save cart to localStorage when updated
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (selectedLocation === "Cross River State" || selectedLocation === "Rivers State") {
      setAvailableMarkets(locationMarkets[selectedLocation]);
    } else {
      setAvailableMarkets([]); // Disable markets for other locations
    }
    setSelectedMarket(""); // Reset market selection when location changes
  }, [selectedLocation]);

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

  const navigate = useNavigate();

const handleCategoryClick = (categoryName) => {
  if (categoryName === "Food & Grocery") {
    navigate("/foodandgrocery");
  }
};
  


  return (
    <div className="container106">
      <section className="ads1">Mini Ads</section>
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
      </div>
    <div className="grid-container100">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card100"
            onClick={() => {
              if (category.name === "Food & Grocery") {
                navigate("/FoodAndGrocery"); // Navigate to the correct page
              }
              if (category.name === "Electronics") {
                navigate("/Electronics"); // Navigate to the correct page
              }
              if (category.name === "Home & Living") {
                navigate("/HomeAndLiving"); // Navigate to the correct page
              }
              if (category.name === "Health & Beauty") {
                navigate("/HealthAndBeauty"); // Navigate to the correct page
              }
              if (category.name === "Fashion & Clothing") {
                navigate("/FashionAndClothing"); // Navigate to the correct page
              }
              if (category.name === "Babies & Games") {
                navigate("/BabiesAndGames"); // Navigate to the correct page
              }
              if (category.name === "Sport & Outdoors") {
                navigate("/SportAndOutdoors"); // Navigate to the correct page
              }
              if (category.name === "Feed & Seeds") {
                navigate("/FeedAndSeeds"); // Navigate to the correct page
              }
            }}
            style={{ cursor: "pointer" }} // Make it look clickable
          >
            <div className="image-icon-container100">
            <img src={category.image} alt={category.name} className="category-image100" />
            </div>
            <p className="category-name100">{category.name}</p>
          </div>
        ))}
      </div>
      <h2 className="section-title100">Trending</h2>
      <div className="trending-grid100">
      {items.map((item) => (
          <div key={item.id} className="trending-card100" onClick={() => setSelectedItem(item)}>
            <div className="category-image-icon-container100">
            <img src={item.image} alt={item.name} className="trending-image100" />
            </div>
            <div className="trending-info100">
              <p className="trending-name100">{item.name}</p>
              <p className="trending-price100">
                {item.approved ? `₦ ${item.price.toLocaleString()}` : "Pending"}
              </p>
            </div>
            <button 
              className="add-to-cart" 
              onClick={(e) => { e.stopPropagation(); addToCart(item); }}
              disabled={!item.approved}
            >+
            </button>
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

export default MarketRuns;
