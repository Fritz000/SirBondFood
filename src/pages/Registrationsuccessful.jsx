import React, {useState} from 'react'
import { X, ShieldBan } from "lucide-react"; // Close button icon
import '../pages/Regsitrationsuccessful.css'

import logo from "../assets/logo.png";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const verify = ({ onClose }) => {

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
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
    
            {/* Header */}
            <img src={logo} alt="Feed the Nation Logo" style={{ width: "70px", height: "70px", display: "block", margin: "auto", marginBottom: "30px"}} />
            <h2>Verify your email address</h2>
            <p>Please enter the 4-digit verification code sent to your [email addrsss]</p>
            <small><ShieldBan size={24} style={{ position: "relative", top: "5px", Color: "black" }}/> Your information is 100% secured</small>

            <div className="verification-code">
                <input type="text" maxlength="1" className="code-input" />
                <input type="text" maxlength="1" className="code-input" />
                <input type="text" maxlength="1" className="code-input" />
                <input type="text" maxlength="1" className="code-input" />
            </div>
    
            
              {/* Submit Button */}
              <button type="submit" className="signup-btn">
                Continue
              </button>
            
    
            <p className="terms">
              Didn't receive any code? It could take a bit of time, request a new code in  <span className="highlight">[seconds]</span>
            </p>
    
            
            <p className="signin">
            For further support, you may visit the Help Center or contact our support team.
            </p>
          </div>
        </div>
  )
}

export default verify
