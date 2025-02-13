import {
    addDoc,
    collection,
    getFirestore,
    query,
    where,
    getDocs,
  } from "firebase/firestore";
  
  const firestore = getFirestore();
  const staffCollection = collection(firestore, "Staff");
  
  async function add({
    adminUID,
    schoolUID,
    staffData,
  }: {
    adminUID: string;
    schoolUID: string;
    staffData: object;
  }) {
    try {
      const docRef = await addDoc(staffCollection, {
        adminUID,
        schoolUID,
        ...staffData,
      });
      
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }
  
  async function get(schoolUID: string) {
    const q = query(staffCollection, where("schoolUID", "==", schoolUID));
    try {
      const querySnapshot = await getDocs(q);
      const staffData = querySnapshot.docs.map((doc) => doc.data());
      return staffData;
    } catch (error) {
      console.error("Error fetching staff:", error);
      throw error;
    }
  }
  
  export default {
    add,
    get,
  };
  