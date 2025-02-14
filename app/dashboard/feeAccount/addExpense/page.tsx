
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
} from "../../../../Components/index";

import { useSchoolData } from "@/context/school";
import Images from "../../../../Theme/Images";
import { capitalizeFirstLetter } from "@/Utils/utils";

import styles from "./addExpense.module.css";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/Components/Loader/loader";

const AddExpense = (props: any) => {
    const router = useRouter();
    const { addExpense } = useSchoolData()
    const [loading, setLoading] = useState<boolean>(false)
    const [isClient, setIsClient] = useState(false);
    
      useEffect(() => {
        if (typeof window !== "undefined") {
          setIsClient(true); // We are on the client-side
        }
      }, []);

    const expenseTypes = ["Salary", "Transport", "Others"]
    const statusTypes = ["Paid", "Unpaid"]

    const {
        values,
        errors,
        handleSubmit,
        handleChange,
        setFieldValue,
        resetForm
    } = useFormik({
        initialValues: {
            name: "",
            iD: "",
            expenseType: "",
            amount: "",
            phone: "",
            email: "",
            status: "",
            date:""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            iD: Yup.string().required("ID is required"),
            expenseType: Yup.string().required("Expense type is required"),
            amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
            phone: Yup.string()
                .required("Phone number is required")
                .matches(/^[0-9]+$/, "Phone number must be only digits")
                .min(10, "Phone number must be at least 10 digits")
                .max(15, "Phone number can't be longer than 15 digits"),
            email: Yup.string().required("Email is required").email("Invalid email address"),
            status: Yup.string().required("Status is required"),
            date: Yup.date().required("Date is required").nullable(),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            const params = {
                name: values.name,
                iD: values.iD,
                expenseType: values.expenseType,
                amount: values.amount + "$",
                phone: values.phone,
                email: values.email,
                status: values.status,
                date: values.date,
            }
            await addExpense(params)
            toast.success("Class Registered Successfully")
            router.back()
            setLoading(false)
        }

    });

    const handleReset = () => {
        resetForm();
    };

    useEffect(() => {
        if (
          errors?.name ||
          errors?.iD ||
          errors?.expenseType ||
          errors?.amount ||
          errors?.phone ||
          errors?.email ||
          errors?.status ||
          errors?.date
        ) {
          if (errors?.name) {
            toast.error(capitalizeFirstLetter("Please enter the name"));
          } else if (errors?.iD) {
            toast.error(capitalizeFirstLetter("Please enter the ID"));
          } else if (errors?.amount) {
            toast.error(capitalizeFirstLetter("Please enter the amount"));
          } else if (errors?.phone) {
            toast.error(capitalizeFirstLetter("Please enter the phone"));
          } else if (errors?.email) {
            toast.error(capitalizeFirstLetter("Please enter the email"));
          } else if (errors?.status) {
            toast.error(capitalizeFirstLetter("Please enter the status"));
          } else if (errors?.date) {
            toast.error(capitalizeFirstLetter("Please enter the date"));
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
            <div className={styles.rightColumn}>
                <div>
                    <p className={styles.title}>Add Class, Let’s Get Started!</p>
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
                                Name
                                <InputComponent
                                    placeholder="Enter subject name"
                                    type="text"
                                    icon={false}
                                    width="100%"
                                    hieght="44px"
                                    value={values?.name}
                                    onChange={handleChange("name")}
                                />
                            </label>
                            <label className={styles.emailLabel}>
                                ID Number
                                <InputComponent
                                    placeholder="Enter ID Number"
                                    type="text"
                                    icon={false}
                                    width="100%"
                                    hieght="44px"
                                    value={values?.iD}
                                    onChange={handleChange("iD")}
                                />
                            </label>
                            <label htmlFor="expenseType" className={styles.emailLabel}>
                                Expense Type
                                <DropdownComponent
                                    options={expenseTypes}
                                    width="100%"
                                    hieght="44px"
                                    placeholder="Please select expense type"
                                    onSelect={(data) => setFieldValue("expenseType", data)}
                                    selected={values?.expenseType}
                                />
                            </label>
                            <label className={styles.emailLabel}>
                                Amount
                                <InputComponent
                                    placeholder="Enter expense amount"
                                    type="text"
                                    icon={false}
                                    width="100%"
                                    hieght="44px"
                                    value={values?.amount}
                                    onChange={handleChange("amount")}
                                />
                            </label>
                            <label className={styles.emailLabel}>
                                Phone
                                <InputComponent
                                    placeholder="Enter phone number"
                                    type="text"
                                    icon={false}
                                    width="100%"
                                    hieght="44px"
                                    value={values?.phone}
                                    onChange={handleChange("phone")}
                                />
                            </label>
                            <label className={styles.emailLabel}>
                                Email Address
                                <InputComponent
                                    placeholder="Enter your email"
                                    type="text"
                                    icon={false}
                                    width="100%"
                                    hieght="44px"
                                    value={values?.email}
                                    onChange={handleChange("email")}
                                />
                            </label>
                            <label htmlFor="status" className={styles.emailLabel}>
                                Status
                                <DropdownComponent
                                    options={statusTypes}
                                    width="100%"
                                    hieght="44px"
                                    placeholder="Please select status"
                                    onSelect={(data) => setFieldValue("status", data)}
                                    selected={values?.status}
                                />
                            </label>
                            <label htmlFor="date" className={styles.emailLabel}>
                                Date
                                <InputComponent
                                    placeholder="dd/mm/yyyy"
                                    type="date"
                                    icon={false}
                                    width="100%"
                                    hieght="44px"
                                    value={values?.date}
                                    onChange={handleChange("date")}
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
                    <p className={styles.leftDivHeading}>Add New Expense</p>
                    <p className={styles.leftDivSubHeading}>
                        Dear Admin, Please fill the form to add new expense in school
                    </p>
                </div>
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

export default AddExpense;