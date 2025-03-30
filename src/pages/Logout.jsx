import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Logout.css"; // Import your CSS file for styling
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication data
    localStorage.removeItem("authToken"); // Adjust according to your auth method
    sessionStorage.clear(); // Optional, clears session data
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // If using cookies

    // Redirect to login page
    navigate("/signin");
  }, [navigate]);

  return <p className="logout-message">Logging out...</p>;
};

export default Logout;
