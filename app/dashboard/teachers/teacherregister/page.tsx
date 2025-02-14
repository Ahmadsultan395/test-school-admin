"use client";
import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

import {
  InputComponent,
  DropdownComponent,
  Uploadfile,
} from "@/Components/index";

import { useSchoolData } from "@/context/school";
import { useAuthentication } from "@/context/auth";
import { capitalizeFirstLetter } from "@/Utils/utils";
import { generateRandomString } from "@/Utils/uniqueIdGenerator";

import Images from "@/Theme/Images";
import "react-toastify/dist/ReactToastify.css";
import styles from "./teacherregistration.module.css";
import { genderTypes, religionData, schoolNames, sections } from "@/app/data/data";
import Loader from "@/Components/Loader/loader";

const TeacherRegistration = () => {
  const router = useRouter()
  const { uploadImageToStorage } = useAuthentication();
  const { rgisterTeacher , classes } = useSchoolData();
  const classesData = classes.map((item: any) => item.class_Name);
  const [fileValue, setFileValue] = useState(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [isClient, setIsClient] = useState(false);
    
      useEffect(() => {
        if (typeof window !== "undefined") {
          setIsClient(true); // We are on the client-side
        }
      }, []);

  const handleImageChange = async (file: any, type: string): Promise<string | null> => {
    const LogoId = generateRandomString(10);
    try {
      const url: any = await uploadImageToStorage(file, LogoId);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm
  } = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "",
      iD: "",
      class: "",
      section: "",
      religion: "",
      email: "",
      phone: "",
      teacher_bio: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      date_of_birth: Yup.string().required("Date of birth is required"),
      gender: Yup.string().required("Gender is required"),
      iD: Yup.string().required("ID number is required"),
      class: Yup.string().required("Class is required"),
      section: Yup.string().required("Section is required"),
      religion: Yup.string().required("Religion is required"),
      email: Yup.string().required("Email is required").email("Invalid email address"),
      phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number can't be longer than 15 digits"),
      teacher_bio: Yup.string().required("Teacher bio is required"),
    }),

    onSubmit: async (values) => {
      const picture: any = await handleImageChange(fileValue, "staffLogo");
      const staffParams = {
        ...values,
        picture,
      };
      if (picture !== "" || picture !== undefined || !picture) {
        setLoading(true);
        await rgisterTeacher(staffParams)
        toast.success("Teacher Register Successfuly")
        router.back()
      }
      else {
        setLoading(false);
        toast.error("Please select an image")
      }

    }
  });

  useEffect(() => {
    if (
      errors?.first_name ||
      errors?.last_name ||
      errors?.date_of_birth ||
      errors?.gender ||
      errors?.iD ||
      errors?.class ||
      errors?.section ||
      errors?.religion ||
      errors?.email ||
      errors?.phone ||
      errors?.teacher_bio
    ) {
      if (errors?.first_name) {
        toast.error(capitalizeFirstLetter("Please enter the first name"));
      } else if (errors?.last_name) {
        toast.error(capitalizeFirstLetter("Please enter the last name"));
      } else if (errors?.date_of_birth) {
        toast.error(capitalizeFirstLetter("Please enter the date of birth"));
      } else if (errors?.gender) {
        toast.error(capitalizeFirstLetter("Please enter the gender"));
      } else if (errors?.iD) {
        toast.error(capitalizeFirstLetter("Please enter the ID"));
      } else if (errors?.class) {
        toast.error(capitalizeFirstLetter("Please enter the class"));
      } else if (errors?.section) {
        toast.error(capitalizeFirstLetter("Please enter the section"));
      } else if (errors?.religion) {
        toast.error(capitalizeFirstLetter("Please enter the religion"));
      } else if (errors?.email) {
        toast.error(capitalizeFirstLetter("Please enter a valid email"));
      } else if (errors?.phone) {
        toast.error(capitalizeFirstLetter("Please enter the phone number"));
      } else if (errors?.teacher_bio) {
        toast.error(capitalizeFirstLetter("Please enter the teacher bio"));
      }
    }
  }, [errors]);
  
  const handleReset = () => {
    resetForm();
  };

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.rightColumn}>
        <div></div>
        <div>
          <p className={styles.title}>Register Teacher, Let’s Started!</p>
        </div>
        <div className={styles.tabLines}>
          <div style={{ width: "44%", marginBottom: 10, marginTop: 10 }}>
            <div className={styles.purpleLine}></div>
            <div className={styles.pageTitle}>Basic Information</div>
          </div>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div>
            <div className={styles.allInputsDiv}>
              <label htmlFor="email" className={styles.emailLabel}>
                Teacher First Name
                <InputComponent
                  placeholder="Enter teacher first name"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values.first_name}
                  onChange={handleChange("first_name")}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
                Teacher Last Name
                <InputComponent
                  placeholder="Enter teacher last name"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values?.last_name}
                  onChange={handleChange("last_name")}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
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
              <label htmlFor="email" className={styles.emailLabel}>
                Gender
                <DropdownComponent
                  options={genderTypes}
                  width="100%"
                  hieght="45px"
                  placeholder="Please select your gender"
                  onSelect={(data) => { setFieldValue("gender", data) }}
                  selected={values?.gender}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
                ID Number
                <InputComponent
                  placeholder="Enter teacher id number"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values?.iD}
                  onChange={handleChange("iD")}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
                Class
                <DropdownComponent
                  options={classesData}
                  width="100%"
                  hieght="45px"
                  placeholder="Please select your class"
                  onSelect={(data) => { setFieldValue("class", data) }}
                  selected={values?.class}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
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
              <label htmlFor="email" className={styles.emailLabel}>
                Religion
                <DropdownComponent
                  options={religionData}
                  width="100%"
                  hieght="45px"
                  placeholder="Please select your religion"
                  onSelect={(data) => { setFieldValue("religion", data) }}
                  selected={values?.religion}
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
              <label htmlFor="email" className={styles.emailLabel}>
                Phone
                <InputComponent
                  placeholder="Ener your phone number"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={values?.phone}
                  onChange={handleChange("phone")}
                />
              </label>
              <label htmlFor="myTextarea" className={styles.emailLabel}>
                Teacher BIO
              </label>
              <textarea
                id="myTextarea"
                className={styles.customTextarea}
                rows={3}
                cols={50}
                value={values?.teacher_bio}
                onChange={handleChange("teacher_bio")}
                placeholder="Enter about teacher"
              ></textarea>

              <label htmlFor="email" className={styles.emailLabel}>
                Upload Student Photo (200px X 200px)
                <Uploadfile
                  width={"206%"}
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
            height={92.74}
            alt="Picture of the author"
            className={styles.logoImage}
          />
          <div className={styles.companyDetails}>
            <p className={styles.leftDivHeading}>Register New Teacher</p>
            <p className={styles.leftDivSubHeading}>
              Dear Teacher, Please fill the form to register yourself in school
            </p>
          </div>
          <Image
            src={Images.teachervector}
            width={515}
            height={333}
            alt="Picture of the author"
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

export default TeacherRegistration;
