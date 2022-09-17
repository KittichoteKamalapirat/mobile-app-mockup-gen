import moment from "moment";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import usePremiumStatus from "../functions/src/stripe/usePremiumStatus";
import Button from "../src/components/Buttons/Button";
import Layout from "../src/components/layouts/Layout";
import { Loading } from "../src/components/Loading";
import {
  auth,
  fetchSubscription,
  openCustomerPortal,
} from "../src/firebase/client";

interface Props {}

const Account = ({}: Props) => {
  const [user, userLoading] = useAuthState(auth);
  console.log("user", user);
  const userIsPremium = usePremiumStatus(user);

  const [subs, setSubs] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subs = await fetchSubscription(user?.uid);
        console.log({ subs });
        setSubs(subs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  const formattedDate = (seconds: number) =>
    moment(new Date(seconds)).format("l");

  if (userLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  const premiumBody = (
    <div>
      <Button label="manage subscription" onClick={openCustomerPortal} />
      <p>
        Current period start:{" "}
        {formattedDate(subs?.current_period_start.seconds * 1000)}
      </p>
      <p>
        Current period end:{" "}
        {formattedDate(subs?.current_period_end.seconds * 1000)}
      </p>
      {subs?.cancel_at && <p>Subscription cancelled</p>}
    </div>
  );
  return (
    <Layout>
      <h1>My account</h1>

      {userIsPremium && premiumBody}
    </Layout>
  );
};
export default Account;
