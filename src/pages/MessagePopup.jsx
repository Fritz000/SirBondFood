import React from "react";
import "./MessagePopup.css";

const MessagePopup = ({ onClose }) => {
  return (
    <div className="message-popup-overlay">
      <div className="message-popup">
        <div className="message-header">
          <div className="avatar-group">
            <span className="avatar">B</span>
            <span className="avatar">V</span>
            <span className="avatar">C</span>
          </div>
          <p className="message-title">Sir Bond</p>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        
        <div className="message-body">
          <div className="circle-group">
            <span className="circle">B</span>
            <span className="circle">V</span>
            <span className="circle">C</span>
          </div>
          <p className="message-text">Ask us anything, we are here to assist you.</p>
        </div>
        
        <div className="message-footer">
          <input type="text" placeholder="Message..." className="message-input" />
        </div>
      </div>
    </div>
  );
};

export default MessagePopup;
