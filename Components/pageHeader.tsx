import React from "react";
import Image from "next/image";
import Icons from "../Theme/Icons";
import styles from "./sideNavigation.module.css";

const PageHeader = (props: any) => {
  return (
    <div>
      <span className={styles.headerPage}>{props?.headerText}</span>
      <div className={styles.pageRow} style={{justifyContent:"space-between",alignItems:"flex-end"}}>
        <div className={styles.pageRow}>
        <span className={styles.txtHome}>Home</span>
        <Image src={Icons.ThemeArrowRight} alt="" height={24} width={24} />
        <span className={styles.txtSubHeading}>{props?.screenName}</span>
        {props.subScreen && (
          <>
            <Image src={Icons.ThemeArrowRight} alt="" height={24} width={24} />
            <span className={styles.txtSubHeading}>{props?.subScreen}</span>
          </>
        )}
        </div>
        {props?.children}
      </div>
    </div>
  );
};

export default PageHeader;
