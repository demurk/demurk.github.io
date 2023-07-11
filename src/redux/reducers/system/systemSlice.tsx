import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { ThemeType } from "helpers/constants";

interface ConfigState {
  theme: ThemeType;
  accent: string;
  background: string;
}

const initialConfigState = (): ConfigState => {
  return {
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

export const { changeTheme, changeAccent, changeBackground } =
  systemSlice.actions;

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
