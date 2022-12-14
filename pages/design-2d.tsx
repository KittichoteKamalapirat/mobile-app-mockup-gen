/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";

import CreateMockup from "../src/components/CreateMockup";
import Layout from "../src/components/layouts/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <main className="flex-col items-center justify-center h-screen">
        <div id="container" className="flex h-5/6">
          <div id="left" className="my-auto flex-1">
            <div>
              <h1 className="text-3xl font-bold">
                Create beautiful mobile mockups <br /> in seconds.
              </h1>
              <h2 className="text-xl">
                Showcase your app with our iPhone mockups and get more
                customers.
              </h2>
            </div>
          </div>

          <div id="right" className="flex-1">
            <CreateMockup />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
