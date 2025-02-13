"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";

import ClassTable from "@/Components/Table/ClassTable";
import PageHeader from "@/Components/pageHeader";

import { useSchoolData } from "@/context/school";

import Icons from "@/Theme/Icons";
import styles from "./class.module.css";


const Classpage: React.FC = () => {
  const router = useRouter();
  const { classes } = useSchoolData();
  const classesMap = classes.map((item:any) => {
    return {
      teacher_ID: item.teacher_ID,
      class_Name: item.class_Name,
      department: item.department,
      no_Of_Subjects: item.no_Of_Subjects,
      no_Of_Students: item.no_Of_Students,
      class_Time: `${item.startTime} - ${item.startTime}`
    }
  })

  const columns = [
    {
      accessorKey: "checkbox",
      header: "check",
      cell: (props: any) => <p>{props.checkbox}</p>,
    },
    {
      accessorKey: "teacher_ID",
      header: "ID#",
      cell: (props: any) => <p>{props.teacher_ID}</p>,
    },
    {
      accessorKey: "class_Name",
      header: "Class",
      cell: (props: any) => <p>{props.class_Name}</p>,
    },

    {
      accessorKey: "no_Of_Subjects",
      header: "No of Subjects",
      cell: (props: any) => <p>{props.no_Of_Subjects}</p>,
    },
    {
      accessorKey: "no_Of_Students",
      header: "No of Students",
      cell: (props: any) => <p>{props.no_Of_Students}</p>,
    },
    {
      accessorKey: "class_Time",
      header: "Class Time",
      cell: (props: any) => <p>{props?.class_Time}</p>,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: (props: any) => <p>{props.actions}</p>,
    }
  ];


  const [classData, setClassData] = useState(true);
  const classDeatils = () => {
    setClassData(false);
  };

  return (
    <div>
      {classData ? (
        <div>
          <div className={styles.directryPath}>
            <PageHeader headerText={`All Classes`} screenName={`Class`}
              children={
                <button onClick={() => { router.push("/dashboard/class/addClass") }} className={styles.addClassButton}>
                  <Image
                    src={Icons.PlusIcon}
                    width={15}
                    height={15}
                    alt="Picture of the author"
                    style={{ marginRight: 10 }}
                    className={styles.editIcon}
                  />
                  <span className={styles.txtEdit}>Add New Class</span>
                </button>
              }
            />
          </div>
          <div className={styles.mainContainer} style={{ marginTop: "10px" }}>
            <div className={styles.inputs_row}>
              <div className={styles.searchbar}>
                <Image
                  src={Icons.SearchIcon}
                  alt=""
                  width={24}
                  height={24}
                  quality={100}
                  style={{ margin: "10px" }}
                />
                <Input className="input-field" placeholder="Search by Roll #" />
              </div>
              <div className={styles.searchbar}>
                <Image
                  src={Icons.SearchIcon}
                  alt=""
                  width={24}
                  height={24}
                  quality={100}
                  style={{ margin: "10px" }}
                />
                <Input className="input-field" placeholder="Search by Name" />
              </div>
              <div className={styles.searchbar}>
                <Image
                  src={Icons.SearchIcon}
                  alt=""
                  width={24}
                  height={24}
                  quality={100}
                  style={{ margin: "10px" }}
                />
                <Input className="input-field" placeholder="Search by Class" />
              </div>
              <div className={styles.searchButton}>Search</div>
            </div>
            <ClassTable
              isDataVisible={classDeatils}
              data={classesMap}
              columns={columns}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.directryPath}>
            <PageHeader
              headerText={`All Classes`}
              screenName={`Class`}
              subScreen={"Class Profile"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Classpage;