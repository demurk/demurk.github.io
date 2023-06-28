import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  changeLanguage,
  getSystemLanguage,
} from "redux/reducers/system/systemSlice";

import Select from "react-select";

import { LANG_EN, LANG_RU, LangType } from "helpers/constants";

type OptionType = {
  value: LangType;
  label: "РУС" | "ENG";
};

const options: OptionType[] = [
  { value: LANG_RU, label: "РУС" },
  { value: LANG_EN, label: "ENG" },
];

type LanguageSelectType = {
  menuPlacement?: "top" | "bottom";
  hideButtons?: Boolean;
};

const LanguageSelect = ({
  menuPlacement = "top",
  hideButtons = true,
}: LanguageSelectType) => {
  const language = useAppSelector(getSystemLanguage);
  const selectedOption = options.find((x) => x.value === language);

  const dispatch = useAppDispatch();

  const handleChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      dispatch(changeLanguage(selectedOption.value));
    }
  };

  return (
    <Select
      components={
        hideButtons && {
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }
      }
      menuPlacement={menuPlacement}
      value={selectedOption}
      options={options}
      onChange={(option) => handleChange(option)}
    />
  );
};

export default LanguageSelect;
