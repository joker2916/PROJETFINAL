// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBY10LaWpDOs0Oqo5y5AWemIMVayUdX1MU",
  authDomain: "agriculture-projet.firebaseapp.com",
  projectId: "agriculture-projet",
  storageBucket: "agriculture-projet.firebasestorage.app",
  messagingSenderId: "639836566556",
  appId: "1:639836566556:web:2d1f61ee31279aeef01bd9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)