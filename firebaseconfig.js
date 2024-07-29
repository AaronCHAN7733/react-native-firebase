import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpnEWT9EJ6tkM5aCM66POn_0WvN0Bdnl4",
  authDomain: "strong-box-f7aa7.firebaseapp.com",
  projectId: "strong-box-f7aa7",
  storageBucket: "strong-box-f7aa7.appspot.com",
  messagingSenderId: "1056337559939",
  appId: "1:1056337559939:web:510ba3d1a549391313f6b6"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth
const auth = getAuth(app);

// Inicializa Firestore
const db = getFirestore(app);

// Inicializa Realtime Database
const rtdb = getDatabase(app);

export { auth, db, rtdb };








