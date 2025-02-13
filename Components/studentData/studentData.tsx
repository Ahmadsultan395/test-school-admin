// components/StudentCard.tsx

import React, { useEffect, useState } from "react";
import styles from "./StudentCard.module.css"; // Import your CSS module
import Image from "next/image";
import Images from "../../Theme/Images";
const StudentCard: React.FC = ({item}:any) => {
  return (
    <div className={styles.card}>
      <div className={styles.profileDataDiv}>
        <div className={styles.profileImgPart}>
          <div>
            <Image
              src={Images.Profile}
              width={120}
              height={120}
              alt="Picture of the author"
              className={styles.profileImage}
            />
          </div>
          <div className={styles.studentInfo}>
            <div className={styles.StudentName}>{item?.name}</div>
            <div className={styles.studentID}>
              <span>Student ID: </span>
              <span>{item?.rollNumber}</span>
            </div>
            <div className={styles.studentGender}>
              <span>Gender: </span>
              <span>{item?.gender}</span>
            </div>
          </div>
        </div>
        <div className={styles.attendanceCard}>
          <div
            style={{
              width: "90%",
            }}
          >
            <div className={styles.attendanceTitle}>Attendance</div>
            <div className={styles.resultMain}>
              <div className={styles.curentResult}>85%</div>
              <div className={styles.outofMail}>
                <span style={{ color: "#3EDC4E" }}>85</span>
                <span style={{ color: "#3C3C3C" }}>/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.allDataMainDiv}>
        <div>
          <div className={styles.dataLine}>
            <span className={styles.dataTitle}>Full name : </span>
            <span className={styles.dataValue}>{item?.name}</span>
          </div>
          <div className={styles.dataLine}>
            <span className={styles.dataTitle}>Gender: </span>
            <span className={styles.dataValue}>{item?.gender}</span>
          </div>
          <div className={styles.dataLine}>
            <span className={styles.dataTitle}>Guardian Name: </span>
            <span className={styles.dataValue}>Steve jones</span>
          </div>
          <div className={styles.dataLine}>
            <span className={styles.dataTitle}>Date of Birth: </span>
            <span className={styles.dataValue}>{item?.dateOfBirth}</span>
          </div>
          <div className={styles.dataLine}>
            <span className={styles.dataTitle}>Religion: </span>
            <span className={styles.dataValue}>{item?.religion}</span>
          </div>
          <div className={styles.dataLine}>
            <span className={styles.dataTitle}>Father Occupation: </span>
            <span className={styles.dataValue}>{item?.fatherOccupation}</span>
          </div>
          <div className={styles.dataLine}>
            <span className={styles.dataTitle}>Email: </span>
            <span className={styles.dataValue}>{item?.email}</span>
          </div>
        </div>

        <div>
          <div className={styles.dataLine}>
            <span className={styles.dataTitle}>Registration Date : </span>
            <span className={styles.dataValue}>01-08-2019</span>
          </div>
          <div className={styles.dataLine}>
            <span className={styles.dataTitle}>Class: </span>
            <span className={styles.dataValue}>0</span>
          </div>
          <div className={styles.dataLine}>
            <span className={styles.dataTitle}>Section: </span>
            <span className={styles.dataValue}>{item?.section}</span>
          </div>
          <div className={styles.dataLine}>
            <span className={styles.dataTitle}>Roll No : </span>
            <span className={styles.dataValue}>{item?.rollNumber}</span>
          </div>
          <div className={styles.dataLine}>
            <span className={styles.dataTitle}>Address </span>
            <span className={styles.dataValue}>TA,162, Newyork</span>
          </div>
          <div className={styles.dataLine}>
            <span className={styles.dataTitle}>Phone No: </span>
            <span className={styles.dataValue}>{item?.phone}</span>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.bioTitle}>Bio:</div>
        <p className={styles.bioParagraph}>{item?.studentBIO}</p>
      </div>
    </div>
  );
};

export default StudentCard;
