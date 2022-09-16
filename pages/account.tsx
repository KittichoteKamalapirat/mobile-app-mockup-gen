import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import usePremiumStatus from "../functions/src/stripe/usePremiumStatus";
import Button from "../src/components/Buttons/Button";
import Layout from "../src/components/layouts/Layout";
import { Loading } from "../src/components/Loading";
import { auth, openCustomerPortal } from "../src/firebase/client";

interface Props {}

const account = ({}: Props) => {
  const [user, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user);

  if (userLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  return (
    <Layout>
      <h1>My account</h1>
      <Button label="manage subscription" onClick={openCustomerPortal} />
    </Layout>
  );
};
export default account;
