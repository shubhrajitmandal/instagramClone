import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1i1xpmrF2-oiesEszlY5bfq7QMAkANTg",
  authDomain: "instagram-clone-1e626.firebaseapp.com",
  databaseURL: "https://instagram-clone-1e626.firebaseio.com",
  projectId: "instagram-clone-1e626",
  storageBucket: "instagram-clone-1e626.appspot.com",
  messagingSenderId: "672603823838",
  appId: "1:672603823838:web:d3858a96b09699503aac4f",
  measurementId: "G-QFB7J0476D",
};

firebase.initializeApp(firebaseConfig);

const Auth = firebase.auth();
const Firestore = firebase.firestore();

export { Auth, Firestore };
