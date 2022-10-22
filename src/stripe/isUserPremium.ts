import { auth } from "../firebase/client";

const isUserPremium = async (): Promise<boolean> => {
  await auth.currentUser?.getIdToken(true);
  const decodedToken = await auth.currentUser?.getIdTokenResult(true);

  // make sure metadata firebaseRole = "Premium" is added in product, otherwise stripeRole won't be attached
  return decodedToken?.claims?.stripeRole ? true : false;
};

export default isUserPremium;
