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
import Star from "../assets/STAR.png";
import rev from "../assets/rev.png";
import bicycle from "../assets/bicycle.svg";
import jacket from "../assets/jacket.svg";
import doll from "../assets/doll.svg";
import chair from "../assets/chair.svg";
import cream from "../assets/cream.svg";
import tv from "../assets/Tv.svg";
import dpp from "../assets/dpp.svg";
import flashsale from "../assets/flashsale.svg";

const categories = [
  { name: "Flash Sales", image: flashsale },
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
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = () => {
      let storedItems = JSON.parse(localStorage.getItem("marketItems")) || [];

      storedItems = storedItems.map((item) => ({
        ...item,
        originalPrice: item.originalPrice || (item.price * 1.2),
      }));

      setItems(storedItems);
    };

    fetchItems();

    const handleStorageChange = (event) => {
      if (event.key === "marketItems") {
        fetchItems();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (selectedLocation === "Cross River State" || selectedLocation === "Rivers State") {
      setAvailableMarkets(locationMarkets[selectedLocation]);
    } else {
      setAvailableMarkets([]);
    }
    setSelectedMarket("");
  }, [selectedLocation]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [popupStep, setPopupStep] = useState("product");

  const openPopup = (item) => {
    setSelectedItem(item);
    setPopupStep("product");
  };

  const closePopup = () => {
    setSelectedItem(null);
    setPopupStep("product");
  };

  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    if (categoryName === "Food & Grocery") {
      navigate("/foodandgrocery");
    }
  };

  // Get total cart count
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="container106">
      <section className="ads1">Mini Ads</section>
      <div className="dropdowns">
        <select className="dropdown" onChange={(e) => setSelectedLocation(e.target.value)}>
          <option value="" disabled selected>Location</option>
          <optgroup label="Available Region">
            {Object.keys(locationMarkets).map((location) => (
              <option key={location} value={location} disabled={!(location === "Cross River State" || location === "Rivers State")}>
                {location}
              </option>
            ))}
          </optgroup>
        </select>

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
            className={`category-card100 ${category.name === "Flash Sales" ? "flash-sales-special" : ""}`}
            onClick={() => {
              if (category.name === "Flash Sales") {
                navigate("/FlashSales");
              }
              if (category.name === "Food & Grocery") {
                navigate("/FoodAndGrocery");
              }
            }}
            style={{ cursor: "pointer" }}
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
          <div key={item.id} className="trending-card100" onClick={() => openPopup(item)}>
            <div className="category-image-icon-container100">
              <img src={item.image} alt={item.name} className="trending-image100" />
            </div>
            <div className="trending-info100">
              <p className="trending-name100">{item.name}</p>
              <p className="trending-price100 discounted-price">
                {item.approved ? `₦ ${item.price.toLocaleString()}` : "Pending"}
              </p>
              {item.originalPrice > 0 && (
                <p className="trending-price100 slashed-price">
                  ₦ {item.originalPrice.toLocaleString()}
                </p>
              )}
            </div>

            <button
              className="add-to-cart1"
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
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="layout-container">
              <div className="layout-container-image10">
                <img src={selectedItem.image} alt={selectedItem.name} className="popup-image" />
              </div>
              <div className="popup-title-content">
                <h3 className="popup-title">{selectedItem.name}</h3>
                <p className="popup-price">₦ {selectedItem.price.toLocaleString()}</p>
              </div>
              <div className="chat-icon-button">
                <button className="chat-icon"> <img src={Group} className="groupchat" alt="" /> Chat</button>
                <div className="cart-item-button100">
                  <button className="decrement" onClick={() => addToCart(selectedItem)}> - </button>
                  <span className="quantity">{cart.find(item => item.id === selectedItem.id)?.quantity || 0}</span>
                  <button className="increment" onClick={() => addToCart(selectedItem)}> + </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketRuns;
