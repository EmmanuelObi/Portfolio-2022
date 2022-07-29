import React from "react";
import Head from "next/head";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Container } from "./LayoutStyles";

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta
          name="description"
          content="Portfolio website developed by Emmanuel, containing projects, skills and more about educational and professional background."
        />
         <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <title>Emmanuel Obi - Portfolio</title>
      </Head>
      <Container>
        <Header />
        <main>{children}</main>
        <Footer />
      </Container>
    </>
  );
};
