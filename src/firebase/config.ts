import firebase from "firebase/compat/app";
// import firebase from "firebase/app";
import "firebase/compat/firestore";
import { createFirestoreInstance } from "redux-firestore";
import store from "../redux/store";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// export const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

export const firebaseConfig = {
  apiKey: "AIzaSyD6MKTiq2HGxtiNpx6avNaU9Ix0dfM80-g",
  authDomain: "mockupx-1a117.firebaseapp.com",
  projectId: "mockupx-1a117",
  storageBucket: "mockupx-1a117.appspot.com",
  messagingSenderId: "563364205858",
  appId: "1:563364205858:web:84f54ce28a48074b79417b",
  measurementId: "G-PDP8C16NPX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const auth = getAuth(app);
// onAuthStateChanged(auth, (user) => {
//   // Check for user status
// });

const rrfConfig = {
  // userProfile: "users",
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

const colRef = collection(db, "posts");

getDocs(colRef).then((snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
});

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
export default firebase;
