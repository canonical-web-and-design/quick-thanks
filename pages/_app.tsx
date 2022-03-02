import { AppProps } from "next/app";
import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <Head>
        <title>Canonical Quick Thanks</title>
        <link
          href="https://assets.ubuntu.com/v1/vanilla-framework-version-3.1.0.min.css"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <div className="page">
          <Component {...pageProps} />
        </div>
      </Layout>
    </SessionProvider>
  );
};

export default App;
