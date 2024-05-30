
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const API_KEY=import.meta.env.VITE_Firebase_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "inventory-management-4cc04.firebaseapp.com",
  projectId: "inventory-management-4cc04",
  storageBucket: "inventory-management-4cc04.appspot.com",
  messagingSenderId: "342790076859",
  appId: "1:342790076859:web:f553fafcedae278f882c9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };