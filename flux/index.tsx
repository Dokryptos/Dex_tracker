import { configureStore } from "@reduxjs/toolkit";
import profilesSlice from "./profiles/slice";

export const store = configureStore({
  reducer: {
    profiles: profilesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
