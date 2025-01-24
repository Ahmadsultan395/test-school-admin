// components/FileUploadComponent.tsx
import React, { ChangeEvent } from "react";
import styles from "./uploadimage.module.css";
import Image from "next/image";
import Icons from "../../Theme/Icons";

interface UploadFileProps {
  width?: any;
  iconName?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: File | null;
}

const FileUploadComponent: React.FC<UploadFileProps> = ({
  width,
  iconName,
  placeholder,
  onChange,
  value,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className={styles.fileUploadContainer}>
      <label
        htmlFor="fileInput"
        className={styles.customLabel}
        style={{ width: width }}
      >
        {value ? (
          <span>{value.name}</span>
        ) : (
          <span style={{ color: "#BDBDBD" }}>{placeholder}</span>
        )}
        {iconName === "round" ? (
          <Image
            src={Icons.errorcircle}
            width={16}
            height={16}
            alt="Upload Icon"
            className={styles.uploadIcon}
          />
        ) : (
          <Image
            src={Icons.uploadicon}
            width={16}
            height={16}
            alt="Upload Icon"
            className={styles.uploadIcon}
          />
        )}
      </label>
      <input
        type="file"
        id="fileInput"
        className={styles.customFileInput}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploadComponent;
