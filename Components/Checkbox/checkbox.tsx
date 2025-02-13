// Checkbox.tsx
"use client"
import React, { useState } from 'react';
import styles from './checkbox.module.css'; // Import your CSS module

interface CheckboxProps {
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label }) => {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <div className={styles.checkboxContainer} onClick={handleCheckboxChange}>
      <div className={`${styles.checkbox} ${isChecked ? styles.checked : ''}`}>
        {isChecked && <div className={styles.checkmark}>&#10003;</div>}
      </div>
      <div className={styles.checkboxLabel}>{label}</div>
    </div>
  );
};

export default Checkbox;
