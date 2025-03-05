// app/components/ui/select.jsx
import React from "react";

export const Select = ({ name, value, onChange, children }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </select>
  );
};

export const SelectItem = ({ value, children }) => {
  return (
    <option value={value}>
      {children}
    </option>
  );
};