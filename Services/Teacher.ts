import {
    addDoc,
    collection,
    getFirestore,
    query,
    where,
    getDocs,
  } from "firebase/firestore";
  
  const firestore = getFirestore();
  const guardianCollection = collection(firestore, "Teachers");
  
  async function register({
    adminUID,
    schoolUID,
    teacherData,
  }: {
    adminUID: string;
    schoolUID: string;
    teacherData: object;
  }) {
    try {
      const docRef = await addDoc(guardianCollection, {
        adminUID,
        schoolUID,
        ...teacherData,
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
      const teacherData = querySnapshot.docs.map((doc) => doc.data());
      return teacherData;
    } catch (error) {
      console.error("Error fetching Teachers:", error);
      throw error;
    }
  }
  
  export default {
    register,
    get,
  };
  