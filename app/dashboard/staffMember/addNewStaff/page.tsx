"use client";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";

import {
    DropdownComponent,
    InputComponent,
    Uploadfile,
} from "@/Components/index";

import { useSchoolData } from "@/context/school";
import { useAuthentication } from "@/context/auth";
import { capitalizeFirstLetter } from "@/Utils/utils";
import { generateRandomString } from "@/Utils/uniqueIdGenerator";

import Images from "@/Theme/Images";
import styles from "./addStaff.module.css";
import { genderTypes, religionData, staffPositionData, staffStatusData } from "@/app/data/data";
import Loader from "@/Components/Loader/loader";

const AddStaff = (props: any) => {
    const router = useRouter();
    const { addStaff } = useSchoolData()
    const [staffPicture, setStaffPicture] = useState(null);
    const { uploadImageToStorage } = useAuthentication();
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
            religion: "",
            staff_bio: "",
            email: "",
            phone: "",
            staffPosition: "",
            staffStatus: ""
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required("First name is required"),
            last_name: Yup.string().required("Last name is required"),
            date_of_birth: Yup.string().required("Date of birth is required"),
            gender: Yup.string().required("Gender is required"),
            iD: Yup.string().required("ID number is required"),
            religion: Yup.string().required("Religion is required"),
            staff_bio: Yup.string().required("Staff bio is required"),
            email: Yup.string().required("Email is required").email("Invalid email address"),
            phone: Yup.string()
            .required("Phone number is required")
            .matches(/^[0-9]+$/, "Phone number must be only digits")
            .min(10, "Phone number must be at least 10 digits")
            .max(15, "Phone number can't be longer than 15 digits"),
            staffPosition: Yup.string().required("Staff Position is required"),
            staffStatus: Yup.string().required("Staff Status is required"),
        }),
        onSubmit: async (values) => {
            const picture: any = await handleImageChange(staffPicture, "staffLogo");
            const staffParams = {
                ...values,
                picture,
            };
            if (picture !== "" || picture !== undefined || !picture) {
                setLoading(true);
                addStaff(staffParams);
                toast.success("Staff Added Successfuly")
                router.back()
            }
            else {
                setLoading(false);
                toast.error("Please select an image")
            }
        }

    });

    
    useEffect(() => {
        (Object.keys(errors) as (keyof typeof errors)[]).forEach((error) => {
            const errorMessage = errors[error];
            if (errorMessage) {
                toast.error(capitalizeFirstLetter(errorMessage));
            }
        });
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
                <div>
                    <p className={styles.title}>Register Staff, Let’s Started!</p>
                </div>
                <div className={styles.tabLine}>
                    <div style={{ width: "44%", marginBottom: 10, marginTop: 10 }}>
                        <div
                            className={styles.purpleLine}
                        ></div>
                        <div className={styles.pageTitle}>Basic Information</div>
                    </div>
                    <div style={{ width: "44%", marginBottom: 10, marginTop: 10 }}>
                    </div>
                </div>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <div>
                        <div className={styles.allInputsDiv}>
                            <label className={styles.emailLabel}>
                                Staff First Name
                                <InputComponent
                                    placeholder="Enter staff first name"
                                    type="text"
                                    icon={false}
                                    width="100%"
                                    hieght="44px"
                                    value={values.first_name}
                                    onChange={handleChange("first_name")}
                                />
                            </label>
                            <label className={styles.emailLabel}>
                                Staff Last Name
                                <InputComponent
                                    placeholder="Enter staff last name"
                                    type="text"
                                    icon={false}
                                    width="100%"
                                    hieght="44px"
                                    value={values.last_name}
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
                                    value={values.date_of_birth}
                                    onChange={handleChange("date_of_birth")}
                                />
                            </label>
                            <label htmlFor="Subjects" className={styles.emailLabel}>
                                Gender
                                <DropdownComponent
                                    options={genderTypes}
                                    width="100%"
                                    hieght="44px"
                                    placeholder="Please select your state"
                                    onSelect={(data) => setFieldValue("gender", data)}
                                    selected={values.gender}
                                />
                            </label>
                            <label className={styles.emailLabel}>
                                ID Number
                                <InputComponent
                                    placeholder="Enter your ID Number"
                                    type="text"
                                    icon={false}
                                    width="100%"
                                    hieght="44px"
                                    value={values.iD}
                                    onChange={handleChange("iD")}
                                />
                            </label>
                            <label htmlFor="Subjects" className={styles.emailLabel}>
                                Staff Position
                                <DropdownComponent
                                    options={staffPositionData}
                                    width="100%"
                                    hieght="44px"
                                    placeholder="Please select your state"
                                    onSelect={(data) => setFieldValue("staffPosition", data)}
                                    selected={values.staffPosition}
                                />
                            </label>
                            <label htmlFor="Subjects" className={styles.emailLabel}>
                                Staff Status
                                <DropdownComponent
                                    options={staffStatusData}
                                    width="100%"
                                    hieght="44px"
                                    placeholder="Please select your state"
                                    onSelect={(data) => setFieldValue("staffStatus", data)}
                                    selected={values.staffStatus}
                                />
                            </label>
                            <label htmlFor="Subjects" className={styles.emailLabel}>
                                Religion
                                <DropdownComponent
                                    options={religionData}
                                    width="100%"
                                    hieght="44px"
                                    placeholder="Please select your religion"
                                    onSelect={(data) => setFieldValue("religion", data)}
                                    selected={values.religion}
                                />
                            </label>
                            <label className={styles.emailLabel}>
                                Email
                                <InputComponent
                                    placeholder="Enter your email"
                                    type="text"
                                    icon={false}
                                    width="100%"
                                    hieght="44px"
                                    value={values.email}
                                    onChange={handleChange("email")}
                                />
                            </label>
                            <label className={styles.emailLabel}>
                                Phone
                                <InputComponent
                                    placeholder="Ener your phone number"
                                    type="text"
                                    icon={false}
                                    width="100%"
                                    hieght="44px"
                                    value={values.phone}
                                    onChange={handleChange("phone")}
                                />
                            </label>
                            <label htmlFor="myTextarea" className={styles.emailLabel}>
                                Staff BIO
                            </label>
                            <textarea
                                id="myTextarea"
                                className={styles.customTextarea}
                                rows={3}
                                cols={50}
                                placeholder="Enter about staff"
                                value={values.staff_bio}
                                onChange={handleChange("staff_bio")}
                            ></textarea>
                            <label htmlFor="email" className={styles.emailLabel} style={{ width: "100%" }}>
                                Upload Staff Photo (200px X 200px)
                                <Uploadfile
                                    placeholder="Upload Photo"
                                    onChange={(e) => {
                                        const file: any = e.target.files?.[0];
                                        setStaffPicture(file)
                                    }}
                                    value={staffPicture}
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
                        <button type="submit" className={styles.loginBtn}>
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
                        <p className={styles.leftDivHeading}>Register New Staff</p>
                        <p className={styles.leftDivSubHeading}>
                            Dear Staff, Please fill the form to register yourself in school
                        </p>
                    </div>
                    <Image
                        src={Images.staffBanner}
                        width={522}
                        height={331}
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

export default AddStaff; 