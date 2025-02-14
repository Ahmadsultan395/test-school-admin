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

import { capitalizeFirstLetter } from "@/Utils/utils";
import Images from "@/Theme/Images";
import styles from "./addGuardian.module.css";
import "react-toastify/dist/ReactToastify.css";
import { cityOptions, genderTypes, religionData, staffPositionData, stateOptions, zipOptions } from "@/app/data/data";

const AddGuardian = (props: any) => {
  const router = useRouter();
  const [routeGuardianData, setRouteGuardianData]: any = useState(null)
  const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        setIsClient(true); // We are on the client-side
      }
    }, []);
  
  useEffect(() => {
    async function handleSchoolData() {
      const guardianData: any = await localStorage.getItem("guardianData");
      if (guardianData !== null) {
        setRouteGuardianData(JSON.parse(guardianData));
      }
    }
    handleSchoolData();
  }, []);

  const {
    values:{
      first_name,
      last_name,
      date_of_birth,
      gender,
      iD,
      city,
      state,
      zip_code,
      occupation,
      religion,
    },
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: routeGuardianData?.first_name ?? "",
      last_name: routeGuardianData?.last_name ?? "",
      date_of_birth: routeGuardianData?.date_of_birth ?? "",
      gender: routeGuardianData?.gender ?? "",
      iD: routeGuardianData?.iD ?? "",
      city: routeGuardianData?.city ?? "",
      state: routeGuardianData?.state ?? "",
      zip_code: routeGuardianData?.zip_code ?? "",
      occupation: routeGuardianData?.occupation ?? "",
      religion: routeGuardianData?.religion ?? "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Guardian first name is required"),
      last_name: Yup.string().required("Guardian last name is required"),
      date_of_birth: Yup.string().required("Date of birth is required"),
      gender: Yup.string().required("Gender is required"),
      iD: Yup.string().required("ID number is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zip_code: Yup.string().required("Zip code is required"),
      occupation: Yup.string().required("Occupation is required"),
      religion: Yup.string().required("Religion is required"),
    }),
    onSubmit: (values) => {
      localStorage.setItem('guardianData', JSON.stringify(values))
      router.push('/dashboard/guardians/addGuardianBio')
    },
  });

  useEffect(() => {
    if (
      errors?.first_name ||
      errors?.last_name ||
      errors?.date_of_birth ||
      errors?.gender ||
      errors?.iD ||
      errors?.city ||
      errors?.state ||
      errors?.zip_code ||
      errors?.occupation ||
      errors?.religion
    ) {
      if (errors?.first_name) {
        toast.error(capitalizeFirstLetter("Please Select first name"));
      } else if (!last_name) {
        toast.error(capitalizeFirstLetter("Please Select last name"));
      } else if (errors?.date_of_birth) {
        toast.error(capitalizeFirstLetter("please enter date of birth"));
      } else if (errors?.gender) {
        toast.error(capitalizeFirstLetter("please enter your gender"));
      } else if (errors?.iD) {
        toast.error(capitalizeFirstLetter("please enter your ID"));
      } else if (errors?.city) {
        toast.error(capitalizeFirstLetter("please enter your city"));
      } else if (errors?.state) {
        toast.error(capitalizeFirstLetter("please enter your state"));
      } else if (errors?.zip_code) {
        toast.error(capitalizeFirstLetter("please enter your zip code"));
      } else if (errors?.occupation) {
        toast.error(capitalizeFirstLetter("please enter your Occupation"));
      } else if (errors?.religion) {
        toast.error(capitalizeFirstLetter("please enter your religion"));
      } 
    }
  }, [errors]);

  const handleReset = async () => {
    resetForm();
    routeGuardianData({})
    await localStorage.setItem('guardianData', JSON.stringify({}));
  };


  return (
    <div className={styles.container}>

      <div className={styles.rightColumn}>
        <div>
          <p className={styles.title}>Register Guardian, Let’s Get Started!</p>
        </div>
        <div className={styles.tabLine}>
          <div style={{ width: "44%", marginBottom: 10, marginTop: 10 }}>
            <div className={styles.purpleLine}></div>
            <div className={styles.pageTitle}>Basic Information</div>
          </div>
          <div style={{ width: "44%", marginBottom: 10, marginTop: 10 }}>
            <div className={styles.grayLine}></div>
            <div className={styles.pageTitle}>Other Information</div>
          </div>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div>
            <div className={styles.allInputsDiv}>
              <label className={styles.emailLabel}>
                Guardian First Name
                <InputComponent
                  placeholder={"Enter your first name"}
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={first_name}
                  onChange={handleChange("first_name")}
                />
              </label>
              <label className={styles.emailLabel}>
                Guardian Last Name
                <InputComponent
                  placeholder="Enter your last name"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={last_name}
                  onChange={handleChange("last_name")}
                />
              </label>
              <label className={styles.emailLabel}>
                Date of Birth
                <InputComponent
                  placeholder="dd/mm/yyyy"
                  type="date"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={date_of_birth}
                  onChange={handleChange("date_of_birth")}
                />
              </label>
              <label htmlFor="gender" className={styles.emailLabel}>
                Gender
                <DropdownComponent
                  options={genderTypes}
                  width="100%"
                  hieght="44px"
                  placeholder="Select Gender"
                  onSelect={(data) => setFieldValue("gender", data)}
                  selected={gender}
                />
              </label>
              <label className={styles.emailLabel}>
                ID Number
                <InputComponent
                  placeholder="Enter ID number"
                  type="text"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={iD}
                  onChange={handleChange("iD")}
                />
              </label>
              <label htmlFor="city" className={styles.emailLabel}>
                City
                <DropdownComponent
                  options={cityOptions}
                  width="100%"
                  hieght="44px"
                  placeholder="Please select your city"
                  onSelect={(data) => setFieldValue("city", data)}
                  selected={city}
                />
              </label>
              <label htmlFor="state" className={styles.emailLabel}>
                State
                <DropdownComponent
                  options={stateOptions}
                  width="100%"
                  hieght="44px"
                  placeholder="Please select your state"
                  onSelect={(data) => setFieldValue("state", data)}
                  selected={state}
                />
              </label>
              <label htmlFor="zip_code" className={styles.emailLabel}>
                Zip Code
                <DropdownComponent
                  options={zipOptions}
                  width="100%"
                  hieght="44px"
                  placeholder="Please select occupation"
                  onSelect={(data) => setFieldValue("zip_code", data)}
                  selected={zip_code}
                />
              </label>
              <label htmlFor="occupation" className={styles.emailLabel}>
                Occupation
                <DropdownComponent
                  options={staffPositionData}
                  width="100%"
                  hieght="44px"
                  placeholder="Please select occupation"
                  onSelect={(data) => setFieldValue("occupation", data)}
                  selected={occupation}
                />
              </label>
              <label htmlFor="religion" className={styles.emailLabel}>
                Religion
                <DropdownComponent
                  options={religionData}
                  width="100%"
                  hieght="44px"
                  placeholder="Please select your religion"
                  onSelect={(data) => setFieldValue("religion", data)}
                  selected={religion}
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
      {isClient && window.innerWidth > 768 && (
        <div className={styles.leftColumn}>
          <div className={styles.logoContainer}></div>
          <Image
            src={Images.splashLogo}
            width={280}
            height={67.82}
            alt="Picture of the author"
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

export default AddGuardian;
