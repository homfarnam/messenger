import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDLljfSnAHAetUNxUnqlYmXWi6Uo0wIz1I",
  authDomain: "messenger-800d3.firebaseapp.com",
  databaseURL: "https://messenger-800d3.firebaseio.com",
  projectId: "messenger-800d3",
  storageBucket: "messenger-800d3.appspot.com",
  messagingSenderId: "982558197473",
  appId: "1:982558197473:web:bf73735fc78380f69b99a0",
  measurementId: "G-X2C87KXZ0C",
});

const db = firebaseApp.firestore();

export default db;
