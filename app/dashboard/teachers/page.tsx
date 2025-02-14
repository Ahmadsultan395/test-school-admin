"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import Tasttable from "@/Components/Table/TableComponent";
import PageHeader from "@/Components/pageHeader";

import { useSchoolData } from "@/context/school";

import Icons from "@/Theme/Icons";
import styles from "./teacher.module.css";
import TeacherCard from "@/Components/DetailCards/TeacherCard";
import StudentCard from "@/Components/DetailCards/StudentCard";

const TeacherPage: React.FC = () => {
  const { teachers } = useSchoolData();
  const router: any = useRouter();

  const TeacherMap = teachers?.map((item: any, index: number) => {
    return {
      iD: item?.iD,
      picture: item?.picture,
      name: `${item?.first_name} ${item?.last_name}`,
      gender: item?.gender,
      subject: item?.class,
      section: item?.section,
      guardian: item?.guardian_Name,
      teacher: item?.teacher,
      address: item?.address,
      dateOfBirth: item?.date_of_birth,
      phone: item?.phone,
      email: item?.email,
      religion: item?.religion,
      bio:item?.teacher_bio
    };
  });


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
      accessorKey: "photo",
      header: "Photo",
      cell: (props: any) => <p>{props.photo}</p>,
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
      accessorKey: "subject",
      header: "Subject",
      cell: (props: any) => <p>{props.subject}</p>,
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: (props: any) => <p>{props.address}</p>,
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date of Birth",
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
  const [teacherInfo, setTeacherInfo] = useState<any | null>(null); 
  const TeacherDeatils = (item: any) => {
    setInfoCard(false);
    setTeacherInfo(item)
  };
  return (
    <div>
      {infoCard ? (
        <div>
          <div className={styles.directryPath}>
            <PageHeader headerText={`All Teachers`} screenName={`Teacher`}
              children={
                <button onClick={() => { router.push("/dashboard/teachers/teacherregister") }} className={styles.addTeacherButton}>
                  <Image
                    src={Icons.PlusIcon}
                    width={15}
                    height={15}
                    alt="Picture of the author"
                    style={{ marginRight: 10 }}
                    className={styles.editIcon}
                  />
                  <span className={styles.txtEdit}>Add New Teacher</span>
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
              isDataVisible={TeacherDeatils}
              data={TeacherMap}
              columns={columns}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.directryPath}>
            <PageHeader
              headerText={`All Teachers`}
              screenName={`Teacher`}
              subScreen={"Teacher Profile"}
            />
          </div>
          <StudentCard item={teacherInfo} />
        </div>
      )}
    </div>
  );
};

export default TeacherPage;
