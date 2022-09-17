import type { NextComponentType, NextPageContext } from "next";
import Album from "../../../models/album";
import AlbumSwiper from "../../swipers/AlbumSwiper";

interface Props {
  albums: Album[];
}

const AuthorOtherAlbums: NextComponentType<NextPageContext, {}, Props> = ({ albums }: Props) => {

  return (
    <div>
      <div className="flex items-center gap-2 md:gap-4">
        <h1 className="section-title">Other albums from this author</h1>
      </div>
      <hr className="section-hr" />
      <AlbumSwiper albums={albums} type={"narrow"} />
    </div>
  )
}

export default AuthorOtherAlbums