import type { NextComponentType, NextPageContext } from "next";

import Album from "../../../models/album";
import Artist from "../../../models/artist";
import Band from "../../../models/band";
import ResultsAlbumList from "./resultsAlbumList";
import ResultsAuthorList from "./resultsAuthorList";

interface Props {
  data: { albums: Album[]; artists: Artist[]; bands: Band[] };
}

const ResultsComponent: NextComponentType<NextPageContext, {}, Props> = ({ data }: Props) => {
  return (
    <>
      <div className="space-y-4 font-normal">
        <ResultsAlbumList albums={data.albums} />
        <ResultsAuthorList artists={data.artists} bands={data.bands} />
      </div>
    </>
  );
};

export default ResultsComponent;
