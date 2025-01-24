"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@nextui-org/input";

import Tasttable from "../../../Components/Table/TableComponent";
import PageHeader from "../../../Components/pageHeader";

import { useSchoolData } from "../../../context/school";

import Icons from "../../../Theme/Icons";
import styles from "./student.module.css";
import StudentCard from "@/Components/DetailCards/StudentCard";

const StudentPage: React.FC = () => {
  const { students } = useSchoolData();
  const router = useRouter();

  const studentsMap = students?.map((item: any, index: number) => {
    return {
      rollNumber: item?.roll_Number,
      picture: item?.picture,
      name: `${item?.first_Name} ${item?.last_Name}`,
      gender: item?.gender,
      class: item?.class_Name,
      section: item?.section,
      guardian: item?.guardian_Name,
      teacher: item?.teacher,
      address: item?.address,
      dateOfBirth: item?.date_of_birth,
      phone: item?.phone,
      email: item?.email,
      religion: item?.religion,
      studentBIO: item?.studentBIO
    };
  });

  const columns = [
    {
      accessorKey: "checkbox",
      header: "check",
      cell: (props: any) => <p>{props.checkbox}</p>,
    },
    {
      accessorKey: "rollNumber",
      header: "Roll#",
      cell: (props: any) => <p>{props.rollNumber}</p>,
    },
    {
      accessorKey: "picture",
      header: "Profile",
      cell: (props: any) => <p>{props.picture}</p>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: (props: any) => <p>{props.name}</p>,
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: (props: any) => <p>{props.gender}</p>,
    },
    {
      accessorKey: "class",
      header: "Class",
      cell: (props: any) => <p>{props.class}</p>,
    },
    {
      accessorKey: "section",
      header: "Section",
      cell: (props: any) => <p>{props.section}</p>,
    },
    {
      accessorKey: "guardian",
      header: "Guardian",
      cell: (props: any) => <p>{props.guardian}</p>,
    },
    {
      accessorKey: "teacher",
      header: "Teacher",
      cell: (props: any) => <p>{props.teacher}</p>,
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: (props: any) => <p>{props.address}</p>,
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date Of Birth",
      cell: (props: any) => <p>{props.dateOfBirth}</p>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: (props: any) => <p>{props.phone}</p>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (props: any) => <p>{props.email}</p>,
    },
  ];

  const [infoCard, setInfoCard] = useState(true);
  const [studentInfo, setStudentInfo] = useState(undefined);
  const studentDeatils = (item: any) => {
    setInfoCard(false);
    setStudentInfo(item)
  };
  return (
    <div>
      {infoCard ? (
        <div>
          <div className={styles.directryPath}>
            <PageHeader headerText={`All Students`} screenName={`Students`}
              children={
                <button onClick={() => { router.push("/dashboard/students/studentregistration") }} className={styles.addStudentButton}>
                  <Image
                    src={Icons.PlusIcon}
                    width={15}
                    height={15}
                    alt="Picture of the author"
                    style={{ marginRight: 10 }}
                    className={styles.editIcon}
                  />
                  <span className={styles.txtEdit}>Add New Student</span>
                </button>
              }
            />
          </div>
          <div className={styles.mainContainer}>
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
            <Tasttable
              isDataVisible={studentDeatils}
              data={studentsMap.length > 0 ? studentsMap : []}
              columns={columns}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.directryPath}>
            <PageHeader
              headerText={`All Students`}
              screenName={`Student`}
              subScreen={"Student Profile"}
            />
          </div>
          <StudentCard item={studentInfo} />
        </div>
      )}
    </div>
  );
};

export default StudentPage;
