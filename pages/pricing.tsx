import React from "react";
import Layout from "../src/components/layouts/Layout";
import Pricing from "../src/components/Pricing";

interface Props {}

const pricing = ({}: Props) => {
  return (
    <Layout>
      <Pricing />
    </Layout>
  );
};
export default pricing;
