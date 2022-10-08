import type { GetServerSideProps } from "next";
import { ReactElement } from "react";

import { NextPageWithLayout } from "@pages/_app";
import Band from "@models/band";
import MainLayout from "@components/layouts/MainLayout";
import BandService from "@services/BandService";
import AuthorHero from "@components/authors/viewPage/AuthorHero";

interface BandView {
  band: Band;
}

const BandView: NextPageWithLayout<BandView> = ({ band }) => {
  return (
    <>
      <AuthorHero band={band} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug;

  let band;
  try {
    band = await BandService.getBand(slug as string);
  } catch (ex) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      band,
    },
  };
};
export default BandView;

BandView.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
