import React, { useState, useEffect, useRef } from "react";
import { FaRegBell, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { UserRound, Briefcase, Wallet, Settings } from "lucide-react";
import { RiHome2Line, RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import categoriesData from "../data/categoriesData.json";
import "../index.css";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Cart count state from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(storedCart.length);
    };

    updateCartCount();

    const handleStorageChange = (e) => {
      if (e.key === "cart") updateCartCount();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleDropdown = (dropdown) => {
    if (window.innerWidth <= 500) {
      if (dropdown === "user") navigate("/Signup");
      else if (dropdown === "notifications") navigate("/NotificationList");
      return;
    }
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const flattenedData = flattenSearchData(categoriesData);
      const filteredResults = flattenedData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchClick = (path) => {
    navigate(path);
    setSearchQuery("");
    setSearchResults([]);
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<strong>$1</strong>");
  };

  const flattenSearchData = (data) => {
    let searchList = [];
    data.forEach((category) => {
      searchList.push({ name: category.name, path: category.path });
      if (category.items) {
        category.items.forEach((item) =>
          searchList.push({ name: item.name, path: category.path })
        );
      }
    });
    return searchList;
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
          ref={dropdownRef}
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
            <li className="menu-item"><Link to="/" onClick={() => setActiveDropdown(null)}><RiHome2Line size={15} /> Home</Link></li>
            <li className="menu-item"><Link to="/Order" onClick={() => setActiveDropdown(null)}><Briefcase size={15} /> Orders</Link></li>
            <li className="menu-item"><Link to="/helpcenter" onClick={() => setActiveDropdown(null)}><MdOutlineSupportAgent size={15} /> Support</Link></li>
            <li className="menu-item"><Link to="/wallet" onClick={() => setActiveDropdown(null)}><Wallet size={15} /> Wallet</Link></li>
            <li className="menu-item"><Link to="/settings" onClick={() => setActiveDropdown(null)}><Settings size={15} /> Settings</Link></li>
            <li className="menu-item"><Link to="/logout" onClick={() => setActiveDropdown(null)}><RiLogoutCircleRLine size={15} /> Logout</Link></li>
          </ul>
        </div>
        <img src={logo} alt="Logo" className="logo-right" />
      </div>

      {/* Center Section: Search */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="I'm shopping for..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button">
          <CiSearch size={20} />
        </button>
        {searchQuery && searchResults.length > 0 && (
          <div className="search-dropdown">
            <ul>
              {searchResults.map((result) => (
                <li key={result.name} onClick={() => handleSearchClick(result.path)}>
                  <CiSearch className="search-icon" />
                  <span dangerouslySetInnerHTML={{ __html: highlightMatch(result.name, searchQuery) }} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Section - User, Bell, Cart */}
      <div className="navbar-right">
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
            <p className="sign-in">
              Sign in / Register <FaChevronDown size={15} />
            </p>
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
