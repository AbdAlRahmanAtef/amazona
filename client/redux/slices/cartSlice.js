import { createSlice } from "@reduxjs/toolkit";
import { CART_LOCAL_STORAGE_KEY } from "constants";

const cartItems =
  typeof localStorage !== "undefined" &&
  localStorage.getItem(CART_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY)).cartItems
    : [];
const totalItems =
  typeof localStorage !== "undefined" &&
  localStorage.getItem(CART_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY)).totalItems
    : 0;
const totalPrice =
  typeof localStorage !== "undefined" &&
  localStorage.getItem(CART_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY)).totalPrice
    : 0;
const shippingAddress =
  typeof localStorage !== "undefined" &&
  localStorage.getItem(CART_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY)).shippingAddress
    : {};

const paymentMethod =
  typeof localStorage !== "undefined" &&
  localStorage.getItem(CART_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY)).paymentMethod
    : "";

const initialState = {
  cartItems,
  totalItems,
  totalPrice,
  shippingAddress,
  paymentMethod,
};

const saveJSON = (payload) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(payload));
  }
};

const handlePriceAndTotal = (state) => {
  if (state.cartItems.length > 0) {
    state.totalPrice = state.cartItems?.reduce(
      (acc, current) => Number(acc) + Number(current.price) * current.qty,
      0
    );

    state.totalItems = state.cartItems?.reduce(
      (acc, current) => Number(acc) + current.qty,
      0
    );
  } else {
    state.totalItems = 0;
    state.totalPrice = 0;
  }
};

export const cartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const isFound = state.cartItems?.find(
        (item) => item._id === action.payload._id
      );
      if (isFound) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        state.cartItems = [...state.cartItems, { ...action.payload, qty: 1 }];
      }

      handlePriceAndTotal(state);

      saveJSON(state);
    },
    updateCartItems: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item._id === action.payload._id
          ? { ...item, qty: action.payload.qty }
          : item
      );
      handlePriceAndTotal(state);

      saveJSON(state);
    },
    deleteItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      handlePriceAndTotal(state);

      saveJSON(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
      state.totalPrice = 0;

      saveJSON(state);
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      saveJSON(state);
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;

      saveJSON(state);
    },
  },
});

export const {
  addItemToCart,
  updateCartItems,
  deleteItemFromCart,
  clearCart,
  setShippingAddress,
  setPaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
