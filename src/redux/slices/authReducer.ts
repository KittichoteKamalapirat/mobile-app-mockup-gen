import { createSlice } from "@reduxjs/toolkit";

export interface CurrentUser {
  isLoggedIn: boolean;
  email: string;
  username: string;
  id: string;
}
const initialState: CurrentUser = {
  isLoggedIn: false,
  email: "",
  username: "",
  id: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveUser(state, action) {
      console.log(action.payload);
    },
  },
});

export const { setActiveUser } = authSlice.actions;

export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
export const getUsername = (state) => state.auth.username;
export const getUserId = (state) => state.auth.id;

export default authSlice.reducer;
