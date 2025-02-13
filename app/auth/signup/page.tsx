// pages/index.js
"use client";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import {
  Uploadfile,
  InputComponent,
  DropdownComponent,
} from "@/Components/index";

import { useAuthentication } from "@/context/auth";
import { capitalizeFirstLetter } from "@/Utils/utils";
import { validateSchoolRegister } from '@/Helpers/AuthFormValidator';

import Images from "@/Theme/Images";
import styles from "./signup.module.css";

const Signup = (props: any) => {
  const router = useRouter();
  const { uploadImageToStorage } = useAuthentication();
  const schoolNames = ["school one", "school two"];
  const schoolType = ["school type", "school type 2"];
  const [schoolLogo, setSchoolLogo] = useState<any>();
  const [selectedSchoolName, setSelectedSchoolName] = useState("");
  const [selectedSchoolType, setSelectedSchoolType] = useState("");
  const [schoolData, setSchoolData] = useState();

  const generateRandomString = (length: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };
  const handleImageChange = async (event: any, type: string) => {
    const schoolLogoId = generateRandomString(10);
    const schoolLogoFile = event;
    try {
      const url = await uploadImageToStorage(schoolLogoFile, schoolLogoId);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleSchoolTypeChange = (selectedOption: string) => {
    setSelectedSchoolType(selectedOption);
    setSchoolData((prevData: any) => ({
      ...prevData,
      school_type: selectedOption,
    }));
  };

  const handleSchoolNameChange = (selectedOption: string) => {
    setSelectedSchoolName(selectedOption);
    setSchoolData((prevData: any) => ({
      ...prevData,
      school_name: selectedOption,
    }));
  };

  const {
    values: {
      school_address,
      email,
      school_contact1,
      school_contact2,
      school_city,
      school_state,
      school_description,
      school_web_link,
      school_linkdin_link,
    },
    errors,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      school_address: "",
      email: "",
      school_contact1: "",
      school_contact2: "",
      school_city: "",
      school_state: "",
      school_description: "",
      school_web_link: "",
      school_linkdin_link: "",
      websiteValidation: true,
    },
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: validateSchoolRegister,
    onSubmit: async ({
      email,
      school_address,
      school_contact1,
      school_contact2,
      school_city,
      school_state,
      school_description,
      school_web_link,
      school_linkdin_link,
    }) => {
      const schoolData = {
        schoolEmail: email,
        name: selectedSchoolName,
        type: selectedSchoolType,
        address: school_address,
        contact1: "+" + school_contact1,
        contact2: "+" + school_contact2,
        city: school_city,
        state: school_state,
        description: school_description,
        webURL: school_web_link,
        linkdinURL: school_linkdin_link,
        logo: ""
      }
      if (!selectedSchoolName) {
        toast.error(capitalizeFirstLetter("Please Select School Name"));
      } else if (!selectedSchoolType) {
        toast.error(capitalizeFirstLetter("Please Select School Type"));
      } else if (!schoolLogo || schoolLogo === undefined) {
        toast.error(capitalizeFirstLetter("School Logo is Required"));
      } else {
        const schoolLogo1 = await handleImageChange(schoolLogo, "schoolLogo");
        if (schoolLogo1 !== undefined && schoolLogo1 !== null) {
          schoolData.logo = schoolLogo1;
          localStorage.setItem('schoolData', JSON.stringify(schoolData))
          router.push('/auth/signupadmininfo')
        }
      }
    },
  });

  useEffect(() => {
    if (
      selectedSchoolName ||
      selectedSchoolType ||
      errors?.school_address ||
      errors?.email ||
      errors?.school_contact1 ||
      errors?.school_contact2 ||
      errors?.school_city ||
      errors?.school_state ||
      errors?.school_description ||
      errors?.school_web_link ||
      errors?.school_linkdin_link
    ) {
      if (!selectedSchoolName) {
        toast.error(capitalizeFirstLetter("Please Select School Name"));
      } else if (!selectedSchoolType) {
        toast.error(capitalizeFirstLetter("Please Select School Type"));
      } else if (errors?.school_address) {
        toast.error(capitalizeFirstLetter(errors?.school_address));
      } else if (errors?.email) {
        toast.error(capitalizeFirstLetter(errors?.email));
      } else if (errors?.school_contact1) {
        toast.error(capitalizeFirstLetter(errors?.school_contact1));
      } else if (errors?.school_contact2) {
        toast.error(capitalizeFirstLetter(errors?.school_contact2));
      } else if (errors?.school_city) {
        toast.error(capitalizeFirstLetter(errors?.school_city));
      } else if (errors?.school_state) {
        toast.error(capitalizeFirstLetter(errors?.school_state));
      } else if (errors?.school_description) {
        toast.error(capitalizeFirstLetter(errors?.school_description));
      } else if (errors?.school_web_link) {
        toast.error(capitalizeFirstLetter(errors?.school_web_link));
      } else if (errors?.school_linkdin_link) {
        toast.error(capitalizeFirstLetter(errors?.school_linkdin_link));
      } else if (!schoolLogo || schoolLogo === undefined) {
        toast.error(capitalizeFirstLetter("School Logo is Required"));
      }
    }
  }, [errors?.school_address, errors?.email, errors?.school_contact1, errors?.school_contact2, errors?.school_city, errors?.school_state, errors?.school_description, errors?.school_web_link, errors?.school_linkdin_link, schoolLogo]);

  return (
    <div className={styles.container}>
      {/* Left Column */}
      <div className={styles.rightColumn}>
        <div></div>
        <div>
          <p className={styles.title}>Register School Let’s Started!</p>
        </div>
        {/* Login Form */}
        <div className={styles.tabLine}>
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
            <div className={styles.pageTitle}>Admin Information</div>
          </div>
        </div>
        <form className={styles.loginForm}>
          <div>
            <div className={styles.allInputsDiv}>
              <label htmlFor="email" className={styles.emailLabel}>
                School Name
                <DropdownComponent
                  options={schoolNames}
                  width="100%"
                  hieght="44px"
                  placeholder="Select School name"
                  onSelect={handleSchoolNameChange}
                  selected={selectedSchoolName} // Add this line
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
                School Type
                <DropdownComponent
                  options={schoolType}
                  width="100%"
                  hieght="44px"
                  placeholder="Select School type"
                  onSelect={handleSchoolTypeChange}
                  selected={selectedSchoolType} // Add this line
                />
              </label>

              <label className={styles.emailLabel}>
                School Address
                <InputComponent
                  placeholder="Enter school Address"
                  type="email"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={school_address}
                  onChange={handleChange("school_address")}
                />
              </label>
              <label className={styles.emailLabel}>
                School Email
                <InputComponent
                  placeholder="Enter school Email"
                  type="email"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={email}
                  onChange={handleChange("email")}
                />
              </label>
              <label className={styles.emailLabel}>
                School Contact 1
                <InputComponent
                  placeholder="Enter school contact 1"
                  type="number"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={school_contact1}
                  onChange={handleChange("school_contact1")}
                />
              </label>
              <label className={styles.emailLabel}>
                School Contact 2
                <InputComponent
                  placeholder="Enter school contact 2"
                  type="number"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={school_contact2}
                  onChange={handleChange("school_contact2")}
                />
              </label>
              <label className={styles.emailLabel}>
                School City
                <InputComponent
                  placeholder="Enter your school city"
                  type="email"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={school_city}
                  onChange={handleChange("school_city")}
                />
              </label>
              <label className={styles.emailLabel}>
                School State
                <InputComponent
                  placeholder="Enter school State"
                  type="email"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={school_state}
                  onChange={handleChange("school_state")}
                />
              </label>

              <label htmlFor="myTextarea" className={styles.emailLabel}>
                School Description
              </label>
              <textarea
                id="myTextarea"
                className={styles.customTextarea}
                rows={3}
                cols={50}
                placeholder="Enter about your school"
                value={school_description}
                onChange={handleChange("school_description")}
              ></textarea>
              <label htmlFor="email" className={styles.emailLabel}>
                School Website Link
                <InputComponent
                  placeholder="Enter your school website"
                  type="email"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={school_web_link}
                  onChange={handleChange("school_web_link")}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
                School Linkedin Link
                <InputComponent
                  placeholder="Enter your school linkedin link"
                  type="email"
                  icon={false}
                  width="100%"
                  hieght="44px"
                  value={school_linkdin_link}
                  onChange={handleChange("school_linkdin_link")}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
                School Logo
                <Uploadfile
                  placeholder="Upload Logo"
                  onChange={(e) => {
                    const file = e.target.files?.[0]; // Using optional chaining
                    if (file) {
                      setSchoolLogo(file);
                    }
                  }}
                  value={schoolLogo}
                />
              </label>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.ResetBtn}
            >
              reset
            </button>
            <button
              type="button"
              className={styles.loginBtn}
              onClick={() => handleSubmit()}
            >
              Next
            </button>
          </div>
        </form>
      </div>
      <div className={styles.leftColumn}>
        {/* Logo and Details */}
        <div className={styles.logoContainer}></div>
        <Image
          src={Images.splashLogo}
          width={280}
          height={67.82}
          alt="Picture of the author"
          className={styles.logoImage}
        />
        <div className={styles.companyDetails}>
          <p className={styles.leftDivHeading}>Best Platform For Schools</p>
          <p className={styles.leftDivSubHeading}>
            Providing you a complete control digitally
          </p>
        </div>
        <Image
          src={Images.mainVector}
          width={575}
          height={67.82}
          alt="Picture of the author"
          className={styles.mainVector}
        />
      </div>
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

export default Signup;
