import React, { useState } from 'react';
import './message.css';
import MessagePopup from './MessagePopup'; // Import the popup component
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Vector from "../assets/Vector.png";
import Jamwrite from "../assets/jam_write.png";

const Message = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

    return (
        <div className="message-container">
            <div className='messages'>
                <div className="orderdetailsicons">
                    <button className="orderdetails-back-btn1" onClick={() => navigate(-1)}>
                        <ChevronLeft />
                    </button>
                </div>
                <p>Messages</p>
                <div className="jamwriteicons">
                    <img 
                        src={Jamwrite} 
                        className="jamwrite-back-btn1" 
                        onClick={() => setShowPopup(true)} // Show popup on click
                        alt="Write Message" 
                    />
                </div>
            </div>

            <div className="message-content">
                <div className="message-empty">
                    <img src={Vector} alt="Empty Orders" className="message-image" />
                    <p className="messagetext0">No Messages</p>
                    <p className="message-text">Your past messages with the team will be seen here</p>
                    <button className="message-button">Send us a Message</button>
                </div>
            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <MessagePopup />
                        <button className="popup-close-btn" onClick={() => setShowPopup(false)}>X</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Message;
