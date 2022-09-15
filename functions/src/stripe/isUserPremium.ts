import { auth } from "../../../src/firebase/client";

const isUserPremium = async (): Promise<boolean> => {
  await auth.currentUser?.getIdToken(true);
  const decodedToken = await auth.currentUser?.getIdTokenResult();

  return decodedToken?.claims?.stripeRole ? true : false;
};

export default isUserPremium;
