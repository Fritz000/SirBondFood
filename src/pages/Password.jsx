import React, { useState } from "react";
import { X, ShieldBan, CheckCircle } from "lucide-react";
import "../pages/Password.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
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

  const handleClose = () => navigate("/");

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

    // Validate password
    if (!isPasswordValid) {
      setErrorMessage("Password must be 6-20 characters and include letters, numbers, and symbols.");
      return;
    }

    // Validate if passwords match
    if (!doPasswordsMatch) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage(""); // Clear previous errors

    const finalData = {
      ...userData,
      password: formData.password,
    };

    try {
      console.log("Making API call to register...");

      // Make the POST request to the backend
      const response = await axios.post("https://bondfood.vercel.app/api/register/", finalData);

      console.log("API response:", response);

      // Check for successful registration
      if (response.status >= 200 && response.status < 300) {
        console.log("✅ Registration successful:", response.data);

        // Store user details in local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Optional delay for navigation
        setTimeout(() => {
          // Redirect to OTP Verification page
          navigate("/Verify", { state: { email: userData.email } });
        }, 1000); // 1-second delay to ensure everything is processed
      } else {
        console.error("❌ Registration failed:", response);
        setErrorMessage(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("🌐 Network error:", error);
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal21">
        <button className="close-btn" onClick={handleClose}>
          <X size={24} />
        </button>

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
              {isPasswordVisible ? <EyeOff /> : <Eye />}
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
              {isConfirmPasswordVisible ? <EyeOff /> : <Eye />}
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

          <button type="submit" className="signup-btn1">Submit</button>
        </form>

        <p className="signin1ll">For further support, you may visit the Help Center or contact our support team.</p>
      </div>
    </div>
  );
};

export default Password;
