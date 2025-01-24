import validator from "validator";
import { NextFunction, Request, Response } from "express";
import parsePhoneNumber from "libphonenumber-js";
import * as console from 'firebase-functions/logger'
import { UserRoleType } from "../../types/users";
import { db, auth } from "../../utils/admin";
import { getUniqueQuerySnapshot } from "../../utils/isUnique";
import { getPlatformCustomer } from "../../utils/stripe";

const adminRef = db.collection("Admins");
const schoolRef = db.collection("Schools");

//Admin Auth
export async function adminSignIn(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any> | void> {
  try {
    const {
      email,
      password
    } = req?.body;


    if (!email || !password) {
      const response = {
        code: 400,
        message: "invalid signin creds for admin.",
      };
      return res.status(response.code).json(response);
    }

    const adminQuery = await adminRef.where("email", "==", email.toLowerCase()).get();

    if (adminQuery.empty) {
      const response = {
        code: 404,
        message: "Email is not registered for Admin.",
      };
      return res.status(404).json(response);
    }

    const admin = adminQuery.docs[0].data();

    // const authUser = await auth.getUser(admin.uid);

    const claims = {
      ...admin,
      role: 'school-admin' as UserRoleType
    }

    // Generate a custom token for the UID
    const customToken = await auth.createCustomToken(admin?.uid, claims);

    // Return the custom token to the admin
    res.status(200).send({ customToken });
  } catch (error: any) {
    res.status(200).send({ message: error.message });
    console.info("signInAdmin ", error.message);
    next(error);
  }
}

export async function adminSignup(req: Request, res: Response, next: NextFunction): Promise<Response<any> | void> {
  try {
    const { email, password, contact1, schoolEmail, name, type, address, contact2, city, state, description, webURL, linkdinURL, logo, adminName, adminDescription, adminLogo } = req?.body;

    const mobileNumberFormatIntl = parsePhoneNumber(
      contact1,
      "US"
    )?.formatInternational() || "";
    console.log(mobileNumberFormatIntl)
    const mobileNumber = parsePhoneNumber(mobileNumberFormatIntl)?.format("E.164") ?? "";
    const isValidMobileNumber = parsePhoneNumber(mobileNumber)?.isValid();

    console.log(mobileNumberFormatIntl)

    const emailAddr = email.toLowerCase();

    if (!validator.isEmail(emailAddr) || !password) {
      const response = {
        code: 400,
        message: "invalid signin creds.",
      };
      return res.status(response.code).json(response);
    }

    if (!isValidMobileNumber) {
      const response = {
        code: 400,
        message: "Invalid mobile number",
      };
      return res.status(response.code).json(response);
    }

    const isAdminUnique = await getUniqueQuerySnapshot(
      emailAddr,
      mobileNumber
    );

    if (!isAdminUnique) {
      const response = {
        code: 400,
        message: "The email / phone number you are using is already in use.",
      };
      return res.status(response.code).json(response);
    }

    const adminDoc = adminRef.doc();
    const adminUID = adminDoc.id;
    const schoolDoc = schoolRef.doc();
    const schoolUID = schoolDoc.id;

    const user = await auth.createUser({
      uid: adminUID,
      email: emailAddr,
      emailVerified: false,
      phoneNumber: mobileNumber,
      password,
      displayName: adminName ? adminName : "",
      disabled: false,
    });

    const platformCustomer = await getPlatformCustomer({
      email: emailAddr,
      contact1: mobileNumber,
      adminName,
    });

    const newAccount = {
      adminUID,
      avatarUrl: null,
      uid: adminUID,
      email: emailAddr,
      emailVerified: false,
      school_id: schoolUID,
      phoneNumber: mobileNumber,
      customer_id: platformCustomer?.id,
      createdDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      lastUpdated: new Date().toISOString().slice(0, 19).replace("T", " ")
    }

    const schoolData = {
      schoolUID,
      uid: schoolUID,
      adminUID: [adminUID],
      email: schoolEmail,
      name: name,
      type: type,
      address: address,
      contact1: mobileNumber,
      contact2: contact2,
      city: city,
      state: state,
      description: description,
      webURL: webURL,
      linkdinURL: linkdinURL,
      logo: logo,
      adminName: adminName,
      adminEmail: emailAddr,
      adminDescription: adminDescription,
      adminLogo: adminLogo,
    }

    // Store the admin details and school details in the 'Admins', 'Schools' collection in Firestore
    await adminRef.doc(adminUID).set(newAccount);
    await schoolRef.doc(schoolUID).set(schoolData);

    const claims = {
      ...user,
      school_id: schoolUID,
      customer_id: platformCustomer?.id,
      role: "school-admin" as UserRoleType,
    };
    // Generate a custom token for the UID
    const customToken = await auth.createCustomToken(adminUID, claims);

    // Return the custom token to the admin
    res.status(200).send({ customToken });
  } catch (error: any) {
    res.status(200).send({ message: error.message });
    console.info("signUpAdmin ", error.message);
    next(error);
  }
}