import React, { useState } from "react";
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

    // Simulate backend authentication (Replace this with API request)
    const userData = {
      firstName: "John", // This should come from the backend after login
      email: formData.email,
    };

    // Save user info in state and localStorage
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Redirect to home page
    navigate("/");
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal2">
      <button className="close-btn" onClick={() => navigate("/")}>
  <X size={24} />
</button>

        <img src={logo} alt="Feed the Nation Logo" style={{ width: "150px", height: "150px", display: "block", margin: "auto", marginBottom: "30px" }} />
        <h2>Welcome back!</h2>
        <p>Enter your email or phone number to login.</p>
        <small>
          <ShieldBan size={24} style={{ position: "relative", top: "5px", color: "black" }} /> Your information is 100% secured
        </small>

        <form onSubmit={handleSubmit}>
          <input className="curved-input" type="text" name="email" placeholder="Email or Mobile Number" value={formData.email} onChange={handleChange} required />
          <input className="curved-input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="signup-btn1">Submit</button>
        </form>

        <Link to="/resetpassword"><p className="signin2">Forgot password?</p></Link>
        <p className="signin3">Don't have an account? <span className="signup1"><Link to="/Signup">Sign up</Link></span></p>
      </div>
    </div>
  );
};

export default Signin;