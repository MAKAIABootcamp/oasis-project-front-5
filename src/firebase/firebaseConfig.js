// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq8qbkqMspiW4MQanGCxGhwB7drRuFnrM",
  authDomain: "oasis-9da13.firebaseapp.com",
  projectId: "oasis-9da13",
  storageBucket: "oasis-9da13.appspot.com",
  messagingSenderId: "538736978278",
  appId: "1:538736978278:web:821e2e0b44d251fba880a7",
  measurementId: "G-MD3EBY5KLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

const analytics = getAnalytics(app);