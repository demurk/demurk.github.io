import Select from "react-select";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();

  const language = i18n.language;
  const selectedOption = options.find((x) => x.value === language);

  const handleChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      i18n.changeLanguage(selectedOption.value);
    }
  };

  return (
    <div className="navbar__btn">
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
        isClearable={false}
        isSearchable={false}
        classNames={{
          control: (state) => (state.isFocused ? "red" : "inherit"),
        }}
        classNamePrefix="select"
      />
    </div>
  );
};

export default LanguageSelect;
