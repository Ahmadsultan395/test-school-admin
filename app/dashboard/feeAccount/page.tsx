"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import Image from "next/image";

import PageHeader from "../../../Components/pageHeader";
import FeeAccountsTable from "@/Components/Table/FeeAccountsTableComponent";

import { useSchoolData } from "@/context/school";

import Icons from "../../../Theme/Icons";
import styles from "./expense.module.css";

const SubjectsPage: React.FC = () => {
  const { expense } = useSchoolData();
  const router = useRouter();

  
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
      accessorKey: "expenseType",
      header: "Expense",
      cell: (props: any) => <p>{props.expenseType}</p>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (props: any) => <p>{props.amount}</p>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (props: any) => <p>{props.status}</p>,
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


  const [classData, setClassData] = useState(true);
  const classDeatils = () => {
    setClassData(false);
  };

  return (
    <div>
      {classData ? (
        <div>
          <div className={styles.directryPath}>
            <PageHeader headerText={`All Fee Accounts`} screenName={`Fee Accounts`}
              children={
                <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",width:"80%"}}>
                  <button onClick={() => {}} className={styles.feeAccountsButtons}>
                  <Image
                    src={Icons.hiddenEyeLight}
                    width={20}
                    height={20}
                    alt="View Expense"
                    style={{ marginRight: 10,marginBottom:-2}}
                  />
                  <span className={styles.txtEdit}>View Expense</span>
                </button>
                <button onClick={() => { router.push("/dashboard/feeAccount/addExpense") }} className={styles.feeAccountsButtons}>
                  <Image
                    src={Icons.PlusIconDark}
                    width={15}
                    height={15}
                    alt="add expense"
                    style={{ marginRight: 10 }}
                    className={styles.editIcon}
                  />
                  <span className={styles.txtEdit}>Add Expense</span>
                </button>
                </div>
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
            <FeeAccountsTable isDataVisible={classDeatils} data={expense?expense:[]} columns={columns}/>
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
