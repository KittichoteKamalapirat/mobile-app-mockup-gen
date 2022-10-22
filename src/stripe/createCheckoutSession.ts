/* eslint-disable max-len */
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/client";

export const createCheckoutSession = async (uid: string) => {
  try {
    const newCheckoutRef = collection(firestore, "checkout_sessions");
    const newCheckoutSession = {
      price: process.env.STRIPE_PRODUCT_ID,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    };
    // Create a new checkout session in the subcollection inside this users document
    const collectionRef = collection(
      firestore,
      "users",
      uid,
      "checkout_sessions"
    );

    console.log("proces env", process.env);
    console.log("uid", uid);

    console.log("1");
    console.log("newCheckoutSession", newCheckoutSession);

    const docRef = await addDoc(collectionRef, newCheckoutSession);

    console.log("2");

    // Wait for the CheckoutSession to get attached by the extension
    onSnapshot(docRef, async (snap) => {
      console.log("on snap shot");
      const { error, url } = snap.data() || {}; // TODO check this

      console.log("data", snap.data());
      console.log("error", error);
      console.log("url", url);
      if (error) {
        console.error(`An error occured: ${error.message}`);
        // this.isLoading = false;
      }
      if (url) {
        window.location.assign(url);
      }
    });

    console.log("3");
  } catch (error) {
    console.log("error", error);
  }
};
