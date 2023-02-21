import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  order: {},
  loadingPay: false,
  successPay: false,
  errorPay: "",
  loadingDeliver: false,
  successDeliver: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = "";
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = "";
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    payRequest: (state, action) => {
      state.loadingPay = true;
    },
    paySuccess: (state, action) => {
      state.loadingPay = false;
      state.successPay = action.payload;
      state.order = action.payload.order;
    },
    payFail: (state, action) => {
      state.loadingPay = false;
      state.successPay = false;
      state.errorPay = "";
    },
    payReset: (state) => {
      state.loadingPay = false;
      state.successPay = false;
      state.errorPay = "";
    },
    deliverRequest: (state, action) => {
      state.loadingDeliver = true;
    },
    deliverSuccess: (state, action) => {
      state.loadingDeliver = false;
      state.successDeliver = true;
    },
    deliverFail: (state, action) => {
      state.loadingDeliver = false;
    },
    deliverReset: (state, action) => {
      state.loadingDeliver = false;
      state.successDeliver = false;
    },
  },
});

export const {
  fetchRequest,
  fetchSuccess,
  fetchFail,
  payRequest,
  paySuccess,
  payFail,
  payReset,
  deliverRequest,
  deliverSuccess,
  deliverFail,
  deliverReset,
} = orderSlice.actions;

export default orderSlice.reducer;
