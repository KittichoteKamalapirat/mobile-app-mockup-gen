import { Stripe, loadStripe } from "@stripe/stripe-js";
import { STRIPE_API_KEY_TEST } from "../constants";

let stripePromise: Stripe | null;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(STRIPE_API_KEY_TEST);
  }
  return stripePromise;
};

export default initializeStripe;
