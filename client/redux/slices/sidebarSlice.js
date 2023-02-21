import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setActiveSidebar: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { setActiveSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
