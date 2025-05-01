import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";  // Assuming you have a logout action in your auth slice
import "../pages/Logout.css";  // Import your CSS file for styling

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear authentication data
    dispatch(logout());  // Clear auth state from Redux
    localStorage.removeItem("authToken");  // Remove the auth token from localStorage (or whatever you're using)
    sessionStorage.clear();  // Optional, clears session data if you're using sessionStorage
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // If using cookies, remove auth cookie

    // Redirect to login page
    navigate("/signin");  // Redirect the user to the login screen
  }, [dispatch, navigate]);

  return <p className="logout-message">Logging out...</p>;
};

export default Logout;