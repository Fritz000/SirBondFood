import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ShieldBan } from "lucide-react";
import "../pages/Verify.css";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";

const Verify = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email || localStorage.getItem("userEmail") || null;

  const [timeLeft, setTimeLeft] = useState(60);
  const [canRequestNewCode, setCanRequestNewCode] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false); // Track if all OTP fields are filled

  const inputsRef = useRef([]);

  // Ensure email is saved to localStorage for fallback
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    } else {
      console.error("❌ No email found for OTP verification.");
    }
  }, [userEmail]);

  // Timer for resending OTP
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanRequestNewCode(true);
    }
  }, [timeLeft]);

  // Handle OTP Resend Request
  const handleRequestNewCode = async () => {
    if (!userEmail) {
      setError("No user email found. Please register again.");
      return;
    }

    try {
      console.log("🔄 Requesting new OTP for:", userEmail);
      setError("");

      const response = await axios.post("https://bondfood.vercel.app/api/resend-otp/", {
        email: userEmail.toLowerCase(),
      });

      if (response.status === 200) {
        console.log("✅ OTP Resent Successfully!");
        setTimeLeft(60); // Reset Timer
        setCanRequestNewCode(false);
      } else {
        setError(response.data.message || "Failed to resend OTP. Try again later.");
      }
    } catch (error) {
      console.error("❌ Error resending OTP:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (value !== "" && index < otp.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  // Check if the form is complete
  useEffect(() => {
    const isComplete = otp.every((digit) => digit !== "");
    setIsFormComplete(isComplete);
  }, [otp]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const enteredOtp = otp.join("").trim();
    setError("");

    if (!userEmail) {
      setError("No user email found. Please register again.");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("🔍 Verifying OTP:", userEmail, enteredOtp);

      const response = await axios.post("https://bondfood.vercel.app/api/verify-otp/", {
        email: userEmail.toLowerCase(),
        otp: enteredOtp,
      });

      console.log("✅ API Response:", response);

      if (response.status === 200) {
        console.log("✅ OTP Verified Successfully!");

        if (response.data.authToken) {
          localStorage.setItem("authToken", response.data.authToken);
        }
        if (response.data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              firstName: response.data.user?.firstName,
              lastName: response.data.user?.lastName,
            })
          );
        }

        window.dispatchEvent(new Event("storage"));

        navigate("/", { replace: true });
      } else {
        setError(response.data.message || "The code is incorrect, please try again.");
        console.error("❌ OTP Verification Failed:", response.data.message);
      }
    } catch (error) {
      console.error("❌ Error verifying OTP:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal105">
        {/* Back and Close Icons */}
        <div className="top-icons">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <button className="close-btn" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        <img src={logo} alt="Feed the Nation Logo" className="logo-img4" />
        <h2>Verify your email address</h2>
        <p>Please enter the 6-digit verification code sent to your email address.</p>
        <small>
          <ShieldBan size={24} style={{ position: "relative", top: "5px" }} /> Your information is 100% secured
        </small>

        <div className="verification-code">
          {otp.map((digit, index) => (
            <input
              ref={(el) => (inputsRef.current[index] = el)}
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              className={`code-input ${error ? "error-border" : ""}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>

        {error && (
          <p className="error-message">
            {error}{" "}
            <span className="resend-code" onClick={handleRequestNewCode}>
              Resend code
            </span>
          </p>
        )}

        <button
          type="button"
          className="signup-btn"
          onClick={handleSubmit}
          disabled={isSubmitting || !isFormComplete}
          style={{ backgroundColor: isFormComplete ? '#008000' : '#DAF0C6' }}
        >
          {isSubmitting ? "Verifying..." : "Continue"}
        </button>

        <p className="terms">
          Didn't receive any code? It could take a bit of time.{" "}
          {canRequestNewCode ? (
            <span
              className="highlight"
              onClick={handleRequestNewCode}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Request a new code
            </span>
          ) : (
            <>Request a new code in <span className="highlight">{timeLeft} seconds</span></>
          )}
        </p>

        <p className="signin101">
          For further support, you may visit the Help Center or contact our support team.
        </p>
      </div>
    </div>
  );
};

export default Verify;
