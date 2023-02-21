import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";
import searchSlice from "./slices/searchSlice";
import sidebarSlice from "./slices/sidebarSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
    order: orderSlice,
    sidebar: sidebarSlice,
    search: searchSlice,
  },
});
