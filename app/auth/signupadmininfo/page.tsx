"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify"
  ;
import { useAuthentication } from "@/context/auth";
import { capitalizeFirstLetter } from "@/Utils/utils";
import { Uploadfile, InputComponent } from "@/Components/index";
import { validateSchoolRegisterAdminInfo } from "@/Helpers/AuthFormValidator";

import Images from "@/Theme/Images";
import styles from "./signupadmininfo.module.css";
import "react-toastify/dist/ReactToastify.css";

const SignupAdminInfo = (props: any) => {
  const router = useRouter();
  const { admin, adminSignup, uploadImageToStorage } = useAuthentication();
  const [adminLogo, setAdminLogo] = useState<any>();
  const [routeSchoolData, setSchoolData] = useState<any>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (admin !== null) {
      toast.success(capitalizeFirstLetter("School Registered Successfully"));
      router.push("/subscription");
    }
  }, [admin]);

  useEffect(() => {
    async function handleSchoolData() {
      const routeSchoolData = await localStorage.getItem("schoolData");
      if (routeSchoolData !== null) {
        setSchoolData(JSON.parse(routeSchoolData));
      }
    }
    handleSchoolData();
  }, []);

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

  const {
    values: {
      school_admin_name,
      school_admin_email,
      password,
      confirm_password,
      admin_description,
    },
    errors,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      school_admin_name: "",
      school_admin_email: "",
      password: "",
      confirm_password: "",
      admin_description: "",
    },
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: validateSchoolRegisterAdminInfo,
    onSubmit: async ({
      school_admin_name,
      school_admin_email,
      password,
      confirm_password,
      admin_description,
    }) => {
      if (!adminLogo || adminLogo === undefined) {
        toast.error(capitalizeFirstLetter("School Admin Photo is Required"));
      } else {
        setLoading(true);
        const adminLogo1 = await handleImageChange(adminLogo, "adminLogo");
        routeSchoolData.adminLogo = adminLogo1;
        if (routeSchoolData?.adminLogo) {
          const schoolData = {
            ...routeSchoolData,
            adminName: school_admin_name,
            adminEmail: school_admin_email,
            adminDescription: admin_description,
          };
          adminSignup(schoolData?.adminEmail, password, schoolData);
        }
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (
      errors?.school_admin_name ||
      errors?.school_admin_email ||
      errors?.password ||
      errors?.confirm_password ||
      errors?.admin_description
    ) {
      if (errors?.school_admin_name) {
        toast.error(capitalizeFirstLetter(errors?.school_admin_name));
      } else if (errors?.school_admin_email) {
        toast.error(capitalizeFirstLetter(errors?.school_admin_email));
      } else if (errors?.password) {
        toast.error(capitalizeFirstLetter(errors?.password));
      } else if (errors?.confirm_password) {
        toast.error(capitalizeFirstLetter(errors?.confirm_password));
      } else if (errors?.admin_description) {
        toast.error(capitalizeFirstLetter(errors?.admin_description));
      } else if (!adminLogo || adminLogo === undefined) {
        toast.error(capitalizeFirstLetter("School Admin Photo is Required"));
      }
      return;
    }
  }, [
    errors?.school_admin_name,
    errors?.school_admin_email,
    errors?.password,
    errors?.confirm_password,
    errors?.admin_description,
    adminLogo,
  ]);


  if (isLoading) {
    return (
      <div className={styles.loadContainer}>
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#8147e7"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

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
            <div className={styles.grayLine}></div>
            <div className={styles.pageTitle}>Basic Information</div>
          </div>
          <div style={{ width: "44%", marginBottom: 10, marginTop: 10 }}>
            <div className={styles.purpleLine}></div>
            <div className={styles.pageTitle}>Admin Information</div>
          </div>
        </div>
        <form className={styles.loginForm}>
          <div>
            <div className={styles.allInputsDiv}>
              <label htmlFor="email" className={styles.emailLabel}>
                School Admin Name
                <InputComponent
                  placeholder="Select school admin name"
                  type="email"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={school_admin_name}
                  onChange={handleChange("school_admin_name")}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
                School Admin Email
                <InputComponent
                  placeholder="Select School admin email"
                  type="email"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={school_admin_email}
                  onChange={handleChange("school_admin_email")}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
                Password
                <InputComponent
                  placeholder="Enter password"
                  type="password"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={password}
                  onChange={handleChange("password")}
                />
              </label>
              <label htmlFor="email" className={styles.emailLabel}>
                Confirm Password
                <InputComponent
                  placeholder="Enter Confirm password"
                  type="password"
                  icon={false}
                  width="100%"
                  hieght="60"
                  value={confirm_password}
                  onChange={handleChange("confirm_password")}
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
                value={admin_description}
                onChange={handleChange("admin_description")}
              ></textarea>

              <label htmlFor="email" className={styles.emailLabel}>
                School Admin Photo
                <Uploadfile
                  placeholder="Upload Photo"
                  onChange={(e) => {
                    const file = e.target.files?.[0]; // Null check using optional chaining
                    if (file) {
                      setAdminLogo(file);
                    }
                  }}
                  value={adminLogo} // Pass the adminLogo directly as the value
                />
              </label>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.ResetBtn}
              onClick={() => router.push("/auth/signup")}
            >
              reset
            </button>
            <button
              type="button"
              className={styles.loginBtn}
              onClick={() => handleSubmit()}
            >
              signup
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

export default SignupAdminInfo;
