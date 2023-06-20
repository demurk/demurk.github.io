import { useAppDispatch, useAppSelector } from "redux/hooks";
import { changeLanguage, getLanguage } from "redux/reducers/config/configSlice";

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

const LanguageSelect = () => {
  const language = useAppSelector(getLanguage);
  const selectedOption = options.find((x) => x.value === language);

  const dispatch = useAppDispatch();

  const handleChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      dispatch(changeLanguage(selectedOption.value));
    }
  };

  return (
    <Select
      menuPlacement="top"
      value={selectedOption}
      options={options}
      onChange={(option) => handleChange(option)}
    />
  );
};

export default LanguageSelect;
