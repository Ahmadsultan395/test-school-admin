// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDEmOjrU8mrgErXJUVnKQHreJPneur5p4I",
    authDomain: "school-admin-dev-ef00e.firebaseapp.com",
    projectId: "school-admin-dev-ef00e",
    storageBucket: "school-admin-dev-ef00e.appspot.com",
    messagingSenderId: "809292854310",
    appId: "1:809292854310:web:6608aa85a2a62c429de2e7",
    measurementId: "G-QCXRT7NJV3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

// Initialize Firebase Authentication
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, getAuth, onAuthStateChanged };
