import type { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import AsyncSelect from "react-select/async";
import GenreService from "../../../services/GenreService";
import { customSelectStyle, Option } from "./SelectFilterComponent";

interface Props {}

const GenreFilterComponent: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
  const router = useRouter();
  const [selectValue, setSelectValue] = useState<object | object[] | null>();

  const getGenres = (inputValue: string) =>
    new Promise<Option[]>((resolve) => {
      resolve(GenreService.getGenreOptionList(inputValue));
    });

  const handleChange = (newValue: unknown) => {
    if (Array.isArray(newValue) && newValue.length > 0 && (newValue as Option[])) {
      setSelectValue(newValue);
      router.query.genres = newValue.map((genre) => genre.value);
      router.replace({
        query: router.query,
      });
    } else {
      setSelectValue(null);
      const { genres, ...remainingQuries } = router.query;
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
      // defaultValue={defaultOption}
      styles={customSelectStyle}
      placeholder="Genre..."
      isMulti
    />
  );
};

export default GenreFilterComponent;
