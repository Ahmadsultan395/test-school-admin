import { db } from "..//Utils/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const studentsCollection = collection(db, "Students");

async function register({
  adminUID,
  schoolUID,
  studentData,
}: {
  adminUID: string;
  schoolUID: string;
  studentData: object;
}) {
  try {
    const docRef = await addDoc(studentsCollection, {
      adminUID,
      schoolUID,
      ...studentData,
    });

    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

async function get(schoolUID: string) {
  const q = query(studentsCollection, where("schoolUID", "==", schoolUID));
  try {
    const querySnapshot = await getDocs(q);
    const studentData = querySnapshot.docs.map((doc) => doc.data());
    return studentData;
  } catch (error) {
    console.error("Error fetching Teachers:", error);
    throw error;
  }
}
export default {
  register,
  get,
};
