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
  const [user, setUser] = useState(null); // To store user profile data
  const storedToken = localStorage.getItem("authToken"); // Get token from localStorage

  // Fetch user profile using Axios
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (storedToken) {
        try {
          const response = await axios.get("https://bondfood.vercel.app/api/profile/", {
            headers: {
              "Authorization": `Bearer ${storedToken}`, // Pass token for authentication
            },
          });

          setUser(response.data); // Set the user data from response
        } catch (error) {
          setError("Failed to fetch user profile. Please log in again.");
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchUserProfile(); // Call the function to fetch user profile on component mount
  }, [storedToken]); // Run effect when the token changes

  const navigate = useNavigate();

  // Cart count update function
  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  };

  useEffect(() => {
    updateCartCount();

    // Listen for storage updates across tabs/windows
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
        navigate("/Signup"); // Redirect to Signup
        return;
      } else if (dropdown === "notifications") {
        navigate("/NotificationList"); // Redirect to Notifications page
        return;
      }
    }

    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest(".dropdown, .hamburger-menu, .user-info, .icon-button")) {
      setActiveDropdown(null);
    }
  };

  return (
    <div className="navbar" onClick={closeDropdown}>
      {/* Left Section - Menu & Logo */}
      <div className="navbar-left">
        <button className="hamburger-menu" onClick={(e) => { e.stopPropagation(); toggleDropdown("menu"); }}>
          <HiMenuAlt2 size={24} />
        </button>
        <div className={`dropdown-menu ${activeDropdown === "menu" ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
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
            <li className="menu-item"><Link to="/support" onClick={() => setActiveDropdown(null)}><MdOutlineSupportAgent size={15} /> Support</Link></li>
            <li className="menu-item"><Link to="/wallet" onClick={() => setActiveDropdown(null)}><Wallet size={15} /> Wallet</Link></li>
            <li className="menu-item"><Link to="/settings" onClick={() => setActiveDropdown(null)}><Settings size={15} /> Settings</Link></li>
            <li className="menu-item"><Link to="/logout" onClick={() => setActiveDropdown(null)}><RiLogoutCircleRLine size={15} /> Logout</Link></li>
          </ul>
        </div>
      </div>

      {/* Center Section: Search Bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-button"><CiSearch size={20} /></button>
      </div>

      {/* Right Section: User, Notifications & Cart */}
      <div className="navbar-right">
        {/* User Dropdown */}
        <div className="user-info" onClick={(e) => { e.stopPropagation(); toggleDropdown("user"); }}>
          <UserRound className="user-info-icon" />
          <div className="user-text">
            <p className="user-welcome">Welcome,</p>
            {user ? (
              <p className="user-name">{user.firstName} {user.lastName} <FaChevronDown size={15} /></p>
            ) : (
              <p className="sign-in">Sign in / Register <FaChevronDown size={15} /></p>
            )}
          </div>
        </div>
        <div className={`user-dropdown ${activeDropdown === "user" ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
          <Link to="/Signin"><button>Sign in</button></Link>
          <Link to="/Signup"><button className="register1">Register</button></Link>
          <ul className="registerway">
            <li><Link to="/profile"><UserRound className="userround" /> My Account</Link></li>
            <li><Link to="/orders"><Briefcase className="userbriefcase" /> My Orders</Link></li>
            <li><Link to="/wallet"><Wallet className="userwallet" /> Wallet</Link></li>
            <li><Link to="/settings"><Settings className="usersettings"/> Settings</Link></li>
          </ul>
        </div>

        {/* Notifications Dropdown */}
        <button className="icon-button" onClick={(e) => { e.stopPropagation(); toggleDropdown("notifications"); }}>
          <FaRegBell className="faregbell" />
        </button>
        <div className={`notifications-dropdown ${activeDropdown === "notifications" ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
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
