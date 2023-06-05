import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "redux/reducers";

export const useAppStore = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof useAppStore.getState>;
export type AppDispatch = typeof useAppStore.dispatch;
