/* eslint-disable max-len */
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../../src/firebase/client";
import { STRIPE_PRODUCT_ID_TEST } from "../constants";
import initializeStripe from "./initializeStripe";

// export const createCheckoutSession = async (uid: string) => {
//   try {
//     const newCheckoutRef = collection(firestore, "checkout_sessions");
//     const newCheckoutSession = {
//       price: "price_XXXXX",
//       success_url: window.location.origin,
//       cancel_url: window.location.origin,
//     };
//     // Create a new checkout session in the subcollection inside this users document

//     console.log("1");
//     console.log("uid", uid);
//     // await addDoc(collection(firestore, "users", uid), {
//     //   checkout_session: newCheckoutRef,
//     // });

//     await setDoc(
//       doc(firestore, "users", uid),
//       {
//         checkout_session: newCheckoutSession,
//       },
//       { merge: true }
//     );

//     console.log("2");

//     // Wait for the CheckoutSession to get attached by the extension
//     onSnapshot(doc(firestore, "users", uid), async (doc) => {
//       console.log("doc", doc);

//       console.log("data", doc.data());
//       const { sessionId } = doc.data() || {};

//       if (sessionId) {
//         // We have a session, let's redirect to Checkout
//         // Init Stripe
//         const stripe = await initializeStripe();
//         stripe?.redirectToCheckout({ sessionId });
//       }
//     });

//     console.log("3");
//   } catch (error) {
//     console.log("error", error);
//   }
// };

export const createCheckoutSession = async (uid: string) => {
  try {
    const newCheckoutRef = collection(firestore, "checkout_sessions");
    const newCheckoutSession = {
      price: STRIPE_PRODUCT_ID_TEST,
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
    // await addDoc(collection(firestore, "users", uid), {
    //   checkout_session: newCheckoutRef,
    // });

    console.log("proces env", process.env);
    console.log("uid", uid);

    console.log("1");
    console.log("newCheckoutSession", newCheckoutSession);

    const docRef = await addDoc(collectionRef, newCheckoutSession);

    //   await setDoc(
    //     doc(firestore, "users", uid),
    //     {
    //       checkout_session: newCheckoutSession,
    //     },
    //     { merge: true }
    //   );

    console.log("2");

    // Wait for the CheckoutSession to get attached by the extension
    onSnapshot(docRef, async (snap) => {
      console.log("on snap shot");
      const { error, url } = snap.data();

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
