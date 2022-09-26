import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import Album from "@models/album";
import Artist from "@models/artist";

import defaultArtCover from "@public/images/no_image.jpg";

interface Props {
  album?: Album;
  artist?: Artist;
  type: "albumAnniversary" | "artistBirthday" | "artistDeathAnniversary";
}

const OnThisDayCard: NextComponentType<NextPageContext, {}, Props> = ({ album, artist, type }: Props) => {
  const getCardText = () => {
    let text = "";
    const currentDate = moment().format("YYYY-MM-DD");
    if (type === "albumAnniversary") {
      // If album was released today then type "Album has its release"
      // Else "Album was released X years ago"
      if (currentDate === album?.release_date) {
        text = `${album?.title} has its release`;
      } else if (moment(currentDate).year() - moment(album?.release_date).year() > 0) {
        text = `${album?.title} was relased ${moment(album?.release_date).fromNow()}`;
      } else {
        text = `${album?.title} will release ${moment(album?.release_date).toNow()}`;
      }
    } else if (type === "artistBirthday") {
      text = `${artist?.name} was born ${moment(artist?.birth_date).fromNow()}`;
    } else if (type === "artistDeathAnniversary") {
      text = `${artist?.name} died ${moment(artist?.death_date).fromNow()}`;
    }
    return text;
  };
  return (
    <Link href={album ? `album/${album.slug}` : `artist/${artist?.slug}`}>
      <div className="relative flex items-end h-44 overflow-hidden rounded-2xl cursor-pointer group">
        <div
          className="absolute z-0 top-0 left-0 h-full w-full object-center object-cover
                    transition-all xl:group-hover:scale-110 opacity-95 xl:opacity-80 group-hover:opacity-100"
        >
          <Image
            src={album?.art_cover || album?.art_cover_url || artist?.bg_image || artist?.bg_image_url || defaultArtCover}
            alt={album?.title ? `${album?.title} art cover` : `${artist?.name} background image`}
            layout="fill"
            className="object-cover object-center"
          />
        </div>
        <div
          className="absolute top-0 bottom-0 left-0 right-0 "
          style={{ background: "linear-gradient(180deg, rgba(94, 43, 255, 0) 30%, rgba(94, 43, 255, 0.75) 100%)" }}
        ></div>
        <div className="z-10 my-4 mx-6">
          <p className="text-lg drop-shadow-md font-bold">{getCardText()}</p>
        </div>
      </div>
    </Link>
  );
};

export default OnThisDayCard;
