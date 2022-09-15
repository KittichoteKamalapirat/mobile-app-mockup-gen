import { useState, useEffect } from "react";
import { auth } from "../../../src/firebase/client";
import isUserPremium from "./isUserPremium";

export default function usePremiumStatus(user: typeof auth.currentUser) {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        setPremiumStatus(await isUserPremium());
      };
      checkPremiumStatus();
    }
  }, [user]);

  return premiumStatus;
}
