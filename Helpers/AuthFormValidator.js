import * as Yup from "yup";

export const isValidEmail = (condition) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(condition));
};

const isValidURL = (url) => {
  const regex =
    /^(http(s)?:\/\/)[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;

  if (url) {
    return regex.test(url);
  }
  return true; // Treat empty URL as valid
};
const isValidLinkedInURL = (url) => {
  const linkedInRegex = /^https?:\/\/(www\.)?linkedin\.com\/[a-zA-Z0-9-]+$/;

  if (url) {
    return linkedInRegex.test(url);
  }
  return true; // Treat empty URL as valid
};

export const validateLogin = Yup.object({
  email: Yup.string()
    .test("A valid Email must be entered", isValidEmail)
    .required("Email field is Required"),
  password: Yup.string()
    .min(3, "Password entered must be atleast 3 characters long")
    .required("Password field is Required"),
});

export const validateSchoolRegister = Yup.object({
  email: Yup.string()
    .test("A valid School Email must be entered", isValidEmail)
    .required("School Email field is Required"),
  school_address: Yup.string()
    .min(5, "School Address  should be atleast 5 characters long.")
    .required("School Address field is Required"),
  school_contact1: Yup.string()
    .min(11, "School Contact 1 should be atleast 11 characters long.")
    .required("School Contact 1 field is Required"),
  school_contact2: Yup.string()
    .min(11, "School Contact 2 should be atleast 11 characters long.")
    .required("School Contact 2 field is Required"),
  school_city: Yup.string()
    .min(5, "School City should be atleast 5 characters long.")
    .required("School City field is Required"),
  school_state: Yup.string()
    .min(5, "School State should be atleast 5 characters long.")
    .required("School State field is Required"),
  school_description: Yup.string()
    .min(5, "School Description should be atleast 5 characters long.")
    .required("School Description field is Required"),
  school_linkdin_link: Yup.string()
    .min(5, "School Linkdein link should be atleast 5 characters long.")
    .required("School Linkdein field is Required"),
  school_web_link: Yup.string()
    .min(5, "School Web Link should be atleast 5 characters long.")
    .required("School Web Link field is Required"),
});

// school_web_link: Yup.string().when(
//   "websiteValidation",
//   (websiteValidation, schema) => {
//     if (websiteValidation) return schema.test("Invalid", isValidURL);
//     return schema;
//   }
// ),
// school_linkdin_link: Yup.string().when(
//   "websiteValidation",
//   (websiteValidation, schema) => {
//     if (websiteValidation) return schema.test("Invalid", isValidLinkedInURL);
//     return schema;
//   }
// ),

export const validateStudentRegistration = Yup.object({
  first_name: Yup.string()
    .min(3, "First Name should be atleast 3 characters long.")
    .required("First Name field is Required"),
  last_name: Yup.string()
    .min(3, "Last Name should be atleast 3 characters long.")
    .required("Last Name field is Required"),
  dob: Yup.string()
    .min(10, "Date of Birth should be valid format.")
    .required("Date of Birth field is Required"),
  email: Yup.string()
    .test("A valid Email must be entered", isValidEmail)
    .required("Email field is Required"),
  roll_number: Yup.string()
    .min(5, "Roll Number should be atleast 5 characters long.")
    .required("Roll Number field is Required"),
  guardian_name: Yup.string()
    .min(3, "Guardian Name should be atleast 3 characters long.")
    .required("Guardian field is Required"),
  phone_number: Yup.string()
    .min(11, "Phone Number should be atleast 11 characters long.")
    .required("Phone Number field is Required"),
});

export const validateTeacherRegistration = Yup.object({
  first_name: Yup.string()
    .min(3, "First Name should be atleast 3 characters long.")
    .required("First Name field is Required"),
  last_name: Yup.string()
    .min(3, "Last Name should be atleast 3 characters long.")
    .required("Last Name field is Required"),
  dob: Yup.string()
    .min(10, "Date of Birth should be valid format.")
    .required("Date of Birth field is Required"),
  id_number: Yup.string()
    .min(5, "ID Number should be atleast 5 characters long.")
    .required("ID Number field is Required"),
  email: Yup.string()
    .test("A valid Email must be entered", isValidEmail)
    .required("Email field is Required"),
  phone_number: Yup.string()
    .min(11, "Phone Number should be atleast 11 characters long.")
    .required("Phone Number field is Required"),
});

export const validateStudentRegistrationOtherInfo = Yup.object({
  allergies: Yup.string()
    .min(3, "Student Allergies should be atleast 3 characters long.")
    .required("Student Allergies field is Required"),
  allergies_detail: Yup.string()
    .min(3, "Allergies Detail should be atleast 3 characters long.")
    .required("Allergies Detail field is Required"),
  ins_provider_name: Yup.string()
    .min(5, "Insurance Provider should be atleast 5 characters long.")
    .required("Insurance Provider Name field is Required"),
  ins_provider_phone: Yup.string()
    .min(5, "Insurance Provider Phone should be atleast 5 characters long.")
    .required("Insurance Provider Phone field is Required"),
  ins_card_id: Yup.string()
    .min(5, "INS Card ID should be atleast 5 characters long.")
    .required("INS Card ID field is Required"),
  ins_group_number: Yup.string()
    .min(3, "INS Group Number should be atleast 3 characters long.")
    .required("INS Group Number field is Required"),
  bio: Yup.string()
    .min(11, "Student BIO should be atleast 11 characters long.")
    .required("Student BIO field is Required"),
});

export const validateSchoolRegisterAdminInfo = Yup.object({
  school_admin_name: Yup.string()
    .min(5, "School Admin Name should be atleast 5 characters long.")
    .required("School Admin Name field is Required"),
  school_admin_email: Yup.string()
    .test("A valid School Admin Email must be entered", isValidEmail)
    .required("School Admin Email field is Required"),
  password: Yup.string()
    .min(6, "Password entered must be atleast 6 characters long.")
    .required("Password field is Required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required("Confirm Password field is Required"),
  admin_description: Yup.string()
    .min(5, "Admin Description should be atleast 5 characters long.")
    .required("Admin Description field is Required"),
});

export const validatePayment = Yup.object({
  email: Yup.string()
    .test("A valid Email must be entered", isValidEmail)
    .required("Email field is Required"),
  creditCard: Yup.string()
    .min(16, "Credit Card Number entered must be atleast 16 characters long")
    .required("Credit Card field is Required"),
  cardholder: Yup.string()
    .min(3, "Cardholder Name entered must be atleast 3 characters long.")
    .required("Cardholder Name field is Required"),
  expiryDate: Yup.string()
    .min(5, "Expiry Date entered must be atleast mm/yy characters long.")
    .required("Expiry Date field is Required"),
  cvc: Yup.string()
    .min(3, "CCV / CVC  entered must be atleast 3 characters long.")
    .required("CCV / CVC field is Required"),
});

export const validateInvitePrompt = Yup.object({
  email: Yup.string()
    .test("A valid Email must be entered", isValidEmail)
    .required("Email field is Required"),
  name: Yup.string()
    .min(3, "Name should be atleast 3 characters long.")
    .required("Name field is Required"),
});
