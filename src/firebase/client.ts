import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

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
export const functions = getFunctions(app);
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

export const logout = () => {
  const response = signOut(auth);
  console.log("response", response);
  console.log("sign out");
};

export const openCustomerPortal = async () => {
  console.log("open portal");
  console.log("1");

  console.log("2");
  const functionRef = httpsCallable(
    functions,
    "ext-firestore-stripe-payments-createPortalLink"
  );
  console.log("3");
  console.log("function ref", functionRef);
  const { data } = await functionRef({
    returnUrl: window.location.origin,
  });
  console.log("4");

  console.log("data in portal", data);

  window.location.assign((data as any)?.url); // todo
};

export const fetchSubscription = async (uid: string) => {
  const subsRef = collection(firestore, "users", uid, "subscriptions");
  const subsQuery = query(
    subsRef,
    where("status", "in", ["trialing", "active", "past_due", "unpaid"])
  );

  const subs = await getDocs(subsQuery);
  console.log("length", subs.docs);
  if (subs.docs.length > 0) return subs.docs[0].data();

  return null;
};
