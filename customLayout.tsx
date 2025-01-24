"use client";
import "./globals.css";
import React, { useState } from "react";
import Header from "./Components/header";
import SideNav from "./Components/side-nav";
import { useAuthentication } from "./context/auth";
import PageWrapper from "./Components/page-wrapper";
import HeaderMobile from "./Components/header-mobile";
import MarginWidthWrapper from "./Components/margin-width-wrapper";
import InvitePrompt from "./app/dashboard/home/components/invitePrompt";

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, subscription } = useAuthentication();
  const [isToggleModal, setIsToggleModal] = useState<boolean>(false);
  if (admin !== null) {
    return (
      <div className="flex">
        {!subscription && <SideNav setIsToggleModal={setIsToggleModal} />}
        {isToggleModal && <InvitePrompt setIsToggleModal={setIsToggleModal} />}
        <main className="flex-1">
          {!subscription ? (
            <MarginWidthWrapper>
              <Header />
              <HeaderMobile />
              <PageWrapper>{children}</PageWrapper>
            </MarginWidthWrapper>
          ) : (
            <PageWrapper>{children}</PageWrapper>
          )}
        </main>
      </div>
    );
  } else {
    return (
      <div className="flex">
        <main className="flex-1">
          <PageWrapper>{children}</PageWrapper>
        </main>
      </div>
    );
  }
}
