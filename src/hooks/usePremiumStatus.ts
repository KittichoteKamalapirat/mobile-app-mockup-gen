import { useState, useEffect } from "react";
import { auth } from "../firebase/client";
import isUserPremium from "../stripe/isUserPremium";

// have useEffect rerun  when user changes
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
