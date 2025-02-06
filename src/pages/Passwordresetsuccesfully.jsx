import React, { useState } from "react";
import { X, ChevronLeft, BadgeCheck } from "lucide-react"; // Add the checkmark icon
import "../pages/Passwordresetsuccessfulyy.css";
import { Link, useNavigate } from "react-router-dom";

const Passwordresetsuccesfully = ({ onClose }) => {
  const navigate = useNavigate();
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
      <div className="signup-modal2n1">
        {/* Back and Close Icons */}
        <div className="top-icons">
              <button className="back-btn" onClick={() => navigate(-1)}>  
                  <ChevronLeft size={24} />
              </button>
              <button className="close-btn" onClick={onClose ? onClose : () => navigate("/")}>
                  <X size={24} />
              </button>
          </div>
        <div className="password1">
            <button className="icon-button"><BadgeCheck size={100}/></button>
                <h2 className="password-title">Password reset successful</h2>
                <p className="successful-text">
                  You have successfully reset your password. You can now login using your new password.
                </p>
        </div>

      </div>
    </div>
  );
};

export default Passwordresetsuccesfully;
