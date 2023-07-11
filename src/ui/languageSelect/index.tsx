import { useTranslation } from "react-i18next";

import CustomSelect from "ui/customSelect";
import { LANG_EN, LANG_RU, LangType } from "helpers/constants";

type OptionType = {
  value: LangType;
  label: string;
};

const options: OptionType[] = [
  { value: LANG_EN, label: "ENG" },
  { value: LANG_RU, label: "РУС" },
];

type LanguageSelectType = {
  menuPlacement?: "top" | "bottom";
  hideButtons?: Boolean;
  border?: Boolean;
};

const LanguageSelect = ({
  menuPlacement = "top",
  hideButtons = true,
  border = false,
}: LanguageSelectType) => {
  const { i18n } = useTranslation();

  const language = i18n.language;
  const selectedOption = options.find((x) => x.value === language);

  return (
    <CustomSelect
      options={options}
      selectedOption={selectedOption}
      onSelectChange={(opt) => i18n.changeLanguage(opt.value)}
      menuPlacement={menuPlacement}
      hideButtons={hideButtons}
      bordered={border}
    />
  );
};

export default LanguageSelect;
