import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ShieldBan } from "lucide-react";
import "../pages/Verify.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Verify = ({ onClose }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/"); 
    }
  };
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
      navigate("/Registrationsuccessful");
    } else {
      setError(true);
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal1">
        {/* Back and Close Icons */}
          <div className="top-icons">
              <button className="back-btn" onClick={() => navigate(-1)}>  
                  <ChevronLeft size={24} />
              </button>
              <button className="close-btn" onClick={onClose ? onClose : () => navigate("/")}>
                  <X size={24} />
              </button>
          </div>
        <img src={logo} alt="Feed the Nation Logo" style={{ width: "70px", height: "70px", display: "block", margin: "auto", marginBottom: "30px" }} />
        <h2>Verify your email address</h2>
        <p>Please enter the 4-digit verification code sent to your email address.</p>
        <small>
          <ShieldBan size={24} style={{ position: "relative", top: "5px" }} /> Your information is 100% secured
        </small>

        <div className="verification-code">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className={`code-input ${error ? "error-border" : ""}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>

        {error && <p className="error-message">The code is incorrect, please try again. <span className="resend-code" onClick={handleRequestNewCode}>Resend code</span></p>}

        <button type="button" className="signup-btn" onClick={handleSubmit}>
          Continue
        </button>

        <p className="terms">
          Didn't receive any code? {canRequestNewCode ? (
            <span className="highlight" onClick={handleRequestNewCode} style={{ cursor: "pointer", color: "blue" }}>
              Request a new code
            </span>
          ) : (
            <>Request a new code in <span className="highlight">{timeLeft}s</span></>
          )}
        </p>

        <p className="signin">For further support, you may visit the Help Center or contact our support team.</p>
      </div>
    </div>
  );
};

export default Verify;