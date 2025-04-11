import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALi1neY5C6qr-uWWD9xARVkFZRLxE4yc8",
  authDomain: "dashboard-travel-129d1.firebaseapp.com",
  projectId: "dashboard-travel-129d1",
  storageBucket: "dashboard-travel-129d1.firebasestorage.app",
  messagingSenderId: "983993359019",
  appId: "1:983993359019:web:9d3f9f7c9b801bab80b5ee"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);