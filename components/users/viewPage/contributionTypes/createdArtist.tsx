import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";

import { ContributedArtist } from "@models/user";

interface Props {
  username: string;
  artist: ContributedArtist;
}

const CreatedArtist: NextComponentType<NextPageContext, {}, Props> = ({ username, artist }: Props) => {
  return (
    <>
      <span className="material-symbols-rounded !text-lg xl:!text-xl">mic_external_on</span>
      <p>
        {`${username} created artist called `}
        <Link href={`/artist/${artist.slug}`}>
          <a className="font-bold text-primary-accent hover:underline">{artist.name}</a>
        </Link>
      </p>
      <span className="text-gray-500 italic hidden md:inline">+ 3 points</span>
    </>
  );
};

export default CreatedArtist;
