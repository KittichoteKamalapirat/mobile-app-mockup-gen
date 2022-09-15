import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
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
export const auth = getAuth(app);
export const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const { email, displayName, photoURL, uid, providerData } = result.user;

    const newUser = {
      uid,
      name: displayName,
      email,
      avatarUrl: photoURL,
      provider: providerData[0].providerId,
    };

    // const docRef = await addDoc(collection(firestore, "users"), newUser);
    const userRef = doc(firestore, "users", uid);
    const docRef = await setDoc(userRef, newUser);
  } catch (error) {
    console.log("error", error);
  }
};
