"use client";
import React from "react";
import styles from "./success.module.css";
import { useRouter } from "next/navigation";

const SuccessPage = (props: any) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Success!</h1>
        <p className={styles.message}>Your action was completed successfully.</p>
        <button className={styles.button} onClick={()=>router.back()}>Go Back</button>
      </div>
    </div>
  );
};

export default SuccessPage;
