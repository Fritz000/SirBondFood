import React, { useState } from 'react';
import './HelpCenter.css';
import { useNavigate } from 'react-router-dom';
import { Lock, ChevronDown, Search, X } from 'lucide-react';
import sendicon from "../assets/sendicon.svg";
import messageicon from "../assets/messageicon.svg";
import questionmark from "../assets/questionmark.svg";

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    "How do I receive my orders?",
    "How do I ship to diaspora?",
    "Refund Policy",
    "How do I withdraw the funds in my wallet?",
    "Can I cancel an order after placing it?",
    "What payment methods do you accept?",
    "How do I track my delivery?",
    "How do I change my address?",
    "How do I contact support?",
    "How do I apply a coupon code?",
  ];

  // Filter FAQs by search query
  const filteredFaqs = faqs
    .filter((faq) => faq.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 4); // Limit to 4 results

  return (
    <div className="help-container">
      <button className="mobile-close-button" onClick={() => navigate(-1)}>
        <X size={24} />
      </button>

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
              <input
                type="text"
                placeholder="Search for help"
                className="search-bar10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="search-icon10" />
            </div>
          </div>
          <div className="faq-list">
  {filteredFaqs.length > 0 ? (
    filteredFaqs.map((faq, index) => {
      const regex = new RegExp(`(${searchQuery})`, 'gi');
      const parts = faq.split(regex);

      return (
        <div className="faq-item" key={index}>
          {parts.map((part, i) =>
            part.toLowerCase() === searchQuery.toLowerCase() ? (
              <strong key={i}>{part}</strong>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </div>
      );
    })
  ) : (
    <div className="faq-item">No results found</div>
  )}
</div>

        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
