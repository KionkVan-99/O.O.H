// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";  // If you use Firebase Storage

// Your Firebase config from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBbHAJFcQKZ96CbW3IPlD7b-RUilYRuIJI",
  authDomain: "otti-helping-hand.firebaseapp.com",
  projectId: "otti-helping-hand",
  storageBucket: "otti-helping-hand.firebasestorage.app",
  messagingSenderId: "500322409646",
  appId: "1:500322409646:web:436ee665d56f77cef1e13f",
  measurementId: "G-Z3CBLS27YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);  // For authentication
export const db = getFirestore(app);  // For Firestore
export const storage = getStorage(app);  // If you use Firebase Storage
