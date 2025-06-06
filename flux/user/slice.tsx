import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./types";

const initialState: UserState = {
  email: null,
  username: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.email = action.payload;
      state.username = action.payload;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.email = null;
      state.username = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
