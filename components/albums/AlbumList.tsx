import type { NextComponentType, NextPageContext } from "next";
import Album from "../../models/album";
import AlbumCard from "./AlbumCard";

interface Props {
  albums: Album[];
}

const AlbumList: NextComponentType<NextPageContext, {}, Props> = ({ albums }: Props) => {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
                gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12"
    >
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
};

export default AlbumList;
