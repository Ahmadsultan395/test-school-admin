"use client";
import React, { useState } from "react";
import styles from "./StudentTable.module.css";
import Image from "next/image";
import Icons from "../../Theme/Icons";
import Link from "next/link";
import StudentCard from './../../Components/studentData/studentData'
interface Student {
  id: number;
  rollNumber: string;
  profile: any;
  name: string;
  gender: string;
  class: string;
  section: string;
  guardian: string;
  teacher: string;
  address: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  whatsapp: string;
  
  // Add other data fields as needed
}
interface StudentTableProps {
  studentsprops: Student[];
  isDataVisible: () => void
}
const StudentTable: React.FC<StudentTableProps> = ({ studentsprops,isDataVisible }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [studentData, setStudentData] = useState(false);

  const itemsPerPage = 12; // You can adjust this based on your preference
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = studentsprops.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  console.log(currentPage);
  const headings = [
    {
      heading: "Roll#",
      iconUp: Icons.Filterup,
      iconDown: Icons.FilterDown,
      width: 9,
      hoeght: 9,
    },
    {
      heading: "Photo",
      iconUp: Icons.Filterup,
      iconDown: Icons.FilterDown,
      width: 9,
      hoeght: 9,
    },
    {
      heading: "Name",
      iconUp: Icons.Filterup,
      iconDown: Icons.FilterDown,
      width: 9,
      hoeght: 9,
    },
    {
      heading: "Gender",
      iconUp: Icons.Filterup,
      iconDown: Icons.FilterDown,
      width: 9,
      hoeght: 9,
    },
    {
      heading: "Class",
      iconUp: Icons.Filterup,
      iconDown: Icons.FilterDown,
      width: 9,
      hoeght: 9,
    },
    {
      heading: "Section",
      iconUp: Icons.Filterup,
      iconDown: Icons.FilterDown,
      width: 9,
      hoeght: 9,
    },
    {
      heading: "Guardian",
      iconUp: Icons.Filterup,
      iconDown: Icons.FilterDown,
      width: 9,
      hoeght: 9,
    },
    {
      heading: "Teacher",
      iconUp: Icons.Filterup,
      iconDown: Icons.FilterDown,
      width: 9,
      hoeght: 9,
    },
    {
      heading: "Address",
      iconUp: Icons.Filterup,
      iconDown: Icons.FilterDown,
      width: 9,
      hoeght: 9,
    },
    {
      heading: "Date of birth",
      iconUp: Icons.Filterup,
      iconDown: Icons.FilterDown,
      width: 9,
      hoeght: 9,
    },
    {
      heading: "Phone#",
      iconUp: Icons.Filterup,
      iconDown: Icons.FilterDown,
      width: 9,
      hoeght: 9,
    },

    {
      heading: "Email",
      iconUp: Icons.Filterup,
      iconDown: Icons.FilterDown,
      width: 9,
      hoeght: 9,
    },
  ];
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    
    <div className={styles.tableContainer}>
      
      <div className={styles.studentTable}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            {headings.map((value, index) => {
              return (
                <th key={index}>
                  <div className={styles.thDiv}>
                    {value.heading}
                    <div className={styles.iconDiv}>
                      <Image
                        src={Icons.Filterup}
                        width={value.width}
                        height={value.hoeght}
                        alt="Picture of the author"
                        className={styles.filterUp}
                        style={{ marginBottom: 2 }}
                      />
                      <Image
                        src={Icons.FilterDown}
                        width={value.width}
                        height={value.hoeght}
                        alt="Picture of the author"
                        className={styles.filterDown}
                      />
                    </div>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.tableBodyContainer}>
          {currentStudents.map((student, i) => (
            <tr key={student.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{student.rollNumber}</td>
              <td>
                <Image
                  src={student.profile}
                  width={30}
                  height={30}
                  alt="Picture of the author"
                  className={styles.logoImage}
                />
              </td>
              <td>
                <div
                  className={styles.nameLink}
                  onClick={() => isDataVisible()}
                >
                  {student.name}
                </div>
              </td>
              <td>{student.gender}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.guardian}</td>
              <td>{student.teacher}</td>
              <td>{student.address}</td>
              <td>{student.dateOfBirth}</td>
              <td>{student.phone}</td>
              <td>{student.email}</td>
              <td>{student.whatsapp}</td>
            </tr>
          ))}
        </tbody>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={currentPage === 1 ? { color: "gray" } : { color: "black" }}
        >
          Previous
        </button>
        {Array.from(
          { length: Math.ceil(studentsprops.length / itemsPerPage) },
          (_, index) => {
            console.log("=====>>", index);
            return (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={styles.paginationButtons}
                style={
                  index === currentPage - 1
                    ? { backgroundColor: "#8147E7" }
                    : { border: "1px solid #8147E7", color: "#8147E7" }
                }
              >
                {index + 1}
              </button>
            );
          }
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(studentsprops.length / itemsPerPage)
          }
          style={
            currentPage === Math.ceil(studentsprops.length / itemsPerPage)
              ? { color: "gray" }
              : { color: "#000" }
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentTable;
