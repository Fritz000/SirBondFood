import React, { useState, useEffect } from 'react';
import './SuccessMessage.css';

const SuccessMessage = ({ message, onClose }) => {
  const [progress, setProgress] = useState(0); // Track the loading bar progress

  useEffect(() => {
    // Increase progress over time (5 seconds)
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          onClose(); // Hide the message after 5 seconds
        }
        return prevProgress + 2; // 100% over 5 seconds
      });
    }, 100);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [onClose]);

  return (
    <div className="success-message">
      <div className="message-box">
        <p>{message}</p>
        <div className="loading-bar">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
