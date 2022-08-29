import { ReactElement } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { NextPageWithLayout } from "./_app";

const Albums: NextPageWithLayout = () => {
  return (
    <>
      <h1>TEST</h1>
    </>
  );
};

export default Albums;

Albums.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
