import firebase from "firebase/app";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAu0zAq1vmtXZ5jwuePnBjlG3gjsiXoHbE",
  authDomain: "task-for-magebit.firebaseapp.com",
  projectId: "task-for-magebit",
  storageBucket: "task-for-magebit.appspot.com",
  messagingSenderId: "883083453261",
  appId: "1:883083453261:web:f6a4e7b599907cc27a4d04",
  measurementId: "G-HNTQSRZFMJ",
});

export const db = app.firestore();
export const myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
