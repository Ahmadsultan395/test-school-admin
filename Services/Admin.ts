import { db } from "..//Utils/firebase";
import { doc, setDoc } from "firebase/firestore";


function registerAdmin({ admin }: { admin: any }) {
    const adminRef = doc(db, 'Admins', admin?.uid);
    return setDoc(adminRef,
        {
            adminUID: admin?.uid,
            email: admin?.email,
            avatar: admin?.photoURL ? admin?.photoURL : "",
            displayName: admin?.displayName ? admin?.displayName : "",
            created_date: new Date().toISOString().slice(0, 19).replace("T", " "),
            last_updated: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        { merge: true }
    );
}

export default {
    registerAdmin
}