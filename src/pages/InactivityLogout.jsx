import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";  // Assuming logout action is in authSlice
import { useNavigate } from "react-router-dom";

const InactivityLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds
  let inactivityTimer;

  const resetTimer = () => {
    // Clear existing timer
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    // Set a new timer
    inactivityTimer = setTimeout(() => {
      dispatch(logout()); // Trigger logout
      navigate("/login");  // Redirect to login page
    }, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    // List of events to track for activity
    const activityEvents = ['mousemove', 'keydown', 'click'];

    // Add event listeners for activity
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Start the timer initially
    resetTimer();

    // Clean up event listeners when component unmounts
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(inactivityTimer);  // Clear the timer on cleanup
    };
  }, [dispatch, navigate]);

  return null;  // This component doesn't need to render anything
};

export default InactivityLogout;
