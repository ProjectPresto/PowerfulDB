import type { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Select from "react-select";
import { StylesConfig } from "react-select/dist/declarations/src";

import { UrlQueries } from "@models/generic";

export interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  filter: string;
  label?: string;
  placeholder?: string;
  isMulti?: boolean;
  isClearable?: boolean;
}

const SelectFilterComponent: NextComponentType<NextPageContext, {}, Props> = ({
  options,
  filter,
  label,
  placeholder,
  isMulti,
  isClearable,
}: Props) => {
  const router = useRouter();
  const defaultOption = options.find(({ value }) => value === router.query[filter]);
  const [selectValue, setSelectValue] = useState<object | null>();

  const handleChange = (newValue: unknown) => {
    if (typeof newValue === "object") {
      setSelectValue(newValue);
      router.query[filter] = (newValue as Option)?.value ?? null;
      router.replace({
        query: router.query,
      });
    }

    if (typeof newValue === "object" && !Array.isArray(newValue) && (newValue as Option)) {
      // If select single
      setSelectValue(newValue);
      router.query[filter] = (newValue as Option).value;
      router.replace({
        query: router.query,
      });
    } else if (Array.isArray(newValue) && newValue.length > 0 && (newValue as Option[])) {
      // If select multi
      setSelectValue(newValue);
      router.query[filter] = newValue.map((element) => element.value);
      router.replace({
        query: router.query,
      });
    } else {
      // If cleared
      setSelectValue(null);
      delete router.query[filter];
      router.replace({
        query: router.query,
      });
    }
  };

  return (
    <div className="flex flex-col items-start gap-y-2">
      {label && <p>{label}</p>}
      <Select
        options={options}
        onChange={handleChange}
        value={selectValue}
        defaultValue={defaultOption}
        styles={customSelectStyle}
        placeholder={placeholder}
        isMulti={isMulti}
        isClearable={isClearable}
      />
    </div>
  );
};

export const customSelectStyle: StylesConfig = {
  control: (provider, state) => ({
    ...provider,
    borderRadius: "1.5rem",
    width: "auto",
    backgroundColor: "#1B1C22",
    padding: "0 0.3rem",
    border: 0,
    boxShadow: "none",
  }),

  container: (provider, state) => ({
    ...provider,
    borderRadius: "1.5rem",
    border: "2px solid #4EFFA6",
    zIndex: 1000,
  }),

  input: (provider, state) => ({
    ...provider,
    color: "#F3EFF5",
  }),

  singleValue: (provider, state) => ({
    ...provider,
    color: "#F3EFF5",
  }),

  menuList: (provider, state) => ({
    ...provider,
    padding: 0,
    "&::-webkit-scrollbar": {
      width: "0.5rem",
    },

    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 5px rgba(255, 255, 255, 0.1)",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "rgba(78, 255, 166, 0.75)",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#4effa6",
      borderRadius: "10px",
    },
  }),

  menu: (provided, state) => ({
    ...provided,
    width: 200,
    borderRadius: "0.5rem",
    backgroundColor: "#292A33",
    overflow: "hidden",
  }),

  option: (provider, state) => ({
    ...provider,
    background: state.isFocused ? "#4EFFA6" : state.isSelected ? "#5E2BFF" : "none",
    cursor: "pointer",
    color: state.isFocused ? "#1B1C22" : "#F3EFF5",
    "&:active": {
      background: "#70FFB8",
    },
  }),

  multiValue: (provider, state) => ({
    ...provider,
    backgroundColor: "#4EFFA6",
    fontWeight: "bold",
    fontSize: "14px",
    borderRadius: "1rem",
    paddingLeft: "0.2rem",
    overflow: "hidden",
  }),

  multiValueRemove: (provider, state) => ({
    ...provider,
    color: "#1B1C22",
    transition: ".1s all ease-in-out",
    borderRadius: "1rem",
  }),
};

export default SelectFilterComponent;
