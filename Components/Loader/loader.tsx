import React from "react";
import styles from "./loader.module.css";
import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className={styles.loadContainer}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#8147e7"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
