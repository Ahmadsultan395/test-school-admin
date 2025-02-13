import {
  addDoc,
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const firestore = getFirestore();
const subjectCollection = collection(firestore, "Subjects");

async function add({
  adminUID,
  schoolUID,
  subjectData,
}: {
  adminUID: string;
  schoolUID: string;
  subjectData: object;
}) {
  try {
    const docRef = await addDoc(subjectCollection, {
      adminUID,
      schoolUID,
      ...subjectData,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

async function get(schoolUID: string) {
  const q = query(subjectCollection, where("schoolUID", "==", schoolUID));
  try {
    const querySnapshot = await getDocs(q);
    const subjectData = querySnapshot.docs.map((doc) => doc.data());
    return subjectData;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
}

export default {
  add,
  get,
};
