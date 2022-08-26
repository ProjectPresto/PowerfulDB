import type { NextComponentType, NextPageContext } from "next";
import { FormEvent, useState } from "react";

interface Props {}

const SearchInput: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
  const [query, setQuery] = useState("");
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log(query);
  };
  return (
    <div className="w-full relative">
      <form action="/search" method="GET" className="flex items-center" autoComplete="off" onChange={handleSearch}>
        <input
          type="search"
          name="query"
          id="search-input"
          placeholder="Search..."
          value={query}
          onChange={({ currentTarget }) => setQuery(currentTarget.value)}
          className="w-full
                    pl-4 pr-10 py-1 xl:py-1.5 border-2 border-primary-accent rounded-3xl bg-transparent
                    font-bold xl:text-lg text-primary-light focus:outline-none focus:bg-primary-accent
                    focus:text-secondary-dark focus:placeholder:text-secondary-dark shadow-accent
                    peer transition-all duration-300"
        />
        <button type="submit" className="absolute right-4 text-primary-accent peer-focus:text-primary-dark transition-all duration-300">
          <i className="material-symbols-rounded cursor-pointer disabled:cursor-default !text-xl xl:!text-2xl">search</i>
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
