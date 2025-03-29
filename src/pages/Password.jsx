import React, { useState } from "react"; 
import { X, ShieldBan, CheckCircle } from "lucide-react";
import "../pages/Password.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Password = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state || {}; // Retrieve user data from previous page

  const [formData, setFormData] = useState({
    password: "",
    confirmpassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);

  const handleClose = () => navigate("/"); // Always navigate instead of calling onClose

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };

      if (name === "password") {
        setIsPasswordValid(validatePassword(value));
      }
      if (name === "confirmpassword") {
        setDoPasswordsMatch(newFormData.password === newFormData.confirmpassword);
      }

      return newFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setErrorMessage("Password must be 6-20 characters and include letters, numbers, and symbols.");
      return;
    }
    if (!doPasswordsMatch) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    setErrorMessage("");

    const finalData = {
      ...userData,
      password: formData.password, // Only send password, not confirmpassword
    };

    try {
      const response = await fetch("https://bondfood.vercel.app/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const data = await response.json(); // Get the actual response
    
      if (response.ok) {
        console.log("✅ Registration successful:", data);
        navigate("/Verify");
      } else {
        console.error("❌ Registration failed:", data);
        setErrorMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("🌐 Network error:", error);
      setErrorMessage("Network error. Please check your connection.");
    }

    if (response.ok) {
      console.log("Registration successful:", data);
    
      // Store user details in local storage
      localStorage.setItem("user", JSON.stringify(data.user));
    
      // Redirect to OTP Verification
      navigate("/Verify", { state: { email: formData.email } });
    }
    
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal21">
        {/* Close button */}
        <button className="close-btn" onClick={handleClose}>
          <X size={24} />
        </button>

        {/* Logo */}
        <img src={logo} alt="Feed the Nation Logo" className="logo-img6" />

        <h2 className="regsucc">Registration successful</h2>
        <p>Create a password to secure your account. You can use it when you log in next time.</p>
        <small>
          <ShieldBan size={24} style={{ position: "relative", top: "5px", color: "black" }} /> Your information is 100% secured
        </small>

        <form onSubmit={handleSubmit}>
          <div className="password-container">
            <input
              className="curved-input"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-password12" onClick={() => setIsPasswordVisible((prev) => !prev)}>
              {isPasswordVisible ? "🙈" : "👁️"}
            </span>
          </div>

          <div className="password-container">
            <input
              className="curved-input"
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmpassword"
              placeholder="Confirm Password"
              value={formData.confirmpassword}
              onChange={handleChange}
              required
            />
            <span className="toggle-password13" onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}>
              {isConfirmPasswordVisible ? "🙈" : "👁️"}
            </span>
          </div>

          {errorMessage && <p className="error-message" style={{ color: "red" }}>{errorMessage}</p>}

          <ul className="password-hints100">
            <li>
              {isPasswordValid ? <CheckCircle size={20} color="green" /> : <span className="bullet1">&bull;</span>} 6 - 20 characters
            </li>
            <li>
              {isPasswordValid ? <CheckCircle size={20} color="green" /> : <span className="bullet1">&bull;</span>} Contains numbers, letters, or symbols
            </li>
            <li>
              {doPasswordsMatch ? <CheckCircle size={20} color="green" /> : <span className="bullet1">&bull;</span>} Passwords match
            </li>
          </ul>

          {/* Submit Button */}
          <button type="submit" className="signup-btn1">Submit</button>
        </form>

        <p className="signin1ll">For further support, you may visit the Help Center or contact our support team.</p>
      </div>
    </div>
  );
};

export default Password;
