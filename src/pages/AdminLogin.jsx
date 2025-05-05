import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Hardcoded credentials for testing purposes
  const correctEmail = "admin@example.com";
  const correctPassword = "admin123"; // Set your static password here

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate the input fields
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // Check if credentials are correct
    if (email === correctEmail && password === correctPassword) {
      // Simulate successful login and redirect to Admin Dashboard
      navigate("/Admin");
      alert("You have been logged in successfully");
    } else {
      // Display error message if login is incorrect
      alert("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1>Admin Dashboard</h1>
        <h2>Login to continue</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input-field"
            />
          </div>
          <button type="submit" className="login-button100">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;