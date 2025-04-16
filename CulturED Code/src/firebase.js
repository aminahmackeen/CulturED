import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCjAjAdp0YJeiqj9ieZG-cSLt6uE_4c-NI",
  authDomain: "cultured-89a12.firebaseapp.com",
  projectId: "cultured-89a12",
  storageBucket: "cultured-89a12.firebasestorage.app",
  messagingSenderId: "485854917644",
  appId: "1:485854917644:web:92c0d3631c5b3904112a29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth + Provider
export const auth = getAuth(app); // ✅ pass app here
export const provider = new GoogleAuthProvider();

// Realtime Database
export const db = getDatabase(app); // ✅ pass app here too
