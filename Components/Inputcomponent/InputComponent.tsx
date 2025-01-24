// components/InputComponent.tsx
"use client";
import React, { useState } from "react";
import styles from "./InputComponent.module.css"; // Import your CSS module
import Image from "next/image";
import Icons from "../../Theme/Icons";

interface InputComponentProps {
  type: "email" | "password" | "date" | "text" | "number";
  icon: boolean;
  placeholder: string;
  width: any;
  hieght: any;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  type,
  placeholder,
  icon,
  width,
  hieght,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={styles.inputContainer}
      style={{
        width: width,
        height: hieght,
      }}
    >
      {icon ? (
        <div className={styles.iconContainer}>
          {type === "password" ? (
            <Image
              src={Icons.padLock}
              width={20}
              height={20}
              alt="Picture of the author"
            />
          ) : (
            <Image
              src={Icons.mailIcon}
              width={24}
              height={24}
              alt="Picture of the author"
            />
          )}
        </div>
      ) : (
        <></>
      )}

      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        className={styles.inputField}
        value={value} // Set the value prop
        onChange={onChange} // Set the onChange prop
     
      />
      <div className={styles.iconContainer}>
        {type === "password" ? (
          <Image
            width={15}
            height={15}
            src={showPassword ? Icons.eye : Icons.hiddenEye}
            alt={showPassword ? "Hide Password" : "Show Password"}
            //   className={styles.icon}
            onClick={togglePasswordVisibility}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default InputComponent;
