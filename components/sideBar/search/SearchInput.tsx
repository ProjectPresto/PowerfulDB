import type { NextComponentType, NextPageContext } from "next";
import { useState, useEffect } from "react";
import Artist from "../../../models/artist";
import Band from "../../../models/band";
import AlbumService from "../../../services/AlbumService";
import ArtistService from "../../../services/ArtistService";
import BandService from "../../../services/BandService";
import Album from "../../../models/album";
import ResultsComponent from "./resultsComponent";

const SearchInput: NextComponentType<NextPageContext, {}> = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [queryResults, setQueryResults] = useState<{ albums: Album[]; artists: Artist[]; bands: Band[] }>();

  const handleSubmit = () => {
    // TODO: Search submit 
  };

  const search = async (q: string) => {
    const { results: albums } = await AlbumService.getAlbumList({ search: q, size: 3 });
    const { results: artists } = await ArtistService.getArtistList({ search: q, size: 3 });
    const { results: bands } = await BandService.getBandList({ search: q, size: 3 });
    return { albums, artists, bands };
  };

  useEffect(() => {
    const waitStopTyping = setTimeout(async () => {
      setQueryResults(undefined);
      if (searchQuery !== "") {
        const results = await search(searchQuery);
        setQueryResults(results);
      }
    }, 300);

    return () => clearTimeout(waitStopTyping);
  }, [searchQuery]);

  return (
    <div className="w-full flex flex-col relative rounded-t-2xl">
      <form action="/search" method="GET" className="flex items-center" autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="search"
          name="query"
          id="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={({ currentTarget }) => setSearchQuery(currentTarget.value)}
          className="z-10 w-full pl-4 pr-10 py-1 xl:py-1.5 border-2 border-primary-accent rounded-3xl
                    font-bold xl:text-lg text-primary-light focus:outline-none bg-primary-dark focus:bg-primary-accent
                    focus:text-secondary-dark focus:placeholder:text-secondary-dark
                    peer transition-all duration-300"
        />
        <button type="submit" className="z-10 absolute right-4 text-primary-accent peer-focus:text-primary-dark transition-all duration-300">
          <i className="material-symbols-rounded cursor-pointer disabled:cursor-default !text-xl xl:!text-2xl">search</i>
        </button>
        <div
          className="z-0 absolute top-0 w-full transition-all rounded-3xl p-5 pt-14 bg-secondary-dark
                    hover:translate-y-0 peer-focus:translate-y-0 translate-y-[-100%] max-h-[46rem] overflow-y-auto coolscroll"
        >
          {searchQuery === "" ? "Type to search" : !queryResults ? "Searching..." : <ResultsComponent data={queryResults} />}
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
