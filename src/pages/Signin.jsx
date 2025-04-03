import React, { useState } from "react";
import axios from "axios"; // Axios for API requests
import { X, ShieldBan } from "lucide-react";
import "../pages/Signin.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Signin = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "https://bondfood.vercel.app/api/login/",
        JSON.stringify(formData),  // 🔹 Ensure JSON formatting
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
  
      console.log("✅ Login Successful:", response.data);
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.detail || "Login failed. Please check your credentials.");
    }
  };
  

  return (
    <div className="signup-overlay">
      <div className="signup-modal112">
        <button className="close-btn" onClick={() => navigate("/")}>
          <X size={24} />
        </button>

        <img src={logo} alt="Feed the Nation Logo" className="logo-img1" />
        <h2 className="wb">Welcome back!</h2>
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
          <input
            className="curved-input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="signup-btn1">Submit</button>
        </form>

        <Link to="/resetpassword">
          <p className="signin2">Forgot password?</p>
        </Link>
        <p className="signin3">
          Don't have an account? <span className="signup1"><Link to="/Signup">Sign up</Link></span>
        </p>
        <p className="signin40">
          For further support, you may visit the Help Center or contact our support team.
        </p>
      </div>
    </div>
  );
};

export default Signin;
