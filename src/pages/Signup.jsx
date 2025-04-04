import React, { useState, useEffect } from "react";
import { X, ShieldBan } from "lucide-react";
import '../pages/Signup.css';
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import NigeriaFlag from "../assets/NigeriaFlag.png"; // Import the flag image

const Signup = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    countryCode: "+234",  // Default country code
    phone: "",
    dob: "",
    referral: "",
  });

  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    // Check if all fields are filled
    const { firstName, surname, email, phone, dob } = formData;
    if (firstName && surname && email && phone && dob) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [formData]);  // This hook will run every time formData changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    
    // Send formData to Password.jsx via navigation state
    navigate("/password", {
      state: {
        first_name: formData.firstName,
        last_name: formData.surname,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        referral: formData.referral,
      }
    });
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal">
        <button className="close-btn" onClick={onClose ? onClose : () => navigate("/")}>
          <X size={24} />
        </button>

        <img src={logo} alt="Feed the Nation Logo" className="logo-img" />
        <h2 className="wtbf">Welcome to BondFood!</h2>
        <p>Enter your email or phone number to create an account.</p>
        <small><ShieldBan size={24} style={{ position: "relative", top: "5px", color: "black" }} /> Your information is 100% secured</small>

        {/* Signup Form */}
        <form onSubmit={handleNext}>
          <input
            className="curved-input"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            className="curved-input"
            type="text"
            name="surname"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
          <input
            className="curved-input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="input-group">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              required
            >
              <option value="+234"><img src={NigeriaFlag} alt="" /> +234</option>
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="000 000 0000"
              maxLength="11"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <input
            className="curved-input"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          {/* Submit Button */}
          <button 
            type="submit" 
            className="signup-btn" 
            style={{ backgroundColor: isFormComplete ? '#008000' : '#DAF0C6' }}
            disabled={!isFormComplete}
          >
            Continue
          </button>
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
