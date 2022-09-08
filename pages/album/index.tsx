import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

import { NextPageWithLayout } from "../_app";
import AlbumService from "../../services/AlbumService";
import AlbumList from "../../components/albums/AlbumList";
import MainLayout from "../../components/layouts/MainLayout";
import PaginationComponent from "../../components/generic/PaginationComponent";
import TitleComponent from "../../components/generic/TitleComponent";
import Album from "../../models/album";
import { Pagination } from "../../models/generic";

interface AlbumsPage {
  albums: Album[];
  pagination: Pagination;
}

const Albums: NextPageWithLayout<AlbumsPage> = ({ albums, pagination }) => {
  return (
    <>
      <Head>
        <title>Album List | PowerfulDB</title>
      </Head>
      <div className="px-6 lg:px-14 py-8">
        <TitleComponent content="Album list" />
        <AlbumList albums={albums} />
        <PaginationComponent pagination={pagination} />
      </div>
    </>
  );
};

export default Albums;

export const getServerSideProps: GetServerSideProps = async ({ query }: { query: { page?: number; size?: number } }) => {
  const { object_count, page_count, next, previous, results: albums } = await AlbumService.getPaginatedAlbumList(query.page, query.size);

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

Albums.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
