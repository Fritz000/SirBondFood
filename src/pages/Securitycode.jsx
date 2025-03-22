import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ShieldBan } from "lucide-react";
import '../pages/Securitycode.css';
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
  
      // Move focus to the next input
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
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
    <div className="signup-overlay">
      <div className="signup-modal1l">
        {/* Back and Close Icons */}
        <div className="top-icons">
              <button className="back-btnsecurity" onClick={() => navigate(-1)}>  
                  <ChevronLeft size={24} />
              </button>
              <button className="close-btn" onClick={onClose ? onClose : () => navigate("/")}>
                  <X size={24} />
              </button>
          </div>
        <img src={logo} alt="Feed the Nation Logo" className='logo-img3' />
        <h2 className='esc'>Enter security code</h2>
        <p>Enter the security code that was sent to your email address</p>
        <small><ShieldBan size={24} style={{ position: "relative", top: "5px" }} /> Your information is 100% secured</small>
        
        <div className="verification-code">
  {otp.map((digit, index) => (
    <input
      key={index}
      id={`otp-input-${index}`} // Unique ID for each input
      type="text"
      maxLength="1"
      className={`code-input ${error ? "error-border" : ""}`}
      value={digit}
      onChange={(e) => handleChange(index, e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
          document.getElementById(`otp-input-${index - 1}`).focus();
        }
      }}
    />
  ))}
</div>


        {error && <p className="error-message1">The code is incorrect, please try again. <span className="resend-code1" onClick={handleRequestNewCode}>Resend code</span></p>}

        <button type="submit" onClick={handleSubmit} className="signup-btn">
          Submit
        </button>

        {/* Dynamic text logic */}
        <p className="terms">
          {canRequestNewCode ? (
            <span className="highlight" onClick={handleRequestNewCode} style={{ cursor: "pointer", color: "green" }}>
              Request a new code
            </span>
          ) : (
            <>Didn't receive any code? It could take a bit of time, request a new code in <span className="highlight">{timeLeft} seconds</span></>
          )}
        </p>

        <p className="signinn100">
          For further support, you may visit the Help Center or contact our support team.
        </p>
      </div>
    </div>
  );
};

export default Securitycode;
