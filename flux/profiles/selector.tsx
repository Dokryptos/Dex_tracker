import { RootState } from "../index";

export const selectProfilesEmail = (state: RootState) => state.profiles.email;
export const selectIsLoggedIn = (state: RootState) => state.profiles.isLoggedIn;
export const selectProfilesName = (state: RootState) => state.profiles.username;
export const selectProfilesId = (state: RootState) => state.profiles.id;