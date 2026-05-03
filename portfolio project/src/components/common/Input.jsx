import React from "react";
export default function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}