"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Images from "@/Theme/Images";
import styles from "./splash.module.css";

const SplashScreen: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/auth/login');
    }, 1000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className={styles.splashContainer}>
      <div className={styles.details}>
        <Image
          src={Images.splashLogo}
          width={300}
          alt="Picture of the author"
          className={styles.logoImage}
        />
        <p className={styles.title1}>Most Trusted School Platform</p>
        <p className={styles.subTitle}>Providing you a complete control digitally</p>
      </div>
    </div>
  );
};
export default SplashScreen;
