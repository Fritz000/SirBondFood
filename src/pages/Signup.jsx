import React, { useState } from "react";
import { X, ShieldBan } from "lucide-react"; // Close button icon
import '../pages/Signup.css'
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Signup = ({ onClose }) => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    dob: "",
    referral: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal">
        {/* Close button */}
        <button 
          className="close-btn" 
          onClick={onClose ? onClose : () => navigate("/")}>  
          <X size={24} />
        </button>

        {/* Header */}
        <img src={logo} alt="Feed the Nation Logo" className="logo-img" />
        <h2 className="wtbf">Welcome to BondFood!</h2>
        <p>Enter your email or phone number to create an account.</p>
        <small><ShieldBan size={24} style={{ position: "relative", top: "5px", Color: "black" }}/> Your information is 100% secured</small>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <input className="curved-input"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input className="curved-input"
            type="text"
            name="surname"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
          <input className="curved-input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="input-group">
            <select>
              <option value="+234">+234</option>
            </select>
            <input type="tel" placeholder="000 000 0000" maxlength="10"/>
          </div>

          <input className="curved-input"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          <input className="curved-input"
            type="text"
            name="referral"
            placeholder="Referral Code (Optional)"
            value={formData.referral}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <Link to="/Verify"><button type="submit" className="signup-btn">Continue</button></Link>
        </form>

        <p className="terms">
          By continuing, you agree to our <span className="highlight">Terms and Conditions</span>
        </p>

        {/* Social Media Signup */}
        <div className="social-signup">
            <div className="separator">
                <div className="line"></div>
                    <span className="text">or continue with</span>
                <div className="line"></div>
            </div>
          <div className="social-icons">
            <FaGoogle className="icon" size={32} />
            <FaApple className="icon" size={32} />
            <FaFacebook className="icon" size={32} />
            <FaXTwitter className="icon" size={32} />
          </div>
        </div>

        {/* Already have an account */}
        <p className="signin">
          Already have an account? <span className="highlight"><Link to="/Signin">Sign in</Link></span>
        </p>
        <p className="signin">
        For further support, you may visit the Help Center or contact our support team.
        </p>
      </div>
    </div>
  );
};

export default Signup;
