import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useFormik } from "formik";
import Icons from "../../../../Theme/Icons";
import Deeplink from "../../../../Services/Deeplink";
import { ToastContainer, toast } from "react-toastify";
import { useAuthentication } from "../../../../context/auth";
import { capitalizeFirstLetter } from "../../../../Utils/utils";
import { validateInvitePrompt } from "../../../../Helpers/AuthFormValidator";

export default function InvitePrompt({
  setIsToggleModal,
}: {
  setIsToggleModal: any;
}) {
  const [role, setRole] = useState("");
  const { admin } = useAuthentication();
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [roles, setMenuData] = useState([
    {
      txtMenu: "Student",
    },
    {
      txtMenu: "Admin",
    },
    {
      txtMenu: "Teacher",
    },
  ]);

  const handlePath = (path: string) => {
    if (role === "Student") {
      path = "/auth/studentregistration";
    } else if (role === "Teacher") {
      path = "/auth/teacherregistration";
    } else if (role === "Admin") {
      path = "/auth/signup";
    }
    return path;
  };

  const {
    values: { email, name },
    errors,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: validateInvitePrompt,
    onSubmit: async ({ email, name }) => {
      if (!role) {
        toast.error("Please Select Role");
      } else {
        const path = handlePath(role);
        if (admin?.school_id) {
          const response = await Deeplink.createDeeplink({
            email,
            name,
            role,
            path,
            school_id: admin?.school_id,
          });
          if (response !== undefined) {
            setTimeout(() => {
              setIsToggleModal(false);
            }, 3000);
          }
        }
      }
    },
  });

  useEffect(() => {
    if (errors?.email || errors?.name) {
      if (errors?.email) {
        toast.error(capitalizeFirstLetter(errors?.email));
      } else if (errors?.name) {
        toast.error(capitalizeFirstLetter(errors?.name));
      }
      return;
    }
  }, [errors?.email, errors?.name]);

  return (
    <dialog className={styles.modal}>
      <div className={styles.modalContainer}>
        <div className={styles.modalRow}>
          <span className={styles.txtInviteUser}>Invite Users to Platform</span>
          <div onClick={() => setIsToggleModal(false)}>
            <Image
              alt=""
              height={8}
              width={25}
              quality={100}
              src={Icons?.cancelIcon}
            />
          </div>
        </div>
        <div className={styles.inviteContainer}>
          <span className={styles.txtTo}>To:</span>
          <div className={styles.modalRow}>
            <div
              className={styles.inputContainer}
              style={{
                width: "520px",
                height: "40px",
              }}
            >
              <input
                type={"email"}
                placeholder={"Enter User Email Here"}
                className={styles.inputField}
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div
              className={styles.btnDropDown}
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <span className={styles.txtDropDown}>
                {role ? role : "Select Role"}
              </span>
              <Image
                alt=""
                height={5}
                width={15}
                quality={100}
                src={Icons?.dropdownIcon}
              />
              {toggleMenu && (
                <div className={styles.menuContainer}>
                  {roles.map((item, index) => (
                    <div
                      className={styles.menuItem}
                      key={index}
                      onClick={() => {
                        setToggleMenu(!toggleMenu);
                        setRole(item?.txtMenu);
                      }}
                    >
                      <span className={styles.txtMenu}>
                        {item?.txtMenu ? item?.txtMenu : ""}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.modalRow}>
            <div
              className={styles.inputContainer}
              style={{
                width: "520px",
                height: "40px",
              }}
            >
              <input
                type={"text"}
                placeholder={"Enter User Name Here"}
                className={styles.inputField}
                value={name}
                onChange={handleChange("name")}
              />
            </div>
            <div
              onClick={() => handleSubmit()}
              className={styles.btnSendInvite}
            >
              <span className={styles.txtSendInvite}>Send invite</span>
            </div>
          </div>
        </div>
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
    </dialog>
  );
}
