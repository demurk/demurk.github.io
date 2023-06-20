import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { FileData, CoordinatesType } from "types/global";
import { LangType, ThemeType, LANG_EN, LANG_RU } from "helpers/constants";

interface ConfigState {
  lang: LangType;
  systemTheme: ThemeType;
  systemColor: string;
}

const getUserLanguage = () => {
  const langFull = navigator.language;
  const langShort = langFull.slice(0, 2);

  return LANG_RU === langShort ? LANG_RU : LANG_EN;
};

const initialConfigState = (): ConfigState => {
  return {
    lang: getUserLanguage(),
    systemTheme: "dark",
    systemColor: "#0900C7",
  };
};

const initialState: ConfigState = initialConfigState();

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<LangType>) => {
      state.lang = action.payload;
    },
    changeTheme: (state, action: PayloadAction<ThemeType>) => {
      state.systemTheme = action.payload;
    },
    changeColor: (state, action: PayloadAction<string>) => {
      state.systemColor = action.payload;
    },
  },
});

export const { changeLanguage, changeTheme, changeColor } = configSlice.actions;

export const getLanguage = (state: RootState): LangType => {
  return state.config.lang;
};

export const getSystemTheme = (state: RootState): ThemeType => {
  return state.config.systemTheme;
};

export const getSystemColor = (state: RootState): string => {
  return state.config.systemColor;
};

export default configSlice.reducer;
