/* eslint-disable @next/next/no-img-element */

import { User } from "firebase/auth";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LinkButton from "../src/components/Buttons/LinkButton";
import Layout from "../src/components/layouts/Layout";
import { auth } from "../src/firebase/client";
import usePremiumStatus from "../src/hooks/usePremiumStatus";

const Home: NextPage = () => {
  const [user, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user as User);

  return (
    <Layout>
      <main className="flex-col items-center justify-center h-screen">
        <div id="container" className="flex items-center h-5/6">
          <div id="left" className="my-auto flex-1">
            <div>
              <h1 className="text-3xl font-bold">
                Create beautiful mobile mockups <br /> in seconds.
              </h1>
              <h2 className="text-xl">
                Showcase your app with our iPhone mockups and get more
                customers.
              </h2>
              <LinkButton
                label="Start Designing For Free!"
                href="/design"
                extraClass="my-4"
              />
            </div>
          </div>

          <div id="right" className="flex-1">
            <img
              id="phone"
              src="/images/hero.png"
              alt="hero"
              className={`w-3/4 my-auto`}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
