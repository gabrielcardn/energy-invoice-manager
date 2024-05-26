"use client";
import React, { useState } from "react";
import styles from "./Filter.module.css";

const Filter = ({ title, options, onSubmit, placeholder, initialValue }) => {
  const [selectedOption, setSelectedOption] = useState(initialValue || "");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    onSubmit(value);
  };

  return (
    <div className={styles.container}>
      {title}
      <select value={selectedOption} onChange={handleChange}>
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
