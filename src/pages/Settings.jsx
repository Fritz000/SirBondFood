import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Settings.css";
import { ChevronLeft } from "lucide-react";
import fluent from "../assets/fluent_person-16-regular.png";
import solar from "../assets/solar_bell-linear.png";
import solarlinear from "../assets/solar_wallet-linear.png";
import carbon from "../assets/carbon_help.png";
import tabler from "../assets/tabler_lock.png";
import mdi from "../assets/mdi_feedback-outline.png";
import logout1 from "../assets/solar_logout-outline.png";
import iconamoon from "../assets/iconamoon_shield-light.png";
import MaskGroup from "../assets/MaskGroup.png";

const Settings = () => {
  const navigate = useNavigate(); // Define navigate
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState(MaskGroup);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg") && file.size <= 10 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a PNG or JPEG file under 10MB.");
    }
  };

  const handlePasswordUpdate = () => {
    if (newPassword === currentPassword) {
      setError("New password cannot be the same as the current password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setError("");
    alert("Password updated successfully!");
  };

  return (
    <div className="settingsheader">
      <div className="settings">
        <div className="settingicons">
            <button className="setting-back-btn1" onClick={() => navigate(-1)}>  
              <ChevronLeft />
            </button>
        </div>
          <h2>Settings</h2>
      </div>
    <div className="settings-container">
      
      {/* Sidebar */}
      <aside className="settings-sidebar">
        <ul className="sidebar-menu">
          <li className="active"><img src={fluent} alt="Logo" /> Account Management</li>
          <li><img src={solar} alt="Logo" />Wallet Settings</li>
          <li><img src={solar} alt="Logo" />Notification & Alerts</li>
          <li><img src={iconamoon} alt="Logo" />Food Preferences</li>
          <li><img src={solarlinear} alt="Logo" />Location Settings</li>
          <li><img src={carbon} alt="Logo" />Order Management</li>
          <li><img src={tabler} alt="Logo" />Community & Charity</li>
          <li><img src={mdi} alt="Logo" />Security & Privacy</li>
          <li><img src={logout1} alt="Logo" />Support & Feedback</li>
          <li><img src={logout1} alt="Logo" />About & Legal</li>
        </ul>
      </aside>

      {/* Main Settings Section */}
      <main className="settings-main">

        {/* Tabs */}
        <div className="settings-tabs">
          <button
            className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Information
          </button>
          <button
            className={`tab-button ${activeTab === "referral" ? "active" : ""}`}
            onClick={() => setActiveTab("referral")}
          >
            Referral Program Settings
          </button>
        </div>

        <div className="settings-header">
          <h2>Profile</h2>
        </div>

        {/* Tab Content */}
        <div className="settings-content">
          {activeTab === "profile" && (
            <div className="profile-section">
              <div className="profile-header">
                <div className="profile-avatar">
                  <img src={profileImage} alt="Profile" />
                </div>
                <label className="upload-btn">
                  Upload Photo
                  <input type="file" accept="image/png, image/jpeg" onChange={handleImageUpload} />
                </label>
              </div>

              {/* Profile Form */}
              <form className="profile-form">
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" />

                <label>Email Address</label>
                <input type="email" placeholder="Enter email" />

                <label>Phone Number</label>
                <input type="text" placeholder="+234 000 0000 0000" />

                <h3 className="bankdet">Bank Details</h3>
                <label>Bank Name</label>
                <input type="text" placeholder="Enter bank name" />

                <label>Account Number</label>
                <input type="text" placeholder="Enter account number" />

                <label>Account Holder's Name</label>
                <input type="text" placeholder="Enter account name" />

                <h3 className="bankdet">Change Password</h3>
                {error && <p className="error-message">{error}</p>}
                <label>Current Password*</label>
                <input type="password" placeholder="xxxxxxxxxxxxxxxxxxxx" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />

                <label>New Password*</label>
                <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

                <label>Confirm New Password*</label>
                <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </form>

              <button className="update-btn" onClick={handlePasswordUpdate}>Update Changes</button>
            </div>
          )}

          {activeTab === "referral" && <div className="referral-section">Referral settings content...</div>}
        </div>
      </main>
    </div>
    </div>
  );
};

export default Settings;
