// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//web app's firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmz_to69Tl2nA8t6VpsHn1pPA_wxxyQXg",
  authDomain: "qless-d0d5b.firebaseapp.com",
  projectId: "qless-d0d5b",
  storageBucket: "qless-d0d5b.firebasestorage.app",
  messagingSenderId: "482410977304",
  appId: "1:482410977304:web:6f8d237c8eabae2f794b6d",
  measurementId: "G-D9WXKFHM1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}