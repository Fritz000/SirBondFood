import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ShieldBan } from "lucide-react";
import '../pages/OrderDetails.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

const Securitycode = ({ onClose }) => {
  const navigate = useNavigate(); 
  const [timeLeft, setTimeLeft] = useState(60);
  const [canRequestNewCode, setCanRequestNewCode] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const expectedOtp = "1234"; // backend OTP

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanRequestNewCode(true);
    }
  }, [timeLeft]);

  const handleRequestNewCode = () => {
    setTimeLeft(60);
    setCanRequestNewCode(false);
    setError(false);
    setOtp(["", "", "", ""]); // Clear OTP inputs
  };

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === expectedOtp) {
      navigate("/Reset");
    } else {
      setError(true);
    }
  };

  return (
    <div className="Orderways">
      <div className="Orderdetails">
        <div className="ordericons">
              <button className="back-btn1" onClick={() => navigate(-1)}>  
                  <ChevronLeft size={24} />
              </button>
              <h2 className='order100'>Order Details</h2>
          </div>
          <div className="lineorder">
            <hr />
          </div>
        </div>
    </div>
  );
};

export default Securitycode;
