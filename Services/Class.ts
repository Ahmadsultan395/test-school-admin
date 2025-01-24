import {
  addDoc,
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const firestore = getFirestore();
const classCollection = collection(firestore, "Classes");

async function register({
  adminUID,
  schoolUID,
  classData,
}: {
  adminUID: string;
  schoolUID: string;
  classData: object;
}) {
  try {
    const docRef = await addDoc(classCollection, {
      adminUID,
      schoolUID,
      ...classData,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

async function get(schoolUID: string) {
  const q = query(
    classCollection,
    where("schoolUID", "==", schoolUID)
  );
  try {
    const querySnapshot = await getDocs(q);
    const classesData = querySnapshot.docs.map((doc) => doc.data());
    return classesData;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
}

export default {
  register,
  get,
};
