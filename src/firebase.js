
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import {getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "chat-5f681.firebaseapp.com",
  projectId: "chat-5f681",
  storageBucket: "chat-5f681.appspot.com",
  messagingSenderId: "942259684178",
  appId: "1:942259684178:web:60cf629bc3a2f8bbf9708b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);