import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-4 py-2 rounded-lg font-semibold transition duration-200 
        ${disabled ? "bg-gray-600 cursor-not-allowed" : `${bgColor} hover:brightness-110`} 
        ${textColor} ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
