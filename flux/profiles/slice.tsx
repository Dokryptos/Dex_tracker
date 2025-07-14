import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./types";

const initialState: UserState = {
  email: null,
  id:null,
  username: null,
  isLoggedIn: false,
};

const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, email, username } = action.payload;
      state.id = id;
      state.email = email;
      state.username = username;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.email = null;
      state.id = null; 
      state.username = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = profilesSlice.actions;
export default profilesSlice.reducer;
