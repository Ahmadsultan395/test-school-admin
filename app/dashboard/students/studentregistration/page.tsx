"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

import {
  InputComponent,
  DropdownComponent,
} from "@/Components/index";

import { useSchoolData } from "@/context/school";
import { capitalizeFirstLetter } from "@/Utils/utils";
import Images from "@/Theme/Images";
import "react-toastify/dist/ReactToastify.css";
import styles from "./studentRegistration.module.css";
import { genderTypes, sections } from "@/app/data/data";

const StudentRegistration = () => {
  const router = useRouter();
  const { classes } = useSchoolData()
  const classesData = classes.map((item: any) => item.class_Name);
  const [routeStudentData, setrouteStudentData]: any = useState(null)

  useEffect(() => {
    async function handleSchoolData() {
      const studentData: any = await localStorage.getItem("studentData");
      if (studentData !== null) {
        console.log(studentData)
        setrouteStudentData(JSON.parse(studentData));
      }
    }
    handleSchoolData();
  }, []);

  const {
    values,
    errors,
    handleSubmit,
    setFieldValue,
    handleChange,
    resetForm
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_Name: routeStudentData?.first_Name ?? '',
      last_Name: routeStudentData?.last_Name || '',
      gender: routeStudentData?.gender || '',
      date_of_birth: routeStudentData?.date_of_birth || '',
      roll_Number: routeStudentData?.roll_Number || '',
      class_Name: routeStudentData?.class_Name || '',
      section: routeStudentData?.section || '',
      guardian_Name: routeStudentData?.guardian_Name || '',
      email: routeStudentData?.email || '',
      phone: routeStudentData?.phone || '',
    },
    validationSchema: Yup.object({
      first_Name: Yup.string().required("First Name is required"),
      last_Name: Yup.string().required("Last Name is required"),
      gender: Yup.string().required("Gender is required"),
      date_of_birth: Yup.string().required("Date of Birth is required"),
      roll_Number: Yup.string().required("Roll Number is required"),
      class_Name: Yup.string().required("Class is required"),
      section: Yup.string().required("Section is required"),
      guardian_Name: Yup.string().required("Guardian name is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Phone number must be only digits")
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number can't be longer than 15 digits"),
    }),
    onSubmit: async (values) => {
      try {
        await localStorage.setItem('studentData', JSON.stringify(values))
        router.push("/dashboard/students/studentOtherInformation");
      } catch (error) {
        toast.error("Failed to register class");
      }
    },
  });

  useEffect(() => {
    if (
      errors?.first_Name ||
      errors?.last_Name ||
      errors?.gender ||
      errors?.date_of_birth ||
      errors?.roll_Number ||
      errors?.class_Name ||
      errors?.section ||
      errors?.guardian_Name ||
      errors?.email ||
      errors?.phone
    ) {
      if (errors?.first_Name) {
        toast.error(capitalizeFirstLetter("Please enter the first name"));
      } else if (errors?.last_Name) {
        toast.error(capitalizeFirstLetter("Please enter the last name"));
      } else if (errors?.date_of_birth) {
        toast.error(capitalizeFirstLetter("Please enter the date of birth"));
      } else if (errors?.gender) {
        toast.error(capitalizeFirstLetter("Please enter the gender"));
      } else if (errors?.roll_Number) {
        toast.error(capitalizeFirstLetter("Please enter the roll number"));
      } else if (errors?.class_Name) {
        toast.error(capitalizeFirstLetter("Please enter the class"));
      } else if (errors?.section) {
        toast.error(capitalizeFirstLetter("Please enter the section"));
      } else if (errors?.guardian_Name) {
        toast.error(capitalizeFirstLetter("Please enter the guardian name"));
      } else if (errors?.email) {
        toast.error(capitalizeFirstLetter("Please enter a valid email"));
      } else if (errors?.phone) {
        toast.error(capitalizeFirstLetter("Please enter the phone number"));
      }
    }
  }, [errors]);

  const handleReset = async () => {
    resetForm();
    setrouteStudentData(null);
    await localStorage.setItem('studentData', JSON.stringify({}));
  };

  return (
    <div className={styles.container}>
      <div className={styles.rightColumn}>
        <div>
          <p className={styles.title}>Register Student, Let’s Started!</p>
        </div>
        <div className={styles.tabLines}>
          <div style={{ width: "44%", marginBottom: 10, marginTop: 10 }}>
            <div
              className={styles.purpleLine}
            ></div>
            <div className={styles.pageTitle}>Basic Information</div>
          </div>
          <div style={{ width: "44%", marginBottom: 10, marginTop: 10 }}>
            <div
              className={styles.grayLine}
            ></div>
            <div className={styles.pageTitle}>Other Information</div>
          </div>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div>
            <div className={styles.allInputsDiv}>
              <label htmlFor="first_Name" className={styles.emailLabel}>
                Student First Name
                <InputComponent
                  placeholder="Enter Student First Name"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values?.first_Name}
                  onChange={handleChange("first_Name")}
                />
              </label>
              <label htmlFor="last_Name" className={styles.emailLabel}>
                Student Last Name
                <InputComponent
                  placeholder="Enter Student Last Name"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values?.last_Name}
                  onChange={handleChange("last_Name")}
                />
              </label>
              <label htmlFor="gender" className={styles.emailLabel}>
                Gender
                <DropdownComponent
                  options={genderTypes}
                  width="100%"
                  hieght="45px"
                  placeholder="Please Enter your Gender"
                  onSelect={(data) => { setFieldValue("gender", data) }}
                  selected={values?.gender}
                />
              </label>
              <label htmlFor="dateofbirth" className={styles.emailLabel}>
                Date of Birth
                <InputComponent
                  placeholder="dd/mm/yyyy"
                  type="date"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values?.date_of_birth}
                  onChange={handleChange("date_of_birth")}
                />
              </label>
              <label htmlFor="roll_Number" className={styles.emailLabel}>
                Roll Number
                <InputComponent
                  placeholder="Enter student roll number"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values?.roll_Number}
                  onChange={handleChange("roll_Number")}
                />
              </label>
              <label htmlFor="class" className={styles.emailLabel}>
                Class
                <DropdownComponent
                  options={classesData}
                  width="100%"
                  hieght="45px"
                  placeholder="Please select your class"
                  onSelect={(data) => { setFieldValue("class_Name", data) }}
                  selected={values?.class_Name}
                />
              </label>
              <label htmlFor="section" className={styles.emailLabel}>
                Section
                <DropdownComponent
                  options={sections}
                  width="100%"
                  hieght="45px"
                  placeholder="Please select your section"
                  onSelect={(data) => { setFieldValue("section", data) }}
                  selected={values?.section}
                />
              </label>
              <label htmlFor="guardian_Name" className={styles.emailLabel}>
                Guardian
                <InputComponent
                  placeholder="Enter student guardian name"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values?.guardian_Name}
                  onChange={handleChange("guardian_Name")}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
                Email
                <InputComponent
                  placeholder="Enter your email"
                  type="email"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values?.email}
                  onChange={handleChange("email")}
                />
              </label>
              <label htmlFor="phone" className={styles.emailLabel}>
                Phone
                <InputComponent
                  placeholder="Enter your Phone number"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values?.phone}
                  onChange={handleChange("phone")}
                />
              </label>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.ResetBtn}
              onClick={handleReset}
            >
              reset
            </button>
            <button
              type="submit"
              className={styles.loginBtn}
            >
              Next
            </button>
          </div>
        </form>
      </div>
      {window.innerWidth > 768 && (
        <div className={styles.leftColumn}>
          <div className={styles.logoContainer}></div>
          <Image
            src={Images.Logo}
            width={280}
            height={67.82}
            alt="Picture of the author"
            className={styles.logoImage}
          />
          <div className={styles.companyDetails}>
            <p className={styles.leftDivHeading}>Register New Student</p>
            <p className={styles.leftDivSubHeading}>
              Dear Student, Please fill the form to register yourself in school{" "}
            </p>
          </div>
          <Image
            src={Images.studentvector}
            width={575}
            height={67.82}
            alt="Picture of the author"
            className={styles.mainVector}
          />
        </div>)}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default StudentRegistration;
