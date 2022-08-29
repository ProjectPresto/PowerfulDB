import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect } from "react";

import { ToastContainer, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { ContributorProvider } from "../context/contributorProvider";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  // const { contributor, setContributor } = UseContributorContext();

  return (
    <>
      <ContributorProvider>{getLayout(<Component {...pageProps} />)}</ContributorProvider>
      <ToastContainer className="toastify" theme="dark" autoClose={5000} pauseOnFocusLoss={false} transition={Slide} />
    </>
  );
};

export default MyApp;
