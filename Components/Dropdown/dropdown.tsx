"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./dropdown.module.css"; // Import your CSS module
import Icons from "../../Theme/Icons";
interface CustomDropdownProps {
  options: string[];
  width: string;
  hieght: string;
  placeholder: string;
  onSelect: (selectedOption: string) => void;
  selected:any

}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  width,
  hieght,
  placeholder,
  onSelect,
  selected

}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // Call the onSelect prop
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${styles.customDropdown} ${isOpen ? styles.open : ""}`}
      ref={dropdownRef}
      style={{
        width: width,
        height: hieght,
      }}
    >
      <div className={styles.customDropdownTrigger} onClick={toggleDropdown}>
        {selected || (
          <span style={{ color: "#BDBDBD" }}>{placeholder}</span>
        )}
        {isOpen ? (
          <Image
            src={Icons.upIcon}
            width={14}
            height={14}
            alt="Picture of the author"
          />
        ) : (
          <Image
            src={Icons.downIcon}
            width={14}
            height={14}
            alt="Picture of the author"
          />
        )}
      </div>
      {isOpen && (
        <div className={styles.customDropdownMenu}>
          {options.map((option) => (
            <div
              key={option}
              className={styles.customDropdownItem}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
