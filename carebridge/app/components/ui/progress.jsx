// @/components/ui/progress.jsx
import React from "react";

export const Progress = ({ value, className }) => {
  return (
    <div className={`bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};