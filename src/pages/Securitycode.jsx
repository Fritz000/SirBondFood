import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ShieldBan } from "lucide-react";
import '../pages/Securitycode.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

const Securitycode = ({ onClose }) => {
  const navigate = useNavigate(); 
  const [timeLeft, setTimeLeft] = useState(60);
  const [canRequestNewCode, setCanRequestNewCode] = useState(false);

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
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal1l">
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
        <h2>Enter security code</h2>
        <p>Enter the security code that was sent to your email address</p>
        <small><ShieldBan size={24} style={{ position: "relative", top: "5px" }} /> Your information is 100% secured</small>
        
        <div className="verification-code">
          <input type="text" maxLength="1" className="code-input" />
          <input type="text" maxLength="1" className="code-input" />
          <input type="text" maxLength="1" className="code-input" />
          <input type="text" maxLength="1" className="code-input" />
        </div>

        <Link to="/Reset"><button type="submit" className="signup-btn">
          Continue
        </button></Link>

        {/* Dynamic text logic */}
        <p className="terms">
          {canRequestNewCode ? (
            <span className="highlight" onClick={handleRequestNewCode} style={{ cursor: "pointer", color: "green" }}>
              Request a new code
            </span>
          ) : (
            <>Didn't receive any code? It could take a bit of time, request a new code in <span className="highlight">{timeLeft}s</span></>
          )}
        </p>

        <p className="signinn">
          For further support, you may visit the Help Center or contact our support team.
        </p>
      </div>
    </div>
  );
};

export default Securitycode;
