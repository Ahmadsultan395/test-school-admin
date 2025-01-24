"use client";
import React, { useState, useEffect } from "react";
import * as Yup from 'yup';
import Image from "next/image";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import {
  Uploadfile,
  InputComponent,
} from "@/Components/index";

import { useSchoolData } from "@/context/school";
import { useAuthentication } from "@/context/auth";
import { capitalizeFirstLetter } from "@/Utils/utils";
import { generateRandomString } from "@/Utils/uniqueIdGenerator";

import Images from "@/Theme/Images";
import styles from "./addGuardian.module.css";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/Components/Loader/loader";

const AddGuardian = (props: any) => {
  const router = useRouter();
  const { uploadImageToStorage } = useAuthentication();
  const { rgisterGuardian } = useSchoolData();
  const [guardianPicture, setGuardianPicture] = useState<any>(null)
  const [guardianData, setGuardianData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)


  useEffect(() => {
    async function handleSchoolData() {
      const routeGuardianData = await localStorage.getItem("guardianData");
      if (routeGuardianData !== null) {
        setGuardianData(JSON.parse(routeGuardianData));
      }
    }
    handleSchoolData();
  }, []);

  const handleImageChange = async (file: any, type: string): Promise<string | null> => {
    const guardianLogoId = generateRandomString(10);
    try {
      const url: any = await uploadImageToStorage(file, guardianLogoId);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const {
    values: {
      email,
      phone,
      guardian_Bio
    },
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm
  }: any = useFormik({
    initialValues: {
      email: "",
      phone: "",
      guardian_Bio: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Guardian email is required"),
      phone: Yup.string().required("Guardian phone number is required"),
      guardian_Bio: Yup.string().required("Guardian bio is required"),
    }),
    onSubmit: async (values) => {
      if (!guardianData || guardianData === undefined) {
        toast.error(capitalizeFirstLetter("Guardian data is Required"));
      } else {
        setLoading(true);
        const guardianLogo = await handleImageChange(guardianPicture, "guardianLogo");
        if (guardianData) {
          const guardianlParams = {
            ...guardianData,
            ...values,
            picture: guardianLogo,
          };
          rgisterGuardian(guardianlParams);
          toast.success("Guardian Register Successfuly")
          router.push("/dashboard/guardians")
        }
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (
      errors?.email ||
      errors?.phone ||
      errors?.student_Bio
    ) {
      if (errors?.email) {
        toast.error(capitalizeFirstLetter("Please Select email"));
      } else if (errors?.phone) {
        toast.error(capitalizeFirstLetter("Please Select phone"));
      } else if (errors?.student_Bio) {
        toast.error(capitalizeFirstLetter("please enter student bio"));
      }
    }
  }, [errors]);

  if (loading) {
    return (
      <Loader />
    )
  }

  const handleReset = async () => {
    resetForm();
  };

  return (
    <div className={styles.container}>

      <div className={styles.rightColumn}>
        <div>
          <p className={styles.title}>Register Guardian, Let’s Get Started!</p>
        </div>
        <div className={styles.tabLine}>
          <div style={{ width: "44%", marginBottom: 10, marginTop: 10 }}>
            <div className={styles.grayLine}></div>
            <div className={styles.pageTitle}>Basic Information</div>
          </div>
          <div style={{ width: "44%", marginBottom: 10, marginTop: 10 }}>
            <div className={styles.purpleLine}></div>
            <div className={styles.pageTitle}>Other Information</div>
          </div>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div>
            <div className={styles.allInputsDiv}>
              <label className={styles.emailLabel}>
                Email
                <InputComponent
                  placeholder="Enter your email"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={email}
                  onChange={handleChange("email")}
                />
              </label>
              <label className={styles.emailLabel}>
                Phone
                <InputComponent
                  placeholder="Enter your phone"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={phone}
                  onChange={handleChange("phone")}
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
                placeholder="Enter about student"
                value={guardian_Bio}
                onChange={handleChange("guardian_Bio")}
              ></textarea>
              <label htmlFor="email" className={styles.emailLabel} style={{ width: "100%" }}>
                Upload School Logo (200px X 200px)Upload School Logo (200px X 200px)
                <Uploadfile
                  placeholder="Upload Photo"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setGuardianPicture(file)
                  }}
                  value={guardianPicture}
                />
              </label>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={handleReset} type="button" className={styles.ResetBtn}>
              Reset
            </button>
            <button type="submit" className={styles.loginBtn}>
              Next
            </button>
          </div>
        </form>
      </div>
      {window.innerWidth > 768 && (
        <div className={styles.leftColumn}>
          <div className={styles.logoContainer}></div>
          <Image
            src={Images.splashLogo}
            width={280}
            height={67.82}
            alt="Picture of the logo"
            className={styles.logoImage}
          />
          <div className={styles.companyDetails}>
            <p className={styles.leftDivHeading}>Register New Guardian</p>
            <p className={styles.leftDivSubHeading}>
              Dear Guardian, Please fill the form to register yourself in school
            </p>
          </div>
          <Image
            src={Images.Guardian}
            width={350.03}
            height={300}
            alt="Picture of the guardian"
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

export default AddGuardian;
