import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { changeTheme, getSystemTheme } from "redux/reducers/system/systemSlice";
import { THEME_DARK, THEME_LIGHT, ThemeType } from "helpers/constants";

import CustomSelect from "ui/customSelect";

type OptionType = {
  value: ThemeType;
  label: string;
};

const ThemePicker = () => {
  const { t } = useTranslation("files/settings");
  const darkLabel = t("dark_label");
  const lightLabel = t("light_label");

  const options: OptionType[] = [
    { value: THEME_DARK, label: darkLabel },
    { value: THEME_LIGHT, label: lightLabel },
  ];

  const theme = useAppSelector(getSystemTheme);
  const selectedOption = options.find((x) => x.value === theme);

  const dispatch = useAppDispatch();

  return (
    <CustomSelect
      options={options}
      selectedOption={selectedOption}
      onSelectChange={(opt) => dispatch(changeTheme(opt.value as ThemeType))}
    />
  );
};

export default ThemePicker;
