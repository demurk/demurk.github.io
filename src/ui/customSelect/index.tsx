import Select, { StylesConfig } from "react-select";

import { useAppSelector } from "redux/hooks";
import { getSystemAccent } from "redux/reducers/system/systemSlice";

import "styles/customSelect.scss";

type OptionType = {
  value: string;
  label: string;
};

type CustomSelectType = {
  options: OptionType[];
  onSelectChange: (option: OptionType) => {};
  selectedOption?: OptionType | null;
  menuPlacement?: "top" | "bottom";
  hideButtons?: Boolean;
  bordered?: Boolean;
};

const CustomSelect = ({
  options,
  onSelectChange,
  selectedOption,
  menuPlacement = "bottom",
  hideButtons = false,
  bordered = true,
}: CustomSelectType) => {
  const systemAccent = useAppSelector(getSystemAccent);

  const dropdownStyle: StylesConfig<OptionType, false> = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? `${systemAccent} !important`
        : "inherit",
    }),
  };

  const handleChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      onSelectChange(selectedOption);
    }
  };

  return (
    <Select
      components={
        hideButtons
          ? { IndicatorSeparator: () => null, DropdownIndicator: () => null }
          : { IndicatorSeparator: () => null }
      }
      menuPlacement={menuPlacement}
      value={selectedOption}
      options={options}
      onChange={(option) => handleChange(option)}
      isClearable={false}
      isSearchable={false}
      className={bordered && "select__bordered"}
      classNamePrefix="select"
      // menuIsOpen={true}
      styles={dropdownStyle}
    />
  );
};

export default CustomSelect;
