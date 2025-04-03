import React, { useState, useEffect, useRef } from "react";
import { FaRegBell, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { UserRound, Briefcase, Wallet, Settings } from "lucide-react";
import { RiHome2Line, RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search input
  const [searchResults, setSearchResults] = useState([]); // State for search suggestions
  const storedToken = localStorage.getItem("authToken");

  const dropdownRef = useRef(null); // To reference the dropdown container
  const navigate = useNavigate(); // For navigation

  // Hardcoded list of possible pages to search
  const pages = [
    { name: "Home", path: "/" },
    { name: "Market Runs", path: "/MarketRuns" },
    { name: "Wallet", path: "/Wallet" },
    { name: "Food and Grocery", path: "/FoodAndGrocery" },
    { name: "Electronics", path: "/Electronics" },
    { name: "Home and Living", path: "/HomeAndLiving" },
    { name: "Health and Beauty", path: "/HealthAndBeauty" },
    { name: "Fashion and Clothing", path: "/FashionAndClothing" },
    { name: "Babies And Games", path: "/BabiesAndGames" },
    { name: "Sport and Outdoors", path: "/SportAndOutdoors" },
    { name: "Orders", path: "/orders" },
    { name: "Settings", path: "/settings" },
    { name: "Support", path: "/support" },
    // Add more pages if needed
  ];

  // Fetch user profile using Axios
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (storedToken) {
        try {
          const response = await axios.get("https://bondfood.vercel.app/api/profile/", {
            headers: {
              "Authorization": `Bearer ${storedToken}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [storedToken]);

  // Cart count update function
  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  };

  useEffect(() => {
    updateCartCount();

    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        updateCartCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Toggle dropdown menu for mobile view
  const toggleDropdown = (dropdown) => {
    if (window.innerWidth <= 500) {
      if (dropdown === "user") {
        navigate("/Signup");
        return;
      } else if (dropdown === "notifications") {
        navigate("/NotificationList");
        return;
      }
    }

    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the dropdown
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      // Filter pages based on the search query (case-insensitive)
      const filteredResults = pages.filter((page) =>
        page.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  // Handle search suggestion click
  const handleSearchClick = (path) => {
    navigate(path); // Navigate to the corresponding page
    setSearchQuery(""); // Optionally clear the search input
    setSearchResults([]); // Clear search results
  };

  return (
    <div className="navbar">
      {/* Left Section - Menu & Logo */}
      <div className="navbar-left">
        <button
          className="hamburger-menu"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown("menu");
          }}
        >
          <HiMenuAlt2 size={24} />
        </button>
        <div
          className={`dropdown-menu ${activeDropdown === "menu" ? "show" : ""}`}
          onClick={(e) => e.stopPropagation()}
          ref={dropdownRef} // Reference the dropdown
        >
          <h3 className="menu-title">
            <button className="hamburger-menu" onClick={() => toggleDropdown("menu")}>
              <HiMenuAlt2 style={{ marginRight: "2px" }} size={24} /> Menu
            </button>
          </h3>
          <div className="menu-logo">
            <img src={logo} alt="Logo" className="logo-left" />
          </div>
          <ul>
            <li className="menu-item">
              <Link to="/" onClick={() => setActiveDropdown(null)}>
                <RiHome2Line size={15} /> Home
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/Order" onClick={() => setActiveDropdown(null)}>
                <Briefcase size={15} /> Orders
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/support" onClick={() => setActiveDropdown(null)}>
                <MdOutlineSupportAgent size={15} /> Support
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/wallet" onClick={() => setActiveDropdown(null)}>
                <Wallet size={15} /> Wallet
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/settings" onClick={() => setActiveDropdown(null)}>
                <Settings size={15} /> Settings
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/logout" onClick={() => setActiveDropdown(null)}>
                <RiLogoutCircleRLine size={15} /> Logout
              </Link>
            </li>
          </ul>
        </div>
        <img src={logo} alt="Logo" className="logo-right" />
      </div>

      {/* Center Section: Search Bar */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button">
          <CiSearch size={20} />
        </button>
        
        {/* Dropdown for search suggestions */}
        {searchQuery && searchResults.length > 0 && (
          <div className="search-dropdown">
            <ul>
              {searchResults.map((result) => (
                <li key={result.name} onClick={() => handleSearchClick(result.path)}>
                  {result.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Section: User, Notifications & Cart */}
      <div className="navbar-right">
        {/* User Dropdown */}
        <div
          className="user-info"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown("user");
          }}
        >
          <UserRound className="user-info-icon" />
          <div className="user-text">
            <p className="user-welcome">Welcome,</p>
            {user ? (
              <p className="user-name">
                {user.firstName} {user.lastName} <FaChevronDown size={15} />
              </p>
            ) : (
              <p className="sign-in">
                Sign in / Register <FaChevronDown size={15} />
              </p>
            )}
          </div>
        </div>
        <div
          className={`user-dropdown ${activeDropdown === "user" ? "show" : ""}`}
          onClick={(e) => e.stopPropagation()}
          ref={dropdownRef}
        >
          <Link to="/Signin"><button>Sign in</button></Link>
          <Link to="/Signup"><button className="register1">Register</button></Link>
          <ul className="registerway">
            <li><Link to="/profile"><UserRound className="userround" /> My Account</Link></li>
            <li><Link to="/orders"><Briefcase className="userbriefcase" /> My Orders</Link></li>
            <li><Link to="/wallet"><Wallet className="userwallet" /> Wallet</Link></li>
            <li><Link to="/settings"><Settings className="usersettings" /> Settings</Link></li>
          </ul>
        </div>

        {/* Notifications Dropdown */}
        <button
          className="icon-button"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown("notifications");
          }}
        >
          <FaRegBell className="faregbell" />
        </button>
        <div
          className={`notifications-dropdown ${activeDropdown === "notifications" ? "show" : ""}`}
          onClick={(e) => e.stopPropagation()}
          ref={dropdownRef}
        >
          <div className="dropdown-notch"></div>
          <ul>
            <li>No new notifications</li>
          </ul>
        </div>

        {/* Shopping Cart with Dynamic Count */}
        <Link to={cartCount > 0 ? "/Populatedcart" : "/Emptycart"}>
          <button className="icon-button">
            <FaShoppingCart className="fashoppingcart" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
