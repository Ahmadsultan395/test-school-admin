"use client";
import React, { useState, useEffect } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import { DropdownComponent } from "@/Components/index";
import Loader from "@/Components/Loader/loader";

import { useSchoolData } from "@/context/school";
import { capitalizeFirstLetter } from "@/Utils/utils";

import Images from "@/Theme/Images";
import styles from "./addSubject.module.css";
import "react-toastify/dist/ReactToastify.css";
import { endTimeData, startTimeData, subjData } from "@/app/data/data";


const AddSubject = (props: any) => {
    const router = useRouter();
    const { addSubject } = useSchoolData();
    const [loading, setLoading] = useState<boolean>(false)

    const {
        values,
        errors,
        handleSubmit,
        setFieldValue,
        resetForm
    } = useFormik({
        initialValues: {
            subject: "",
            startTime: "",
            endTime: "",
        },
        validationSchema: Yup.object({
            subject: Yup.string().required("Subject is required"),
            startTime: Yup.string().required("Start Time is required"),
            endTime: Yup.string().required("End Time is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            const params = {
                subject_Name: values.subject,
                startTime: values.startTime,
                endTime: values.endTime,
                no_Of_Classes: 0
            }
            await addSubject(params)
            toast.success("Class Registered Successfully")
            router.back()
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
                    <p className={styles.title}>Add Subject, Let’s Get Started!</p>
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
                            <label htmlFor="subject" className={styles.emailLabel}>
                                Subject
                                <DropdownComponent
                                    options={subjData}
                                    width="100%"
                                    hieght="44px"
                                    placeholder="Select subject"
                                    onSelect={(data) => { setFieldValue("subject", data) }}
                                    selected={values?.subject} // Add this line
                                />
                            </label>
                            <label htmlFor="Subjects" className={styles.emailLabel}>
                                Class Start Time
                                <DropdownComponent
                                    options={startTimeData}
                                    width="100%"
                                    hieght="44px"
                                    placeholder="Please select your state"
                                    onSelect={(data) => { setFieldValue("startTime", data) }}
                                    selected={values?.startTime} // Add this line
                                />
                            </label>
                            <label htmlFor="Subjects" className={styles.emailLabel}>
                                Class End Time
                                <DropdownComponent
                                    options={endTimeData}
                                    width="100%"
                                    hieght="44px"
                                    placeholder="Please select your state"
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
                        <p className={styles.leftDivHeading}>Add New Subject</p>
                        <p className={styles.leftDivSubHeading}>
                            Dear Admin, Please fill the form to register new subject in school
                        </p>
                    </div>
                    <Image
                        src={Images.addSubjectBanner}
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

export default AddSubject;