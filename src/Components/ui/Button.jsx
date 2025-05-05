import React from "react";
import "./button.css"; // Optional: use this if you want to style it separately

const Button = ({ children, onClick, variant = "default", className = "", ...props }) => {
  const baseClass = "custom-button";
  const variantClass = variant === "outline" ? "custom-button-outline" : "custom-button-default";

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
