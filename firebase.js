import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgoFlr9kHMOsXg9MV99aSeimJKRMKjrv8",
  authDomain: "mobile-app-thing.firebaseapp.com",
  projectId: "mobile-app-thing",
  storageBucket: "mobile-app-thing.firebasestorage.app",
  messagingSenderId: "542842695658",
  appId: "1:542842695658:web:ab4762ec5201da20080c93",
  measurementId: "G-W47XN26CQN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);