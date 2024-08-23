// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM2waQ92ZQUFs9gILOQ9p3QT8ZJ8OqjJk",
  authDomain: "healthcare-a91e3.firebaseapp.com",
  projectId: "healthcare-a91e3",
  storageBucket: "healthcare-a91e3.appspot.com",
  messagingSenderId: "821921172132",
  appId: "1:821921172132:web:67fc8bd15b028fdd64b431",
  measurementId: "G-2YYG2Z9FXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);