"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Icons from "../Theme/Icons";
import Images from "../Theme/Images";
import { Icon } from "@iconify/react";
import { SideNavItem } from "../types";
import { useRouter } from "next/navigation";
import { SIDENAV_ITEMS } from "../constants";
import { usePathname } from "next/navigation";
import styles from "./sideNavigation.module.css";
import { useAuthentication } from "../context/auth";

const SideNav = ({ setIsToggleModal }: { setIsToggleModal: any }) => {
  const router = useRouter();
  const { handleSubscription } = useAuthentication();
  return (
    <div className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-10 w-full">
        <Link
          href="/"
          className="flex flex-row space-x-10 space-y-10 items-center justify-center md:justify-start md:px-6 h-20 w-full"
        >
          <Image
            src={Images.Logo}
            alt=""
            width={120}
            height={52}
            quality={100}
          />

          <Image
            src={Icons.MenuIcon}
            alt=""
            width={24}
            height={24}
            quality={100}
            style={{ marginBottom: "50px" }}
          />
        </Link>

        <div
          className={styles.btnUpgradePlan}
          onClick={() => {
            handleSubscription();
            router.push("/subscription");
          }}
        >
          <Image
            alt=""
            width={24}
            height={24}
            quality={100}
            src={Icons.UpgradeIcon}
            style={{ marginRight: "10px" }}
          />
          <span className={styles.txtUpgradePlan}>Upgrade Plan</span>
        </div>

        <div className="flex flex-col space-y-2 md:px-6 overflow-y-auto">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>

        <div
          onClick={() => setIsToggleModal(true)}
          className="flex items-center justify-center p-2 m-5 rounded-sm bg-violet-600 hover:bg-violet-500"
        >
          <span className={`text-[15px] text-sm flex text-slate-50`}>
            Invite
          </span>
        </div>
        <div className="" />
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-sm flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-violet-50 ${
            item.path === pathname ? "bg-violet-50" : ""
          }`}
        >
          {item.path === pathname ? item.activeIcon : item.icon}
          <span
            className={`text-[15px] text-sm flex ${
              item.path === pathname
                ? "font-semibold text-violet-600"
                : "text-zinc-500"
            }`}
          >
            {item.title}
          </span>
        </Link>
      )}
    </div>
  );
};
