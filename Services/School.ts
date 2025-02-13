import {
  addDoc,
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const firestore = getFirestore();
const schoolCollection = collection(firestore, "Schools");

function registerSchool({
  admin,
  schoolData,
}: {
  admin: any;
  schoolData: any;
}) {
  return addDoc(schoolCollection, {
    ...schoolData,
    adminUID: [admin.uid],
    schoolEmail: admin.email,
  });
}

async function getSchoolByAdminId(adminID: string) {
  const schools: any[] = [];
  const q = query(
    schoolCollection,
    where("adminUID", "array-contains", adminID)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    schools.push({ ...doc.data(), school_id: doc.id });
  });

  return schools[0];
}

export default {
  registerSchool,
  getSchoolByAdminId,
};
