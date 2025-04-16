import React from 'react';
import './HelpCenter.css';
import { useNavigate } from 'react-router-dom';
import { Lock, ChevronDown, Search } from 'lucide-react';
import sendicon from "../assets/sendicon.svg"
import messageicon from "../assets/messageicon.svg"
import questionmark from "../assets/questionmark.svg"


const HelpCenter = () => {
  const navigate = useNavigate();
  return (
    <div className="help-container">
      <div className="help-header">
        <h2 className='hiname'>Hi Canary 👋</h2>
        <p className='howcanwehelp'>How can we help?</p>
      </div>

      <div className="form-section">

      <div className="combined-box">
          <div className="box-row">
            <span className='messages1' onClick={() => navigate("/message")}>Messages</span>
            <div className="row-icons">
              <img src={messageicon} onClick={() => navigate("/message")} alt="" />
            </div>
          </div>
          <div className="divider" />
          <div className="box-row">
            <span className='help1'>Help</span>
            <div className="row-icons">
              <img src={questionmark} alt="" />
            </div>
          </div>
      </div>

      <div className="combined-box1">
          <div className="box-row">
            <span className='messages1' onClick={() => navigate("/message")}>Send us a message</span>
            <div className="row-icons">
              <img src={sendicon} onClick={() => navigate("/message")} alt="" />
            </div>
          </div>
      </div>

      <div className="combined-box2">
          <div className="box-row">
            
      <div className="search-container10">
        <input type="text" placeholder="Search for help" className="search-bar10"/>
        <Search className="search-icon10" />
      </div>
        </div>
        <div className="faq-list">
          <div className="faq-item">How do I receive my orders?</div>
          <div className="faq-item">How do I ship to diaspora?</div>
          <div className="faq-item">Refund Policy</div>
          <div className="faq-item">How do I withdraw the funds in my wallet?</div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HelpCenter;
