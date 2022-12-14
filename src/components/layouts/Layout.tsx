import Image from "next/image";
import Head from "next/head";
import React, { ReactNode } from "react";
import Navbar from "../Navbar";
import Container from "../containers/Container";
import { brandName, brandOneLiner } from "../../constants/brand";
import { Footer } from "../Footer";

interface Props {
  children: ReactNode;
  justifyContent?:
    | "justify-start"
    | "justify-end"
    | "justify-center"
    | "justify-between"
    | "justify-around"
    | "justify-evenly";
  alignItems?:
    | ""
    | "items-start"
    | "items-end"
    | "items-center"
    | "items-baseline"
    | "items-stretch";
  extraStyle?: string;
}
const Layout = ({
  children,
  justifyContent = "justify-center",
  alignItems = "",
  extraStyle = "",
}: Props) => {
  return (
    <div className="pt-20 bg-grey-0 text-grey-900 h-min-screen ">
      <Head>
        <title>{brandName}</title>
        <meta name="description" content={brandOneLiner} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div
        className={`flex-1 h-full w-full ${justifyContent} ${alignItems} ${extraStyle} `}
      >
        <Container>{children}</Container>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
