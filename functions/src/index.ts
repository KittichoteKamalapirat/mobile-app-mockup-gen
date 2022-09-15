/* eslint-disable object-curly-spacing */
import Stripe from "stripe";
import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// export const createStripeCheckout = functions.https.onCall(async () => {
//   console.log("--------------------------------");
//   // init Stripe
//   const stripe = new Stripe(functions.config().stripe.secret_key, {
//     apiVersion: "2022-08-01",
//   });

//   console.log("stripe", stripe);
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     mode: "payment",
//     success_url: "http://localhost:3000/stripe/success",
//     cancel_url: "http://localhost:3000/stripe/cancel",
//     line_items: [
//       {
//         quantity: 1,
//         price_data: {
//           currency: "usd",
//           unit_amount: 1 * 100, // 100 cent = 1 usd
//           product_data: {
//             name: "IPhone Mockup Image",
//           },
//         },
//       },
//     ],
//   });
//   console.log("session", session);

//   return {
//     id: session.id,
//   };
// });
