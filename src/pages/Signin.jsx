import React, { useState } from 'react';
import { X, ShieldBan } from "lucide-react";
import "../pages/Signin.css";
import { Link, useNavigate } from 'react-router-dom'; 
import logo from "../assets/logo.png";

const Signin = ({ onClose }) => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    navigate("/");
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal2">
        {/* Close button */}
        <button 
          className="close-btn" 
          onClick={onClose ? onClose : () => navigate("/")}>  
          <X size={24} />
        </button>

        {/* Header */}
        <img
          src={logo}
          alt="Feed the Nation Logo"
          style={{ width: "70px", height: "70px", display: "block", margin: "auto", marginBottom: "30px" }}
        />
        <h2>Welcome back!</h2>
        <p>Enter your email or phone number to login.</p>
        <small>
          <ShieldBan size={24} style={{ position: "relative", top: "5px", color: "black" }} /> Your information is 100% secured
        </small>

        <form onSubmit={handleSubmit}>
          <input
            className="curved-input"
            type="text"
            name="email"
            placeholder="Email or Mobile Number"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="password-container">
            <input
              className="curved-input"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-password3" onClick={() => setIsPasswordVisible((prev) => !prev)}>
              &#128065;
            </span>
          </div>

          {/* Submit Button */}
          <button type="submit" className="signup-btn1">Submit</button>
        </form>

        <p className="signin2">Forgot password?</p>
        <p className="signin3">
          Don't have an account? <span className='signup1'><Link to="/Signup">Sign up</Link></span>
        </p>
        <p className="signin3">
          For further support, you may visit the Help Center or contact our support team.
        </p>
      </div>
    </div>
  );
};

export default Signin;
