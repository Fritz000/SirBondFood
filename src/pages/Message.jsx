import React, { useState, useRef } from 'react';
import './Message.css';
import { ChevronLeft, X, Camera, FileText, Image } from 'lucide-react';  // Import Lucide Icons
import { useNavigate } from 'react-router-dom';
import Vector from "../assets/Vector.png";
import Jamwrite from "../assets/jam_write.png";
import messagesend from "../assets/messagesend.svg";

const Message = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null); // State to hold uploaded file
  const [isMessageSent, setIsMessageSent] = useState(false); // New state to track if message is sent

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const togglePopup = (e) => {
    e.stopPropagation();
    setShowPopup(prev => !prev);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file); // Set the uploaded file
  };

  const handleCameraClick = () => {
    cameraInputRef.current.click();
  };

  const handleGalleryClick = () => {
    galleryInputRef.current.click();
  };

  const handleDocumentClick = () => {
    fileInputRef.current.click();
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && !uploadedFile) return; // Prevent sending empty messages or without file
    setMessages(prev => [{
      sender: "user",
      text: newMessage,
      file: uploadedFile,  // Attach file to message
    }, ...prev]);
    setNewMessage("");
    setUploadedFile(null);  // Reset file after sending
    setIsMessageSent(true); // Mark that message is sent
  };

  return (
    <div className="message-container">
      <div className='messages'>
        <div className="messageicons">
          <button className="message-back-btn1" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </button>
        </div>
        <p className='messagetext'>Messages</p>
        <div className="jamwriteicons">
          <img
            src={Jamwrite}
            className="jamwrite-back-btn1"
            alt="Write Message"
            onClick={togglePopup}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      <div className="message-content">
        <div className="message-empty">
          <img src={Vector} alt="Empty Orders" className="message-image" />
          <p className="messagetext0">No Messages</p>
          <p className="message-text">Your past messages with the team will be seen here</p>
          <button className="message-button" onClick={togglePopup}
            style={{ cursor: 'pointer' }}>Send us a Message</button>
        </div>
      </div>

      {showPopup && (
        <div className="chat-popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="chat-popup" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
              <div className="chat-avatar1">BVC</div>
              <span className="chat-title">Sir Bond</span>
              <button className="close-btn" onClick={() => setShowPopup(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="chat-body">
              {/* Conditionally render avatar and subtext */}
              {!isMessageSent && (
                <>
                  <div className="chat-avatar">BVC</div>
                  <p className="chat-subtext">Ask us anything, we are here to assist you.</p>
                </>
              )}

              <div className="chat-messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`chat-bubble ${msg.sender}`}>
                    {msg.text}
                    {msg.file && (
                      <div className="file-preview">
                        {msg.file.type.startsWith('image/') ? (
                          <img src={URL.createObjectURL(msg.file)} alt="File Preview" className="file-preview-image" />
                        ) : (
                          <p>{msg.file.name}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="chat-footer">
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <img
                  src={messagesend}
                  alt="Send" className='send-icon1'
                  onClick={handleSendMessage}
                />
              </div>

              <div className="upload-icons">
                {/* Camera */}
                <button onClick={handleCameraClick} className="upload-icon">
                  <Camera size={30} />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </button>

                {/* Document */}
                <button onClick={handleDocumentClick} className="upload-icon">
                  <FileText size={30} />
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </button>

                {/* Gallery */}
                <button onClick={handleGalleryClick} className="upload-icon">
                  <Image size={30} />
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
