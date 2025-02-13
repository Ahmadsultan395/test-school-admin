"use client";
import React from "react";
import Image from "next/image";

import PageHeader from "@/Components/pageHeader";

import { useSchoolData } from "@/context/school";

import Icons from "@/Theme/Icons";
import Images from "@/Theme/Images";
import styles from "./school.module.css";

const SchoolPage: React.FC = () => {
  const { school } = useSchoolData();

  return (
    <div>
      <div className={styles.directryPath}>
        <PageHeader
          headerText={`School Profile`}
          screenName={`School Profile`}
        />
        <div className={styles.mainContainer}>
          <div className={styles.row}>
            <Image
              src={Images.Logo}
              width={255}
              height={67.82}
              alt="Picture of the author"
              className={styles.logoImage}
            />
            <div className={styles.btnEdit}>
              <Image
                src={Icons.EditIcon}
                width={24}
                height={24}
                alt="Picture of the author"
                className={styles.editIcon}
              />
              <span className={styles.txtEdit}>Edit</span>
            </div>
          </div>
          <div className={styles.subContainer}>
            <div className={styles.profileRow}>
              <div className={styles.txtRow}>
                <p className={styles.txtHeader}>School Full name : </p>
                <p className={styles.txtBody}>
                  {school?.name ? school?.name : ""}
                </p>
              </div>
              <div className={styles.txtRow}>
                <p className={styles.txtHeader}>Registration Date : </p>
                <p className={styles.txtBody}>01-08-2019</p>
              </div>
            </div>
            <div className={styles.profileRow}>
              <div className={styles.txtRow}>
                <p className={styles.txtHeader}>School Type : </p>
                <p className={styles.txtBody}>
                  {" "}
                  {school?.type ? school?.type : ""}
                </p>
              </div>
              <div className={styles.txtRow}>
                <p className={styles.txtHeader}>School City : </p>
                <p className={styles.txtBody}>
                  {school?.city ? school?.city : ""}
                </p>
              </div>
            </div>
            <div className={styles.profileRow}>
              <div className={styles.txtRow}>
                <p className={styles.txtHeader}>School Email : </p>
                <p className={styles.txtBody}>Boarding</p>
              </div>
              <div className={styles.txtRow}>
                <p className={styles.txtHeader}>School State : </p>
                <p className={styles.txtBody}>01-08-2019</p>
              </div>
            </div>
            <div className={styles.profileRow}>
              <div className={styles.txtRow}>
                <p className={styles.txtHeader}>School Contact 1 : </p>
                <p className={styles.txtBody}>
                  {school?.contact1 ? school?.contact1 : ""}
                </p>
              </div>
              <div className={styles.txtRow}>
                <p className={styles.txtHeader}>School Website : </p>
                <p className={styles.txtBody}>
                  {school?.webURL ? school?.webURL : ""}
                </p>
              </div>
            </div>
            <div className={styles.profileRow}>
              <div className={styles.txtRow}>
                <p className={styles.txtHeader}>School Contact 2 : </p>
                <p className={styles.txtBody}>
                  {school?.contact2 ? school?.contact2 : ""}
                </p>
              </div>
              <div className={styles.txtRow}>
                <p className={styles.txtHeader}>School LinkedIn : </p>
                <p className={styles.txtBody}>
                  {school?.linkdinURL ? school?.linkdinURL : ""}
                </p>
              </div>
            </div>
            <div className={styles.profileRow}>
              <div className={styles.txtRow}>
                <p className={styles.txtHeader}>School Email: </p>
                <p className={styles.txtBody}>
                  {school?.email ? school?.email : ""}
                </p>
              </div>
            </div>
            <div className={styles.profileRow}>
              <div className={styles.txtRow}>
                <p className={styles.txtHeader}>School Address : </p>
                <p className={styles.txtBody}>
                  {school?.address ? school?.address : ""}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.subContainer}>
            <p className={styles.desHeader}>School Description:</p>
            <p
              className={styles.descBody}>
                {school?.description ? school?.description : ""}
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolPage;
