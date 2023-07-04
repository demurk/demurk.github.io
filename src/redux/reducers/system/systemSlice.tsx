import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { LangType, ThemeType, LANG_EN, LANG_RU } from "helpers/constants";

interface ConfigState {
  lang: LangType;
  theme: ThemeType;
  accent: string;
  background: string;
}

const getUserLanguage = () => {
  const langFull = navigator.language;
  const langShort = langFull.slice(0, 2);

  return LANG_RU === langShort ? LANG_RU : LANG_EN;
};

const initialConfigState = (): ConfigState => {
  return {
    lang: getUserLanguage(),
    theme: "dark",
    accent: "#94f5aa",
    background: "img/backgrounds/xp.jpg",
  };
};

const initialState: ConfigState = initialConfigState();

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<LangType>) => {
      state.lang = action.payload;
    },
    changeTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
    changeAccent: (state, action: PayloadAction<string>) => {
      state.accent = action.payload;
    },
    changeBackground: (state, action: PayloadAction<string>) => {
      state.background = action.payload;
    },
  },
});

export const { changeLanguage, changeTheme, changeAccent, changeBackground } =
  systemSlice.actions;

export const getSystemLanguage = (state: RootState): LangType => {
  return state.system.lang;
};

export const getSystemTheme = (state: RootState): ThemeType => {
  return state.system.theme;
};

export const getSystemAccent = (state: RootState): string => {
  return state.system.accent;
};

export const getSystemBackground = (state: RootState): string => {
  return state.system.background;
};

export default systemSlice.reducer;
