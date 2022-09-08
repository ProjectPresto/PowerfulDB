import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import AlbumList from "../../components/albums/AlbumList";
import MainLayout from "../../components/layouts/MainLayout";
import Album from "../../models/album";
import { Pagination } from "../../models/generic";
import AlbumService from "../../services/AlbumService";
import { NextPageWithLayout } from "../_app";

interface AlbumsPage {
  albums: Album[];
  pagination: Pagination;
}

const Albums: NextPageWithLayout<AlbumsPage> = ({ albums, pagination }) => {
  return (
    <div className="px-6 lg:px-14 py-8">
      <AlbumList albums={albums} />
    </div>
  );
};

export default Albums;

export const getServerSideProps: GetServerSideProps = async ({ query }: { query: { page?: number; size?: number } }) => {
  const { count, next, previous, results: albums } = await AlbumService.getPaginatedAlbumList(query.page, query.size);

  return {
    props: {
      albums,
      pagination: {
        count,
        next,
        previous,
      },
    },
  };
};

Albums.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
