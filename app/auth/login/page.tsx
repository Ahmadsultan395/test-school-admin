"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

import Loader from "@/Components/Loader/loader";
import { InputComponent, Checkbox } from "@/Components/index";

import { useAuthentication } from "@/context/auth";
import { validateLogin } from "@/Helpers/AuthFormValidator";
import { capitalizeFirstLetter } from "@/Utils/utils";

import Icons from "@/Theme/Icons";
import Images from "@/Theme/Images";
import styles from "./login.module.css";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const { admin, adminSignIn } = useAuthentication();
  const [isLoading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("School");

  useEffect(() => {
    if (admin !== null) {
      toast.success("Login Successfully");
      router.replace("/");
    }
  }, [admin])

  const {
    values: { email, password },
    errors,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: validateLogin,
    onSubmit: ({ email, password }) => {
      setLoading(true);
      adminSignIn(email, password);
      setLoading(false);
    },
  });

  useEffect(() => {
    if (
      errors?.email ||
      errors?.password
    ) {
      if (errors?.email) {
        toast.error(capitalizeFirstLetter(errors?.email));
      } else if (errors?.password) {
        toast.error(capitalizeFirstLetter(errors?.password));
      }
      return;
    }
  }, [errors?.email, errors?.password]);

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className={styles.container}>
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
          <p className={styles.leftDivHeading}>Best Platform For Schools</p>
          <p className={styles.leftDivSubHeading}>
            Providing you a complete control digitally
          </p>
        </div>
        <Image
          src={Images.mainVector}
          width={575}
          height={1064.7}
          alt="Picture of the author"
        />
      </div>
      <div className={styles.rightColumn}>
        <div>
          <TopBannerStrip value={(item: string) => { setSelectedRole(item) }} />
          <div className={styles.helloWave}>
            Hey, Hello
            <Image
              src={Icons.waveHand}
              width={40}
              height={40}
              alt="Picture of the author"
              className={styles.handImage}
            />
          </div>
          <p className={styles.subText}>{`You are login as a ${selectedRole}.`}</p>
        </div>
        {/* Login Form */}
        <form className={styles.loginForm}>
          <p className={styles.loginTitle}>Login</p>
          <label htmlFor="email" className={styles.emailLabel}>
            Email address
          </label>
          <InputComponent
            placeholder="schooltest@gmail.com"
            type="email"
            icon={true}
            width="536px"
            hieght="44px"
            value={email}
            onChange={handleChange("email")}
          />
          <label htmlFor="email" className={styles.passwordLabel}>
            Password
          </label>
          <InputComponent
            placeholder="enter password "
            type="password"
            icon={true}
            width="536px"
            hieght="44px"
            value={password}
            onChange={handleChange("password")}
          />
          <div className={styles.buttonContainer}>
            <div className={styles.forgotDiv}>
              <div>
                <Checkbox label="Remember me" />
              </div>
              <span>
                <Link href="#" className={styles.forgotPasswordLink}>
                  Forgot Password?
                </Link>
              </span>
            </div>
            <button
              type="button"
              className={styles.loginBtn}
              onClick={() => handleSubmit()}
            >
              Login
            </button>
            <div className={styles.createAcountDiv}>
              <span className={styles.span1}>Create your account</span>
              <Link href={"signup/"}>
                <span className={styles.span2}> Signup Now</span>
              </Link>
            </div>
          </div>
        </form>
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

const TopBannerStrip = ({ value }: any) => {
  const ButtonTitles = ["School", "Teacher", "Student", "Admin"]
  const [selected, setSelected] = useState("School")
  return (
    <div className={styles.topButtonsContainer}>
      {ButtonTitles.map((item, index) =>
        <button onClick={() => {
          setSelected(item)
          value(item)
        }} style={{ width: "100%", backgroundColor: selected === item ? "#8F6DFF" : "#fff", height: 30, borderRadius: "5px", color: selected === item ? "#fff" : "#8F6DFF" }}>
          <p>{item}</p>
        </button>
      )}
    </div>
  )
}

export default Login;
