import React from "react";

const CustomButton = ({
  label, // The text to display on the button
  onClick, // The click handler function
  className, // Custom class names for styling
  icon, // Icon component or JSX to display with the button
  iconPosition = "center", // Position of the icon (left or right)
  disabled = false, // Disable button if needed
  type = "button", // Button type (button, submit, etc.)
  defaultStyles = true
}) => {
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${className}
        ${defaultStyles ? `flex items-center justify-center 
        h-fit w-fit px-3 py-2 
        font-semibold text-gray-100
        bg-custom-btn-light hover:bg-custom-btn-hover-light 
        dark:btn-custom-btn-dark dark:custom-btn-hover-dark rounded-lg` : ""} 
         ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span> // Icon on the left side
      )}
      <span>{label}</span>
      {icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span> // Icon on the right side
      )}

      {icon && iconPosition === "center" && (
        <span>{icon}</span> // Icon on the right side
      )}
    </button>
  );
};

export default CustomButton;
