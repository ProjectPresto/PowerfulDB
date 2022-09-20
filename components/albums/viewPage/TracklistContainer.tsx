import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";

import { SimplifiedTrack } from "@models/track";
import { useContributorContext } from "@context/contributorProvider";

interface Props {
  tracks: SimplifiedTrack[];
  fullDuration?: string;
}

const TracklistContainer: NextComponentType<NextPageContext, {}, Props> = ({ tracks, fullDuration }: Props) => {
  const { contributor } = useContributorContext();

  const getFullLength = () => {
    if (fullDuration) {
      const durationArray = fullDuration.split(":").map((element) => parseInt(element));
      let durationString = "";
      durationArray.forEach((element, index) => {
        if (element !== 0) {
          durationString += ` ${element} `;
          if (index === 0) durationString += element === 1 ? "hour" : "hours";
          if (index === 1) durationString += element === 1 ? "minute" : "minutes";
          if (index === 2) durationString += element === 1 ? "second" : "seconds";
        }
      });
      return durationString;
    }
    return null;
  };

  return (
    <div>
      <div className="flex items-center gap-2 md:gap-4">
        <h1 className="section-title">Tracklist</h1>
        {
          // TODO: "Add Tracklist" button
        }
      </div>

      <hr className="section-hr" />

      {tracks.length !== 0 ? (
        <div>
          {tracks.map((track) => (
            <>
              <div key={track.id} className="flex justify-between text-sm md:text-base gap-4 items-center">
                <p>
                  {track.position}. <b>{track.title}</b>
                  {track.featured_authors.length !== 0 && (
                    <span className="text-gray-400">
                      {" feat. "}
                      {track.featured_authors
                        .map<React.ReactNode>((fa) => (
                          <Link key={fa.artist?.id || fa.band?.id} href={`/${fa.artist ? "artist" : "band"}/${fa.artist?.slug || fa.band?.slug}`}>
                            <a className="hover:underline">{fa.artist?.name || fa.band?.name}</a>
                          </Link>
                        ))
                        .reduce((prev, curr) => [prev, ", ", curr])}
                    </span>
                  )}
                </p>
                <p className="italic text-gray-300 flex gap-1 items-center">
                  {track.duration && (track.duration.slice(0, 3) === "00:" ? track.duration.slice(3) : track.duration)}
                </p>
              </div>
              <hr className="my-3 md:my-4 border-t-1 border-t-gray-700" />
            </>
          ))}
          <p className="italic text-gray-400 text-sm md:text-base">
            Album&apos;s full length: <span className="text-primary-light">{getFullLength()}</span>
          </p>
        </div>
      ) : (
        <p className="text-sm md:text-base">
          Album has no tracklist yet.
          {contributor ? (
            <Link href={"create-tracklist"}>
              <a className="hover:underline text-primary-accent">You can go ahead and create it</a>
            </Link>
          ) : (
            <Link href="/login">
              <a className="hover:underline text-primary-accent">Log in to add it.</a>
            </Link>
          )}
        </p>
      )}
    </div>
  );
};

export default TracklistContainer;
