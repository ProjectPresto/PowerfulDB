import type { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Select from "react-select";
import { StylesConfig } from "react-select/dist/declarations/src";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
}

const SortComponent: NextComponentType<NextPageContext, {}, Props> = ({ options }: Props) => {
  const router = useRouter();
  const defaultOption = options.find(({ value }) => value === router.query.ordering);
  const [selectValue, setSelectValue] = useState<object | null>();

  const handleChange = (newValue: unknown) => {
    if (typeof newValue === "object") {
      setSelectValue(newValue);
      router.query.ordering = (newValue as Option).value;
      router.replace({
        query: router.query,
      });
    }
  };

  return <Select options={options} onChange={handleChange} value={selectValue} defaultValue={defaultOption} styles={customStyles} />;
};

const customStyles: StylesConfig = {
  control: (provider, state) => ({
    ...provider,
    borderRadius: "1.5rem",
    width: 200,
    backgroundColor: "#1B1C22",
    padding: "0 0.3rem",
    border: 0,
    boxShadow: "none",
  }),

  container: (provider, state) => ({
    ...provider,
    borderRadius: "1.5rem",
    border: "2px solid #4EFFA6",
  }),

  singleValue: (provider, state) => ({
    ...provider,
    color: "#F3EFF5",
  }),

  menuList: (provider, state) => ({
    ...provider,
    padding: 0,
  }),

  menu: (provided, state) => ({
    ...provided,
    width: 200,
    borderRadius: "1rem",
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
};

export default SortComponent;
