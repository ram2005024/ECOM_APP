import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  cartId: null,
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
  },
});
export default cartSlice.reducer;
export const { addCart, deleteCart } = cartSlice.actions;
