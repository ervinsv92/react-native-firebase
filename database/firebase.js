import firebase from 'firebase';
//import { initializeApp } from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBYC0Ouavo_9QPZMH5zt5O-5U5FamFFQzE",
    authDomain: "react-native-firebase-8c388.firebaseapp.com",
    projectId: "react-native-firebase-8c388",
    storageBucket: "react-native-firebase-8c388.appspot.com",
    messagingSenderId: "20464309181",
    appId: "1:20464309181:web:6d135e7fc3a9dbe42b38d4"
  };
    // Initialize Firebase
  
  //const firebase = initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  export default{
      firebase, 
        db
  }