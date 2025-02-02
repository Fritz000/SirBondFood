import React, {useState} from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { FaRegBell } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);


  return (
    <div className="navbar">
      
      <div className="navbar-left">
        <button className="hamburger-menu" onClick={toggleMenu}>
          <IoMenu size={24} />
        </button>
        <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
          <h3 className="menu-title">
            <button className="hamburger-menu" onClick={toggleMenu}>
              <IoMenu size={24} /> Menu
            </button>
          </h3>
          <ul>
            <li className="menu-item"><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li className="menu-item"><Link to="/orders" onClick={closeMenu}>Orders</Link></li>
            <li className="menu-item"><Link to="/notifications" onClick={closeMenu}>Notifications</Link></li>
            <li className="menu-item"><Link to="/settings" onClick={closeMenu}>Settings</Link></li>
            <li className="menu-item"><Link to="/logout" onClick={closeMenu}>Logout</Link></li>
          </ul>
        </div>
        <img src={logo} alt="Feed the Nation Logo" style={{ width: "70px", height: "70px" }} />
      </div>

      {/* Center Section: Search Bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-button"><CiSearch size={20} /></button>
      </div>

      {/* Right Section: User Info and Icons */}
      <div className="navbar-right">
        <div className="user-info">
          <div className="user-avatar">CB</div>
          <div className="user-text">
            <p className="user-welcome">Welcome,</p>
            
            <p className="sign-in">
                <Link to="/Signup">Sign in / Register</Link> <FaChevronDown  size={20} />
            </p>
      
          </div>
        </div>
        <button className="icon-button"><FaRegBell  size={24}/> </button>
        <button className="icon-button"><FaShoppingCart size={24} /></button>
      </div>
    </div>
  )
}

export default Navbar
