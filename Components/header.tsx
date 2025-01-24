"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Icons from "../Theme/Icons";
import Images from "../Theme/Images";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import styles from "./sideNavigation.module.css";
import { useAuthentication } from "../context/auth";

const Header = () => {
  const router = useRouter();
  const { admin, adminSignOut } = useAuthentication();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [menuData, setMenuData] = useState([
    {
      menuName: "My Profile",
      icon: Icons.MyProfileIcon,
      activeIcon: Icons.MyProfileActIcon,
    },
    {
      menuName: "Account Setting",
      icon: Icons.AccountSettingIcon,
      activeIcon: Icons.AccountSettingActIcon,
    },
    {
      menuName: "Log Out",
      icon: Icons.LogoutIcon,
      activeIcon: Icons.LogoutActIcon,
    },
  ]);

  const handleLogout = () => {
    adminSignOut();
    router.replace("/auth/login");
    localStorage.removeItem("schoolData");
    localStorage.removeItem("productItem");
  };


  return (
    <div className={styles.row}>
      <div className={styles.searchbar}>
        <Image
          src={Icons.SearchIcon}
          alt=""
          width={24}
          height={24}
          quality={100}
          style={{ margin: "10px" }}
        />
        <Input className={styles.inputField} placeholder="Search Dashboard" />
      </div>
      <div className={styles.notificationBox}>
        <Image
          src={Icons.NotificationIcon}
          alt=""
          width={24}
          height={24}
          quality={100}
          style={{ margin: "7px" }}
        />
      </div>
      <div className={styles.messageBox}>
        <Image
          src={Icons.MessageIcon}
          alt=""
          width={24}
          height={24}
          quality={100}
          style={{ margin: "7px" }}
        />
      </div>
      <div className={styles.profileContainerRow}>
        <div className={styles.profileImgContainer}>
          <Image
            alt=""
            width={40}
            height={40}
            quality={100}
            style={{borderRadius:5}}
            src={admin?.avatarUrl ? admin?.avatarUrl : Images.profileImg}
          />
        </div>
        <div className={styles.profileInfo}>
          <span className={`text-[14px] text-sm font-semibold flex`}>
            {admin?.name ? admin?.name : ""}
          </span>
          <span className={`text-[12px] text-sm flex text-zinc-500`}>
            School Admin
          </span>
        </div>
        <div
          className={styles.dropDown}
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <Image
            alt=""
            src={Icons.dropwDownIcon}
            quality={100}
            height={20}
            width={20}
          />
        </div>
        {toggleMenu && (
          <div className={styles.menuContainer}>
            {menuData.map((item, index) => (
              <div
                className={styles.menuItem}
                key={index}
                onClick={() => {
                  if (item?.menuName === "Log Out") {
                    handleLogout();
                  }
                }}
                onMouseOver={() => setHoveredIndex(index)}
                onMouseOut={() => setHoveredIndex(null)}
              >
                <Image
                  src={index === hoveredIndex ? item.activeIcon : item.icon}
                  alt=""
                  className={styles.menuIcon}
                />
                <span className={styles.txtMenu}>{item?.menuName}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
