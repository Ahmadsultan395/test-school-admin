"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

import {
  InputComponent,
  Uploadfile,
} from "@/Components/index";
import Loader from "@/Components/Loader/loader";

import { useSchoolData } from "@/context/school";
import { useAuthentication } from "@/context/auth";
import { capitalizeFirstLetter } from "@/Utils/utils";
import { generateRandomString } from "@/Utils/uniqueIdGenerator";

import Images from "@/Theme/Images";
import "react-toastify/dist/ReactToastify.css";
import styles from "./studentRegistration.module.css";

const StudentRegistration = () => {
  const router = useRouter();
  const { uploadImageToStorage } = useAuthentication();
  const { rgisterStudent } = useSchoolData();
  const [fileValue, setFileValue] = useState(null);
  const [studentData, setStudentData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        setIsClient(true); // We are on the client-side
      }
    }, []);

  useEffect(() => {
    async function handleSchoolData() {
      const routeStudentData = await localStorage.getItem("studentData");
      if (routeStudentData !== null) {
        setStudentData(JSON.parse(routeStudentData));
      }
    }
    handleSchoolData();
  }, []);

  const handleImageChange = async (file: any, type: string): Promise<string | null> => {
    const studentLogoId = generateRandomString(10);
    try {
      const url: any = await uploadImageToStorage(file, studentLogoId);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    resetForm
  } = useFormik({
    initialValues: {
      studentAllergies: "",
      allergiesDetails: "",
      insuranceProviderName: "",
      insuranceProviderPhone: "",
      INS_Card_ID: "",
      INS_Group_Number: "",
      studentBIO: "",
    },
    validationSchema: Yup.object({
      studentAllergies: Yup.string().required("Student allergies is required"),
      allergiesDetails: Yup.string().required("Allergies details is required"),
      insuranceProviderName: Yup.string().required("Insurance provider name is required"),
      insuranceProviderPhone: Yup.string().required("Insurance provider phone is required"),
      INS_Card_ID: Yup.string().required("Insurance card ID is required"),
      INS_Group_Number: Yup.string().required("Insurance group number is required"),
      studentBIO: Yup.string().required("Student BIO is required"),
    }),
    onSubmit: async (values) => {
      const studentLogo = await handleImageChange(fileValue, "guardianLogo");
      if (studentData) {
        const studentParams = {
          ...studentData,
          ...values,
          picture: studentLogo,
        };
        if (fileValue !== "" || fileValue !== undefined || !fileValue) {
          setLoading(true);
          rgisterStudent(studentParams);
          toast.success("Student Register Successfuly")
          await localStorage.setItem('studentData', JSON.stringify({}))
          router.push("/dashboard/students")
        }
        else {
          setLoading(false);
          toast.error("Please select a profile image")
        }
      }
    }
  });

  const handleReset = () => {
    resetForm();
  };

  useEffect(() => {
    if (
      errors?.studentAllergies ||
      errors?.allergiesDetails ||
      errors?.insuranceProviderName ||
      errors?.insuranceProviderPhone ||
      errors?.INS_Card_ID ||
      errors?.INS_Group_Number ||
      errors?.studentBIO
    ) {
      if (errors?.studentAllergies) {
        toast.error(capitalizeFirstLetter("Please enter the student allergies"));
      } else if (errors?.allergiesDetails) {
        toast.error(capitalizeFirstLetter("Please enter the allergies details"));
      } else if (errors?.insuranceProviderName) {
        toast.error(capitalizeFirstLetter("Please enter the insurance provider name"));
      } else if (errors?.insuranceProviderPhone) {
        toast.error(capitalizeFirstLetter("Please enter the insurance provider phone"));
      } else if (errors?.INS_Card_ID) {
        toast.error(capitalizeFirstLetter("Please enter the insurance card ID"));
      } else if (errors?.INS_Group_Number) {
        toast.error(capitalizeFirstLetter("Please enter the insurance group number"));
      } else if (errors?.studentBIO) {
        toast.error(capitalizeFirstLetter("Please enter the student BIO"));
      }
    }
  }, [errors]);

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <div className={styles.container}>
      {/* Left Column */}
      <div className={styles.rightColumn}>
        <div>
          <p className={styles.title}>Register Student, Let’s Started!</p>
        </div>
        {/* Login Form */}
        <div className={styles.tabLines}>
          <div style={{ width: "44%", marginBottom: 10, marginTop: 10 }}>
            <div
              className={styles.grayLine}
            ></div>
            <div className={styles.pageTitle}>Basic Information</div>
          </div>
          <div style={{ width: "44%", marginBottom: 10, marginTop: 10 }}>
            <div
              className={styles.purpleLine}
            ></div>
            <div className={styles.pageTitle}>Other Information</div>
          </div>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div>
            <div className={styles.allInputsDiv}>
              <label htmlFor="email" className={styles.emailLabel}>
                Student Allergies
                <InputComponent
                  placeholder="Enter student allergies here"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values.studentAllergies}
                  onChange={handleChange("studentAllergies")}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
                Allergies Details
                <InputComponent
                  placeholder="Enter allergies details here"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values.allergiesDetails}
                  onChange={handleChange("allergiesDetails")}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
                Insurance Provider Name
                <InputComponent
                  placeholder="Enter insurance provider here"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values.insuranceProviderName}
                  onChange={handleChange("insuranceProviderName")}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
                Insurance Provider Phone
                <InputComponent
                  placeholder="Enter insurance provider phone"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values.insuranceProviderPhone}
                  onChange={handleChange("insuranceProviderPhone")}
                />
              </label>
              <label htmlFor="" className={styles.emailLabel}>
                INS Card ID
                <InputComponent
                  placeholder="Enter ins group number"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values.INS_Card_ID}
                  onChange={handleChange("INS_Card_ID")}
                />
              </label>

              <label htmlFor="email" className={styles.emailLabel}>
                INS Group Number
                <InputComponent
                  placeholder="Enter insurance provider phone"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values.INS_Group_Number}
                  onChange={handleChange("INS_Group_Number")}
                />
              </label>

              <label htmlFor="myTextarea" className={styles.emailLabel}>
                Student BIO
              </label>
              <textarea
                id="myTextarea"
                className={styles.customTextarea}
                rows={3}
                cols={50}
                value={values?.studentBIO}
                onChange={handleChange("studentBIO")}
                placeholder="Enter about student"
              ></textarea>

              <label htmlFor="email" className={styles.emailLabel}>
                Upload Student Photo (200px X 200px)
                <Uploadfile
                  width={"208%"}
                  iconName="round"
                  placeholder="No file choosen"
                  onChange={(e) => {
                    const file: any = e.target.files?.[0];
                    setFileValue(file)
                  }}
                  value={fileValue}
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
      {isClient && window.innerWidth > 768 && (
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
