import React, { useState } from "react";
import "./Input.scss";

export const Input = ({ label, type, required,onChange,value }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="input">
      <input
        type={type}
        value={value}
        required={required}
        className={inputValue ? "input__field has-content" : "input__field"}
        onChange={onChange}
      />
      <label htmlFor={label} className="input__label">
        {label}
      </label>
    </div>
  );
};

