"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useSchoolData } from "@/context/school";

import PageHeader from "@/Components/pageHeader";
import Tasttable from "@/Components/Table/TableComponent";
import StudentCard from "@/Components/studentData/studentData";

import Icons from "@/Theme/Icons";
import styles from "./staffmember.module.css";

const StaffMemberPage: React.FC = () => {
  const router = useRouter();
  const { staff } = useSchoolData();
  const [studentData, setStudentData] = useState(true);

  const columns = [
    {
      accessorKey: "checkbox",
      header: "check",
      cell: (props: any) => <p>{props.checkbox}</p>,
    },
    {
      accessorKey: "iD",
      header: "ID#",
      cell: (props: any) => <p>{props.iD}</p>,
    },
    {
      accessorKey: "profile",
      header: "Photo",
      cell: (props: any) => <p>{props.profile}</p>,
    },
    {
      accessorKey: "first_name",
      header: "Name",
      cell: (props: any) => <p>{props.first_name}</p>,
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: (props: any) => <p>{props.gender}</p>,
    },
    {
      accessorKey: "staffPosition",
      header: "Position",
      cell: (props: any) => <p>{props.staffPosition}</p>,
    },
    {
      accessorKey: "staffStatus",
      header: "Status",
      cell: (props: any) => <p>{props.staffStatus}</p>,
    },
    {
      accessorKey: "date_of_birth",
      header: "Date of Birth",
      cell: (props: any) => <p>{props.date_of_birth}</p>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: (props: any) => <p>{props.phone}</p>,
    },
    {
      accessorKey: "email",
      header: "E-mail",
      cell: (props: any) => <p>{props.email}</p>,
    }
  ];
  const studentDeatils = () => {
    setStudentData(false);
  };
  return (
    <div>
      {studentData ? (
        <div>
          <div className={styles.directryPath}>
            <PageHeader headerText={`All Staff Members`} screenName={`Staff Members`}
              children={
                <button onClick={() => { router.push("/dashboard/staffMember/addNewStaff") }} className={styles.addStaffButton}>
                  <Image
                    src={Icons.PlusIcon}
                    width={15}
                    height={15}
                    alt="Picture of the author"
                    style={{ marginRight: 10 }}
                    className={styles.editIcon}
                  />
                  <span className={styles.txtEdit}>Add New Staff</span>
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
            <Tasttable isDataVisible={studentDeatils} data={staff} columns={columns} />
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.directryPath}>
            <PageHeader
              headerText={`All Staff Members`}
              screenName={`Staff Members`}
              subScreen={"Staff Profile"}
            />
          </div>
          <StudentCard />
        </div>
      )}
    </div>
  );
};

export default StaffMemberPage;
