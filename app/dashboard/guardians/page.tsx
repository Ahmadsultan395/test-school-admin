"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";

import Tasttable from "@/Components/Table/TableComponent";
import PageHeader from "@/Components/pageHeader";

import { useSchoolData } from "@/context/school";

import Icons from "@/Theme/Icons";
import styles from "./guardians.module.css";
import GuardianCard from "@/Components/DetailCards/GuardianCard";

interface StudentTableProps {
  isDataVisible: (item: any) => void; // Accepts an item
  data: any[];
  columns: any[];
}

const GuardiansPage: React.FC = () => {
  const router = useRouter();
  const { guardians } = useSchoolData()

  const guardianMap = guardians?.map((item: any, index: number) => {
    return {
      iD: item?.iD,
      picture: item?.picture,
      name: `${item?.first_name} ${item?.last_name}`,
      gender: item?.gender,
      city: item?.city,
      state: item?.state,
      zip_code: item?.zip_code,
      address: item?.address,
      occupation: item?.occupation,
      phone: item?.phone,
      email: item?.email,
      dateOfBirth: item?.date_of_birth,
      guardianBio: item?.guardian_Bio,
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
      accessorKey: "profile",
      header: "Photo",
      cell: (props: any) => <p>{props.profile}</p>,
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
      accessorKey: "city",
      header: "City",
      cell: (props: any) => <p>{props.city}</p>,
    },
    {
      accessorKey: "state",
      header: "State",
      cell: (props: any) => <p>{props.state}</p>,
    },
    {
      accessorKey: "zip_code",
      header: "Zip code",
      cell: (props: any) => <p>{props.zip_code}</p>,
    },
    {
      accessorKey: "occupation",
      header: "Occupation",
      cell: (props: any) => <p>{props.occupation}</p>,
    },
    // {
    //   accessorKey: "address",
    //   header: "Address",
    //   cell: (props: any) => <p>{"ddddd"}</p>,
    // },
    {
      accessorKey: "dateOfBirth",
      header: "Date of Birth",
      cell: (props: any) => <p>{props.dateOfBirth}</p>,
    }
  ];

  const [infoCard, setInfoCard] = useState(true);
  const [guardianInfo, setGuardianInfo] = useState(undefined);
  const guardianDeatils = (item: any) => {
    setInfoCard(false);
    setGuardianInfo(item)

  };

 
  
  return (
    <div>
      {infoCard ? (
        <div>
          <div className={styles.directryPath}>
            <PageHeader headerText={`All Guardians`} screenName={`Guardians`}
              children={
                <button onClick={() => { router.push("/dashboard/guardians/addGuardian") }} className={styles.addGardianButton}>
                  <Image
                    src={Icons.PlusIcon}
                    width={15}
                    height={15}
                    alt="Picture of the author"
                    style={{ marginRight: 10 }}
                    className={styles.editIcon}
                  />
                  <span className={styles.txtEdit}>Add Guardians</span>
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
            <Tasttable isDataVisible={(item: any) => guardianDeatils(item)} data={guardianMap} columns={columns} />


          </div>
        </div>
      ) : (
        <div>
          <div className={styles.directryPath}>
            <PageHeader
              headerText={`All Guardians`}
              screenName={`Guardians`}
              subScreen={"Guardians Profile"}
            />
          </div>
          <GuardianCard item={guardianInfo} />
        </div>
      )}
    </div>
  );
};

export default GuardiansPage;
