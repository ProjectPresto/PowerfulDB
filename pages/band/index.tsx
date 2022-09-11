import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

import { NextPageWithLayout } from "../_app";
import BandService from "../../services/BandService";
import MainLayout from "../../components/layouts/MainLayout";
import PaginationComponent from "../../components/generic/PaginationComponent";
import TitleComponent from "../../components/generic/TitleComponent";
import AuthorCard from "../../components/authors/AuthorCard";
import Band from "../../models/band";
import { Pagination, UrlQueries } from "../../models/generic";

interface BandIndex {
  bands: Band[];
  pagination: Pagination;
}

const BandIndex: NextPageWithLayout<BandIndex> = ({ bands, pagination }) => {
  return (
    <>
      <Head>
        <title>Band List | PowerfulDB</title>
      </Head>
      <div className="px-6 lg:px-14 py-8">
        <TitleComponent content="Album list" />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 
                    gap-x-4 gap-y-6 xl:gap-x-6 xl:gap-y-10 2xl:gap-y-16"
        >
          {bands.map((band) => (
            <AuthorCard key={band.id} author={band} authorType="band" />
          ))}
        </div>
        <PaginationComponent pagination={pagination} />
      </div>
    </>
  );
};

export default BandIndex;

export const getServerSideProps: GetServerSideProps = async ({ query }: { query: UrlQueries }) => {
  const { object_count, page_count, next, previous, results: bands } = await BandService.getBandList(query);

  return {
    props: {
      bands,
      pagination: {
        object_count,
        page_count,
        next,
        previous,
      },
    },
  };
};

BandIndex.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;