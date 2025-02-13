"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";

import PageHeader from "@/Components/pageHeader";
import SubjectTable from "@/Components/Table/SubjectTable";

import { useSchoolData } from "@/context/school";

import Icons from "@/Theme/Icons";
import styles from "./subject.module.css";


const SubjectsPage: React.FC = () => {
  const { subjects } = useSchoolData();
  const router = useRouter();
  const subjectsData = subjects.map((item:any)=> {
    return {
      subject_Name: item.subject_Name,
      no_Of_Classes: item.no_Of_Classes,
      class_Timing: `${item.startTime} - ${item.endTime}`,
    };
  })

  const columns = [
    {
      accessorKey: "checkbox",
      header: "check",
      cell: (props: any) => <p>{props.checkbox}</p>,
    },
    {
      accessorKey: "subject_Name",
      header: "Subject",
      cell: (props: any) => <p>{props.subject_Name}</p>,
    },
    {
      accessorKey: "no_Of_Classes",
      header: "No of Classes",
      cell: (props: any) => <p>{props.no_Of_Classes}</p>,
    },

    {
      accessorKey: "class_Timing",
      header: "Subject Time",
      cell: (props: any) => <p>{props.class_Timing}</p>,
    },
    {
      accessorKey: "actions",
      header: "Action",
      cell: (props: any) => <p>{props.no_Of_Students}</p>,
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
            <PageHeader headerText={`All Subject`} screenName={`Subject`}
              children={
                <button onClick={() => { router.push("/dashboard/subject/addSubject") }} className={styles.addClassButton}>
                  <Image
                    src={Icons.PlusIcon}
                    width={15}
                    height={15}
                    alt="Picture of the author"
                    style={{ marginRight: 10 }}
                    className={styles.editIcon}
                  />
                  <span className={styles.txtEdit}>Add New Subject</span>
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
            <SubjectTable
              isDataVisible={classDeatils}
              data={subjectsData}
              columns={columns}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.directryPath}>
            <PageHeader
              headerText={`All Subjects`}
              screenName={`Subjects`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectsPage;