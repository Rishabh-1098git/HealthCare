import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAM2waQ92ZQUFs9gILOQ9p3QT8ZJ8OqjJk",
  authDomain: "healthcare-a91e3.firebaseapp.com",
  projectId: "healthcare-a91e3",
  storageBucket: "healthcare-a91e3.appspot.com",
  messagingSenderId: "821921172132",
  appId: "1:821921172132:web:67fc8bd15b028fdd64b431",
  measurementId: "G-2YYG2Z9FXH"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
export { db, auth, provider, doc, setDoc, storage };
