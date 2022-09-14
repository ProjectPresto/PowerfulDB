import { GetServerSideProps } from "next";
import { ReactElement } from "react";

import { NextPageWithLayout } from "../../_app";
import AlbumService from "../../../services/AlbumService";
import Album, { AlbumArticle } from "../../../models/album";
import MainLayout from "../../../components/layouts/MainLayout";
import AlbumHero from "../../../components/albums/viewPage/AlbumHero";
import Head from "next/head";
import ArticleContainer from "../../../components/generic/ArticleContainer";
import TracklistContainer from "../../../components/albums/viewPage/TracklistContainer";

interface AlbumView {
  album: Album;
  albumArticle: AlbumArticle;
}

const AlbumView: NextPageWithLayout<AlbumView> = ({ album, albumArticle }) => {
  console.log(albumArticle);

  return (
    <>
      <Head>
        <title>{album.title} | PowerfulDB</title>
      </Head>
      <AlbumHero album={album} />
      <div className="flex flex-col gap-12 md:gap-16 px-5 md:px-10 lg:px-14 py-8 mt-5 md:mt-10 mx-auto max-w-screen-lg w-full">
        <ArticleContainer article={albumArticle} />
        <TracklistContainer tracks={album.tracks} fullDuration={album.full_duration} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug;

  const album = await AlbumService.getAlbum(slug as string);
  let albumArticle = null;
  try {
    albumArticle = await AlbumService.getAlbumArticle(slug as string);
  } catch (e) {}

  return {
    props: {
      album,
      albumArticle,
    },
  };
};

export default AlbumView;

AlbumView.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
