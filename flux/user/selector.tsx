import { RootState } from "../index";

export const selectUserEmail = (state: RootState) => state.user.email;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
