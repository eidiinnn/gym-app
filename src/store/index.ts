import { configureStore } from "@reduxjs/toolkit";
import { calendarStore } from "./calendar";
import { useSelector as rawUseSelector, TypedUseSelectorHook } from "react-redux";
const store = configureStore({
  reducer: {
    calendar: calendarStore.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
export default store;
