import { createSlice } from "@reduxjs/toolkit";
import { USER_LOCAL_STORAGE_KEY, CART_LOCAL_STORAGE_KEY } from "constants";

const initialUser =
  typeof localStorage !== "undefined" &&
  localStorage.getItem(USER_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY)).user
    : null;

const initialToken =
  typeof localStorage !== "undefined" &&
  localStorage.getItem(USER_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY)).token
    : null;

const initialState = {
  user: initialUser || null,
  token: initialToken || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    logOut: (state, action) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
      localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
