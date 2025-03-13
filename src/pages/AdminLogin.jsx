import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with real admin credentials
    const adminUsername = "BondFood2030";
    const adminPassword = "BondFood2030$$";

    if (credentials.username === adminUsername && credentials.password === adminPassword) {
      localStorage.setItem("adminAuth", "true");  // Store auth status
      navigate("/AdminDashboard");  // Redirect to dashboard
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
        <button className="adminlogin" type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
