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
    password: "", // ✅ Added missing password field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create request payload
    const payload = {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.surname,
      password: formData.password,  // ✅ Use actual password from user
      phone: formData.phone,  // ✅ Send phone number
    };
  
    try {
      const response = await fetch("https://bondfood.vercel.app/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Registration Successful:", data);
        navigate("/Verify"); // ✅ Redirect on success
      } else {
        console.error("Registration Failed:", data);
        alert(data.message || "Registration failed, please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong, please check your internet connection.");
    }
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
            <input 
              type="tel" 
              name="phone"  // ✅ Added missing name
              placeholder="000 000 0000" 
              maxLength="10"  // ✅ Fixed incorrect attribute
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <input className="curved-input"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          {/* ✅ Added password field */}
          <input className="curved-input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Submit Button */}
          <button type="submit" className="signup-btn">Continue</button>
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
