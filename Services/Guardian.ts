import {
  addDoc,
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const firestore = getFirestore();
const guardianCollection = collection(firestore, "Guardians");

async function register({
  adminUID,
  schoolUID,
  guardianData,
}: {
  adminUID: string;
  schoolUID: string;
  guardianData: object;
}) {
  try {
    const docRef = await addDoc(guardianCollection, {
      adminUID,
      schoolUID,
      ...guardianData,
    });
    
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

async function get(schoolUID: string) {
  const q = query(guardianCollection, where("schoolUID", "==", schoolUID));
  try {
    const querySnapshot = await getDocs(q);
    const guardianData = querySnapshot.docs.map((doc) => doc.data());
    return guardianData;
  } catch (error) {
    console.error("Error fetching guardians:", error);
    throw error;
  }
}

export default {
  register,
  get,
};
