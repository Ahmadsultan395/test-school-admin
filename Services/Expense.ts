import {
  addDoc,
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const firestore = getFirestore();
const expenseCollection = collection(firestore, "Expense");
const staffCollection = collection(firestore, "Staff");

async function add({
  adminUID,
  schoolUID,
  expenseData,
}: {
  adminUID: string;
  schoolUID: string;
  expenseData: any;
}) {
  try {
    const uID : any = expenseData?.iD;
    const uData = query(staffCollection, where("iD", "==",uID ));
    const docRef = await addDoc(expenseCollection, {
      adminUID,
      schoolUID,
      ...expenseData,});
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

async function get(schoolUID: string) {
  const q = query(expenseCollection, where("schoolUID", "==", schoolUID));
  try {
    const querySnapshot = await getDocs(q);
    const subjectData = querySnapshot.docs.map((doc) => doc.data());
    return subjectData;
  } catch (error) {
    console.error("Error fetching Expense:", error);
    throw error;
  }
}

export default {
  add,
  get,
};
