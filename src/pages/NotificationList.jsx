import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import "../pages/NotificationList.css";

export default function NotificationList() {
  const [notifications, setNotifications] = useState([
    {
      id: "#1233940",
      description: "Party jollof rice and stewed beef",
      text: "has been placed.",
      type: "Meal Order",
      time: "1 hour ago",
    },
    {
      id: "#9584301",
      description: "50 pieces of onions and half bag of rice",
      text: "has been processed.",
      type: "Bulk foodstuff order",
      time: "1 hour ago",
    },
    {
      id: "#8443305",
      description: "Beef suya and grilled chicken",
      text: "has been delivered.",
      type: "Meal Order",
      time: "3 hours ago",
    },
    {
      id: "#0037188",
      description: "Party jollof rice and stewed chicken",
      text: "has been delivered.",
      type: "Meal Order",
      time: "3 hours ago",
    },
    {
      id: "#0037188",
      description: "Party jollof rice and stewed chicken",
      text: "has been delivered.",
      type: "Meal Order",
      time: "3 hours ago",
    },
    {
      id: "#0037188",
      description: "Party jollof rice and stewed chicken",
      text: "has been delivered.",
      type: "Meal Order",
      time: "3 hours ago",
    },
    {
      id: "#0037188",
      description: "Party jollof rice and stewed chicken",
      text: "has been delivered.",
      type: "Meal Order",
      time: "3 hours ago",
    },
    {
      id: "#0037188",
      description: "Party jollof rice and stewed chicken",
      text: "has been delivered.",
      type: "Meal Order",
      time: "3 hours ago",
    },
    {
      id: "#0037188",
      description: "Party jollof rice and stewed chicken",
      text: "has been delivered.",
      type: "Meal Order",
      time: "3 hours ago",
    },
    {
      id: "#0037188",
      description: "Party jollof rice and stewed chicken",
      text: "has been delivered.",
      type: "Meal Order",
      time: "3 hours ago",
    },
    {
      id: "#0037188",
      description: "Party jollof rice and stewed chicken",
      text: "has been delivered.",
      type: "Meal Order",
      time: "3 hours ago",
    },
  ]);

  useEffect(() => {
    // Replace with your API call
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications"); 
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const notificationCount = notifications.length > 99 ? "99+" : notifications.length;

  return (
    <div className="notifications-container">
      <div className="notifications-header-container">
        <h2 className="notifications-header">
          Notifications{" "}
          {notifications.length > 0 && (
            <span className="notifications-count">{notificationCount}</span>
          )}
        </h2>
        <Settings className="settings-icon" />
      </div>

      {/* If there are no notifications */}
      {notifications.length === 0 ? (
        <p className="no-notifications">No new notifications</p>
      ) : (
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              <div className="notification-content">
                <span className="notification-dot"></span>
                <p>
                  Order <span className="notification-id">{notification.id}</span> for{" "}
                  <span className="notification-id">{notification.description}</span> {notification.text}
                </p>
              </div>
              <div className="notification-meta">
                <p className="notification-type-time">
                  <span className="notification-type">{notification.type}</span>
                  <span className="notification-time">{notification.time}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
