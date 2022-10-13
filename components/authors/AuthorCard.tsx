import type { NextComponentType, NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";

import { SimplifiedArtist } from "@models/artist";
import { SimplifiedBand } from "@models/band";

import defaultBgImage from "@public/images/no_image.jpg";

interface Props {
  author: SimplifiedArtist | SimplifiedBand;
  authorType: "artist" | "band";
}

const AuthorCard: NextComponentType<NextPageContext, {}, Props> = ({ author, authorType }: Props) => {
  const genreText = author.genres?.join(" • ");
  return (
    <Link href={`/${authorType}/${author.slug}`}>
      <a>
        <div
          className="rounded-3xl w-full h-40 md:h-48 !bg-cover flex flex-col justify-end items-start snap-start scroll-pl-3
                group overflow-hidden !bg-center relative group bg-secondary-dark"
        >
          <div
            className="absolute h-full w-full object-center object-cover z-10
                    transition-all xl:group-hover:scale-110 opacity-95 xl:opacity-80 group-hover:opacity-100"
          >
            <Image
              src={author?.bg_image || author?.bg_image_url || defaultBgImage}
              alt={`${author.name} background image`}
              layout="fill"
              className="object-cover object-center"
            />
          </div>

          <div
            className="absolute top-0 bottom-0 left-0 right-0 w-full z-20 group-hover:scale-125 transition-all"
            style={{ background: "linear-gradient(180deg, rgba(94, 43, 255, 0),rgba(94, 43, 255, 0.5))" }}
          ></div>

          <div className="px-4 md:px-7 pb-3 md:pb-4 w-full z-30">
            <h3
              title={author.name}
              className="font-bold text-lg md:text-xl xl:text-2xl truncate 
            transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
            >
              {author.name}
            </h3>
            {genreText && (
              <p
                className="text-xs md:text-sm truncate drop-shadow-md
              transition-transform group-hover:delay-100"
              >
                {genreText}
              </p>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AuthorCard;
