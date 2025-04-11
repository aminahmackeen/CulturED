// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjAjAdp0YJeiqj9ieZG-cSLt6uE_4c-NI",
  authDomain: "cultured-89a12.firebaseapp.com",
  projectId: "cultured-89a12",
  storageBucket: "cultured-89a12.firebasestorage.app",
  messagingSenderId: "485854917644",
  appId: "1:485854917644:web:92c0d3631c5b3904112a29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//import the function from the realtime database module
import { getDatabase } from 'firebase/database';
// Get a reference to the database service
const db = getDatabase();