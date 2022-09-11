import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

import { NextPageWithLayout } from "../_app";
import AlbumService from "../../services/AlbumService";
import AlbumCard from "../../components/albums/AlbumCard";
import MainLayout from "../../components/layouts/MainLayout";
import TitleComponent from "../../components/generic/TitleComponent";
import PaginationComponent from "../../components/generic/PaginationComponent";
import SortComponent from "../../components/generic/SortComponent";
import Album from "../../models/album";
import { Pagination, UrlQueries } from "../../models/generic";

interface AlbumIndex {
  albums: Album[];
  pagination: Pagination;
}

const AlbumIndex: NextPageWithLayout<AlbumIndex> = ({ albums, pagination }) => {
  const sortOptions = [
    { value: "title", label: "Title Ascending" },
    { value: "-title", label: "Title Descending" },
    { value: "release_date", label: "Oldest First" },
    { value: "-release_date", label: "Newest First" },
  ];

  return (
    <>
      <Head>
        <title>Album List | PowerfulDB</title>
      </Head>
      <div className="px-6 lg:px-14 py-8">
        <TitleComponent content="Album list" />
        <div className="flex mb-10">
          <SortComponent options={sortOptions} defaultValue="title" />
        </div>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
                    gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12"
        >
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
        <PaginationComponent pagination={pagination} />
      </div>
    </>
  );
};

export default AlbumIndex;

export const getServerSideProps: GetServerSideProps = async ({ query }: { query: UrlQueries }) => {
  const { object_count, page_count, next, previous, results: albums } = await AlbumService.getAlbumList(query);

  return {
    props: {
      albums,
      pagination: {
        object_count,
        page_count,
        next,
        previous,
      },
    },
  };
};

AlbumIndex.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
