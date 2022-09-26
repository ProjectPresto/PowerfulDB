import type { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import AsyncSelect from "react-select/async";
import GenreService from "@services/GenreService";
import { customSelectStyle, Option } from "./SelectFilterComponent";

interface Props {
  filterUrl: "genres" | "album__genres";
}

const GenreFilterComponent: NextComponentType<NextPageContext, {}, Props> = ({ filterUrl }: Props) => {
  const router = useRouter();
  const [selectValue, setSelectValue] = useState<Option | Option[] | null>();

  // Get genres from url queries and insert them into select value
  const initValue = useCallback(async () => {
    let genresQueries = router.query.genres ?? router.query.album__genres;
    let initGenres = null;
    if (genresQueries) {
      const { results: genres } = await GenreService.getGenreList({
        id__in: Array.isArray(genresQueries) ? genresQueries.join(",") : genresQueries,
        size: 100,
      });
      initGenres = genres.map((genre) => {
        return { value: genre.id.toString(), label: genre.name };
      });
    }
    setSelectValue(initGenres);
  }, [router.query.genres, router.query.album__genres]);

  useEffect(() => {
    initValue();
  }, [initValue]);

  const getGenres = (inputValue: string) =>
    new Promise<Option[]>((resolve) => {
      resolve(GenreService.getGenreOptionList(inputValue));
    });

  const handleChange = (newValue: unknown) => {
    if (Array.isArray(newValue) && newValue.length > 0 && (newValue as Option[])) {
      setSelectValue(newValue);
      router.query[filterUrl] = newValue.map((genre) => genre.value);
      router.replace({
        query: router.query,
      });
    } else {
      setSelectValue(null);
      const { genres, album__genres, ...remainingQuries } = router.query;
      router.replace({
        query: remainingQuries,
      });
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={getGenres}
      onChange={handleChange}
      value={selectValue}
      styles={customSelectStyle}
      placeholder="Genre..."
      isMulti
    />
  );
};

export default GenreFilterComponent;
