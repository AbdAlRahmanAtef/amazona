import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  brand: "",
  category: "",
  price: "",
  rating: "",
  page: 1,
  sortMethod: "featured",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload || "";
    },
    setCategory: (state, action) => {
      state.category = action.payload || "";
    },
    setBrand: (state, action) => {
      state.brand = action.payload || "";
    },
    setPrice: (state, action) => {
      state.price = action.payload || "";
    },
    setRating: (state, action) => {
      state.rating = action.payload || "";
    },
    setPage: (state, action) => {
      state.page = action.payload || 1;
    },
    setSortMethod: (state, action) => {
      state.sortMethod = action.payload || "featured";
    },
  },
});

export const {
  setQuery,
  setCategory,
  setBrand,
  setPrice,
  setRating,
  setPage,
  setSortMethod,
} = searchSlice.actions;
export default searchSlice.reducer;
