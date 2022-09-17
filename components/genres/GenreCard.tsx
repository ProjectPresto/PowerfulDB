import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";
import Genre from "../../models/genre";

interface Props {
  genre: Genre
}

const GenreCard: NextComponentType<NextPageContext, {}, Props> = ({ genre }: Props) => {
  return (
    <div className="w-full group">

      <div className="flex flex-wrap gap-y-0 gap-x-3 flex-col md:flex-row items-start md:items-end group-hover:text-primary-accent transition-colors">

        <Link href={`/album?genres=${genre.id}`}>
          <a>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ">{genre.name}</h1>
          </a>
        </Link>

        <div className="flex gap-3 text-sm sm:text-base lg:text-lg text-gray-400">
          <Link href={`/album?genres=${genre.id}`}>
            <a className={`transition-colors ${genre.album_count !== 0 ? "hover:text-primary-accent cursor-pointer" : "cursor-default"}`}>
              {genre.album_count} albums
            </a>
          </Link>

          <Link href={`/band?genres=${genre.id}`}>
            <a className={`transition-colors ${genre.band_count !== 0 ? "hover:text-primary-accent cursor-pointer" : "cursor-default"}`}>
              {genre.band_count} bands
            </a>
          </Link>

          <Link href={`/artist?genres=${genre.id}`}>
            <a className={`transition-colors ${genre.artist_count !== 0 ? "hover:text-primary-accent cursor-pointer" : "cursor-default"}`}>
              {genre.artist_count} artists
            </a>
          </Link>
        </div>

      </div>

      <hr className=" mt-3 border-t-2 border-gray-600 group-hover:border-primary-accent transition-colors" />

    </div >
  )
}

export default GenreCard