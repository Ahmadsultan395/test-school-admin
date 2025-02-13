import { db } from "../utils/admin";

const adminRef = db.collection("Admins");

export async function getUniqueQuerySnapshot(email: string, phone: string) {
  const isEmail = adminRef.where("email", "==", email.toLowerCase()).get();
  const isPhone = adminRef.where("phoneNumber", "==", phone).get();

  const [userEmailQuerySnapshot, userPhoneQuerySnapshot] = await Promise.all([
    isEmail,
    isPhone,
  ]);

  return userEmailQuerySnapshot.empty && userPhoneQuerySnapshot.empty;
}