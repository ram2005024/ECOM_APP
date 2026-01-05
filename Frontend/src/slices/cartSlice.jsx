import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  cartId: null,
  address: [],
  addressFilled: false,
};
const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addCart: (state, action) => {
      state.items = action.payload.items;
      state.totalItems = action.payload.totalItem;
      state.totalPrice = action.payload.totalPrice;
      state.cartId = action.payload.cartId;
    },
    deleteCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      state.cartId = null;
    },
    addAddress: (state, action) => {
      state.address.push(action.payload);
    },
    deleteAddress: (state) => {
      state.address = null;
    },
    setAddressFilled: (state) => {
      state.addressFilled = !state.addressFilled;
    },
  },
});
export default cartSlice.reducer;
export const {
  addCart,
  deleteCart,
  addAddress,
  deleteAddress,
  setAddressFilled,
} = cartSlice.actions;
