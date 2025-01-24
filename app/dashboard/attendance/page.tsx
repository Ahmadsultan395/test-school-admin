"use client";
import React, { useState } from "react";

import StudentCard from "../../../Components/studentData/studentData";
import Attendancetable from "../../../Components/AttendanceTable/attendancetable";
import PageHeader from "../../../Components/pageHeader";

import { useSchoolData } from "@/context/school";

import styles from "./attendance.module.css";
import { DropdownComponent, InputComponent } from "@/Components";
import { sections } from "@/app/data/data";

const AttendancePage: React.FC = () => {
  const { classes } = useSchoolData()
  const [studentData, setStudentData] = useState(true);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const studentDeatils = () => {
    setStudentData(false);
  };
  return (
    <div>
      {studentData ? (
        <div>
          <div className={styles.directryPath}>
            <PageHeader headerText={`Attendance`} screenName={`Attendance`} />
          </div>
          <div className={styles.mainContainer}>
            <div className={styles.inputs_row}>
              <DropdownComponent
                options={classes.map((item:any)=>{return item?.class_Name})}
                width="30%"
                hieght="44px"
                placeholder="Select class"
                onSelect={(data:any) => {setSelectedClass(data)}}
                selected={selectedClass}
              
              />
              <div style={{ marginRight: 10, marginLeft: 10, width: "30%" }}>
                <DropdownComponent
                  options={sections}
                  width="100%"
                  hieght="44px"
                  placeholder="Select Section"
                  onSelect={(data:any) => {setSelectedSection(data)}}
                  selected={selectedSection}
                />
              </div>
              <div style={{ marginRight: 10, width: "30%" }}>
              <InputComponent
                type="date"
                width="100%"
                hieght="44px"
                icon={false}
                placeholder="Select month"
                onChange={(date:any) => {setSelectedMonth(date?.target.value)}}
                value={selectedMonth}
              />
              </div>
              <DropdownComponent
                options={["2019","2020","2021","2022","2023","2024"]}
                width="30%"
                hieght="44px"
                placeholder="Enter Select session"
                onSelect={(data) => {setSelectedSession(data)}}
                selected={selectedSession}
              />
            </div>
            <div style={{display:"flex",marginBottom:10}}>
            <button
              type="submit"
              className={styles.saveBtn}
            >
              Save
            </button>
            <button
              type="button"
              className={styles.ResetBtn}
            >
              Reset
            </button>
            </div>
            <Attendancetable isDataVisible={studentDeatils} />
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.directryPath}>
            <PageHeader headerText={`All Students`} screenName={`Student`} subScreen={'Student Profile'} />
          </div>
          <StudentCard />
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
