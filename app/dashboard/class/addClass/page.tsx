"use client";
import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import {
  InputComponent,
  DropdownComponent,
} from "@/Components/index";

import { useSchoolData } from "@/context/school";

import Images from "@/Theme/Images";

import { departmentData, endTimeData, startTimeData, subjData } from "@/app/data/data";
import styles from "./addClass.module.css";
import "react-toastify/dist/ReactToastify.css";
import { capitalizeFirstLetter } from "@/Utils/utils";
import Loader from "@/Components/Loader/loader";

const AddClass = (props: any) => {
  const router = useRouter();
  const { registerClass } = useSchoolData()
  const [loading, setLoading] = useState<boolean>(false)


  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm
  } = useFormik({
    initialValues: {
      iD: "",
      selectedClass: "",
      selectedDepartment: "",
      noOfSubjects: "",
      startTime: "",
      endTime: "",
    },
    validationSchema: Yup.object({
      iD: Yup.string().required("Teacher ID is required"),
      selectedClass: Yup.string().required("Class Name is required"),
      selectedDepartment: Yup.string().required("Department is required"),
      noOfSubjects: Yup.number().required("Number of Subjects is required").positive("Must be a positive number"),
      startTime: Yup.string().required("Start Time is required"),
      endTime: Yup.string().required("End Time is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      const params = {
        teacher_ID: values.iD,
        class_Name: values.selectedClass,
        department: values.selectedDepartment,
        no_Of_Subjects: values.noOfSubjects,
        no_Of_Students: 0,
        startTime: values.startTime,
        endTime: values.endTime
      };
      await registerClass(params);
      toast.success("Class Registered Successfully");
      router.back();
      setLoading(false)
    }
  });

  const handleReset = () => {
    resetForm();
  };

  useEffect(() => {
    Object.keys(errors).forEach((error: any) => {
      toast.error(capitalizeFirstLetter(errors[error]));
    });
  }, [errors]);

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.rightColumn}>
        <div>
          <p className={styles.title}>Add Class, Let’s Get Started!</p>
        </div>
        <div className={styles.tabLine}>
          <div style={{ width: "45%", marginBottom: 10, marginTop: 10 }}>
            <div 
              className={styles.purpleLine}
            ></div>
            <div className={styles.pageTitle}>Basic Information</div>
          </div>
          <div style={{ width: "50%", marginBottom: 10, marginTop: 10 }}>
          </div>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div>
            <div className={styles.allInputsDiv}>
              <label className={styles.emailLabel}>
                ID
                <InputComponent
                  placeholder="Enter teacher id number"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={values?.iD}
                  onChange={handleChange("iD")}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
                Class
                <DropdownComponent
                  options={subjData}
                  width="100%"
                  hieght="44px"
                  placeholder="Enter select class"
                  onSelect={(data) => { setFieldValue("selectedClass", data) }}
                  selected={values?.selectedClass} // Add this line
                />
              </label>
              <label htmlFor="department" className={styles.emailLabel}>
                Department
                <DropdownComponent
                  options={departmentData}
                  width="100%"
                  hieght="44px"
                  placeholder="Please select department"
                  onSelect={(data) => { setFieldValue("selectedDepartment", data) }}
                  selected={values?.selectedDepartment} // Add this line
                />
              </label>
              <label htmlFor="Subjects" className={styles.emailLabel}>
                No of Subjects
                <DropdownComponent
                  options={["1", "2", "3", "4", "5", "6", "7"]}
                  width="100%"
                  hieght="44px"
                  placeholder="Enter no fo subjects"
                  onSelect={(data) => { setFieldValue("noOfSubjects", data) }}
                  selected={values?.noOfSubjects} // Add this line
                />
              </label>
              <label htmlFor="start time" className={styles.emailLabel}>
                Class Start Time
                <DropdownComponent
                  options={startTimeData}
                  width="100%"
                  hieght="44px"
                  placeholder="Class Start Time"
                  onSelect={(data) => { setFieldValue("startTime", data) }}
                  selected={values?.startTime} // Add this line
                />
              </label>
              <label htmlFor="end time" className={styles.emailLabel}>
                Class End Time
                <DropdownComponent
                  options={endTimeData}
                  width="100%"
                  hieght="44px"
                  placeholder="Class End Time"
                  onSelect={(data) => { setFieldValue("endTime", data) }}
                  selected={values?.endTime} // Add this line
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
              Register
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
            <p className={styles.leftDivHeading}>Add New Class</p>
            <p className={styles.leftDivSubHeading}>
              Dear Admin, Please fill the form to register new class in school
            </p>
          </div>
          <Image
            src={Images.addClassBanner}
            // width={522}
            // height={331}
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

export default AddClass;