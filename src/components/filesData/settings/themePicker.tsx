import Select from "react-select";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { changeTheme, getSystemTheme } from "redux/reducers/system/systemSlice";
import { THEME_DARK, THEME_LIGHT, ThemeType } from "helpers/constants";

type OptionType = {
  value: ThemeType;
  label: "Dark" | "Light";
};

const options: OptionType[] = [
  { value: THEME_DARK, label: "Dark" },
  { value: THEME_LIGHT, label: "Light" },
];

const ThemePicker = () => {
  const theme = useAppSelector(getSystemTheme);
  const selectedOption = options.find((x) => x.value === theme);

  const dispatch = useAppDispatch();

  const handleChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      dispatch(changeTheme(selectedOption.value));
    }
  };

  return (
    <div>
      <div>Select system theme</div>
      <Select
        value={selectedOption}
        options={options}
        onChange={(option) => handleChange(option)}
      />
    </div>
  );
};

export default ThemePicker;
