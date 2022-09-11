import Head from "next/head";
import { ReactElement } from "react";

import { NextPageWithLayout } from "../_app";
import MainLayout from "../../components/layouts/MainLayout";
import PaginationComponent from "../../components/generic/PaginationComponent";
import TitleComponent from "../../components/generic/TitleComponent";
import AuthorCard from "./../../components/authors/AuthorCard";
import Artist from "../../models/artist";
import { Pagination, UrlQueries } from "../../models/generic";
import { GetServerSideProps } from "next";
import ArtistService from "../../services/ArtistService";

interface ArtistIndex {
  artists: Artist[];
  pagination: Pagination;
}

const ArtistIndex: NextPageWithLayout<ArtistIndex> = ({ artists, pagination }) => {
  return (
    <>
      <Head>
        <title>Artist List | PowerfulDB</title>
      </Head>
      <div className="px-6 lg:px-14 py-8">
        <TitleComponent content="Album list" />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 
                    gap-x-4 gap-y-6 xl:gap-x-6 xl:gap-y-10 2xl:gap-y-16"
        >
          {artists.map((artist) => (
            <AuthorCard key={artist.id} author={artist} authorType="artist" />
          ))}
        </div>
        <PaginationComponent pagination={pagination} />
      </div>
    </>
  );
};

export default ArtistIndex;

export const getServerSideProps: GetServerSideProps = async ({ query }: { query: UrlQueries }) => {
  const { object_count, page_count, next, previous, results: artists } = await ArtistService.getArtistList(query);

  return {
    props: {
      artists,
      pagination: {
        object_count,
        page_count,
        next,
        previous,
      },
    },
  };
};

ArtistIndex.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;