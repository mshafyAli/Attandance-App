// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-3d024.firebaseapp.com",
  projectId: "mern-auth-3d024",
  storageBucket: "mern-auth-3d024.appspot.com",
  messagingSenderId: "508398780642",
  appId: "1:508398780642:web:4b65577dcddb00f6421ebb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
