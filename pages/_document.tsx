/* eslint-disable @next/next/google-font-display */
import type { NextComponentType, NextPageContext } from "next";
import { Head, Html, Main, NextScript } from "next/document";

interface Props {}

const Document: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0" />
      </Head>
      <body className="text-primary-light bg-secondary-dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
