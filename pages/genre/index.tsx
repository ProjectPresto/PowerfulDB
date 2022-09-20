import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

import { NextPageWithLayout } from "@pages/_app";
import GenreService from "@services/GenreService";
import GenreCard from "@components/genres/GenreCard";
import MainLayout from "@components/layouts/MainLayout";
import TitleComponent from "@components/generic/TitleComponent";
import PaginationComponent from "@components/generic/PaginationComponent";
import Genre from "@models/genre";
import { Pagination, UrlQueries } from "@models/generic";

interface GenreIndex {
  genres: Genre[];
  pagination: Pagination;
}

const GenreIndex: NextPageWithLayout<GenreIndex> = ({ genres, pagination }) => {
  return (
    <>
      <Head>
        <title>Genre List | PowerfulDB</title>
      </Head>
      <div className="px-6 lg:px-14 py-8">
        <TitleComponent content="Genre list" />
        <div className="flex mb-10 gap-5">
          {
            // TODO: Genre name filter
          }
        </div>
        <div className="space-y-8 md:space-y-14">
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
        <PaginationComponent pagination={pagination} />
      </div>
    </>
  );
};

export default GenreIndex;

export const getServerSideProps: GetServerSideProps = async ({ query }: { query: UrlQueries }) => {
  const { object_count, page_count, next, previous, results: genres } = await GenreService.getGenreList({ ...query, size: 16 });

  return {
    props: {
      genres,
      pagination: {
        object_count,
        page_count,
        next,
        previous,
      },
    },
  };
};

GenreIndex.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
