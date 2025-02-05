import React, { useState } from 'react';
import { X, ShieldBan } from "lucide-react";
import "../pages/Resetpassword.css";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

const Resetpassword = ({ onClose }) => {
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        email: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                <h2>Reset your password</h2>
                <p>We will send a security code to the email address below to reset your password.</p>
                <small>
                    <ShieldBan size={24} style={{ position: "relative", top: "5px", color: "black" }} /> Your information is 100% secured
                </small>

                <form>
                    <div className="password-container">
                        <input
                            className="curved-input"
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="signup-btn1">
                        Reset Password
                    </button>
                </form>

                <p className="signin4">
                    For further support, you may visit the Help Center or contact our support team.
                </p>
            </div>
        </div>
    );
};

export default Resetpassword;
