import React, { useState } from "react";
import { X, ChevronLeft, ShieldBan, CheckCircle } from "lucide-react"; // Add the checkmark icon
import "../pages/Reset.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Reset = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);

  // Password validation regex
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      // Check password validity
      setIsPasswordValid(validatePassword(value));
    }

    if (name === "confirmpassword") {
      // Check if passwords match
      setDoPasswordsMatch(formData.password === value);
    }
  };

  const handleSubmit = (e) => {
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
    console.log("Form submitted successfully");
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal2n">
        {/* Back and Close Icons */}
        <div className="top-icons">
              <button className="back-btn" onClick={() => navigate(-1)}>  
                  <ChevronLeft size={24} />
              </button>
              <button className="close-btn" onClick={onClose ? onClose : () => navigate("/")}>
                  <X size={24} />
              </button>
          </div>
        <img
          src={logo}
          alt="Feed the Nation Logo"
          style={{ width: "70px", height: "70px", display: "block", margin: "auto", marginBottom: "30px" }}
        />
        <h2>Reset your password</h2>
        <p>Enter your new password</p>
        <small>
          <ShieldBan size={24} style={{ position: "relative", top: "5px", color: "black" }} /> Your information is 100% secured
        </small>

        <form onSubmit={handleSubmit}>
          <div className="password-container">
            <input
              className="curved-input"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="curved-input"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-password2" onClick={() => setIsPasswordVisible((prev) => !prev)}>
              &#128065;
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
            <span className="toggle-password3" onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}>
              &#128065;
            </span>
          </div>
          {errorMessage && <p className="error-message" style={{ color: "red" }}>{errorMessage}</p>}
          <ul className="password-hints">
            <li>
              {isPasswordValid ? (
                <CheckCircle size={20} color="green" />
              ) : (
                <span className="bullet1">&bull;</span>
              )}{" "}
              6 - 20 characters
            </li>
            <li>
              {isPasswordValid ? (
                <CheckCircle size={20} color="green" />
              ) : (
                <span className="bullet1">&bull;</span>
              )}{" "}
              Contains numbers, letters, and symbols
            </li>
            <li>
              {doPasswordsMatch ? (
                <CheckCircle size={20} color="green" />
              ) : (
                <span className="bullet1">&bull;</span>
              )}{" "}
              Passwords match
            </li>
          </ul>
          <Link to="/Passwordresetsuccesfully">
            <button type="submit" className="signup-btn1">
              Change Password
            </button>
          </Link>
        </form>

        <p className="signin1n">
          For further support, you may visit the Help Center or contact our support team.
        </p>
      </div>
    </div>
  );
};

export default Reset;
