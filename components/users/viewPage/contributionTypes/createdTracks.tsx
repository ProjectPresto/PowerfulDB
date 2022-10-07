import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";

import { ContributedTracks } from "@models/user";

interface Props {
  username: string;
  tracks: ContributedTracks;
}

const CreatedTracks: NextComponentType<NextPageContext, {}, Props> = ({ username, tracks }: Props) => {
  return (
    <>
      <span className="material-symbols-rounded !text-lg xl:!text-xl">library_music</span>
      <p>
        {`${username} added `}
        <span className="font-bold">{` ${tracks.tracks_count} ${tracks.tracks_count === 1 ? " track" : " tracks"} `}</span>
        {` to the album called `}
        <Link href={`/album/${tracks.album__slug}`}>
          <a className="italic text-primary-accent hover:underline">{tracks.album__title}</a>
        </Link>
      </p>
      <span className="text-gray-500 italic hidden md:inline">{`+ ${tracks.tracks_count} ${tracks.tracks_count === 1 ? " point" : " points"}`}</span>
    </>
  );
};

export default CreatedTracks;
