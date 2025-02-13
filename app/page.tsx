"use client";
import "../globals.css";
import React from "react";
import dynamic from "next/dynamic";
import { SplashScreen } from "../Components";
import { useAuthentication } from "../context/auth";
import styles from "./dashboard/home/home.module.css";
import useDeeplink from "@/Hooks/useDeepLink";
const HomePage = dynamic(() => import("./homePage"), { ssr: false });

export default function Home() {
  useDeeplink();
  const { admin } = useAuthentication();

  return (
    <main>
      <div className={styles.container}>
        {admin !== null ? <HomePage /> : <SplashScreen />}
      </div>
    </main>
  );
}
