import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaRegBell, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RiHome2Line } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { UserRound, Briefcase, Wallet, Settings, Bell } from "lucide-react";
import { IoMenu } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <button className="hamburger-menu" onClick={toggleMenu}>
          <IoMenu size={24} />
        </button>
        <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
          <h3 className="menu-title">
            <button className="hamburger-menu" onClick={toggleMenu}>
              <IoMenu style={{marginRight: "2px"}} size={24} />Menu
            </button>
          </h3>
          <ul>
            <li className="menu-item">
              <Link to="/" onClick={closeMenu}>
              <RiHome2Line style={{marginRight: "10px"}} size={15}/> Home
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/orders" onClick={closeMenu}>
              <Briefcase style={{marginRight: "10px"}} size={15}/> Orders
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/notifications" onClick={closeMenu}>
              <MdOutlineSupportAgent style={{marginRight: "7px"}} size={15}/> Support
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/settings" onClick={closeMenu}>
              <Wallet style={{marginRight: "10px"}} size={15}/> Wallet
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/settings" onClick={closeMenu}>
              <Bell style={{marginRight: "7px"}} size={15}/> Notifications
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/settings" onClick={closeMenu}>
              <Settings style={{marginRight: "7px"}} size={15}/> Settings
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/logout" onClick={closeMenu}>
              <RiLogoutCircleRLine style={{marginRight: "7px"}} size={15}/> Logout
              </Link>
            </li>
          </ul>
        </div>
        <img src={logo} alt="Feed the Nation Logo" style={{ width: "70px", height: "70px" }} />
      </div>

      {/* Center Section: Search Bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-button">
          <CiSearch size={20} />
        </button>
      </div>

      {/* Right Section: User Info and Icons */}
      <div className="navbar-right">
        <div className="user-info" onClick={toggleDropdown}>
        <UserRound style={{ marginRight: '10px' }} size={24}/>
          <div className="user-text">
            <p className="user-welcome">Welcome,</p>
            <p className="sign-in">
              Sign in / Register <FaChevronDown size={15} />
            </p>
          </div>
        </div>
        <div className={`user-dropdown ${dropdownOpen ? "show" : ""}`}>
          <div className="dropdown-notch"></div>
          <Link to="/Signin"><button>Sign in</button></Link>
          <Link to="/Signup"><button className="register1">Register</button></Link>
          <ul>
            <li>
              <Link to="/profile"> <UserRound style={{ marginRight: '10px' }} size={15}/> My Account</Link>
            </li>
            <li>
              <Link to="/orders"><Briefcase style={{marginRight: "10px"}} size={15}/> My Orders</Link>
            </li>
            <li>
              <Link to="/logout"><Wallet style={{marginRight: "10px"}} size={15}/> Wallet</Link>
            </li>
            <li>
              <Link to="/"><Settings style={{marginRight: "10px"}} size={15}/> Settings</Link>
            </li>
          </ul>
        </div>
        <button className="icon-button">
          <FaRegBell size={24} />
        </button>
        <Link to="/Emptycart">
        <button className="icon-button">
          <FaShoppingCart size={24} />
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
